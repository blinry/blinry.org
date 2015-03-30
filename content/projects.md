---
title: Projects
order: 3
headless: true
---

<div id="projects">
<% projects.each do |item| %>
<%= render "project_box", {:item => item} %>
<% end %>
</div>
