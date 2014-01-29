---
title: Blog
headless: true
---

<% blog[0..4].each do |item| %>
<% render "article", {:item => item} do %>
<%= item.compiled_content %>
<% end %>
<% end %>

<div class="more">
<a href="/archive/">← Previous entries</a>
</div>
