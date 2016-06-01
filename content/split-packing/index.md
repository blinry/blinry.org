---
title: "Master's Thesis: Split Packing"
tags: document
published: 2016-06-01
---

The full name of my master's thesis is **Split Packing: An Algorithm for Packing Circles with up to Critical Density**. It covers a topic from the field of *Computational Geometry*: Packing circles into various containers, like squares and triangles.

In the thesis, I invented an algorithm which can pack circles and other objects into these containers, if their combined area does not exceed certain bounds. The special property of the algorithm is that these bounds are tight: For any larger area bound, there are circle instances which can *not* be packed.

The thesis contains a large number of figures, I'd like to invite you to take a look! :-)

<%= titlepage("split-packing", "Thesis") %>

While working on this thesis, I wrote an interactive visualization tool called [*Circus*](./circus/), which I used as a personal thinking and explaining tool. You can try it out by clicking on the image below, usage instructions are located in the lower left. The tool is written in plain CoffeeScript and uses the HTML5 canvas for drawing, the [source code is on GitHub](https://github.com/blinry/circus).

[![Screenshot of the Circus visualization tool](circus.png)](./circus/)
