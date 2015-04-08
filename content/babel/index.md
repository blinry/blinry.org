---
title: Kunstprojekt "Babel"
published: 2005-09-06
tags: german, art, photo
---

Diese Fotoserie entstand in der zehnen Klasse. Es stellt in achtzehn Bildern zwischenmenschliche Beziehungen mit Büchern dar.

Ich habe auch eine [Reflexion](reflexion.pdf) über die Entstehung geschrieben.

<%

images = %w(
1-Freudschaft.jpg
2-Liebe.jpg
3-Familiensinn.jpg
4-Disziplin.jpg
5-Ueberwachung.jpg
6-Bedrohung.jpg
7-Furcht.jpg
8-Hass.jpg
9-Ausgrenzung.jpg
10-Bedrohung.jpg
11-Misshandlung.jpg
12-Trauer.jpg
13-Angst.jpg
14-Bedraengung.jpg
15-Raserei.jpg
16-Machtlosigkeit.jpg
17-Sehnsucht.jpg
18-Ehrfurcht.jpg
)

images.each do |image|
name = image.clone
name[/\d*-/] = ""
name[/\.jpg/] = ""
%>
## <%= name %>
[![<%= name %>](<%= image %>)](<%= image %>)
<% end %>
