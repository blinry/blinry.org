---
title: Archive
order: 4
---

<% blog.each do |item| %>
<%= item[:published] %> -- <%= link_to item %>
<% end %>
