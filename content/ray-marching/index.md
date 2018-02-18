---
title: Intro to 3D shader programming with GLSL and ray marching
tags: talk, art, german
published: 2018-02-18T03:05+01:00
---

I gave this talk (in German) at my home hackerspace [Stratum 0](https://stratum0.org). It's a gentle introduction to creating 3D graphics using *fragment shaders* written in the OpenGL Shading Language, which allow an unusual approach to creating graphics: Geometry is modelled as a distance function, which describes the distance to the nearest surface, and we can use a technique called *ray marching* to render the scene.

<%= youtube("zfcCHPeDOhU") %>

You can find the [GLSL source code](https://github.com/blinry/shader-workshop/) of the demonstrated shaders on GitHub.

To run them, you can use [glslviewer](https://github.com/patriciogonzalezvivo/glslViewer) (on your command line) or [this online editor](http://editor.thebookofshaders.com/) (in your browser).

[Shadertoy](https://www.shadertoy.com/) contains a plethora of cool examples, and [The Book of Shaders](https://thebookofshaders.com/) is a brilliant interactive step-by-step guide to fragment shaders.
