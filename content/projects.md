---
title: Projects
order: 3
---

Over the years, I've worked on quite a few software projects. Here is an overview of the most important ones:

<div id="projects">
<% projects.each do |item| %>
<%= render "project_box", {:item => item} %>
<% end %>
</div>
