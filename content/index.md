---
title: Blog
headless: true
---

<% blog.each do |item| %>
<% render "article", {:item => item} do %>
<%= item.compiled_content %>
<% end %>
<% end %>
