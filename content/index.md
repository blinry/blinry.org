---
title: Home
headless: true
---

<div class="intro">
<img src="/assets/images/avatar.png">

<p>Hey there! My name is Sebastian Morr, I’m a computer science student from Germany. On this site I publish things I create and share stuff I like.</p>

<p>Here's how to <a href="/about/">contact</a> me. And now, let's get started with the latest blog entries:</p>
</div>

<% blog[0..4].each do |item| %>
<% render "article", {:item => item} do %>
<%= item.compiled_content %>
<% end %>
<% end %>
