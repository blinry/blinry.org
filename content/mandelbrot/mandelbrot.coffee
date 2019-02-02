Number.prototype.mod = (n) ->
    ((this%n)+n)%n

class Images
    @images = []
    @load: (filenames) ->
        @assetsToLoad = filenames.length
        for f in filenames
            i = new Image()
            i.onload = =>
                @assetsToLoad--
                if @assetsToLoad == 0
                    @onload()

            i.src = "./images/"+f
            @images[f] = i
    @get: (filename) ->
        return @images[filename]

class Complex
    constructor: (@r, @i) ->
        # nop
    string: ->
        ret = ""+@r.toFixed(1)
        if @i >= 0
            ret += "+"
        ret += @i.toFixed(1)+"i"
    dup: ->
        new Complex(@r, @i)
    pow: (exp) ->
        if exp == 2
            new Complex(@r*@r-@i*@i, 2*@r*@i)
        else if exp == 3
            new Complex(@r*@r*@r-3*@r*@i*@i, 3*@r*@r*@i-@i*@i*@i)
        else
            tmp = Math.pow(@r*@r+@i*@i, exp/2)
            arg = Math.atan2(@i, @r)
            new Complex(tmp*Math.cos(exp*arg), tmp*Math.sin(exp*arg))
    add: (complex) ->
        new Complex(@r+complex.r, @i+complex.i)
    sub: (complex) ->
        new Complex(@r-complex.r, @i-complex.i)
    div: (scalar) ->
        new Complex(@r/scalar, @i/scalar)
    mul: (scalar) ->
        new Complex(@r*scalar, @i*scalar)
    length2: ->
        @r*@r + @i*@i

class Marker
    constructor: (@pos, @name, @color) ->
        @draggable = false

        # image offset drawn on pos
        @ox = Images.get(@name).width/2
        @oy = Images.get(@name).height/2
        # image offset defining dragging center
        @dx = Images.get(@name).width/2
        @dy = Images.get(@name).height/2
        # nop

class Mandelbrot
    constructor: (@exp=2) ->
        # nop
    step: (z, c) ->
        #z2 = z.dup()
        #z2.i = Math.abs(z2.i)
        #z2.r = Math.abs(z2.r)
        #z2.pow(@exp).add(c)
        z.pow(@exp).add(c)
    abort: (z) ->
        z.r*z.r+z.i*z.i > 4
    iterate: (c, steps=3) ->
        z = new Complex(0,0)

        if @exp == 2
            # are we in the cardioid or the period-2 bulb?
            q = (c.r-0.25)*(c.r-0.25) + c.i*c.i
            if q*(q+(c.r-0.25)) < 0.25*c.i*c.i
                return -1

        if steps > 0
            for i in [0..steps-1]
                z = @step(z, c)
                if @abort(z)
                    return i
        return -1

class BurningShip
    constructor: (@exp=2) ->
        # nop
    step: (z, c) ->
        z2 = z.dup()
        z2.i = Math.abs(z2.i)
        z2.r = Math.abs(z2.r)
        z2.pow(@exp).add(c)
    abort: (z) ->
        z.r*z.r+z.i*z.i > 4
    iterate: (c, steps=3) ->
        z = new Complex(0,0)

        if steps > 0
            for i in [0..steps-1]
                z = @step(z, c)
                if @abort(z)
                    return i
        return -1

class Tricorn
    constructor: (@exp=2) ->
        # nop
    step: (z, c) ->
        z2 = z.dup()
        z2.i *= -1
        z2.pow(@exp).add(c)
    abort: (z) ->
        z.r*z.r+z.i*z.i > 4
    iterate: (c, steps=3) ->
        z = new Complex(0,0)

        if steps > 0
            for i in [0..steps-1]
                z = @step(z, c)
                if @abort(z)
                    return i
        return -1

class Steps
    step: (z, c) ->
        @squareNext = not @squareNext
        if @squareNext
            z.add(c)
        else
            z.pow(2)
    abort: (z) ->
        false
    iterate: (c, steps=0) ->
        z = new Complex(0,0)
        @squareNext = false

        for i in [0..steps*2]
            z = @step(z, c)
        return -1

