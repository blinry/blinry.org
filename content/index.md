---
title: Home
headless: true
---

<div class="intro">
<img src="/assets/images/avatar.png">

<p>Hey there! My name is Sebastian Morr, I’m studying computer science at TU Braunschweig, Germany. On this site I publish things I create and share stuff I like.</p>

<p>Here's how to <a href="/about/">contact</a> me. And now, let's get started with the latest blog entries:</p>
</div>

<% categories.each do |name, items| %>
<h1><%= name %></h1>
<div class="boxes">
<% items.each do |item| %>
<%= render "box", {:item => item} %>
<% end %>
</div>
<% end %>
