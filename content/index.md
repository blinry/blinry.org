---
title: Home
---

Introtext

Here's how to [contact](/contact/) me.

<% blog[0..4].each do |item| %>
<% render "article", {:item => item} do %>
<%= item.compiled_content %>
<% end %>
<% end %>
