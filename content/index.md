---
title: Home
headless: true
---

<div class="intro">
<img src="/assets/images/avatar.png" alt="Simpson-style avatar" />

<p>Hey there! My name is Sebastian Morr, I’m studying computer science at TU Braunschweig, Germany. On this site I publish things I create and share stuff I like.</p>

<p>Here's how to <a href="/about/">contact</a> me. And now, let's look at what you can find here:</p>
</div>

<% things.group_by{|t| [t[:published].year, t[:updated] ? t[:updated].year : 0].max}.sort_by{|y,t| -y}.each do |year, things| %>

# <%= year %>

<%= box(things) %>

<% end %>
