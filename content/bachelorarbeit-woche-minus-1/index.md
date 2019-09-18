---
title: "Bachelorarbeit, Woche -1: Zukunftspläne"
published: 2013-06-24T18:21+0200
tags: german,report
imgtitle: "jorago, CC-BY-NC-SA 3.0, http://jorago.deviantart.com/art/Broken-nut-shell-281776516"
---

Nanu? Im [letzten Blogpost](/bachelorarbeit-woche-minus-2/) schrieb ich doch noch, diese Woche würde die Arbeit angemeldet? Ja, aber wegen Terminüberschneidungen wurde das noch eine Woche nach hinten geschoben. Also, Woche -1. Was habe ich gemacht?

## Präsentation zur Themenvorstellung

Am Institut, an dem ich die Arbeit schreibe, ist es üblich, dem Institutsleitenden die Themen von Abschlussarbeiten in einer kurzen mündlichen Präsentation vorzustellen. Hier ist die [derzeitige Fassung](ba-themenvorstellung-beta.pdf). Die Inhalte sind weitgehend identisch zum Text des letzten Posts, neu hinzugekommen sind ein paar Bildchen und eine Animation des Beispiels.

Es gibt ein offizielles LaTeX-Paket namens [tubslatex](http://enricojoerns.de/tubslatex/), mit dem man unter anderem auch Präsentationen im Corporate Design der TU erstellen kann. Die Beispieldokumente sehen sehr schick aus, und die Dokumentation taugt auch, es ist mir allerdings trotz einiger hartnäckiger Versuche nicht gelungen, das Paket unter Arch Linux zu installieren. Probleme machen die Schriftarten, man kann zwischen Arial und der „Hausschrift“ Nexus wählen. Bei ersterer fehlte eine benötigte Datei, Nachinstallieren führte zu anderen lustigen Fehlermeldungen, die ich bisher nicht verstanden habe. Bei zweiterer „funktionierte“ alles, die angezeigte Schrift hatte aber ein abscheuliches Kerning und war auch garantiert nicht Nexus. Naja. Ich benutze jetzt [Dominiks Template](https://github.com/dschuermann/TU-Braunschweig-Latex-Beamer-Template) mit einigen kleinen Farbanpassungen, das tut auch, was es soll.

## Sprache

Als Training möchte ich die Arbeit auf Englisch schreiben. Letztes Semester habe ich *Scientific Writing* gehört und fühle mich dementsprechend gut darauf vorbereitet. Ich habe mit mehreren Personen gesprochen, die sehr gute Erfahrungen damit gemacht haben, englische Abschlussarbeiten zu schreiben.

Mein Betreuer wies mich darauf hin, dass die Lektionen für die bash-Shell, die wir im Vorkurs auf die Ersties loslassen wollen, auf Deutsch verfasst sein sollten. Berechtigter Einwand, insofern werde ich versuchen, die eigentliche Arbeit klar von den beispielhaften Anwendungen zu trennen, und Beispiele für den Fließtext notfalls zu übersetzen.

Hier schreibe ich über die Arbeit bisher auf Deutsch, um der Leser-Zielgruppe entgegenzukommen.

## Titel

Der Arbeitstitel lautet bisher

> Design and Implementation of a Framework for Creating Interactive Command Line Tutorials

und beschreibt die Sache aus meiner Sicht recht gut. Bis zur Anmeldung habe ich dennoch Zeit, daran herumzufeilen. Reizvoll fände ich beispielsweise, den Namen des Frameworks (*The Nut Shell*) noch als Vorsatz mit hineinzunehmen.

## Prototyp

Und ich hatte auch ein wenig Spaß am Gerät: Ich habe einen winzigen Prototypen in der Sprache [Go](http://golang.org) gebaut, der sich um einen Kommandozeilenprozess wickelt und dessen Standardein- und -ausgabe mit dem aufrufenden Terminal verknotet. Das geht ganz prima, man kann dadrin auch Vim starten :-)

Am Rande: Mit Go beschäftige ich mich erst seit einigen Wochen, möchte aber bereits sagen: *C schmeckt hervorragend, wenn man es kurz vor dem Verzehr durch Go ersetzt.* Ernsthaft, die Sprache ist so gut, wie alle sagen. Mehr dazu vielleicht mal später.
