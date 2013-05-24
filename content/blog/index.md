---
title: Blog
headless: true
order: 2
---

<% @item.children.chronologic.reverse.each do |item| %>
<% render "article", {:item => item} do %>
<%= item.compiled_content %>
<% end %>
<% end %>
