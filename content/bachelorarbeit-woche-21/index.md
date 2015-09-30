---
title: "Bachelorarbeit, Woche 21: LaTeX-Tipps und Abgabe!"
published: 2013-11-30T07:32+0100
tags: german, bachelor,report
---

Am Donnerstag habe ich die Bachelorstudiengangsabschlussbescheinigung abgegeben, yay! Die letzten Wochen war noch recht viel zu tun, weshalb ich das Gefühl hatte, mir keine Zeit für einen ausführlichen Blogpost nehmen zu können. Heute berichte ich von der Arbeit selbst, in einem kommenden Post dann noch vom Abschlussvortrag.

Hier kommt zunächst die [Arbeit als PDF](nut-shell.pdf) mit anklickbaren Querverweisen. Im Original sind die Seitenabstände anders, um zweiseitig schöner auszusehen. Der LaTeX-Sourcecode ist [auf GitHub](https://github.com/blinry/bachelor-thesis). Wer dieses Blog verfolgt hat, ist mit dem Inhalts bereit größtenteils vertraut. Neu sind Beschreibung und Auswertung der Evaluation.

Ich war überrascht und etwas enttäuscht, dass sich am Institut niemand die Zeit nahm, die Arbeit nochmal inhaltlich durchzugehen und zu kritisieren. Während ich mitbekommen habe, dass an anderen Instituten die Abschlussarbeiten oft zu einem guten Teil das Werk des Betreuers sind, war ich hier fast vollständig auf mich allein gestellt. Es war einerseits ganz schön, so autonom arbeiten zu können, andererseits bin ich sicher, dass die Arbeit bei einer intensiveren inhaltlichen Betreuung noch deutlich besser, formaler und tiefgehender hätte werden können.

## LaTeX

Auch für lange Dokumente betreut Enrico [LaTeX-Klassen im Corporate Design der TU](http://enricojoerns.de/tubslatex/). Während die einwandfrei aussehen, gefallen mir die Schriftarten nicht besonders, daher verwende ich ein blankes `scrreprt`.

Ich möchte euch folgende LaTeX-Pakete empfehlen, auf die ich beim Schreiben gestoßen bin:

- [**microtype**](http://ctan.org/pkg/microtype) ist ein Schritt hin zur typografische Perfektion: Es optimiert Buchstabenabstände, macht die Seitenränder optisch gerade und minimiert Worttrennungen. Ein Blick in das (interaktive!) Handbuch sei höchst empfohlen!
- [**cleveref**](http://www.ctan.org/pkg/cleveref) erlaubt textuelle Verweise auf Referenzen per `\cref{<name>}`, wobei der *Typ* des verlinkten Dinges angefügt wird (der Verweis lautet dann zum Beispiel "figure 3.14"). Es gibt auch Befehle für "on page 42" etc.
- [**menukeys**](http://www.ctan.org/pkg/menukeys) habe ich zum Erstellen von hübschen Darstellungen von Tastenkombinationen benutzt (`\keys{\ctrl + C}`), es eignet sich auch zum Formatieren von Menüfolgen (`\menu{Extras > Settings > General}`).
- [**listings**](http://www.ctan.org/pkg/listings) ist recht gut bekannt für das Erstellen von Codelistings, ich möchte hier nur nochmal unterstreichen, dass das Paket sehr hübsch konfigurierbar ist: Man kann sehr einfach eigene Umgebungen für verschiedene Sprachen anlegen und eigenes Syntaxhighlighting definieren - für meine *nutsh*-Codeschnipsel oder für EBNF-Grammatiken war das sehr praktisch.
- [**pgfplots**](http://www.ctan.org/pkg/pgfplots) benutze ich zum Zeichnen von Balken- und Boxplot-Diagrammen. Es basiert auf dem Zeichenpaket PGF/Ti*k*Z (was ebenfalls höchst extremst empfehlenswert ist!), ist ziemlich mächtig und gut konfigurierbar. Ich bin nicht restlos begeistert vom Interface, habe mich aber auch nicht lange damit beschäftigt und es tut was es soll.

## Nitpicker

Das [*Nitpicker tool*](http://nitpickertool.com/) beschreibt sich als "overly picky language style checker". Es überprüft formale englische Texte automatisch auf häufige grammatikalische, semantische und Rechtschreibfehler (verdammte *passive voice* ;-). Ich habe das Tool in einem Lightning Talk auf einem der letzten Kongresse kennengelernt und finde es inzwischen unersetzlich, um die gröbsten Schnitzer aus Texten rauszubügeln, bevor man es Menschen zu Lesen gibt. Benutzt es!

Fun fact: Das Nitpicker tool wird durch Katzenbilder angetrieben: [1](https://twitter.com/blinry/status/342322384080084992), [2](https://twitter.com/blinry/status/396338026164396032).

## Motivation

![Symbolbild: Research paper vs Internet](research-paper-vs-internet.jpg)

Beim eigentlichen Schreiben fiel es mir teilweise sehr schwer, konzentriert zu bleiben und nicht herumzuprokrastinieren. Irgendwann kramte ich einen Motivationstrick heraus, den ich auch schon beim Lernen für Klausuren erfolgreich angewendet habe: Die *Pomodoro technique*. Die funktioniert so:

1. Man stellt einen Küchenwecker auf eine halbe Stunde.
2. Solange der Wecker tickt, arbeitet man möglichst konzentriert, ohne sich ablenken zu lassen.
3. Wenn der Wecker klingelt, malt man ein Kreuz irgendwohin und macht fünf Minuten Pause (Lüften, Nahrungs- und Flüssigkeitszufuhr, Äkta manniskor gucken).
4. Nach jeweils vier Kreuzen macht man eine längere Pause von etwa einer halben Stunde. Dann GOTO 1.

Und das funktioniert ganz hervorragend für mich. Ich freue mich immer sehr auf die kommende Pause und schaffe es, mich während der halben Stunde nicht ablenken zu lassen. Mithilfe dieser Technik habe ich in den drei letzen Wochen vor der Abgabe etwa 6 bis 7 Stunden pro Tag konzentriert gearbeitet.

*Pomodoro* ist übrigens das italienische Wort für "Tomate" - der Typ, der sich das ausgedacht hat, hat einen Küchenwecker in Tomatenform benutzt.