class Color
    constructor: (@h,@s,@l,@a) ->
        # nop
    @rand: -> new Color rand(0, 360), 100, rand(20, 40), 0.8
    string: -> "hsla("+@h+","+@s+"%,"+@l+"%,"+@a+")"
    rgba: ->
        h = @h/360
        s = @s/100
        l = @l/100
        if s == 0
            rr = g = b = l #achromatic
        else
            q = if l < 0.5 then l * (1 + s) else l + s - l * s
            p = 2 * l - q
            rr = @hue2rgb(p, q, h + 1/3)
            g = @hue2rgb(p, q, h)
            b = @hue2rgb(p, q, h - 1/3)
        return [Math.round(rr * 255), Math.round(g * 255), Math.round(b * 255), Math.round(@a * 255)]
    hue2rgb: (p, q, t) ->
        t += 1 if t < 0
        t -= 1 if t > 1
        return p + (q - p) * 6 * t if t < 1/6
        return q if t < 1/2
        return p + (q - p) * (2/3 - t) * 6 if t < 2/3
        return p

    gray: -> new Color @h, 0, @l, @a

class Palette
    constructor: (@name="rainbow") ->
        # nop
    color: (i) ->
        if i == -1
            if @name == "slider"
                return new Color(0, 0, 80, 1)
            else
                return new Color(0, 0, 0, 1)
        switch @name
            when "gray"
                return new Color(0, 0, (i*2).mod(360), 1)
            when "rainbow"
                return new Color((i*4).mod(360), 80, 60, 1)
            when "bw"
                return new Color(0, 100, 100, 1)
            when "slider"
                return new Color(0, 0, 70, 1)
            when "zebra"
                return new Color(i.mod(2)*180+90, 100, 40, 1)
            when "colordemo"
                return new Color((i*50).mod(360), 80, 60, 1)

