---
title: waspsandnades
tags: art
published: 2019-06-01T12:31-04:00
---

<video src="arrows.webm" autoplay loop></video>

An animation [Winston](https://sequential.me) and I made at the [Recurse Center](https://recurse.com). Out of appreciation of the fabulous [@beesandbombs](https://twitter.com/beesandbombs), we internally called this project *wasps and (gre)nades*. :P

I learned a lot about easing functions and about how to plan and structure this kind of multi-step animation! Also, publishing this as a GIF on Twitter was a pain in the ass, we got the best result when exporting all frames individually, opening them as layers in GIMP, and then exporting them as a GIF. Even though, in the [resulting tweet](https://twitter.com/SequentialChaos/status/1134603237074624512), every looks a bit blurry.

As for actually making the animation happen: we don't store any state, but have formulas in place that give us the transformations we want. You can peek at the p5.js source code [here](https://sequential.me/sketches/wasps-and-nades/arrows/1/rainbow/sketch.js), if you want.

Fun fact: we actually had another movement pattern in mind, but a bug produced this, so we decided to keep it!
