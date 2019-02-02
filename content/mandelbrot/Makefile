FILES := index.html mandelbrot.css mandelbrot.js

default: ${FILES}

clean:
	rm ${FILES}

%.html: %.slim
	slimrb $< $@

%.css: %.scss
	sass --sourcemap=none -C $< $@

%.js: %.coffee
	coffee -c $<
