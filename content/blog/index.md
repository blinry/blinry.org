---
title: Blog
---

What here?

<% @item.children.chronologic.reverse.each do |item| %>
- <%= link_to item %> (<%= item[:published] %>)
<% end %>
