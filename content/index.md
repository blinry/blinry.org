---
title: Blog
headless: true
---

<% @items["/blog/"].children.chronologic.reverse.each do |item| %>
<% render "article", {:item => item} do %>
<%= item.compiled_content %>
<% end %>
<% end %>
