---
title: Blog
---

<% blog.each do |item| %>
<%= item[:published].strftime("%Y-%m-%d")%> -- <%= link_to item %><% if item[:tags] %> / <span class="meta"><%= tags_for item %></span><% end %>
<% end %>
