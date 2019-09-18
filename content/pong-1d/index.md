---
title: Pong 1D
subtitle: A Flatlander's perspective
published: 2011-09-26
tags: game
---

Inspired by the movie *Flatland*, I wrote this one-dimensional game. For those who don't know this movie (go watch it, seriously!), let me briefly explain the concept: Pong, as you know it, is a two-dimensional game: Everything happens in a flat plane. Now imagine you *were* one of the paddles - you'd see your surroundings as a line, one-dimensional. The rest is just normal Pong.

You can move around with your arrow keys. First to get 11 points wins.

<div style="padding: 1em; font-family: sans-serif; font-size: 1.5em; text-align: center; color: white; background: black;">
<p>Computer <span id="p1-points">0</span>:<span id="p2-points">0</span> You</p>
<canvas id="canvas" width="500" height="20">
Your browser does not support Canvas.
</canvas>
</div>

<script src="pong1d.js"></script>

## Inner workings

The rendering is realized by a 2D raytracer: For every pixel of the viewport, a ray is being shot. The color and the angle of the object this ray first hits is used for calculation of the pixel's color.
