---
title: Home
headless: true
---

<div class="intro">
<img src="/assets/images/avatar.png" alt="Simpson-style avatar" />

<p>Hey there! My name is Sebastian Morr, I’m studying computer science at TU Braunschweig, Germany. On this site I publish things I create and share stuff I like.</p>

<p>Here's how to <a href="/about/">contact</a> me. And now, let's look at some things you can find here:</p>
</div>

# Newest content

<%= box(things[0..2]) %>

# Most popular content

<%= box((favs-things[0..2])[0..5]) %>

# All other content

<%= box((things-things[0..2]-((favs-things[0..2])[0..5]))) %>

For a better overview, the content content is divided in these categories:<br/>
<%= categories.map{|name, things| link_to(@items["/#{name.downcase}/"]) }.join(", ") %>.

You can also find a chronologic list of all content in the <%= link_to(@items["/archive/"]) %>.