class Canvas
    constructor: ->
        @width = 500
        @height = 500
        @flip = false

        @drawFractal = true
        @drawAxes = true
        @drawIteration = true
        @drawSlider = false
        @restrictToReal = false

        @depth = undefined
        @maxDepth = 100
        @fractal = new Mandelbrot()
        @palette = new Palette("slider")
        @traceSize = 10

        @zoomControls = false
        @stepControls = false

        @zoomHook = ->
            # nop
        @updateHook = ->
            # nop
    init: (id) ->
        if @depth == undefined
            @depth = @maxDepth
        div = document.getElementById(id)
        #instructions = document.createElement("p")
        #instructions.innerHTML = "Do stuff!"
        topControls = document.createElement("div")
        topControls.setAttribute("class", "controls")
        bottomControls = topControls.cloneNode()
        layers = document.createElement("div")
        layers.setAttribute("class", "layers")
        @bgCanvas = document.createElement("canvas")
        @bgCanvas.width = @width
        @bgCanvas.height = @height
        @fgCanvas = @bgCanvas.cloneNode()

        resetButton = document.createElement("button")
        resetButton.innerHTML = "Reset zoom"
        resetButton.onclick = =>
            @zoomReset()

        zoomInButton = document.createElement("button")
        zoomInButton.innerHTML = "+"
        zoomInButton.onclick = =>
            @zoomIn(@flag.pos)

        zoomOutButton = document.createElement("button")
        zoomOutButton.innerHTML = "-"
        zoomOutButton.onclick = =>
            @zoomOut(@flag.pos)

        stepCounter = document.createElement("span")
        stepCounter.innerHTML = "Step "+@depth+"/"+@maxDepth

        timeSlider = document.createElement("input")
        timeSlider.setAttribute("type", "range")
        timeSlider.setAttribute("min", "0")
        timeSlider.setAttribute("max", @maxDepth)
        if @halfSteps
            timeSlider.setAttribute("step", 0.5)
        timeSlider.setAttribute("value", @depth)
        timeSlider.setAttribute("style", "width: "+@width+"px")
        timeSlider.oninput = =>
            # the first half-step does nothing
            if timeSlider.value == "0.5"
                timeSlider.value = "0"
            @depth = parseFloat(timeSlider.value)
            stepCounter.innerHTML = "Step "+@depth+"/"+@maxDepth
            @draw()
            @updateHook()
        timeSlider.onchange = =>
            @draw(true)

        sliderCanvas = document.createElement("canvas")
        sliderCanvas.setAttribute("width", @width)
        sliderCanvas.setAttribute("height", 40)
        sliderCanvas.setAttribute("style", "width: "+@width+" height: "+20+" ")
        #@sliderMouseDown = false
        #sliderCanvas.onmousedown = (event) =>
        #    @sliderMouseDown = true
        #sliderCanvas.onmouseup = (event) =>
        #    @sliderMouseDown = false
        #sliderCanvas.onmouseleave = (event) =>
        #    @sliderMouseDown = false
        #sliderCanvas.onmousemove = (event) =>
        #    if @sliderMouseDown
        #        rect = sliderCanvas.getBoundingClientRect()
        #        x = event.clientX-rect.left
        #        @depth = Math.round(2*x/@width*@maxDepth)/2
        #        stepCounter.innerHTML = "Step "+@depth+"/"+@maxDepth
        #        @draw(true)
        #        @updateHook()

        #div.appendChild(instructions)
        div.appendChild(topControls)
        div.appendChild(layers)
        div.appendChild(bottomControls)
        if @zoomControls
            topControls.appendChild(resetButton)
            #topControls.appendChild(zoomInButton)
            #topControls.appendChild(zoomOutButton)
        if @stepControls
            bottomControls.appendChild(timeSlider)
        if @drawSlider
            bottomControls.appendChild(sliderCanvas)
        if @stepControls
            bottomControls.appendChild(stepCounter)
        layers.appendChild(@bgCanvas)
        layers.appendChild(@fgCanvas)

        @bg = @bgCanvas.getContext("2d")
        @fg = @fgCanvas.getContext("2d")
        @slider = sliderCanvas.getContext("2d")

        @data = @bg.getImageData(0, 0, @width, @height)

        @mouse = new Complex(0,0)

        # markers
        @flag = new Marker(new Complex(0.36,-0.36), "flag.png", new Color(90, 80, 50, 1))
        if @restrictToReal
            @flag.pos.i = 0
        @flag.draggable = true
        @flag.ox = 2
        @flag.oy = Images.get("flag.png").height-2
        @flag.dx = Images.get("flag.png").width/2
        @flag.dy = Images.get("flag.png").height/4
        @bunny = new Marker(new Complex(0,0), "bunny.png", new Color(180, 80, 50, 1))
        @markers = [@bunny, @flag]

        @dragging = undefined

        @mousedown = false
        @fgCanvas.onmousedown = (event) =>
            if event.which == 1 # left
                @mousedown = true
                rect = @fgCanvas.getBoundingClientRect()
                @mouse = @toWorld(event.clientX-rect.left, event.clientY-rect.top)

                if @drawIteration
                    for marker in @markers
                        if marker.draggable
                            if @mouseOverMarker(marker)
                                @dragging = marker
                                @fgCanvas.style.cursor = "move"

                @draw()
            else if event.which == 2 # middle
                rect = @fgCanvas.getBoundingClientRect()
                @mouse = @toWorld(event.clientX-rect.left, event.clientY-rect.top)
                @draw()
            return false

        @fgCanvas.onmouseup = (event) =>
            if event.which == 1 # left
                @mousedown = false
                if @dragging
                    @dragging = undefined
                else if @zoomControls
                    @zoomIn(@mouse)
                @fgCanvas.style.cursor = "auto"
            else if event.which == 2 # middle
                if @zoomControls
                    @zoomOut(@mouse)

        @fgCanvas.onmouseleave = (event) =>
            @mousedown = false
            @dragging = undefined

        @fgCanvas.onmousemove = (event) =>
            rect = @fgCanvas.getBoundingClientRect()
            @mouse = @toWorld(event.clientX-rect.left, event.clientY-rect.top)
            if @drawIteration
                if @dragging
                    offset = new Complex((-@dragging.dx+@dragging.ox)/@zoom, -(-@dragging.dy+@dragging.oy)/@zoom)
                    if @flip
                        offset.i *= -1
                    @dragging.pos = @mouse.add(offset)
                    if @restrictToReal
                        @dragging.pos.i = 0

                    @updateHook()
                else
                    for marker in @markers
                        if marker.draggable
                            if @mouseOverMarker(marker)
                                @fgCanvas.style.cursor = "pointer"
                            else
                                @fgCanvas.style.cursor = "auto"
            if @drawTrace and @dragging
                for dx in [-@traceSize..@traceSize]
                    for dy in [-@traceSize..@traceSize]
                        if dx*dx+dy*dy <= @traceSize*@traceSize
                            [x, y] = @fromWorld(@flag.pos)
                            xx = x+dx
                            yy = y+dy
                            xx = Math.floor(xx)
                            yy = Math.floor(yy)
                            if xx >= 0 and xx < @width and yy >= 0 and yy < @height
                                offset = (@width*yy+xx)*4
                                cc = @toWorld(xx, yy)
                                i = @fractal.iterate(cc, @depth)
                                col = @palette.color(i)
                                [r,g,b,a] = col.rgba()
                                @data.data[offset++] = r
                                @data.data[offset++] = g
                                @data.data[offset++] = b
                                @data.data[offset++] = a
                @bg.putImageData(@data, 0, 0)
            @draw()

        touchHandler = (event) =>
            touches = event.changedTouches
            first = touches[0]
            type = ""
            switch event.type
                when "touchstart"
                    type = "mousedown"
                when "touchmove"
                    type = "mousemove"
                when "touchend"
                    type = "mouseup"
                else
                    return

            # initMouseEvent(type, canBubble, cancelable, view, clickCount, 
            #                screenX, screenY, clientX, clientY, ctrlKey, 
            #                altKey, shiftKey, metaKey, button, relatedTarget);

            simulatedEvent = document.createEvent("MouseEvent")
            simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                          first.screenX, first.screenY,
                                          first.clientX, first.clientY, false,
                                          false, false, false, 0, null)

            first.target.dispatchEvent(simulatedEvent)
            event.preventDefault()

        @fgCanvas.ontouchstart = touchHandler
        @fgCanvas.ontouchmove = touchHandler
        @fgCanvas.ontouchend = touchHandler
        @fgCanvas.ontouchcancel = touchHandler

        @zoomReset()

    toWorld: (x, y) ->
        r = (x-@width/2)/@zoom+@center.r
        if @flip
            i = (y-@height/2)/@zoom+@center.i
        else
            i = -(y-@height/2)/@zoom+@center.i
        new Complex(r, i)
    fromWorld: (c) ->
        x = (c.r-@center.r)*@zoom+@width/2
        if @flip
            y = (c.i-@center.i)*@zoom+@height/2
        else
            y = -(c.i-@center.i)*@zoom+@height/2
        return [x, y]
    toMinimap: (x, y) ->
        r = (x-@width/(4*2))/(@width/(4.2*4))
        if @flip
            i = (y-@height/(4*2))/(@height/(4.2*4))
        else
            i = -(y-@height/(4*2))/(@height/(4.2*4))
        new Complex(r, i)
    fromMinimap: (c) ->
        x = c.r*(@width/(4.2*4))+@width/(4*2)
        if @flip
            y = c.i*(@height/(4.2*4))+@height/(4*2)
        else
            y = -c.i*(@height/(4.2*4))+@height/(4*2)
        return [x, y]
    mouseOverMarker: (marker) ->
        [x, y] = @fromWorld(marker.pos)
        [mx, my] = @fromWorld(@mouse)
        x = x+marker.dx-marker.ox
        y = y+marker.dy-marker.oy
        return Math.pow(x-mx, 2) + Math.pow(y-my, 2) < Math.pow(25, 2)
    zoomIn: (c) ->
        @zoom *= 2
        @zoomCount++
        @center = @center.add(c).div(2)
        @draw(true)
        @zoomHook(@zoomCount)
        @updateHook()
    zoomOut: (c) ->
        @zoom /= 2
        @zoomCount--
        @center = @center.mul(2).sub(c)
        @draw(true)
        @zoomHook(@zoomCount)
        @updateHook()
    zoomReset: ->
        @zoom = @width/4.2
        @center = new Complex(0, 0)
        @draw(true)
        @zoomCount = 0
        @zoomHook(@zoomCount)
        @updateHook()
    clearBg: ->
        @bg.clearRect 0, 0, @width, @height
        #@data = @bg.getImageData(0, 0, @width, @height)
    clearFg: ->
        @fg.clearRect 0, 0, @width, @height
    #drawReal: ->
    #    @clearFg()

    #    [ox, oy] = @fromWorld(new Complex(0,0))
    #    [x1, y1] = @fromWorld(new Complex(-2,0))
    #    [x2, y2] = @fromWorld(new Complex(2,0))
    #    [mx, my] = @fromWorld(@mouse)

    #    @fg.lineWidth = 1
    #    @fg.strokeStyle = "black"

    #    @fg.beginPath()
    #    @fg.moveTo(x1, oy)
    #    @fg.lineTo(x2, oy)
    #    @fg.stroke()

    #    @fg.lineWidth = 5
    #    @fg.strokeStyle = "red"

    #    @fg.beginPath()
    #    @fg.moveTo(ox, oy)
    #    @fg.lineTo(mx, oy)
    #    @fg.stroke()

    #    @fg.textAlign = "center"
    #    @fg.font = "20px sans-serif"
    #    @fg.fillStyle = "red"
    #    @fg.fillText(@mouse.r.toFixed(2), (mx+ox)/2, oy-5)
    #drawComplex: ->
    #    @fg.clearRect 0, 0, @width, @height

    #    [ox, oy] = @fromWorld(new Complex(0,0))
    #    [mx, my] = @fromWorld(@mouse)

    #    @fg.lineWidth = 5

    #    @fg.strokeStyle = "black"
    #    @fg.beginPath()
    #    @fg.moveTo(ox, oy)
    #    @fg.lineTo(mx, my)
    #    @fg.stroke()

    #    @fg.lineWidth = 2
    #    @fg.strokeStyle = "red"
    #    @fg.setLineDash([5, 5])

    #    @fg.beginPath()
    #    @fg.moveTo(ox, my)
    #    @fg.lineTo(mx, my)
    #    @fg.stroke()

    #    @fg.strokeStyle = "blue"

    #    @fg.beginPath()
    #    @fg.moveTo(mx, oy)
    #    @fg.lineTo(mx, my)
    #    @fg.stroke()

    #    @fg.setLineDash([])

    #    @fg.textAlign = "center"
    #    @fg.font = "20px sans-serif"
    #    text = @mouse.r
    #    @fg.fillStyle = "red"
    #    @fg.fillText(@mouse.r.toFixed(2), (mx+ox)/2, my-5)

    #    @fg.fillStyle = "blue"
    #    @fg.textAlign = "left"
    #    @fg.fillText(@mouse.i.toFixed(2)+" i", mx+5, (my+ox)/2+5)

    #    #@fg.fillText(text, mx+5, my-5)
    #    #@fg.fillStyle = "black"
    #    #offset = @fg.measureText(text).width
    #    #if @mouse.i >= 0
    #    #    text = "+"
    #    #else
    #    #    text = "-"
    #    #@fg.fillText(text, mx+5+offset, my-5)
    #    #@fg.fillStyle = "blue"
    #    #offset2 = @fg.measureText(text).width
    #    #text = @mouse.i+"i"
    #    #@fg.fillText(text, mx+5+offset+offset2, my-5)
    #drawSquare: ->
    #    @fg.clearRect 0, 0, @width, @height

    #    [ox, oy] = @fromWorld(new Complex(0,0))
    #    [mx, my] = @fromWorld(@mouse)
    #    [mx2, my2] = @fromWorld(@mouse.pow(2))

    #    @fg.beginPath()
    #    @fg.arc(ox, oy, 1*@zoom, 0, 2*Math.PI, false)
    #    @fg.stroke()
    #    @fg.beginPath()
    #    @fg.arc(ox, oy, 2*@zoom, 0, 2*Math.PI, false)
    #    @fg.stroke()

    #    @fg.lineWidth = 5
    #    @fg.strokeStyle = "black"

    #    @fg.beginPath()
    #    @fg.moveTo(ox, ox)
    #    @fg.lineTo(mx, my)
    #    @fg.stroke()

    #    @fg.beginPath()
    #    @fg.moveTo(ox, ox)
    #    @fg.lineTo(mx2, my2)
    #    @fg.stroke()

    #    @fg.textAlign = "left"
    #    @fg.font = "20px sans-serif"
    #    @fg.fillStyle = "black"
    #    @fg.fillText("c", mx+5, my-5)

    #    @fg.textAlign = "left"
    #    @fg.font = "20px sans-serif"
    #    @fg.fillStyle = "black"
    #    @fg.fillText("c^2", mx2+5, my2-5)
    #drawStep: ->
    #    @fg.clearRect 0, 0, @width, @height

    #    [ox, oy] = @fromWorld(new Complex(0,0))

    #    [mx, my] = @fromWorld(@mouse)
    #    [mx2, my2] = @fromWorld(@mouse.pow(2))
    #    [mx3, my3] = @fromWorld(@mouse.pow(2).add(@mouse))

    #    @fg.lineWidth = 5
    #    @fg.strokeStyle = "black"

    #    @fg.beginPath()
    #    @fg.moveTo(ox, ox)
    #    @fg.lineTo(mx, my)
    #    @fg.stroke()

    #    @fg.beginPath()
    #    @fg.moveTo(ox, ox)
    #    @fg.lineTo(mx2, my2)
    #    @fg.stroke()

    #    @fg.beginPath()
    #    @fg.moveTo(mx2, my2)
    #    @fg.lineTo(mx3, my3)
    #    @fg.stroke()

    #    @fg.textAlign = "left"
    #    @fg.font = "20px sans-serif"
    #    @fg.fillStyle = "black"
    #    @fg.fillText("c", mx+5, my-5)

    #    @fg.textAlign = "left"
    #    @fg.font = "20px sans-serif"
    #    @fg.fillStyle = "black"
    #    @fg.fillText("c^2", mx2+5, my2-5)

    #    @fg.textAlign = "left"
    #    @fg.font = "20px sans-serif"
    #    @fg.fillStyle = "black"
    #    @fg.fillText("c^2+c", mx3+5, my3-5)

    #drawBorder: ->
    #    @fg.lineWidth = 20
    #    @fg.strokeStyle = @palette.color(@fractal.iterate(@mouse, 20)).string()
    #    [x1, y1] = @fromWorld(new Complex(-2,-2))
    #    [x2, y2] = @fromWorld(new Complex(2,2))

    #    @fg.beginPath()
    #    @fg.moveTo(x1, y1)
    #    @fg.lineTo(x2, y1)
    #    @fg.lineTo(x2, y2)
    #    @fg.lineTo(x1, y2)
    #    @fg.lineTo(x1, y1)
    #    #@fg.arc(ox, oy, @zoom*2+@fg.lineWidth/2, 0, 2*Math.PI, false)
    #    @fg.stroke()

    draw: (drawBg=false) ->
        if drawBg and @drawFractal
            @clearBg()
            offset = 0
            for y in [0..@height-1]
                for x in [0..@width-1]
                    c = @toWorld(x, y)
                    #[r,g,b,a] = @palette.color(@fractal.iterate(c, 20*Math.log2(@zoom))).rgba()
                    [r,g,b,a] = @palette.color(@fractal.iterate(c, @depth)).rgba()
                    @data.data[offset++] = r
                    @data.data[offset++] = g
                    @data.data[offset++] = b
                    @data.data[offset++] = a
            if @zoomControls
                for y in [0..@height/4-1]
                    for x in [0..@width/4-1]
                        c = @toMinimap(x, y)#new Complex(x/(@width/4)*4-2, y/(@height/4)*4-2)
                        [r,g,b,a] = @palette.color(@fractal.iterate(c, @depth)).rgba()
                        offset = (y*@width+x)*4
                        @data.data[offset++] = r
                        @data.data[offset++] = g
                        @data.data[offset++] = b
                        @data.data[offset++] = a
            @bg.putImageData(@data, 0, 0)
            if @zoomControls
                [x1, y1] = @fromMinimap(@toWorld(0, 0))
                [x2, y2] = @fromMinimap(@toWorld(@width, @height))
                @bg.strokeStyle = "white"
                @bg.beginPath()
                if (x2-x1) < 8
                    x1 = (x1+x2)/2
                    y1 = (y1+y2)/2
                    @bg.moveTo(x1-10, y1)
                    @bg.lineTo(x1+10, y1)
                    @bg.moveTo(x1, y1-10)
                    @bg.lineTo(x1, y1+10)
                else
                    @bg.rect(x1, y1, (x2-x1), (y2-y1))
                @bg.stroke()
        @clearFg()
        if @drawAxes
            [ox, oy] = @fromWorld(new Complex(0,0))
            [x1, y1] = @fromWorld(new Complex(-2,-2))
            [x2, y2] = @fromWorld(new Complex(2,2))
            [x3, y3] = @fromWorld(new Complex(-1,-1))
            [x4, y4] = @fromWorld(new Complex(1,1))

            @fg.lineWidth = 1
            @fg.strokeStyle = "black"

            @fg.beginPath()
            @fg.moveTo(x1, oy)
            @fg.lineTo(x2, oy)
            @fg.stroke()

            @fg.beginPath()
            @fg.moveTo(ox, y1)
            @fg.lineTo(ox, y2)
            @fg.stroke()

            @fg.strokeStyle = "#666"
            @fg.setLineDash([5, 5])

            #@fg.beginPath()
            #@fg.arc(ox, oy, @zoom, 0, 2*Math.PI, false)
            #@fg.stroke()

            @fg.beginPath()
            @fg.arc(ox, oy, @zoom*2, 0, 2*Math.PI, false)
            @fg.stroke()

            #@fg.beginPath()
            #@fg.moveTo(x3, y1)
            #@fg.lineTo(x3, y2)
            #@fg.stroke()

            #@fg.beginPath()
            #@fg.moveTo(x4, y1)
            #@fg.lineTo(x4, y2)
            #@fg.stroke()

            #@fg.beginPath()
            #@fg.moveTo(x1, y3)
            #@fg.lineTo(x2, y3)
            #@fg.stroke()

            #@fg.beginPath()
            #@fg.moveTo(x1, y4)
            #@fg.lineTo(x2, y4)
            #@fg.stroke()

            @fg.setLineDash([])

            @fg.textAlign = "center"
            @fg.font = "20px sans-serif"
            @fg.fillStyle = "black"

            [x, y] = @fromWorld(new Complex(-2,0))
            @fg.fillText("-2", x, y+20)
            [x, y] = @fromWorld(new Complex(-1,0))
            @fg.fillText("-1", x, y+20)
            [x, y] = @fromWorld(new Complex(1,0))
            @fg.fillText("1", x, y+20)
            [x, y] = @fromWorld(new Complex(2,0))
            @fg.fillText("2", x, y+20)

            @fg.textAlign = "right"

            [x, y] = @fromWorld(new Complex(0,-2))
            @fg.fillText("-2", x-5, y+8)
            [x, y] = @fromWorld(new Complex(0,-1))
            @fg.fillText("-1", x-5, y+8)
            [x, y] = @fromWorld(new Complex(0,1))
            @fg.fillText("1", x-5, y+8)
            [x, y] = @fromWorld(new Complex(0,2))
            @fg.fillText("2", x-5, y+8)
        if @drawIteration
            @fg.strokeStyle = "blue"
            @fg.lineWidth = 0.5
            @fg.fillStyle = "blue"

            c = @flag.pos
            @bunny.pos = new Complex(0, 0)
            @fractal.squareNext = true

            if @depth > 0
                stepCount = @depth
                if @halfSteps
                    stepCount = @depth*2
                for i in [1..stepCount]
                    [x1, y1] = @fromWorld(@bunny.pos)
                    z2 = @fractal.step(@bunny.pos, c)
                    [x2, y2] = @fromWorld(z2)

                    #@fg.strokeStyle = @fractal.palette.color(i).string()
                    @fg.beginPath()
                    @fg.moveTo(x1, y1)
                    @fg.lineTo(x2, y2)
                    @fg.stroke()

                    if (not @halfSteps) or i.mod(2) == 0
                        @fg.beginPath()
                        @fg.arc(x2, y2, 2, 0, 2*Math.PI, false)
                        @fg.fill()

                    if @zoomControls
                        [x1, y1] = @fromMinimap(@bunny.pos)
                        [x2, y2] = @fromMinimap(z2)

                        #@fg.strokeStyle = @fractal.palette.color(i).string()
                        @fg.beginPath()
                        @fg.moveTo(x1, y1)
                        @fg.lineTo(x2, y2)
                        @fg.stroke()

                        if (not @halfSteps) or i.mod(2) == 0
                            @fg.beginPath()
                            @fg.arc(x2, y2, 2, 0, 2*Math.PI, false)
                            @fg.fill()

                    @bunny.pos = z2

                    if @fractal.abort(z2)
                        break

            for marker in @markers
                [x, y] = @fromWorld(marker.pos)
                #@fg.fillStyle = marker.color.string()
                #@fg.beginPath()
                #@fg.arc(x, y, 5, 0, 2*Math.PI, false)
                #@fg.fill()
                i = Images.get(marker.name)
                if marker.name == "bunny.png"
                    scale = 1-(0.7/100)*@depth
                    @fg.drawImage(i, x-marker.ox*scale, y-marker.oy*scale, Images.get("bunny.png").width*scale, Images.get("bunny.png").height*scale)
                else
                    @fg.drawImage(i, x-marker.ox, y-marker.oy)
        if @drawSlider
            w = @slider.canvas.clientWidth
            h = @slider.canvas.clientHeight
            for x in [0..w-1]
                for y in [0..h-1]
                    step = Math.floor(x/w*(@depth+1))
                    if step > @depth-1
                        step = -1
                    @slider.fillStyle = @palette.color(step).string()
                    @slider.fillRect(x, 0, 1, h)
            d = @fractal.iterate(@flag.pos, @depth)
            if d == -1
                d = @depth
            x = (d+0.5)*(w/(@depth+1))
            @slider.drawImage(Images.get("bunny.png"), x-Images.get("bunny.png").width/2, h/2-Images.get("bunny.png").height/2)

