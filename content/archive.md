---
title: Archive
headless: true
---

<% things.group_by{|t| t[:published].year}.sort_by{|y,t| -y}.each do |year, things| %>

# <%= year %>

<%= box(things) %>

<% end %>
