---
title: How to blog with nanoc
published: 2013-06-23T13:41+0200
tags: meta, tech
---

*This is a follow-up to "[History of morr.cc](/history-of-morr-cc/)". I'd like to show you how this blog is created using the fantastic static site generator "nanoc".*

## Why would you want static sites?

To be short: Simplicity, security, speed.

## OK, how does it work?

You can look at [this blog's source code](https://github.com/blinry/blog-morr-cc) on GitHub.

- The [`content`](https://github.com/blinry/blog-morr-cc/tree/master/content) folder contains the blog posts (in `articles`), assets related to the layout (in `assets`), images and other files referenced from the blog posts (in `files`), and some top-level pages and files. Texts are written in the [*Markdown*](http://daringfireball.net/projects/markdown/) format, a simple markup language that is even comfortable to read as plain text (for example, look at [this post's source](https://raw.githubusercontent.com/blinry/morr.cc/master/content/how-to-blog-with-nanoc/index.md)). Each post has a header containing at least a title, the date of publication, and some tags in [*YAML*](https://en.wikipedia.org/wiki/YAML) format.

- The [`layouts`](https://github.com/blinry/blog-morr-cc/tree/master/layouts) folder contains some HTML templates with [*eRuby*](https://en.wikipedia.org/wiki/ERuby) tags.

- The [`lib`](https://github.com/blinry/blog-morr-cc/tree/master/lib) folder contains helper functions you can use in the eRuby tags and a custom filter that reformats HTML nicely using [*tidy-html5*](http://w3c.github.io/tidy-html5/). More about that later.

This is all tied together by the [`Rules`](https://github.com/blinry/blog-morr-cc/blob/master/Rules) file, which contains several types of instructions. Files in the `content` directory are treated as *items* with an *identifier* that is the file's path minus their filename extension. The file `content/articles/how-to-blog-with-nanoc.md` has the identifier `articles/how-to-blog-with-nanoc/`.

- `compile` statements say "for an item with *this* identifier, apply *these* filters (which evaluate eRuby tags, convert Markdown to HTML, and tidy the result) and layouts (which stuff the result into one of the layout files). Nanoc comes with some basic filters, but its easy to write your own, too.

- `route` statements say "for an item with *this* identifier, put the processed content *here*".

- `layout` statements say "for a layout with *this* identifier, apply *these* filters.

- `preprocess` statements can be used to create new items, like pages for each tag, or to do some other preprocessing.

Now, when executing `nanoc`, all these rules are applied and the result is put in the `output` folder. `nanoc deploy` uploads this folder to my web server (the configuration for that is in [nanoc.yaml](https://github.com/blinry/blog-morr-cc/blob/master/nanoc.yaml). Very handy is `nanoc aco`, that starts a web server locally, lets you preview your site and *autocompiles everything that is needed when refreshing a page*.

And, that's really everything.

## Resources

[nanoc.ws](http://nanoc.ws/) contains everything you need to know to build your own *nanoc* powered site. Have fun!
