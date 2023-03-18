How to steal this homepage
==========================

You're welcome to fork this homepage and use it as a basis for your own! I've put a lot of effort into automating things as much as possible, to make maintaining a website like this easy and fun!

This site is using the static-site generator [Nanoc](https://nanoc.ws/), so it'd be a good idea to read its tutorial and the documentation.

You'll also need a [Ruby](https://www.ruby-lang.org/) installation, as well as [Bundler](https://bundler.io/) and [Tidy](http://www.html-tidy.org/). For the site's image conversion magic, you'll need *ImageMagick*, *librsvg*, *pdf2svg*.

Clone this repository, and install its Ruby dependencies by running:

    $ bundle install --path ~/.gem

Then, to compile the site, run:

    $ bundle exec nanoc

The first run will take a rather long time, because of thumbnail generation. You can also use `bundle exec nanoc live` for convenience, which will rebuild the site when you change stuff.

Basic file structure:

- In `content`, there's a directory for each page of this website, containing the main text in Markdown format, as well as associated images
- `layouts` contains SLIM templates with eRuby tags
- `lib` contains helper functions and custom Nanoc filters

You can define an upload path in `nanoc.yaml` and then use `bundle exec nanoc deploy` to deplay the page.

If you encounter any problems, don't hesitate to ask me!

Nix setup
=========

How to update the Ruby gems:

```
bundler update
bundix
```

License
=======

I release the content of the `lib` and `layouts` directories, as well as all top-level files under the GPLv3, or (at your option) any later version.
