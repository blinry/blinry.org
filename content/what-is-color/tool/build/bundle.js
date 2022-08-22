
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.47.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function XYZtoRGB(X, Y, Z) {
        let r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z;
        let g = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
        let b = 0.0557 * X - 0.204 * Y + 1.057 * Z;
        r = gammaEncode(r);
        g = gammaEncode(g);
        b = gammaEncode(b);
        return {r: r, g: g, b: b}
    }

    function gammaEncode(c) {
        if (c <= 0.0031308) {
            return 12.92 * c
        } else {
            return 1.055 * Math.pow(c, 1 / 2.4) - 0.055
        }
    }

    /* src/Spectrum.svelte generated by Svelte v3.47.0 */
    const file$2 = "src/Spectrum.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i];
    	return child_ctx;
    }

    // (155:8) {#each rects as r}
    function create_each_block$1(ctx) {
    	let rect;
    	let rect_x_value;
    	let rect_y_value;
    	let rect_width_value;
    	let rect_height_value;
    	let rect_fill_value;

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			attr_dev(rect, "x", rect_x_value = /*r*/ ctx[21].x);
    			attr_dev(rect, "y", rect_y_value = /*r*/ ctx[21].y);
    			attr_dev(rect, "width", rect_width_value = /*r*/ ctx[21].width);
    			attr_dev(rect, "height", rect_height_value = /*r*/ ctx[21].height);
    			attr_dev(rect, "fill", rect_fill_value = /*r*/ ctx[21].fill);
    			attr_dev(rect, "stroke", "none");
    			add_location(rect, file$2, 155, 12, 4499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rects*/ 4 && rect_x_value !== (rect_x_value = /*r*/ ctx[21].x)) {
    				attr_dev(rect, "x", rect_x_value);
    			}

    			if (dirty & /*rects*/ 4 && rect_y_value !== (rect_y_value = /*r*/ ctx[21].y)) {
    				attr_dev(rect, "y", rect_y_value);
    			}

    			if (dirty & /*rects*/ 4 && rect_width_value !== (rect_width_value = /*r*/ ctx[21].width)) {
    				attr_dev(rect, "width", rect_width_value);
    			}

    			if (dirty & /*rects*/ 4 && rect_height_value !== (rect_height_value = /*r*/ ctx[21].height)) {
    				attr_dev(rect, "height", rect_height_value);
    			}

    			if (dirty & /*rects*/ 4 && rect_fill_value !== (rect_fill_value = /*r*/ ctx[21].fill)) {
    				attr_dev(rect, "fill", rect_fill_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(155:8) {#each rects as r}",
    		ctx
    	});

    	return block;
    }

    // (173:8) {#if multiply}
    function create_if_block$1(ctx) {
    	let path_1;

    	const block = {
    		c: function create() {
    			path_1 = svg_element("path");
    			attr_dev(path_1, "d", /*multiplyPath*/ ctx[4]);
    			attr_dev(path_1, "stroke", "none");
    			attr_dev(path_1, "fill", "#999");
    			add_location(path_1, file$2, 173, 12, 5104);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*multiplyPath*/ 16) {
    				attr_dev(path_1, "d", /*multiplyPath*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(173:8) {#if multiply}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let svg_1;
    	let line0;
    	let line1;
    	let text0;
    	let t0;
    	let t1;
    	let text1;
    	let t2;
    	let t3;
    	let path_1;
    	let path_1_stroke_value;
    	let mounted;
    	let dispose;
    	let each_value = /*rects*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	let if_block = /*multiply*/ ctx[1] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			svg_1 = svg_element("svg");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			text0 = svg_element("text");
    			t0 = text(/*minNm*/ ctx[6]);
    			t1 = text(" nm ");
    			text1 = svg_element("text");
    			t2 = text(/*maxNm*/ ctx[7]);
    			t3 = text(" nm ");
    			path_1 = svg_element("path");
    			if (if_block) if_block.c();
    			attr_dev(line0, "x1", "0");
    			attr_dev(line0, "y1", "100");
    			attr_dev(line0, "x2", "200");
    			attr_dev(line0, "y2", "100");
    			attr_dev(line0, "stroke", "white");
    			add_location(line0, file$2, 165, 8, 4719);
    			attr_dev(line1, "x1", "0");
    			attr_dev(line1, "y1", "100");
    			attr_dev(line1, "x2", "0");
    			attr_dev(line1, "y2", "0");
    			attr_dev(line1, "stroke", "white");
    			add_location(line1, file$2, 166, 8, 4785);
    			attr_dev(text0, "x", "-8");
    			attr_dev(text0, "y", "108");
    			attr_dev(text0, "font-size", "5");
    			attr_dev(text0, "fill", "white");
    			add_location(text0, file$2, 168, 8, 4848);
    			attr_dev(text1, "x", "190");
    			attr_dev(text1, "y", "108");
    			attr_dev(text1, "font-size", "5");
    			attr_dev(text1, "fill", "white");
    			add_location(text1, file$2, 169, 8, 4924);
    			attr_dev(path_1, "d", /*path*/ ctx[3]);
    			attr_dev(path_1, "stroke", path_1_stroke_value = /*monoXYZ*/ ctx[0] ? "white" : "white");
    			attr_dev(path_1, "fill", "none");
    			add_location(path_1, file$2, 171, 8, 5002);
    			attr_dev(svg_1, "viewBox", "-10 -10 220 120");
    			attr_dev(svg_1, "class", "svelte-168iq3a");
    			add_location(svg_1, file$2, 144, 4, 4163);
    			add_location(main, file$2, 143, 0, 4152);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, svg_1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(svg_1, null);
    			}

    			append_dev(svg_1, line0);
    			append_dev(svg_1, line1);
    			append_dev(svg_1, text0);
    			append_dev(text0, t0);
    			append_dev(text0, t1);
    			append_dev(svg_1, text1);
    			append_dev(text1, t2);
    			append_dev(text1, t3);
    			append_dev(svg_1, path_1);
    			if (if_block) if_block.m(svg_1, null);
    			/*svg_1_binding*/ ctx[13](svg_1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg_1, "mousedown", /*handleMousedown*/ ctx[9], false, false, false),
    					listen_dev(svg_1, "mouseup", /*handleMouseup*/ ctx[10], false, false, false),
    					listen_dev(svg_1, "mousemove", /*handleMousemove*/ ctx[8], false, false, false),
    					listen_dev(svg_1, "touchstart", /*handleMousedown*/ ctx[9], false, false, false),
    					listen_dev(svg_1, "touchend", /*handleMouseup*/ ctx[10], false, false, false),
    					listen_dev(svg_1, "touchmove", /*handleMousemove*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rects*/ 4) {
    				each_value = /*rects*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(svg_1, line0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*path*/ 8) {
    				attr_dev(path_1, "d", /*path*/ ctx[3]);
    			}

    			if (dirty & /*monoXYZ*/ 1 && path_1_stroke_value !== (path_1_stroke_value = /*monoXYZ*/ ctx[0] ? "white" : "white")) {
    				attr_dev(path_1, "stroke", path_1_stroke_value);
    			}

    			if (/*multiply*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(svg_1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    			/*svg_1_binding*/ ctx[13](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Spectrum', slots, []);
    	let { spectrum = {} } = $$props;
    	let { monoXYZ } = $$props;
    	let { multiply } = $$props;
    	let nmStep = 10;
    	let minNm = 380;
    	let maxNm = 780;
    	let { sum = 0 } = $$props;
    	let prevNm, prevIntensity;

    	for (let i = minNm; i <= maxNm; i += nmStep) {
    		spectrum[i] = 0; //Math.sin((2 * i) / 100) * 0.5 + 0.5
    	}

    	let path = "M0,0";
    	let multiplyPath = "M0,0";

    	function handleMousemove(event) {
    		if (mousedown) {
    			if (event.touches) {
    				event.clientX = event.touches[0].pageX;
    				event.clientY = event.touches[0].pageY;
    			}

    			let loc = cursorPoint(event);
    			let nm = loc.x / 200 * (maxNm - minNm) + minNm;
    			nm = Math.round(nm / nmStep) * nmStep;
    			let intensity = Math.max(0, 1 - loc.y / 100);
    			$$invalidate(11, spectrum[nm] = intensity, spectrum);

    			if (prevNm) {
    				let step = nmStep;

    				if (prevNm > nm) {
    					step = -step;
    				}

    				for (let i = prevNm; i != nm; i += step) {
    					$$invalidate(11, spectrum[i] = prevIntensity + (intensity - prevIntensity) * ((i - prevNm) / (nm - prevNm)), spectrum);
    				}
    			}

    			prevNm = nm;
    			prevIntensity = intensity;
    		} else if (mousedown2) {
    			if (event.touches) {
    				event.clientX = event.touches[0].pageX;
    				event.clientY = event.touches[0].pageY;
    			}

    			let loc = cursorPoint(event);
    			let nm = loc.x / 200 * (maxNm - minNm) + minNm;
    			nm = Math.round(nm / nmStep) * nmStep;
    			let intensity = Math.max(0, 1 - loc.y / 100);

    			for (let i = minNm; i <= maxNm; i += nmStep) {
    				$$invalidate(11, spectrum[i] = 0, spectrum);
    			}

    			$$invalidate(11, spectrum[nm] = intensity, spectrum);
    		}
    	}

    	let mousedown = false, mousedown2 = false;

    	function handleMousedown(event) {
    		if (event.button === 0) {
    			mousedown = true;
    		} else if (event.button === 1) {
    			mousedown2 = true;
    		}

    		handleMousemove(event);
    	}

    	function handleMouseup(event) {
    		if (event.button === 0) {
    			mousedown = false;
    		} else if (event.button === 1) {
    			mousedown2 = false;
    		}

    		prevNm = undefined;
    		prevIntensity = undefined;
    		handleMousemove(event);
    	}

    	var pt;
    	var svg;

    	onMount(async () => {
    		// Create an SVGPoint for future math
    		pt = svg.createSVGPoint();
    	});

    	function cursorPoint(evt) {
    		pt.x = evt.clientX;
    		pt.y = evt.clientY;
    		return pt.matrixTransform(svg.getScreenCTM().inverse());
    	}

    	let rects = [];
    	const writable_props = ['spectrum', 'monoXYZ', 'multiply', 'sum'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Spectrum> was created with unknown prop '${key}'`);
    	});

    	function svg_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			svg = $$value;
    			$$invalidate(5, svg);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('spectrum' in $$props) $$invalidate(11, spectrum = $$props.spectrum);
    		if ('monoXYZ' in $$props) $$invalidate(0, monoXYZ = $$props.monoXYZ);
    		if ('multiply' in $$props) $$invalidate(1, multiply = $$props.multiply);
    		if ('sum' in $$props) $$invalidate(12, sum = $$props.sum);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		XYZtoRGB,
    		spectrum,
    		monoXYZ,
    		multiply,
    		nmStep,
    		minNm,
    		maxNm,
    		sum,
    		prevNm,
    		prevIntensity,
    		path,
    		multiplyPath,
    		handleMousemove,
    		mousedown,
    		mousedown2,
    		handleMousedown,
    		handleMouseup,
    		pt,
    		svg,
    		cursorPoint,
    		rects
    	});

    	$$self.$inject_state = $$props => {
    		if ('spectrum' in $$props) $$invalidate(11, spectrum = $$props.spectrum);
    		if ('monoXYZ' in $$props) $$invalidate(0, monoXYZ = $$props.monoXYZ);
    		if ('multiply' in $$props) $$invalidate(1, multiply = $$props.multiply);
    		if ('nmStep' in $$props) $$invalidate(19, nmStep = $$props.nmStep);
    		if ('minNm' in $$props) $$invalidate(6, minNm = $$props.minNm);
    		if ('maxNm' in $$props) $$invalidate(7, maxNm = $$props.maxNm);
    		if ('sum' in $$props) $$invalidate(12, sum = $$props.sum);
    		if ('prevNm' in $$props) prevNm = $$props.prevNm;
    		if ('prevIntensity' in $$props) prevIntensity = $$props.prevIntensity;
    		if ('path' in $$props) $$invalidate(3, path = $$props.path);
    		if ('multiplyPath' in $$props) $$invalidate(4, multiplyPath = $$props.multiplyPath);
    		if ('mousedown' in $$props) mousedown = $$props.mousedown;
    		if ('mousedown2' in $$props) mousedown2 = $$props.mousedown2;
    		if ('pt' in $$props) pt = $$props.pt;
    		if ('svg' in $$props) $$invalidate(5, svg = $$props.svg);
    		if ('rects' in $$props) $$invalidate(2, rects = $$props.rects);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*spectrum, path*/ 2056) {
    			{
    				$$invalidate(3, path = "M0,0");

    				for (let i = minNm; i <= maxNm; i += nmStep) {
    					let x = 200 * ((i - minNm) / (maxNm - minNm));
    					let y = 100 * (1 - spectrum[i]);
    					$$invalidate(3, path += `L${x},${y}`);
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*multiply, sum, spectrum, multiplyPath*/ 6162) {
    			if (multiply) {
    				$$invalidate(12, sum = 0);

    				for (let i = minNm; i <= maxNm; i += nmStep) {
    					$$invalidate(12, sum += spectrum[i] * multiply[i]);
    				}

    				$$invalidate(4, multiplyPath = "M0,100");

    				for (let i = minNm; i <= maxNm; i += nmStep) {
    					let x = 200 * ((i - minNm) / (maxNm - minNm));
    					let y = 100 * (1 - spectrum[i] * multiply[i]);
    					$$invalidate(4, multiplyPath += `L${x},${y}`);
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*monoXYZ, rects*/ 5) {
    			{
    				if (monoXYZ) {
    					$$invalidate(2, rects = []);

    					for (let i = minNm; i <= maxNm; i += nmStep) {
    						let xyzValues = monoXYZ(i);
    						let rgbValues = XYZtoRGB(xyzValues.X, xyzValues.Y, xyzValues.Z);
    						let rgb = `rgb(${rgbValues.r * 255}, ${rgbValues.g * 255}, ${rgbValues.b * 255})`;

    						rects.push({
    							x: (i - minNm) / (maxNm - minNm) * 200,
    							y: 0,
    							width: nmStep / (maxNm - minNm) * 210,
    							height: 100,
    							fill: rgb
    						});
    					}
    				}
    			}
    		}
    	};

    	return [
    		monoXYZ,
    		multiply,
    		rects,
    		path,
    		multiplyPath,
    		svg,
    		minNm,
    		maxNm,
    		handleMousemove,
    		handleMousedown,
    		handleMouseup,
    		spectrum,
    		sum,
    		svg_1_binding
    	];
    }

    class Spectrum extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			spectrum: 11,
    			monoXYZ: 0,
    			multiply: 1,
    			sum: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Spectrum",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*monoXYZ*/ ctx[0] === undefined && !('monoXYZ' in props)) {
    			console.warn("<Spectrum> was created without expected prop 'monoXYZ'");
    		}

    		if (/*multiply*/ ctx[1] === undefined && !('multiply' in props)) {
    			console.warn("<Spectrum> was created without expected prop 'multiply'");
    		}
    	}

    	get spectrum() {
    		throw new Error("<Spectrum>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set spectrum(value) {
    		throw new Error("<Spectrum>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get monoXYZ() {
    		throw new Error("<Spectrum>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set monoXYZ(value) {
    		throw new Error("<Spectrum>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiply() {
    		throw new Error("<Spectrum>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiply(value) {
    		throw new Error("<Spectrum>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sum() {
    		throw new Error("<Spectrum>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sum(value) {
    		throw new Error("<Spectrum>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/ChromaticityDiagram.svelte generated by Svelte v3.47.0 */

    const { Object: Object_1$1 } = globals;
    const file$1 = "src/ChromaticityDiagram.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i][0];
    	child_ctx[13] = list[i][1];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	return child_ctx;
    }

    // (99:8) {#each rects as r}
    function create_each_block_1(ctx) {
    	let rect;
    	let rect_x_value;
    	let rect_y_value;
    	let rect_width_value;
    	let rect_height_value;
    	let rect_fill_value;

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			attr_dev(rect, "x", rect_x_value = /*r*/ ctx[16].x);
    			attr_dev(rect, "y", rect_y_value = /*r*/ ctx[16].y);
    			attr_dev(rect, "width", rect_width_value = /*r*/ ctx[16].width);
    			attr_dev(rect, "height", rect_height_value = /*r*/ ctx[16].height);
    			attr_dev(rect, "fill", rect_fill_value = /*r*/ ctx[16].fill);
    			attr_dev(rect, "stroke", "none");
    			add_location(rect, file$1, 99, 12, 2909);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*rects*/ 2 && rect_x_value !== (rect_x_value = /*r*/ ctx[16].x)) {
    				attr_dev(rect, "x", rect_x_value);
    			}

    			if (dirty & /*rects*/ 2 && rect_y_value !== (rect_y_value = /*r*/ ctx[16].y)) {
    				attr_dev(rect, "y", rect_y_value);
    			}

    			if (dirty & /*rects*/ 2 && rect_width_value !== (rect_width_value = /*r*/ ctx[16].width)) {
    				attr_dev(rect, "width", rect_width_value);
    			}

    			if (dirty & /*rects*/ 2 && rect_height_value !== (rect_height_value = /*r*/ ctx[16].height)) {
    				attr_dev(rect, "height", rect_height_value);
    			}

    			if (dirty & /*rects*/ 2 && rect_fill_value !== (rect_fill_value = /*r*/ ctx[16].fill)) {
    				attr_dev(rect, "fill", rect_fill_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(99:8) {#each rects as r}",
    		ctx
    	});

    	return block;
    }

    // (110:8) {#each Object.entries(points) as [label, point]}
    function create_each_block(ctx) {
    	let circle;
    	let circle_cx_value;
    	let circle_cy_value;
    	let circle_r_value;
    	let text_1;
    	let t_value = /*label*/ ctx[12] + "";
    	let t;
    	let text_1_x_value;
    	let text_1_y_value;

    	const block = {
    		c: function create() {
    			circle = svg_element("circle");
    			text_1 = svg_element("text");
    			t = text(t_value);
    			attr_dev(circle, "cx", circle_cx_value = 100 * /*point*/ ctx[13].x);
    			attr_dev(circle, "cy", circle_cy_value = 100 * (1 - /*point*/ ctx[13].y));

    			attr_dev(circle, "r", circle_r_value = /*label*/ ctx[12] === "light" || /*label*/ ctx[12].substring(0, 4) === "sRGB"
    			? 1
    			: 0.5);

    			attr_dev(circle, "fill", "black");
    			add_location(circle, file$1, 110, 12, 3190);
    			attr_dev(text_1, "x", text_1_x_value = 100 * /*point*/ ctx[13].x + 1);
    			attr_dev(text_1, "y", text_1_y_value = 100 * (1 - /*point*/ ctx[13].y) - 1);
    			attr_dev(text_1, "font-size", "3");
    			attr_dev(text_1, "fill", "black");
    			add_location(text_1, file$1, 118, 12, 3454);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, circle, anchor);
    			insert_dev(target, text_1, anchor);
    			append_dev(text_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*points*/ 1 && circle_cx_value !== (circle_cx_value = 100 * /*point*/ ctx[13].x)) {
    				attr_dev(circle, "cx", circle_cx_value);
    			}

    			if (dirty & /*points*/ 1 && circle_cy_value !== (circle_cy_value = 100 * (1 - /*point*/ ctx[13].y))) {
    				attr_dev(circle, "cy", circle_cy_value);
    			}

    			if (dirty & /*points*/ 1 && circle_r_value !== (circle_r_value = /*label*/ ctx[12] === "light" || /*label*/ ctx[12].substring(0, 4) === "sRGB"
    			? 1
    			: 0.5)) {
    				attr_dev(circle, "r", circle_r_value);
    			}

    			if (dirty & /*points*/ 1 && t_value !== (t_value = /*label*/ ctx[12] + "")) set_data_dev(t, t_value);

    			if (dirty & /*points*/ 1 && text_1_x_value !== (text_1_x_value = 100 * /*point*/ ctx[13].x + 1)) {
    				attr_dev(text_1, "x", text_1_x_value);
    			}

    			if (dirty & /*points*/ 1 && text_1_y_value !== (text_1_y_value = 100 * (1 - /*point*/ ctx[13].y) - 1)) {
    				attr_dev(text_1, "y", text_1_y_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(circle);
    			if (detaching) detach_dev(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(110:8) {#each Object.entries(points) as [label, point]}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let svg_1;
    	let text0;
    	let t0;
    	let text1;
    	let t1;
    	let text2;
    	let t2;
    	let each0_anchor;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*rects*/ ctx[1];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = Object.entries(/*points*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			svg_1 = svg_element("svg");
    			text0 = svg_element("text");
    			t0 = text("0% ");
    			text1 = svg_element("text");
    			t1 = text("100% x ");
    			text2 = svg_element("text");
    			t2 = text("100% y ");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			each0_anchor = empty();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(text0, "x", "-8");
    			attr_dev(text0, "y", "108");
    			attr_dev(text0, "font-size", "5");
    			attr_dev(text0, "fill", "white");
    			add_location(text0, file$1, 94, 8, 2665);
    			attr_dev(text1, "x", "90");
    			attr_dev(text1, "y", "108");
    			attr_dev(text1, "font-size", "5");
    			attr_dev(text1, "fill", "white");
    			add_location(text1, file$1, 95, 8, 2733);
    			attr_dev(text2, "x", "-10");
    			attr_dev(text2, "y", "-5");
    			attr_dev(text2, "font-size", "5");
    			attr_dev(text2, "fill", "white");
    			add_location(text2, file$1, 96, 8, 2805);
    			attr_dev(svg_1, "viewBox", "-10 -10 120 120");
    			attr_dev(svg_1, "class", "svelte-15qprfs");
    			add_location(svg_1, file$1, 82, 4, 2283);
    			add_location(main, file$1, 81, 0, 2272);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, svg_1);
    			append_dev(svg_1, text0);
    			append_dev(text0, t0);
    			append_dev(svg_1, text1);
    			append_dev(text1, t1);
    			append_dev(svg_1, text2);
    			append_dev(text2, t2);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(svg_1, null);
    			}

    			append_dev(svg_1, each0_anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(svg_1, null);
    			}

    			/*svg_1_binding*/ ctx[6](svg_1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg_1, "mousedown", /*handleMousedown*/ ctx[4], false, false, false),
    					listen_dev(svg_1, "mouseup", /*handleMouseup*/ ctx[5], false, false, false),
    					listen_dev(svg_1, "mousemove", /*handleMousemove*/ ctx[3], false, false, false),
    					listen_dev(svg_1, "touchstart", /*handleMousedown*/ ctx[4], false, false, false),
    					listen_dev(svg_1, "touchend", /*handleMouseup*/ ctx[5], false, false, false),
    					listen_dev(svg_1, "touchmove", /*handleMousemove*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rects*/ 2) {
    				each_value_1 = /*rects*/ ctx[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(svg_1, each0_anchor);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*Object, points*/ 1) {
    				each_value = Object.entries(/*points*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(svg_1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			/*svg_1_binding*/ ctx[6](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChromaticityDiagram', slots, []);
    	const dispatch = createEventDispatcher();
    	let { points = {} } = $$props;
    	let rects = [];
    	let rectStep = 0.01;

    	{
    		rects = [];

    		for (let x = rectStep / 2; x < 1; x += rectStep) {
    			for (let y = rectStep / 2; y < 1; y += rectStep) {
    				if (x + y > 1.2) {
    					continue;
    				}

    				let Y = 0.8;
    				let X = Y / y * x;
    				let Z = Y / y * (1 - x - y);
    				let rgbValues = XYZtoRGB(X, Y, Z);
    				let rgb = `rgb(${rgbValues.r * 255}, ${rgbValues.g * 255}, ${rgbValues.b * 255})`;

    				rects.push({
    					x: x * 100 - rectStep / 2 * 100,
    					y: (1 - y) * 100 - rectStep / 2 * 100,
    					width: rectStep * 111,
    					height: rectStep * 111,
    					fill: rgb
    				});
    			}
    		}
    	}

    	function handleMousemove(event) {
    		if (mousedown) {
    			if (event.touches) {
    				event.clientX = event.touches[0].pageX;
    				event.clientY = event.touches[0].pageY;
    			}

    			let loc = cursorPoint(event);
    			dispatch("click", { x: loc.x / 100, y: 1 - loc.y / 100 });
    		}
    	}

    	let mousedown = false;

    	function handleMousedown(event) {
    		mousedown = true;
    		let loc = cursorPoint(event);
    		dispatch("click", { x: loc.x / 100, y: 1 - loc.y / 100 });
    	}

    	function handleMouseup(event) {
    		mousedown = false;
    	}

    	var pt;
    	var svg;

    	onMount(async () => {
    		// Create an SVGPoint for future math
    		pt = svg.createSVGPoint();
    	});

    	function cursorPoint(evt) {
    		pt.x = evt.clientX;
    		pt.y = evt.clientY;
    		return pt.matrixTransform(svg.getScreenCTM().inverse());
    	}

    	const writable_props = ['points'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChromaticityDiagram> was created with unknown prop '${key}'`);
    	});

    	function svg_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			svg = $$value;
    			$$invalidate(2, svg);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('points' in $$props) $$invalidate(0, points = $$props.points);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		onMount,
    		XYZtoRGB,
    		dispatch,
    		points,
    		rects,
    		rectStep,
    		handleMousemove,
    		mousedown,
    		handleMousedown,
    		handleMouseup,
    		pt,
    		svg,
    		cursorPoint
    	});

    	$$self.$inject_state = $$props => {
    		if ('points' in $$props) $$invalidate(0, points = $$props.points);
    		if ('rects' in $$props) $$invalidate(1, rects = $$props.rects);
    		if ('rectStep' in $$props) rectStep = $$props.rectStep;
    		if ('mousedown' in $$props) mousedown = $$props.mousedown;
    		if ('pt' in $$props) pt = $$props.pt;
    		if ('svg' in $$props) $$invalidate(2, svg = $$props.svg);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*points*/ 1) {
    			{
    				for (let [_, point] of Object.entries(points)) {
    					if (point.X && point.Z) {
    						point.x = point.X / (point.X + point.Y + point.Z);
    						point.y = point.Y / (point.X + point.Y + point.Z);
    					}
    				}
    			}
    		}
    	};

    	return [
    		points,
    		rects,
    		svg,
    		handleMousemove,
    		handleMousedown,
    		handleMouseup,
    		svg_1_binding
    	];
    }

    class ChromaticityDiagram extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { points: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChromaticityDiagram",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get points() {
    		throw new Error("<ChromaticityDiagram>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set points(value) {
    		throw new Error("<ChromaticityDiagram>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.47.0 */

    const { Object: Object_1, console: console_1 } = globals;
    const file = "src/App.svelte";

    // (169:12) {#if showXY}
    function create_if_block_3(ctx) {
    	let h2;
    	let t1;
    	let div;
    	let show_if = isFinite(/*x*/ ctx[9]);
    	let if_block = show_if && create_if_block_4(ctx);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Percentages";
    			t1 = space();
    			div = element("div");
    			if (if_block) if_block.c();
    			add_location(h2, file, 169, 16, 4308);
    			attr_dev(div, "id", "percentages");
    			attr_dev(div, "class", "svelte-21qvve");
    			add_location(div, file, 170, 16, 4345);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*x*/ 512) show_if = isFinite(/*x*/ ctx[9]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_4(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(169:12) {#if showXY}",
    		ctx
    	});

    	return block;
    }

    // (172:20) {#if isFinite(x)}
    function create_if_block_4(ctx) {
    	let t0;
    	let t1_value = Math.round(/*x*/ ctx[9] * 100) + "";
    	let t1;
    	let t2;
    	let t3_value = Math.round(/*y*/ ctx[10] * 100) + "";
    	let t3;
    	let t4;
    	let t5_value = Math.round(/*z*/ ctx[17] * 100) + "";
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			t0 = text("x: ");
    			t1 = text(t1_value);
    			t2 = text("%, y: ");
    			t3 = text(t3_value);
    			t4 = text("%, z: ");
    			t5 = text(t5_value);
    			t6 = text("%");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, t6, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*x*/ 512 && t1_value !== (t1_value = Math.round(/*x*/ ctx[9] * 100) + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*y*/ 1024 && t3_value !== (t3_value = Math.round(/*y*/ ctx[10] * 100) + "")) set_data_dev(t3, t3_value);
    			if (dirty[0] & /*z*/ 131072 && t5_value !== (t5_value = Math.round(/*z*/ ctx[17] * 100) + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(t6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(172:20) {#if isFinite(x)}",
    		ctx
    	});

    	return block;
    }

    // (201:12) {#if showCone || showCones}
    function create_if_block_2(ctx) {
    	let h2;
    	let t1;
    	let spectrum;
    	let updating_spectrum;
    	let updating_sum;
    	let current;

    	function spectrum_spectrum_binding_1(value) {
    		/*spectrum_spectrum_binding_1*/ ctx[29](value);
    	}

    	function spectrum_sum_binding(value) {
    		/*spectrum_sum_binding*/ ctx[30](value);
    	}

    	let spectrum_props = {
    		name: "L cones",
    		multiply: /*light*/ ctx[2]
    	};

    	if (/*lCone*/ ctx[5] !== void 0) {
    		spectrum_props.spectrum = /*lCone*/ ctx[5];
    	}

    	if (/*X*/ ctx[6] !== void 0) {
    		spectrum_props.sum = /*X*/ ctx[6];
    	}

    	spectrum = new Spectrum({ props: spectrum_props, $$inline: true });
    	binding_callbacks.push(() => bind(spectrum, 'spectrum', spectrum_spectrum_binding_1));
    	binding_callbacks.push(() => bind(spectrum, 'sum', spectrum_sum_binding));

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "X cone";
    			t1 = space();
    			create_component(spectrum.$$.fragment);
    			add_location(h2, file, 201, 16, 5463);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(spectrum, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const spectrum_changes = {};
    			if (dirty[0] & /*light*/ 4) spectrum_changes.multiply = /*light*/ ctx[2];

    			if (!updating_spectrum && dirty[0] & /*lCone*/ 32) {
    				updating_spectrum = true;
    				spectrum_changes.spectrum = /*lCone*/ ctx[5];
    				add_flush_callback(() => updating_spectrum = false);
    			}

    			if (!updating_sum && dirty[0] & /*X*/ 64) {
    				updating_sum = true;
    				spectrum_changes.sum = /*X*/ ctx[6];
    				add_flush_callback(() => updating_sum = false);
    			}

    			spectrum.$set(spectrum_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spectrum.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spectrum.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			destroy_component(spectrum, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(201:12) {#if showCone || showCones}",
    		ctx
    	});

    	return block;
    }

    // (210:12) {#if showCones}
    function create_if_block_1(ctx) {
    	let h20;
    	let t1;
    	let spectrum0;
    	let updating_spectrum;
    	let updating_sum;
    	let t2;
    	let h21;
    	let t4;
    	let spectrum1;
    	let updating_spectrum_1;
    	let updating_sum_1;
    	let current;

    	function spectrum0_spectrum_binding(value) {
    		/*spectrum0_spectrum_binding*/ ctx[31](value);
    	}

    	function spectrum0_sum_binding(value) {
    		/*spectrum0_sum_binding*/ ctx[32](value);
    	}

    	let spectrum0_props = { multiply: /*light*/ ctx[2] };

    	if (/*mCone*/ ctx[4] !== void 0) {
    		spectrum0_props.spectrum = /*mCone*/ ctx[4];
    	}

    	if (/*Y*/ ctx[7] !== void 0) {
    		spectrum0_props.sum = /*Y*/ ctx[7];
    	}

    	spectrum0 = new Spectrum({ props: spectrum0_props, $$inline: true });
    	binding_callbacks.push(() => bind(spectrum0, 'spectrum', spectrum0_spectrum_binding));
    	binding_callbacks.push(() => bind(spectrum0, 'sum', spectrum0_sum_binding));

    	function spectrum1_spectrum_binding(value) {
    		/*spectrum1_spectrum_binding*/ ctx[33](value);
    	}

    	function spectrum1_sum_binding(value) {
    		/*spectrum1_sum_binding*/ ctx[34](value);
    	}

    	let spectrum1_props = { multiply: /*light*/ ctx[2] };

    	if (/*sCone*/ ctx[3] !== void 0) {
    		spectrum1_props.spectrum = /*sCone*/ ctx[3];
    	}

    	if (/*Z*/ ctx[8] !== void 0) {
    		spectrum1_props.sum = /*Z*/ ctx[8];
    	}

    	spectrum1 = new Spectrum({ props: spectrum1_props, $$inline: true });
    	binding_callbacks.push(() => bind(spectrum1, 'spectrum', spectrum1_spectrum_binding));
    	binding_callbacks.push(() => bind(spectrum1, 'sum', spectrum1_sum_binding));

    	const block = {
    		c: function create() {
    			h20 = element("h2");
    			h20.textContent = "Y cone";
    			t1 = space();
    			create_component(spectrum0.$$.fragment);
    			t2 = space();
    			h21 = element("h2");
    			h21.textContent = "Z cone";
    			t4 = space();
    			create_component(spectrum1.$$.fragment);
    			add_location(h20, file, 210, 16, 5733);
    			add_location(h21, file, 212, 16, 5846);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h20, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(spectrum0, target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, h21, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(spectrum1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const spectrum0_changes = {};
    			if (dirty[0] & /*light*/ 4) spectrum0_changes.multiply = /*light*/ ctx[2];

    			if (!updating_spectrum && dirty[0] & /*mCone*/ 16) {
    				updating_spectrum = true;
    				spectrum0_changes.spectrum = /*mCone*/ ctx[4];
    				add_flush_callback(() => updating_spectrum = false);
    			}

    			if (!updating_sum && dirty[0] & /*Y*/ 128) {
    				updating_sum = true;
    				spectrum0_changes.sum = /*Y*/ ctx[7];
    				add_flush_callback(() => updating_sum = false);
    			}

    			spectrum0.$set(spectrum0_changes);
    			const spectrum1_changes = {};
    			if (dirty[0] & /*light*/ 4) spectrum1_changes.multiply = /*light*/ ctx[2];

    			if (!updating_spectrum_1 && dirty[0] & /*sCone*/ 8) {
    				updating_spectrum_1 = true;
    				spectrum1_changes.spectrum = /*sCone*/ ctx[3];
    				add_flush_callback(() => updating_spectrum_1 = false);
    			}

    			if (!updating_sum_1 && dirty[0] & /*Z*/ 256) {
    				updating_sum_1 = true;
    				spectrum1_changes.sum = /*Z*/ ctx[8];
    				add_flush_callback(() => updating_sum_1 = false);
    			}

    			spectrum1.$set(spectrum1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spectrum0.$$.fragment, local);
    			transition_in(spectrum1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spectrum0.$$.fragment, local);
    			transition_out(spectrum1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h20);
    			if (detaching) detach_dev(t1);
    			destroy_component(spectrum0, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(h21);
    			if (detaching) detach_dev(t4);
    			destroy_component(spectrum1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(210:12) {#if showCones}",
    		ctx
    	});

    	return block;
    }

    // (218:12) {#if showChromaticityDiagram}
    function create_if_block(ctx) {
    	let h2;
    	let t1;
    	let chromaticitydiagram;
    	let current;

    	chromaticitydiagram = new ChromaticityDiagram({
    			props: { points: /*points*/ ctx[11] },
    			$$inline: true
    		});

    	chromaticitydiagram.$on("click", /*xyClick*/ ctx[20]);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "xy chromaticity diagram";
    			t1 = space();
    			create_component(chromaticitydiagram.$$.fragment);
    			add_location(h2, file, 218, 16, 6063);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(chromaticitydiagram, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const chromaticitydiagram_changes = {};
    			if (dirty[0] & /*points*/ 2048) chromaticitydiagram_changes.points = /*points*/ ctx[11];
    			chromaticitydiagram.$set(chromaticitydiagram_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chromaticitydiagram.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chromaticitydiagram.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			destroy_component(chromaticitydiagram, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(218:12) {#if showChromaticityDiagram}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div4;
    	let div1;
    	let h20;
    	let t1;
    	let spectrum;
    	let updating_spectrum;
    	let t2;
    	let h21;
    	let t4;
    	let div0;
    	let t5;
    	let t6;
    	let h22;
    	let t8;
    	let input0;
    	let t9;
    	let input1;
    	let t10;
    	let br0;
    	let t11;
    	let input2;
    	let t12;
    	let br1;
    	let t13;
    	let input3;
    	let t14;
    	let br2;
    	let t15;
    	let input4;
    	let t16;
    	let br3;
    	let t17;
    	let input5;
    	let t18;
    	let br4;
    	let t19;
    	let button;
    	let t21;
    	let div2;
    	let t22;
    	let t23;
    	let div3;
    	let t24;
    	let div5;
    	let b;
    	let t26;
    	let a;
    	let t28;
    	let current;
    	let mounted;
    	let dispose;

    	function spectrum_spectrum_binding(value) {
    		/*spectrum_spectrum_binding*/ ctx[21](value);
    	}

    	let spectrum_props = { monoXYZ: /*monochromaticXYZ*/ ctx[12] };

    	if (/*light*/ ctx[2] !== void 0) {
    		spectrum_props.spectrum = /*light*/ ctx[2];
    	}

    	spectrum = new Spectrum({ props: spectrum_props, $$inline: true });
    	binding_callbacks.push(() => bind(spectrum, 'spectrum', spectrum_spectrum_binding));
    	let if_block0 = /*showXY*/ ctx[13] && create_if_block_3(ctx);
    	let if_block1 = (/*showCone*/ ctx[14] || /*showCones*/ ctx[15]) && create_if_block_2(ctx);
    	let if_block2 = /*showCones*/ ctx[15] && create_if_block_1(ctx);
    	let if_block3 = /*showChromaticityDiagram*/ ctx[16] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div4 = element("div");
    			div1 = element("div");
    			h20 = element("h2");
    			h20.textContent = "Light";
    			t1 = space();
    			create_component(spectrum.$$.fragment);
    			t2 = space();
    			h21 = element("h2");
    			h21.textContent = "Color perception";
    			t4 = space();
    			div0 = element("div");
    			t5 = space();
    			if (if_block0) if_block0.c();
    			t6 = space();
    			h22 = element("h2");
    			h22.textContent = "Options";
    			t8 = space();
    			input0 = element("input");
    			t9 = text("\n            cone ");
    			input1 = element("input");
    			t10 = text("\n            more cones");
    			br0 = element("br");
    			t11 = space();
    			input2 = element("input");
    			t12 = text("\n            percentages");
    			br1 = element("br");
    			t13 = space();
    			input3 = element("input");
    			t14 = text("\n            chromaticity diagram");
    			br2 = element("br");
    			t15 = space();
    			input4 = element("input");
    			t16 = text("\n            spectral locus");
    			br3 = element("br");
    			t17 = space();
    			input5 = element("input");
    			t18 = text("\n            sRGB Gamut");
    			br4 = element("br");
    			t19 = space();
    			button = element("button");
    			button.textContent = "CIE 1931 color matching functions";
    			t21 = space();
    			div2 = element("div");
    			if (if_block1) if_block1.c();
    			t22 = space();
    			if (if_block2) if_block2.c();
    			t23 = space();
    			div3 = element("div");
    			if (if_block3) if_block3.c();
    			t24 = space();
    			div5 = element("div");
    			b = element("b");
    			b.textContent = "Instruction:";
    			t26 = text(" Draw on the light spectrum to change the incoming\n        light. – Draw on the cone graphs to change them. – Draw on the\n        chromaticity diagram to create an RGB mix. – Watch the\n        ");
    			a = element("a");
    			a.textContent = "talk";
    			t28 = text(".");
    			add_location(h20, file, 164, 12, 4073);
    			add_location(h21, file, 166, 12, 4174);
    			attr_dev(div0, "id", "htmlColor");
    			set_style(div0, "background", /*htmlColor*/ ctx[18]);
    			attr_dev(div0, "class", "svelte-21qvve");
    			add_location(div0, file, 167, 12, 4212);
    			add_location(h22, file, 178, 12, 4644);
    			attr_dev(input0, "type", "checkbox");
    			add_location(input0, file, 179, 12, 4673);
    			attr_dev(input1, "type", "checkbox");
    			add_location(input1, file, 180, 17, 4740);
    			add_location(br0, file, 181, 22, 4813);
    			attr_dev(input2, "type", "checkbox");
    			add_location(input2, file, 183, 12, 4833);
    			add_location(br1, file, 184, 23, 4904);
    			attr_dev(input3, "type", "checkbox");
    			add_location(input3, file, 186, 12, 4924);
    			add_location(br2, file, 187, 32, 5021);
    			attr_dev(input4, "type", "checkbox");
    			add_location(input4, file, 189, 12, 5041);
    			add_location(br3, file, 190, 26, 5126);
    			attr_dev(input5, "type", "checkbox");
    			add_location(input5, file, 192, 12, 5146);
    			add_location(br4, file, 193, 22, 5223);
    			add_location(button, file, 195, 12, 5243);
    			attr_dev(div1, "class", "column svelte-21qvve");
    			add_location(div1, file, 163, 8, 4040);
    			attr_dev(div2, "class", "column svelte-21qvve");
    			add_location(div2, file, 199, 8, 5386);
    			attr_dev(div3, "class", "column svelte-21qvve");
    			add_location(div3, file, 216, 8, 5984);
    			attr_dev(div4, "id", "container");
    			attr_dev(div4, "class", "svelte-21qvve");
    			add_location(div4, file, 162, 4, 4011);
    			add_location(b, file, 224, 8, 6226);
    			attr_dev(a, "href", "/what-is-color/");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file, 227, 8, 6438);
    			add_location(div5, file, 223, 4, 6212);
    			attr_dev(main, "class", "svelte-21qvve");
    			add_location(main, file, 161, 0, 4000);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div4);
    			append_dev(div4, div1);
    			append_dev(div1, h20);
    			append_dev(div1, t1);
    			mount_component(spectrum, div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, h21);
    			append_dev(div1, t4);
    			append_dev(div1, div0);
    			append_dev(div1, t5);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t6);
    			append_dev(div1, h22);
    			append_dev(div1, t8);
    			append_dev(div1, input0);
    			input0.checked = /*showCone*/ ctx[14];
    			append_dev(div1, t9);
    			append_dev(div1, input1);
    			input1.checked = /*showCones*/ ctx[15];
    			append_dev(div1, t10);
    			append_dev(div1, br0);
    			append_dev(div1, t11);
    			append_dev(div1, input2);
    			input2.checked = /*showXY*/ ctx[13];
    			append_dev(div1, t12);
    			append_dev(div1, br1);
    			append_dev(div1, t13);
    			append_dev(div1, input3);
    			input3.checked = /*showChromaticityDiagram*/ ctx[16];
    			append_dev(div1, t14);
    			append_dev(div1, br2);
    			append_dev(div1, t15);
    			append_dev(div1, input4);
    			input4.checked = /*showSpectralLocus*/ ctx[0];
    			append_dev(div1, t16);
    			append_dev(div1, br3);
    			append_dev(div1, t17);
    			append_dev(div1, input5);
    			input5.checked = /*showSRGBGamut*/ ctx[1];
    			append_dev(div1, t18);
    			append_dev(div1, br4);
    			append_dev(div1, t19);
    			append_dev(div1, button);
    			append_dev(div4, t21);
    			append_dev(div4, div2);
    			if (if_block1) if_block1.m(div2, null);
    			append_dev(div2, t22);
    			if (if_block2) if_block2.m(div2, null);
    			append_dev(div4, t23);
    			append_dev(div4, div3);
    			if (if_block3) if_block3.m(div3, null);
    			append_dev(main, t24);
    			append_dev(main, div5);
    			append_dev(div5, b);
    			append_dev(div5, t26);
    			append_dev(div5, a);
    			append_dev(div5, t28);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*input0_change_handler*/ ctx[22]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[23]),
    					listen_dev(input2, "change", /*input2_change_handler*/ ctx[24]),
    					listen_dev(input3, "change", /*input3_change_handler*/ ctx[25]),
    					listen_dev(input4, "change", /*input4_change_handler*/ ctx[26]),
    					listen_dev(input5, "change", /*input5_change_handler*/ ctx[27]),
    					listen_dev(button, "click", /*click_handler*/ ctx[28], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const spectrum_changes = {};
    			if (dirty[0] & /*monochromaticXYZ*/ 4096) spectrum_changes.monoXYZ = /*monochromaticXYZ*/ ctx[12];

    			if (!updating_spectrum && dirty[0] & /*light*/ 4) {
    				updating_spectrum = true;
    				spectrum_changes.spectrum = /*light*/ ctx[2];
    				add_flush_callback(() => updating_spectrum = false);
    			}

    			spectrum.$set(spectrum_changes);

    			if (!current || dirty[0] & /*htmlColor*/ 262144) {
    				set_style(div0, "background", /*htmlColor*/ ctx[18]);
    			}

    			if (/*showXY*/ ctx[13]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					if_block0.m(div1, t6);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty[0] & /*showCone*/ 16384) {
    				input0.checked = /*showCone*/ ctx[14];
    			}

    			if (dirty[0] & /*showCones*/ 32768) {
    				input1.checked = /*showCones*/ ctx[15];
    			}

    			if (dirty[0] & /*showXY*/ 8192) {
    				input2.checked = /*showXY*/ ctx[13];
    			}

    			if (dirty[0] & /*showChromaticityDiagram*/ 65536) {
    				input3.checked = /*showChromaticityDiagram*/ ctx[16];
    			}

    			if (dirty[0] & /*showSpectralLocus*/ 1) {
    				input4.checked = /*showSpectralLocus*/ ctx[0];
    			}

    			if (dirty[0] & /*showSRGBGamut*/ 2) {
    				input5.checked = /*showSRGBGamut*/ ctx[1];
    			}

    			if (/*showCone*/ ctx[14] || /*showCones*/ ctx[15]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*showCone, showCones*/ 49152) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div2, t22);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*showCones*/ ctx[15]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*showCones*/ 32768) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div2, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*showChromaticityDiagram*/ ctx[16]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*showChromaticityDiagram*/ 65536) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div3, null);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spectrum.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spectrum.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(spectrum);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function xMatching(nm) {
    	return 1.056 * g(nm, 599.8, 37.9, 31.0) + 0.362 * g(nm, 442.0, 16.0, 26.7) - 0.065 * g(nm, 501.1, 20.4, 26.2);
    }

    function yMatching(nm) {
    	return 0.821 * g(nm, 568.8, 46.9, 40.5) + 0.286 * g(nm, 530.9, 16.3, 31.1);
    }

    function zMatching(nm) {
    	return 1.217 * g(nm, 437, 11.8, 36) + 0.681 * g(nm, 459, 26, 13.8);
    }

    function g(x, my, s1, s2) {
    	if (x < my) {
    		return Math.exp(-0.5 * (x - my) ** 2 / s1 ** 2);
    	} else {
    		return Math.exp(-0.5 * (x - my) ** 2 / s2 ** 2);
    	}
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let showXY = true;
    	let showCone = true;
    	let showCones = true;
    	let showChromaticityDiagram = true;
    	let showSpectralLocus = true;
    	let showSRGBGamut = true;
    	let nmStep = 10;
    	let minNm = 380;
    	let maxNm = 780;
    	let light;
    	let sCone, mCone, lCone;
    	let X = 0, Y = 0, Z = 0;
    	let x = 0, y = 0, z = 0;
    	let htmlColor = "";
    	let points = {};

    	function addCIEColorMatching() {
    		for (let i = minNm; i <= maxNm; i += nmStep) {
    			$$invalidate(5, lCone[i] = xMatching(i), lCone);
    			$$invalidate(4, mCone[i] = yMatching(i), mCone);
    			$$invalidate(3, sCone[i] = zMatching(i), sCone);
    		}
    	}

    	let monochromaticXYZ;

    	function xyClick(event) {
    		let x = event.detail.x;
    		let y = event.detail.y;
    		let Y = 0.5;

    		// x = x / (X + Y + Z)
    		// y = y / (X + Y + Z)
    		// z = 1 - x - y = z / (X + Y + Z)
    		let X = Y / y * x;

    		let Z = Y / y * (1 - x - y);
    		let rgb = XYZtoRGB(X, Y, Z);
    		console.log(rgb);
    		let r = 630;
    		let g = 530;
    		let b = 460;

    		for (let i = minNm; i <= maxNm; i += nmStep) {
    			let intensity = 0;

    			if (i == r) {
    				intensity = Math.max(rgb.r, 0);
    			} else if (i == g) {
    				intensity = Math.max(rgb.g, 0);
    			} else if (i == b) {
    				intensity = Math.max(rgb.b, 0);
    			}

    			$$invalidate(2, light[i] = intensity, light);
    		}
    	}

    	onMount(() => {
    		addCIEColorMatching();
    	});

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function spectrum_spectrum_binding(value) {
    		light = value;
    		((($$invalidate(2, light), $$invalidate(5, lCone)), $$invalidate(4, mCone)), $$invalidate(3, sCone));
    	}

    	function input0_change_handler() {
    		showCone = this.checked;
    		$$invalidate(14, showCone);
    	}

    	function input1_change_handler() {
    		showCones = this.checked;
    		$$invalidate(15, showCones);
    	}

    	function input2_change_handler() {
    		showXY = this.checked;
    		$$invalidate(13, showXY);
    	}

    	function input3_change_handler() {
    		showChromaticityDiagram = this.checked;
    		$$invalidate(16, showChromaticityDiagram);
    	}

    	function input4_change_handler() {
    		showSpectralLocus = this.checked;
    		$$invalidate(0, showSpectralLocus);
    	}

    	function input5_change_handler() {
    		showSRGBGamut = this.checked;
    		$$invalidate(1, showSRGBGamut);
    	}

    	const click_handler = () => addCIEColorMatching();

    	function spectrum_spectrum_binding_1(value) {
    		lCone = value;
    		$$invalidate(5, lCone);
    	}

    	function spectrum_sum_binding(value) {
    		X = value;
    		$$invalidate(6, X);
    	}

    	function spectrum0_spectrum_binding(value) {
    		mCone = value;
    		$$invalidate(4, mCone);
    	}

    	function spectrum0_sum_binding(value) {
    		Y = value;
    		$$invalidate(7, Y);
    	}

    	function spectrum1_spectrum_binding(value) {
    		sCone = value;
    		$$invalidate(3, sCone);
    	}

    	function spectrum1_sum_binding(value) {
    		Z = value;
    		$$invalidate(8, Z);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		Spectrum,
    		ChromaticityDiagram,
    		XYZtoRGB,
    		showXY,
    		showCone,
    		showCones,
    		showChromaticityDiagram,
    		showSpectralLocus,
    		showSRGBGamut,
    		nmStep,
    		minNm,
    		maxNm,
    		light,
    		sCone,
    		mCone,
    		lCone,
    		X,
    		Y,
    		Z,
    		x,
    		y,
    		z,
    		htmlColor,
    		points,
    		addCIEColorMatching,
    		xMatching,
    		yMatching,
    		zMatching,
    		g,
    		monochromaticXYZ,
    		xyClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('showXY' in $$props) $$invalidate(13, showXY = $$props.showXY);
    		if ('showCone' in $$props) $$invalidate(14, showCone = $$props.showCone);
    		if ('showCones' in $$props) $$invalidate(15, showCones = $$props.showCones);
    		if ('showChromaticityDiagram' in $$props) $$invalidate(16, showChromaticityDiagram = $$props.showChromaticityDiagram);
    		if ('showSpectralLocus' in $$props) $$invalidate(0, showSpectralLocus = $$props.showSpectralLocus);
    		if ('showSRGBGamut' in $$props) $$invalidate(1, showSRGBGamut = $$props.showSRGBGamut);
    		if ('nmStep' in $$props) $$invalidate(35, nmStep = $$props.nmStep);
    		if ('minNm' in $$props) minNm = $$props.minNm;
    		if ('maxNm' in $$props) maxNm = $$props.maxNm;
    		if ('light' in $$props) $$invalidate(2, light = $$props.light);
    		if ('sCone' in $$props) $$invalidate(3, sCone = $$props.sCone);
    		if ('mCone' in $$props) $$invalidate(4, mCone = $$props.mCone);
    		if ('lCone' in $$props) $$invalidate(5, lCone = $$props.lCone);
    		if ('X' in $$props) $$invalidate(6, X = $$props.X);
    		if ('Y' in $$props) $$invalidate(7, Y = $$props.Y);
    		if ('Z' in $$props) $$invalidate(8, Z = $$props.Z);
    		if ('x' in $$props) $$invalidate(9, x = $$props.x);
    		if ('y' in $$props) $$invalidate(10, y = $$props.y);
    		if ('z' in $$props) $$invalidate(17, z = $$props.z);
    		if ('htmlColor' in $$props) $$invalidate(18, htmlColor = $$props.htmlColor);
    		if ('points' in $$props) $$invalidate(11, points = $$props.points);
    		if ('monochromaticXYZ' in $$props) $$invalidate(12, monochromaticXYZ = $$props.monochromaticXYZ);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*X, Y, Z, y, x*/ 1984) {
    			{
    				$$invalidate(9, x = X / (X + Y + Z));
    				$$invalidate(10, y = Y / (X + Y + Z));
    				$$invalidate(17, z = Z / (X + Y + Z));
    				let rgbValues = XYZtoRGB(X, Y, Z);
    				$$invalidate(18, htmlColor = `rgb(${Math.round(rgbValues.r * 255)}, ${Math.round(rgbValues.g * 255)}, ${Math.round(rgbValues.b * 255)})`);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*showSRGBGamut, points*/ 2050) {
    			{
    				if (showSRGBGamut) {
    					$$invalidate(11, points["sRGB R"] = { x: 0.64, y: 0.33, Y: 0.2126 }, points);
    					$$invalidate(11, points["sRGB G"] = { x: 0.3, y: 0.6, Y: 0.7152 }, points);
    					$$invalidate(11, points["sRGB B"] = { x: 0.15, y: 0.06, Y: 0.0722 }, points);
    					$$invalidate(11, points["sRGB W"] = { x: 0.3127, y: 0.329, Y: 1 }, points);
    				} else {
    					$$invalidate(11, points = Object.fromEntries(Object.entries(points).filter(([k, v]) => k.substring(0, 4) !== "sRGB")));
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*X, Y, Z*/ 448) {
    			{
    				$$invalidate(11, points["light"] = { X, Y, Z }, points);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*lCone, mCone, sCone, light*/ 60) {
    			{
    				if (lCone && mCone && sCone) {
    					$$invalidate(12, monochromaticXYZ = nm => {
    						return { X: lCone[nm], Y: mCone[nm], Z: sCone[nm] };
    					});

    					((($$invalidate(2, light), $$invalidate(5, lCone)), $$invalidate(4, mCone)), $$invalidate(3, sCone));
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*sCone, showSpectralLocus, monochromaticXYZ, points*/ 6153) {
    			{
    				if (sCone) {
    					for (let i = 450; i <= 630; i += nmStep) {
    						if (showSpectralLocus) {
    							$$invalidate(11, points[`${i} nm`] = monochromaticXYZ(i), points);
    						} else {
    							$$invalidate(11, points = Object.fromEntries(Object.entries(points).filter(([k, v]) => k !== `${i} nm`)));
    						}
    					}
    				}
    			}
    		}
    	};

    	return [
    		showSpectralLocus,
    		showSRGBGamut,
    		light,
    		sCone,
    		mCone,
    		lCone,
    		X,
    		Y,
    		Z,
    		x,
    		y,
    		points,
    		monochromaticXYZ,
    		showXY,
    		showCone,
    		showCones,
    		showChromaticityDiagram,
    		z,
    		htmlColor,
    		addCIEColorMatching,
    		xyClick,
    		spectrum_spectrum_binding,
    		input0_change_handler,
    		input1_change_handler,
    		input2_change_handler,
    		input3_change_handler,
    		input4_change_handler,
    		input5_change_handler,
    		click_handler,
    		spectrum_spectrum_binding_1,
    		spectrum_sum_binding,
    		spectrum0_spectrum_binding,
    		spectrum0_sum_binding,
    		spectrum1_spectrum_binding,
    		spectrum1_sum_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
