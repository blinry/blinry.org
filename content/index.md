---
title: Home
headless: true
---

<div class="intro">
<img src="/assets/images/avatar.png">

<p>Hey there! My name is Sebastian Morr, I’m a computer science student from Germany. On this site I publish things I create and share stuff I like.</p>

<p>Here's how to <a href="/about/">contact</a> me. And now, let's get started with the latest blog entries:</p>
</div>

<%
categories = ["software", "documents", "art"]
buckets = {}
categories.each do |c|
    buckets[c] = []
end
buckets["The Rest"] = []
things.each do |t|
    c = categories.find{|c| has_tag(t,c)}
    if not c
        c = "The Rest"
    end
    buckets[c] << t
end

categories << "The Rest"
%>

<% categories.each do |cat| %>
<h1><%= cat %></h1>
<div id="projects">
<% buckets[cat].chronologic.reverse.each do |item| %>
<%= render "project_box", {:item => item} %>
<% end %>
</div>
<% end %>

<!-- <% things[0..4].each do |item| %>
<% render "article", {:item => item} do %>
<%= item.compiled_content %>
<% end %>
<% end %>

<div class="more">
<a href="/blog/">← Previous entries</a>
</div> -->
