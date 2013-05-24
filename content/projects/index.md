---
title: Projects
order: 2
---

<% @item.children.each do |item| %>
- <%= link_to item %>
<% end %>
