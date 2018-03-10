---
title: Pixel Art Workshop
subtitle: "Let's draw very tiny pictures!"
published: 2016-10-08
updated: 2017-12-26
tags: talk, workshop, pixelart
thumbnail: slide-00.png
---

This is a workshop I'm regularly giving at Chaos events. The first iteration took place at [Hackover 2016](https://hackover.de).

Here's a recording of the "theoretical part" from the [34th Chaos Communication Congress](https://events.ccc.de/congress/2016/wiki/Main_Page):

<%= youtube("i3wSPmg8sKM") %>

## Slides

The 8x8 pixel characters are by [Johan Vinet](http://johanvinet.tumblr.com/post/127476776680/here-are-100-characters-8x8-pixels-using-the).

You can also download the [source .ase file](pixel-art-workshop.ase) for the presentation, which abuses Aseprite's animation feature to do slides.

<% 0.upto(29) do |i| %>
![](slide-<%= "%02d" % i %>.png)
<% end %>
