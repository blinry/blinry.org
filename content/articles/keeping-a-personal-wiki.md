---
title: Keeping a personal wiki
published: 2013-06-05T18:18+0200
tags: software, life
---

*In this article, I'd like to show you which tools I use to keep a personal wiki and what I do with it.*

## Short history

I've been keeping text files about personal stuff since 2007. It started with a diary, but expanded to several text files soon (*todo*, *ideas*, *quotes*, ...). They contained indented lists, I had Vim macros in place to fold and unfold them (a format I now call *[vimgirl](http://github.com/blinry/vimgirl)*).

Over the time, I discovered more uses for my directory of text files: GTD lists, brainstorming sessions, command line tricks, lent stuff, all kinds of collections - heck, I even kept my appointments in nested plain text files at some point, which worked surprisingly well.

Then, nothing happened. Then, I created Vimboy.

## Vimboy

*[Vimboy](http://github.com/blinry/vimboy)* is a Vim plugin that does almost nothing. You have a folder with text files, and when one file mentions the name of another file, it automatically links there. Plus, you get a mapping for quickly deleting the current file, and pressing *return* creates a new page named after your visual selection/the word you are on. That's it.

![Screenshot of Vimboy](/files/vimboy-screenshot.png)

Vimboy also has a "manual link mode", where you have to use [square brackets] to create links, but since a very special incident where autolinking created an UBERAWESOME association, I recommend automatic links.

I've named my wiki *BrainDump* because I've come to see it as exactly this: A storage extension for my brain. Once information is *dumped*, it's safe, doesn't bother you anymore and you can look it up when you need it later. This frees up your mind for *important* stuff.

When switching to Vimboy, the file's format changed to something like Markdown, although formatting is completely up to you.

I'm using BrainDump as: *An address book, howtos for myself, my clothing sizes, travel packing list, time & goal tracking, geek codes et cetera, chores planning and speedruns, notetaking in classes, idea management, project overviews, online accounts list, quotes, lists of things I want to read/watch/eat/play, recipes, diary, decision making, ratings of cheese/chocolate/wine.*

A shell script called `wiki` supports fast creation and access to wiki pages, I have tab completion in place, too. For full text search, I use [`ack`](http://beyondgrep.com/).

## RoboBoy

*[RoboBoy](https://github.com/blinry/roboboy)* is a recent addition to the \*boy family: An Android application you can use to sync your wiki among main computer and smartphone using Git. It's quite hard to set up right now and has its quirks, but I like *always taking my brain extension with me* ™.

![Screenshot of RoboBoy](/files/roboboy-screenshot.png)

## webboy

Finally, [webboy](http://github.com/blinry/webboy) is a Markdown-formatted-Vimboy-wiki-to-HTML compiler. I don't use it right now, but if you'd like to keep a public wiki, or dislike reading text in the terminal, this is for you.

## Conclusion

If you never kept a personal wiki, I encourage you to try it! If you dare to use the \*boy suite, feedback is very welcome. You can find detailed documentation for the tools mentioned on their GitHub pages.
