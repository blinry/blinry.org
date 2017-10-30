---
title: Watching Movies Backwards
subtitle: "\"How on earth did THIS happen?\""
tags: tech, story
published: 2017-10-30T15:47+01:00
---

Ever wondered what a movie would look like when played backwards?

- *Titanic*: A boat comes out of the ocean to save a bunch of drowning people.
- *Lord of the Rings*: Two hobbits steal a ring from Mordor and emigrate to The Shire, while some of their friends travel around reviving orcs.
- *Star Wars*: A moon-sized spaceship suddenly appears in space, and Luke extracts a bomb from it, enabling it to constructs new planets.
- *Saw*: An old man kindly gives people new organs and replaces their missing body parts.

I wanted to try this. Well, *actually* playing movies backwards would mangle the audio and look ridiculous, but there's another way: Watching movies **Memento-style**!

## The idea

The movie *Memento* revolves around a man who can't make new long-term memories, so he only remembers what happened in the last five minutes. He's constantly taking notes and pictures, and even gets himself tattooed, to remind himself of what's important.

The filmmakers use a clever narrative technique to transfer his experience to the viewer: The individual scenes of the story aren't shown chronologically, but in reverse order: The viewer gets to see the last five minutes of the story first, then the five before that, and so on. This means that, at any point in the movie, the viewer *also* has no idea what happened before, making it easy to put themselves in the protagonist's position.

These backwards-running scenes are additionally interleaved with shorter, forward-running ones taking place at the story's very beginning. They introduce some of the characters in a spread-out fashion, and can easily be differentiated, because they are shown in black-and-white.

Here's a timeline of the whole movie, displaying the "screen time axis" horizontally and the "plot time axis" vertically:

[![Timeline of Memento](memento-timeline.png)](https://commons.wikimedia.org/wiki/File:Memento_Timeline.png)

I'm quite fond of *Memento*, and one day, I wondered what would happen if you applied this narrative technique to other movies. I tried it. Here's what happened.

## Experiences

The first movie I watched "Memento-style" was *Transcendence*. I knew that it didn't have very good ratings, and I thought it could be more interesting to watch it backwards. Also, I was on an eight-hour bus drive through Canada, and had nothing else to do. I just did it manually, skipping back by ten minutes whenever I encountered something I had already seen: Five minutes for block I had just seen, five minutes to go to the beginning of the block before that.

Watching *Transcendence* backwards turned out to be a pretty fun experience, because of its climactic story arc: It ends with an AI taking over the world, and the rest of the movie explains how it became more and more technologically advanced, and before that, how and why the original person uploaded his mind into a machine. For most of the movie, the relations to some of the characters weren't really clear to me, and became apparent only when they were introduced at the beginning. But overall I had a great time, and learned that watching movies in this fashion makes an engaging, fun experience.

And recently, I could convince some friends to watch a movie backwards together. We chose *Cypher* – two of us already knew the plot, two of us didn't. The movie ends with a pretty big twist, so for the rest of the film, we already knew what would happen, and could laugh at the ignorance of the characters. But still, we had quite a few "Ah, *that's* where he got that item!" and "Oh, so *that's* why he did all that!" moments. I'm not sure whether it was more fun for those who already knew the movie, or for us who had to figure it out. ;-)

## How to watch movies Memento-style

My initial idea was using [FFmpeg](https://www.ffmpeg.org/) to actually cut a movie file into pieces and reassemble them, but that approach turned out to be slow, tiresome, and inflexible. So, at the moment, there are two things you can do:

First, as explained, you can just open the movie in your favorite video player, skip the the beginning of the closing credits, and then jump back five minutes. Each time you reach a part of the movie you've already seen, jump back ten minutes. Repeat until you've seen all of the movie. (In VLC, for example, you can make this easier by using the keyboard shortcut **Ctrl + Alt + Left**, which jumps 5 minutes backwards!)

And second, you can apply some automation. My favorite movie player is [mpv](https://mpv.io/), which is easily scriptable with Lua, so I wrote [this script](https://gist.github.com/blinry/865723228e00d682ede851797e8c677e) which does all the work for you. You just put it in `~/.mpv/scripts/` (on Unixoids) or in `%APPDATA%\mpv\scripts\` (on Windows), open your movie, and press `M` to turn on "Memento mode". Playback will skip to the beginning of the last 5-minute block automatically, and it will then play all of these blocks, in backward order.
I found that it's worthwhile to have an overlap of about 10 seconds between the blocks, so you can better recognize where the transitions are. You can change the length of the blocks and their overlap by changing the value of the `step` and `overlap` variables.

## Closing thoughts

Watching movies backwards seems like a good way to make boring or bad movies more interesting, to challenge yourself, and to have a fun time.

It might be interesting to try playing a movie *really* backwards, after all. This way, people would also actually *act* backwards, which might add some humoristic value. To understand what characters are saying, one could either simply add subtitles, or actually cut out the respective parts of the audio track and play them forwards. One could use the timing of the subtitles to find these pieces containing speech. In any case, doing this would require re-encoding the movie file, because video formats are specifically designed to be played forwards.

One could experiment with different block lengths. Five minutes seemed to work pretty well – it's long enough so that you don't get too many jumps, and it's short enough so that the story is still perceived as "backwards". The average scene lengths in modern movies seems to be around 2-3 minutes, so one could also try that.

Finally, as I explained above, *Memento*'s structure is somewhat more complicated because of the additional forwards-running black-and-white scenes. It seems worthwhile to add these in, so that you get to see the introduction of the world, of the characters and their relations at an earlier point of the movie.

Here are some more movies which could be interesting when watched mementoized. If you'd like to try it, it would probably be best to pick one you know absolutely nothing about: *Mrs. Doubtfire*, *Duplicity*, *The Fountain*, *Duel*, *Alien*. Enjoy!
