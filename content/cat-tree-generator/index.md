---
title: Cat Tree Generator
tags: art, software, generator
published: 2021-08-17
---

I spent a one-week "mini batch" at the [Recurse Center](https://www.recurse.com) in 2021. I wanted to learn how to do 3D things in the browser, and how the *wave function collapse algorithm* works!

What I built is a "cat tree generator"! I modelled the tiles in Blender, and wrote an algorithm that makes sure that the final structure will be consistent. For example, a ladder will only be placed if:

- there's nothing over it,
- there's something solid under it, and
- there's a solid block next to it.

Check it out [here](https://blinry.github.io/cat-trees/)! Each time you refresh the page, you'll get a new cat tree!

<video src="cats.mp4" controls muted autoplay loop></video>

You can find the source code [on GitHub](https://github.com/blinry/cat-trees). I use THREE.js for 3D rendering.
