---
title: Archive
headless: true
---

<% things.group_by{|t| [t[:published].year, t[:updated] ? t[:updated].year : 0].max}.sort_by{|y,t| -y}.each do |year, things| %>

# <%= year %>

<%= box(things) %>

<% end %>
