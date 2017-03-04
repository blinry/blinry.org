---
title: Exact Minkowski Sums of Polygons With Holes
subtitle: A GSoC project for CGAL
published: 2015-02-22
updated: 2015-10-01
tags: paper, talk, cs
---

This is the first "real" scientific paper which I coauthored. It's about the design and implementation of an algorithm which computes the so called *Minkowski sum* of two polygons.

I like to explain the topic like this: Imagine you have two stamps of arbitrary shape. First, you stamp one of them on paper, and then, you mark a point on the second one and stamp all over the other one, so that the point is inside of the first stamp. We're interested in the shape of the result, and in this paper, we're investigating an algorithm which computes this exactly and fast. It's the first exact implementation that is able to compute the Minkowski sum of polygons with holes. We also show that, if the polygons contain holes, you can always "fill up" all holes in one of them without chaning the result, and use that property to speed up the algorithm even more in some cases.

You can find a preprint of the paper on arXiv.org (linked below). I also presented the paper at [EuroCG 2015](http://eurocg15.fri.uni-lj.si/) and [ESA 2015](http://algo2015.upatras.gr/esa/):

<%= titlepage("1502.06195v3", "Preprint at arXiv.org", "http://arxiv.org/abs/1502.06195") %>
<%= titlepage("exact-ms-of-pwhs-talk", "Talk at ESA 2015") %>

The resulting implementation has become part of the open source [Computational Geometry Algorithms Library](http://cgal.org), starting from version 4.7.
