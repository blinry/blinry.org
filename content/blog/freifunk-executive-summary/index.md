---
title: Freifunk, executive summary
published: 2014-01-29T12:22+0100
tags: german, tech
---

Ich habe mir vor zwei Wochen [*Freifunk*](http://freifunk.net/) genauer angeguckt, und möchte euch hier mal zusammenfassen, was ich gelernt habe. Die Grundidee ist, in einer Stadt viele WLAN-Router aufzustellen, die sich untereinander vermeshen und so ein dezentrales (unzensier- und -drosselbares) Kommunikationsmedium bilden.

## Lokale Communities

Für mich, der neu dazukommt, ist die Organisation der Community zunächst befremdlich: Jede Stadt pflegt ein eigenes Wiki, Mailinglisten und Standortkarten, was zu großer Informationsfragmentierung führt. Oft bauen die Städte sogar ihre eigene Firmware. Ist wohl gelebte Dezentralisierung, wirkt auf mich aber ineffizient. Die [Community-Karte](http://freifunk.net/wie-mache-ich-mit/community-finden/) listet derzeit 57 Communities in Deutschland und Österreich auf.

## Funktionsweise

Üblicherweise machen die Freifunk-Router zwei WLAN-Netze auf: Eines im Access Point-Modus, damit sich Endgeräte drauf verbinden können, eines im Ad-Hoc-Modus, zur Vernetzung mit anderen Routern.

Früher benutzte Freifunk das [OLSR-Routingprotokoll](https://de.wikipedia.org/wiki/Optimized_Link_State_Routing), welches permanent die gesamte Netzwerktopologie auf alle Knoten verteilt. Das skalierte wohl nicht so gut, weshalb einige Freifunker eine einfachere Alternative entwickelten: [B.A.T.M.A.N](https://en.wikipedia.org/wiki/B.A.T.M.A.N.) ("Better Approach To Mobile Adhoc Networking"). Ein Knoten ruft regelmäßig ins Netz, dass er da ist und merkt sich für jeden anderen Knoten, aus welcher Richtung er die meisten dieser Broadcast-Nachrichten empfangen hat. In diese Richtung werden dann Pakete geschickt, die für diesen Knoten bestimmt sind. Fertig.

Es gibt übrigens einen regelmäßigen Wettbewerb, in dem Mesh-Routing-Protokolle gegeneinander antreten, [*Battle Mesh*](http://www.battlemesh.org/) ;-)

## Hardware

In allen Stadt-Communities sind zur Zeit die Router der chinesischen Firma *TP-LINK* beliebt, und zwar in der Schnittmenge folgende Geräte:

- *TL-WR741ND*: 4 MB Flash, 32 MB RAM, eine Antenne, ca. 23 Euro. Der Flash scheint recht knapp zu sein, reicht aber für normale Knoten aus. Das "D" im Namen bedeutet jeweils, dass man die Antennen austauschen kann, gibt die meisten auch mit fest verbauten Antennen.
- *TL-WR841ND*: Hardware wie oben, aber zwei Antennen (doppelte Datenrate per [MIMO](https://de.wikipedia.org/wiki/MIMO_(Nachrichtentechnik)), ca. 22 Euro. Es gibt von Hardwareversion 8 wohl eine "chinesische Version", die crappy ist (halber Flash und RAM). Hier bekommt man aber meistens die unabgespeckte internationale Version.
- *TL-WR842ND*: Zusätzlicher USB 2.0-Port, ca. 42 Euro.
- *TL-WR1043ND*: Schnellere CPU, 8 MB Flash, 64 MB RAM, drei Antennen, USB 2.0, mit Gigabit-Ports, ca. 45 Euro. Laut Kiel "für größere Aufgaben geeignet".
- *TL-WDR3500*: 8 MB Flash, 128 MB RAM, drei Antennen, ca. 36 Euro. Unterstützt als einziger dieser Liste 5GHz-Frequenzen (wovon manche aber wegen geringerer Reichweite durch stärkere Streuung für diesen Zweck auch eher abraten). Momentane Empfehlung von Berlin.

Ich habe mir mal testweise einen *TL-WR841ND* gekauft und die [Hamburger Firmware](http://hamburg.freifunk.net/kurzanleitung) draufgespielt, dauert vielleicht 10 Minuten, dann ist der Router online.

## Braunschweig?

Braunschweig befindet sich auf der [Community-Karte](http://freifunk.net/wie-mache-ich-mit/community-finden/) in einem ziemlichen Freifunk-Loch. Große "Nachbarn" sind Halle, Bielefeld und Hamburg. Hannover reaktiviert sich angeblich gerade wieder, im [Forum](http://hannover.freifunk.net/) ist allerdings bisher wenig Aktivität.

Im Freifunk-Wiki gibt es eine [Seite über Braunschweig](http://wiki.freifunk.net/Freifunk_Braunschweig), die von vereinzelten Anläufen berichtet (letzte Änderung: 2009), die Mailaddressen sind nicht mehr erreichbar. Auf der [Hamburger Karte](http://hamburg.freifunk.net/wo-wird-gefunkt) findet man zur Zeit vier Knoten, die mit der Hamburger Firmware ausgestattet sind (die ermöglicht von Haus aus Internetzugriff über ein VPN in die Niederlande, wo es keine [Störerhaftung](https://de.wikipedia.org/wiki/Störerhaftung) gibt.

## Weitere Ressourcen

* [CRE045 über B.A.T.M.A.N.](http://cre.fm/cre045-batman)
* [Erklärbär floflei6 über Freifunk und HUMMUS!](https://www.youtube.com/user/perspektive89/videos?view=0&flow=list&live_view=500&sort=da)

Wenn ihr noch Fragen habt, gerne [her damit](/about/)!