Images.onload = ->
    demoDivs = document.getElementsByClassName("demo")
    demos = {}
    for demo in demoDivs
        id = demo.id
        canvas = new Canvas()
        demos[id] = canvas
        switch id
            when "plain"
                zr = document.getElementById("zoom-remark")

                canvas.palette = new Palette("rainbow")
                canvas.drawAxes = false
                canvas.drawIteration = false
                canvas.zoomControls = true
                canvas.zoomHook = (level) ->
                    if level == 0
                        sentence = "You didn't zoom in yet. Try it! :)"
                    else
                        sentence = "So you just zoomed in "+level+" "
                        if level == 1
                            sentence += "time"
                        else
                            sentence += "times"
                        sentence += ". If all humans on earth did that, "
                        humans = Math.floor(Math.pow(0.25, level)*7.5e9)
                        if humans == 7.5e9
                            sentence += "all"
                        else if humans == 0
                            sentence += "probably <i>none</i>"
                        else
                            sentence += "about "+humans
                        sentence += " of them would end up where you did."
                        if humans == 0
                            sentence += " This means it's very, very probable that you are the first human being ever to see this region of the Mandelbrot set!"
                    zr.innerHTML = sentence

            #when "real"
            #    canvas.drawFractal = false
            #    canvas.depth = 0
            #    canvas.restrictToReal = true
            #    canvas.uiLevel = 0
            when "complex"
                canvas.drawFractal = false
                canvas.depth = 0
                canvas.maxDepth = 0
                c = document.getElementById("c")
                canvas.updateHook = ->
                    c.innerHTML = demos["complex"].flag.pos.string()
            when "walk"
                canvas.drawFractal = false
                canvas.depth = 0
                canvas.maxDepth = 1
                canvas.fractal = new Mandelbrot()
                canvas.stepControls = true
            when "hop"
                canvas.drawFractal = false
                canvas.depth = 1
                canvas.maxDepth = 1.5
                canvas.halfSteps = true
                canvas.fractal = new Steps()
                canvas.stepControls = true
                canvas.updateHook = ->
                    [x, y] = canvas.fromWorld(new Complex(0,0))
                    [x2, y2] = canvas.fromWorld(canvas.bunny.pos)
                    a = Math.atan2(x-x2, y-y2)
                    canvas.fg.arc(x, y, @zoom/2, 0, a, false)
    #    @fg.arc(ox, oy, 1*@zoom, 0, 2*Math.PI, false)
            when "step"
                canvas.drawFractal = false
                canvas.depth = 1.5
                canvas.maxDepth = 2
                canvas.halfSteps = true
                canvas.fractal = new Steps()
                canvas.stepControls = true
            when "steps"
                canvas.drawFractal = false
                canvas.depth = 0
                canvas.maxDepth = 4
                canvas.halfSteps = true
                canvas.fractal = new Steps()
                canvas.stepControls = true
                canvas.updateHook = =>
                    if demos["fullsteps"]
                        demos["fullsteps"].flag.pos = demos["steps"].flag.pos
                        demos["fullsteps"].draw()
            when "fullsteps"
                canvas.drawFractal = false
                canvas.depth = 0
                canvas.maxDepth = 4
                canvas.stepControls = true
                canvas.updateHook = =>
                    if demos["steps"]
                        demos["steps"].flag.pos = demos["fullsteps"].flag.pos
                        demos["steps"].flag.pos = demos["fullsteps"].flag.pos
                        demos["steps"].draw()
            when "iteration"
                canvas.drawFractal = false
                canvas.depth = 0
                canvas.maxDepth = 100
                canvas.stepControls = true
            when "scribble"
                canvas.drawFractal = false
                canvas.drawTrace = true
                canvas.maxDepth = 100
                canvas.palette = new Palette("bw")
                canvas.stepControls = true
            when "color"
                canvas.drawFractal = false
                canvas.drawTrace = true
                canvas.depth = 10
                canvas.maxDepth = 100
                canvas.traceSize = 20
                canvas.palette = new Palette("colordemo")
                canvas.stepControls = true
                canvas.drawSlider = true
            when "explore"
                canvas.zoomControls = true
                canvas.stepControls = true
                canvas.maxDepth = 100
                canvas.palette = new Palette("rainbow")
                canvas.drawAxes = false
                canvas.drawSlider = true
            when "exp"
                canvas.zoomControls = true
                canvas.stepControls = true
                canvas.maxDepth = 100
                canvas.palette = new Palette("rainbow")
                canvas.drawAxes = false
                canvas.drawSlider = true
                canvas.fractal = new Mandelbrot(6)
            when "tricorn"
                canvas.zoomControls = true
                canvas.stepControls = true
                canvas.maxDepth = 100
                canvas.palette = new Palette("rainbow")
                canvas.drawAxes = false
                canvas.drawSlider = true
                canvas.fractal = new Tricorn()
            when "ship"
                canvas.zoomControls = true
                canvas.stepControls = true
                canvas.maxDepth = 100
                canvas.palette = new Palette("rainbow")
                canvas.drawAxes = false
                canvas.drawSlider = true
                canvas.flip = true
                canvas.fractal = new BurningShip()
            when "sandbox"
                canvas.zoomControls = true
                canvas.stepControls = true
                canvas.palette = new Palette("rainbow")
                canvas.drawAxes = false
                canvas.drawSlider = true
        canvas.init(id)

Images.load([
    "bunny.png"
    "flag.png"
])
