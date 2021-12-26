---
title: Fifty TIC-80 carts
tags: art, game, software
license: CC0
published: 2021-12-05
---

<%
    def v i, tweet, audio=false
        media = if @items["/50-tic80-carts/#{"%02d" %i}.mp4"]
            if audio
                "<video src='#{"%02d" % i}.mp4' controls></video>"
            else
                "<video src='#{"%02d" % i}.mp4' autoplay muted loop></video>"
            end
        else
            "<img src='#{"%02d" % i}.png'>"
        end

        %{
#{media}
<a href='#{"%02d" % i}/' target="_blank">play in browser</a> –
<a href='https://twitter.com/blinry/status/#{tweet}' target="_blank">view tweet</a> –
<a href='#{"%02d" % i}.tic'>download .tic file</a>
        }
    end
%>

Ever since I read about the "Make 50 of Something" technique in Vi Hart's blog post about [Fifty Fizzbuzzes](http://vihart.com/fifty-fizzbuzzes/), I wanted to try it for myself! Creating 50 of, well, anything, in quick succession seemed like a fun challenge!

So, on a free weekend in early December, I decided to try to make 50 programs for the open-source retro fantasy console [TIC-80](https://tic80.com)!

On this page, I document my experience, and release all resulting programs/"carts" under the free CC0 license, so you can study, modify and reuse them however you like!

## Saturday morning

I started by compiling a list of rough ideas. The first thoughts that came to my mind were about trying technical things, like graphical effects, or exploring the features of the console. I cracked my knuckles, opened TIC-80, and got to work!

### 1: Dissolving

This doesn't clear the screen each frame, but instead clears 5000 random pixels before drawing the circle!

<%= v(1, 1467112486952443907) %>

### 2: Pattern fill

TIC-80 doesn't have a built-in pattern fill, so here I rasterize the circles myself, using the 16-bit patterns 0xada7, 0xaeab and 0x8520.

<%= v(2, 1467113599336427520) %>

### 3: Text effects

We can offset the plain `print()` function a bunch of times to get these effects! For the striped version, I use `clip()` to limit what is drawn in each color to a single line.

<%= v(3, 1467114553767084035) %>

### 4: Smooth rainbow

TIC-80 normally just has a 16-color palette, but it's possible to change it in each scanline! :)

<%= v(4, 1467115256191275010) %>

### 5: Sprite drop shadows

Using the palette swap region in the RAM, I swapped all colors to black before drawing a shifted copy of the sprite.

<%= v(5, 1467115932933832708) %>

### 6: Patterned shadows

Similar idea, but drawing each shadow 32 times and using `clip()` to constrain it to a checkerboard pattern. There's… probably a way to do this more efficiently! :D

<%= v(6, 1467116659139829768) %>

### 7: Alien art

Drawing bit fields using a simple formula on the pixel coordinate. The modulus can be changed with the arrow keys. Shoutout to [Martin Kleppe](https://twitter.com/aemkei/status/1378106731386040322)! :)

<%= v(7, 1467117689630044167) %>

### 8: Shaking text

Another text effect. We have to split the string into individual characters to do this.

<%= v(8, 1467118186495684611) %>

### 9: Thick lines

TIC-80 has a `line()` function, but it's only 1 pixel wide. We can use `tri()` to draw a thicker rectangle, and close it off with circles at the ends. Doesn't seem to work very well for odd line widths.

<%= v(9, 1467118942799994882) %>

### 10: Chromatic aberration

I love this retro effect, which separates the color channels more as we get closer to the edge of the screen!

<%= v(10, 1467120650150101004) %>

## Saturday afternoon

Making the first 10 carts took me roughly three hours. I felt good about this challenge! I had plenty of more ideas in my list, and with around 20 minuts per carts, I was well on track time-wise! I started tweeting about my progress, [here's the thread](https://twitter.com/blinry/status/1467112486952443907), which gave me a good medium for reflecting on my own progress, and invited encouragement! :D

I got lunch, and kept going:

### 11: Sprite outlines

Another effect on sprites, swaps all palette colors to black and drawing shifted copies of the sprite! The cartoon style of the second tree should come in very handy games!

<%= v(11, 1467180206137958404) %>

### 12: Piano

TIC-80 has built-in editors for sound effects and music! Here's a virtual piano that you can play with your computer keyboard! I like how arpeggios (fast pitch patterns) instantly make a sound chiptune-y! :)

<%= v(12, 1467184778977947650 , true) %>

### 13: Sliding notes

The `sfx()` can only play fixed semitones, without any effects. I wanted a "note slide" effect, so I prepared a music track which uses that effect, and when playing a note, poke around in the RAM to insert the source and target pitch!

<%= v(13, 1467186635116892164 , true) %>

### 14: RAM viewer

I was curious about TIC-80's RAM (virtual computer memory), so I wrote a visualizer! In this video, I show two cool things I found: The default character set (not really readable in this layout), and the two bytes where the mouse position is stored! :D

<%= v(14, 1467188550097645572) %>

### 15: Floating letters

A text animation that pushes away letters that are further from the "focal point". The things you can do with trigonometry! <3

<%= v(15, 1467189806161608710) %>

### 16: 2D distance functions

I love writing pixel shaders in GLSL, and with TIC-80, you can use the same approach (but much slower)! Here's two distance functions describing circles, combined with a smooth minimum function.

<%= v(16, 1467192570929422337) %>

### 17: 3D distance glitch

A pretty bug I encountered while trying to implement a 3D renderer using ray marching! I think the factor I was using to cycle through the color palette was way too high.

<%= v(17, 1467193702506446852) %>

### 18: 3D distance functions

And here is a "properly" rendered 3D sphere. Without a 3D vector library, coding prettier shading felt like a hassle, so I just did a simple rainbow pattern and moved on. :) 

<%= v(18, 1467195134626480130) %>

### 19: Direct sound

Diving deeper into TIC-80's audio capabilities, I found the "sound registers", which you can directly write to! Okay, first experiment: filling them with random bytes! 🎶

<%= v(19, 1467197007160823813 , true) %>

### 20: Theremin

Neat, this allows us to have much more control! We can set the waveform, the volume, and the frequency! So let's build a theremin! :>

<%= v(20, 1467198486613565442 , true) %>

## Saturday evening

At this point, I realized that making 50 of anything is *a lot*! But I also really enjoyed the exercise, it made me think outside the box, and allowed me to follow my curiosity! To spread the 50 carts out equally over two days, I decided to make 5 more that day:

### 21: Noisy gradient

The further we progress on the x-axis, the more probable the right color becomes!

<%= v(21, 1467218848881467402) %>

### 22: Day of the week

TIC-80's `tstamp()` function gets us the seconds since 1970-01-01! Compared with most other date calculations, finding out the day of the week is relatively straightforward! (Famous last words.)


<%= v(22, 1467220177255387139) %>

### 23: Screen shake

An effect that helps make games 💦juicy💦! This is really satisfying. :D I'm sorry, Japan. Today's earthquakes are on me.

<%= v(23, 1467221698063835136) %>

### 24: Particles

Another 🥵juicy🥵 part of many games! These particles have a position, a color, a direction, a speed, and a "frames to live" counter. They shrink and slow down as they age.

<%= v(24, 1467223327152422912) %>

### 25: Liquify

Quick effect to finish the day off! Because TIC-80's UI is still in the screen RAM when a cart runs, we can do effects on it! Here, each pixel has a chance to assume a neighbor's color!

<%= v(25, 1467225517078237193) %>

## Sunday morning

Encouraged by my friends cheering me on on Twitter, I started into the second day with a lot of energy! Saturday had been exhausting and exciting! I had some more ideas on my list.

### 26: Tree

Here, I'm doing a simple recursion with a dash of randomized angles, using a green color gradient.

<%= v(26, 1467482865088663554) %>

### 27: Bliss

Having some fun with TIC-80's sprite editor, and assembling dynamically-sized objects from tiles!

<%= v(27, 1467485154616786947) %>

### 28: Inversion

Again, this is a custom circle rasterizer that checks the current pixel value, and inverts it. A little shadow to round it off. Kudos to TRASEVOL_DOG, whose [Doodle Insights](https://trasevol.dog/category/doodle-insights/) were a big inspiration for me!

<%= v(28, 1467486392443887618) %>

### 29: Vignette

I love vignetting effects, where the image corners fade out into darkness. It's harder to replicate with a 16-color palette, but I'm not unhappy with this.

<%= v(29, 1467487269577801729) %>

### 30: Animated character

In many games, you move around with a character, and it looks much nicer when it's animated! This was good practice for implementing a system like that. 

<%= v(30, 1467488563226943492) %>

### 31: Fuzzing

Okay, let's just put random bytes all over TIC-80's entire RAM! This can change the screen offset, the border color, or make cute noises! And if you watch the recording until the end, you can watch me learn that there's a bit for capturing the mouse! :'D

<%= v(31, 1467490686870200323 , true) %>

### 32: Cross-stitch

I had the idea to make a filter which takes the current screen content, and replaces each pixel with a stitch! Here it is being applied to the duck cart! :3

<%= v(32, 1467492131468107779) %>

### 33: Paint

A very rudimentary drawing program. Really wanted to spend more time on this, but I had to move on!

<%= v(33, 1467493638724857858) %>

### 34: Falling sand

The same program as #33, but with an additional rule! :D

<%= v(34, 1467494761774858240) %>

### 35: Water reflection

Each pixel from the top half of the screen is reflected to the bottom half, mapped to a darker color, and shifted around a bit horizontally! Really happy with the interactive part here!

<%= v(35, 1467496631734046722) %>

## Sunday afternoon

At this point, I was in a deep flow state - similar to what I experience when I participate in game jams: I have a lot of focus, and can work on something basically from waking up until I go to bed. That's pretty unusual for me, and a really intense feeling! Also, at this point, I felt like I was out of ideas. Every idea felt like it would be the last. I think it is exactly the point of this exercise - to exhaust the obvious ideas, to get to the weird ones!

I badly neede another break, so I made vegan gingerbread cookies, went for a quick walk, and continued after that. To be able to finish the remaining carts during the weekend, I started using a 20-minute timer to remind me to move on.

### 36: Rain

A modification of #24, but with two types of particles – raindrops and water splashes!

<%= v(36, 1467556649946783750) %>

### 37: Spirograph

Three connected arms with random lengths and rotation speeds. We trace the last arm's path (and `memcopy` to an unused part of the RAM, so we can draw the arms on top)!

<%= v(37, 1467558674558341133) %>

### 38: Voronoi diagram

I've never implemented Voronoi cells before! Each point has an associated color, and we paint each pixel according to which point it's closest to.

<%= v(38, 1467560211871408130) %>

### 39: Game of life

A classic "cellular automaton", which simulates its cells in a particular way, often leading to interesting patterns. This starting pattern is called "Acorn"!

<%= v(39, 1467562594785501195) %>

### 40: Cursor impostors

Only one of these cursors is real! Can you figure out which one? The others dance with you in the same speed. (Note to self: make a real game around this idea at some point.)

<%= v(40, 1467564169012686848) %>

### 41: Television

A filter that adds noise, some horizontal lines, and cheap distortion using the `SCN()` function.

<%= v(41, 1467564984284626945) %>

### 42: Typewriter

TIC-80 has access to the states of most buttons on your keyboard, so we can build a typewriter! With some letter imperfections, "editing" capabilities, and \*ding\* sound at the end of the line! :P

<%= v(42, 1467566857368580101) %>

### 43: Moiré pattern

An interference pattern created by two sets of concentric circles.

<%= v(43, 1467567472794554375) %>

### 44: Map generator

For this, I distribute some colored pixels on the plane, and make them grow outwards, like bacteria. Surprisingly effective and cheap!

<%= v(44, 1467568744440475649) %>

### 45: Truchet tile editor

This patterns is made from four tiles, which all fit together. You can click on a tile to change it. Would be fun to make a font with this!

<%= v(45, 1467569741040697351) %>

## Sunday evening

I was into crunch territory now, wringing out my brain for new ideas. I felt mentally and physically exhausted, but I also said to myself: "I can do this!"

### 46: Mountains

The layers keep track of a up/down direction for changing the height. They add noise to it, but also try to flatten it out over time. I like how smooth this makes them. 

<%= v(46, 1467608460728713222) %>

### 47: Timeline

I heard you like timelines, so I put a timeline in your timeline so you can scroll through a timeline while you scroll through your timeline!

<%= v(47, 1467611411274780678) %>

### 48: Squircle

The so-called squircle is a superellipse defined by x^4+y^4=r^4. It's close to a rounded rectangle, but I like it much better! It's being in UI design, for example for app icons!

<%= v(48, 1467612943177162758) %>

### 49: Mandelbrot set explorer

A famous fractal! It has a simple definition, but a highly complex boundary! The colors show how many iterations we did from that point before diverging.

<%= v(49, 1467614884133322765) %>

### 50: Fireworks!

And finally, let's do another application for a particle system. Here, I spawn the particles along some hand-crafted lines and ellipses. Whoa, I really made it!! 🎉

<%= v(50, 1467616782974394372) %>

## Aftermath

After completing the 50 carts, I felt pround, and excited, and completely exhausted! In total, I had spent around 16 hours on creating the 50 carts, and around 4 hours on tweeting about them!

My ears were ringing, my eyes were dry, and my mind felt restless. This was a really intense exercise! Similarly to how I've experienced it after game gams, I needed around three days and a lot of sleep to fully recover from this.

I really encourage you to try this sometime! You could paint 50 small-scale paintings! Or write 50 koans! Or, I dunno, cook 50 sandwiches?
