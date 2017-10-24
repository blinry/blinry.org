---
title: Pixel Art Workshop
subtitle: "Let's draw very tiny pictures!"
published: 2016-10-08
updated: 2017-05-26
tags: talk, workshop, pixelart
thumbnail: slide-00.png
---

I gave this workshop at [Hackover 2016](https://hackover.de) and the [33rd Chaos Communication Congress](https://events.ccc.de/congress/2016/wiki/Main_Page). The current version of the slides are from the [17. Gulaschprogrammiernacht](https://entropia.de/GPN17).

The 8x8 pixel characters are by [Johan Vinet](http://johanvinet.tumblr.com/post/127476776680/here-are-100-characters-8x8-pixels-using-the).

You can also download the [source .ase file](pixel-art-workshop.ase) for the presentation, which abuses Aseprite's animation feature to do slides.

<% 0.upto(29) do |i| %>
![](slide-<%= "%02d" % i %>.png)
<% end %>
