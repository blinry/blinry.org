---

title: "Bachelorarbeit, Woche 0: Themenvorstellung und Prototyping"
published: 2013-07-08T14:36+0200
tags: german, thesis, report
---

*Heute mit: PDF-Präsentations-Software, ehrlichem Feedback, Zeitplanung, Anfängen des Shell-Wrappers und dem Führen eines Logbuchs.*

## Themenvorstellung

Letzten Montag habe ich den Themenvorstellungs-Vortrag vor meiner Erstprüferin und einigen Institutsmitarbeitern gehalten. Ich verlinke hier nochmal die [endgültige Fassung der Präsentation](ba-themenvorstellung.pdf) mit mehr Zwischenschritten und leicht umsortierten Folien.

Zur Präsentation des PDFs habe ich [*pdfpc*](http://davvil.github.io/pdfpc/) ("PDF presenter console") benutzt, das einem die verbleibende Zeit, die nächste Folie, den Forschritt innerhalb der Präsentation sowie Notizen anzeigen kann, das eine Folienübersichts- und eine Schwarz-schalt-Funktion hat und das insbesondere mit den "Zwischenschritten" innerhalb von *LaTeX-beamer*-Präsentationen klarkommt. Sehr empfehlenswert!

Das Feedback war kritisch und ehrlich: Die Zuhörer stellten die Überlegenheit eines interaktiven Tutorials gegenüber einem herkömmlichen in Frage und äußerten insofern stärkeres Interesse an der Evaluation, als ich erwartet hatte. Ich glaube, mein "Adventure"-inspiriertes Beispiel war zu verwirrend und lenkte von der eigentlichen Idee ab. Wir diskutierten viel über die Generalisierbarkeit des Systems, die ich nach wie vor für machbar halte; über Edgecases (und "böse" Benutzer, die das System austricksen wollen) - ja, die wird es unvermeidlicherweise geben, man muss möglichst viele Fehlerfälle automatisiert abfangen; und darüber, dass eine Unterstützung bei Syntaxfehlern nur begrenzt möglich ist. Schöne Anregungen waren, in Shells den Rückgabewert von Programmen zu beachten, und ein Tutorial so dynamisch zu machen, dass bei "Vergessen" eines Befehls wieder zu dem jeweiligen Abschnitt zurückgesprungen werden kann.

## Anmeldung

Am Mittwoch, dem 3. Juli, habe ich dann die Arbeit dann im Sekretariat des Instituts angemeldet. Ab jetzt tickt die Uhr, ich habe 4 Monate Zeit bis zur Abgabe, die also - so wurde mir von Seiten des Prüfungsamtes inzwischen bestätigt - spätestens am 3. November erfolgen muss.

Gleichzeitig habe ich zugesagt, beim kommenden *Vorkurs Informatik* mitzuwirken, in dem ich die Nut Shell an Studienanfängern aus informatiknahen Fächern ausprobieren möchte. Der Vorkurs beginnt am 16. September, ich habe also 10 Wochen, um eine vernünftige Implementierung zu bauen, und dann noch 7 Wochen, um die Arbeit aufzuschreiben und die Evaluation auszuwerten. Sounds reasonable.

Bei der Anmeldung wird auch der Titel festgelegt, die Professorin fand meinen Arbeitstitel zu lang, während es meinem Betreuer gefiel, den Namen des Frameworks in den Titel mitzunehmen, insofern lautet dieser nun

> The Nut Shell -- A Framework for Creating Interactive Command Line Tutorials.

Damit bin ich auch sehr zufrieden :-)

## Prototyp

Mein derzeitiges Ziel ist prototyp-hafte Umsetzung eines Programms, das sich um einen Kommandozeilen-Prozess wickelt, Ein- und Ausgabe mitschneidet und erkennt, welche Befehle eingegeben werden, was die Ausgabe dieser Befehle ist und wie der Prompt lautet (die Zeichensequenz die dem Benutzer signalisiert "ich bin bereit, du kannst mir jetzt einen neuen Befehl geben"). Das ist weniger einfach, als es klingt, weil in Ein- und Ausgabe diverse Steuerzeichen auftauchen (in der Eingabe Tasten und Tastenkombinationen zur Bearbeitung der momentatnen Kommandozeile, in der Ausgabe diverse sogenannte Escapesequenzen, die von dem Programm in dem die Kommandozeile läuft (dem *Terminalemulator*) als Aufforderungen verstanden werden, den Cursor zu bewegen, Teile der Zeile zu löschen oder die Textfarbe zu ändern (eine Übersicht der Escape-Codes, mit denen mein Terminal-Emulator *urxvt* zurechtkommt, findet der Linuxbenutzer unter `man 7 urxvt`). Die Abgrenzung der drei genannten Bestandteile ist alles andere als klar.

Das Teilproblem, das eingegebene Kommando zu erkennen, denke ich inzwischen zufriedenstellend gelöst zu haben: Alle mir bekannten Kommandozeilen-Interpreter unterstützen die beiden Tastenkombinationen *Ctrl-U* und *Ctrl-Y*, welche die momentan eingegebenen Zeichen löschen und in einer internen Zwischenablage speichern bzw. die Zwischenablage wieder einfügen. Diese Kombinationen sind deshalb so verbreitet, weil sie Bestandteil einer Programm-Bibliothek namens *Readline* sind, die praktisch überall benutzt wird, wo es darum geht, Text vom Benutzer einzulesen. Was ich also momentan mache, ist den Benutzer die Kommandozeile wie gewohnt eingeben zu lassen, dabei kann er tab-completion, Pfeiltasten, etc. benutzen. Sobald er jedoch Enter drückt, sende ich die Sequenz "*Ctrl-U* *Anfangs-Marker* *Ctrl-Y* *End-Marker* *Enter*" an den unterliegenden Prozess, was dazu führt, dass in der Ausgabe der tatsächlich eingegebene Befehl sauber zwischen zwei Markern steht. Nach guten Markern muss ich noch suchen (unbenutzte Escape-Sequenzen?), momentan schreibe ich einfach einen bestimmten String und lösche ihn direkt wieder...

Andere lustige Ansätze waren übrigens:

- Intern ein eigenes Readline mitlaufen lassen -- funktioniert aber mit vielen Shell-spezifischen Features nicht.
- Die bash hat die Option `set -x`, um Befehle vor der Ausführung nochmals ganz anzuzeigen, soetwas ist mir aus anderen CLIs aber nicht bekannt.
- Pfeil hoch und Pfeil runter senden, was bei command line interfaces mit Befehlshistory ebenfalls dafür sorgt, dass die Befehle erneut geschrieben werden.
- Auf Enter warten, und dann (in der bash) "*Pos1* `CMD="` *End* `"; echo "$CMD"; eval "$CMD"`" senden. Aua.
- History-Datei auslesen. Manche Shells haben aber keine, und die wird oft nur verzögert geschrieben.

Probleme bereiten noch mehrzeilige Befehle. Wie ich allgemein den Beginn des Prompts erkennen könnte, weiß ich überhaupt noch nicht. Auf einen konfigurierbaren regulären Ausdruck plus Pause warten?

## Logbuch

Ich mache hervorragende Erfahrungen damit, beim Arbeiten stets die Seite "Bachelorarbeit" meines [privaten Wikis](/keeping-a-personal-wiki/) offenzuhaben und Ideen, Probleme, wichtige Codeschnipsel, Quellen und Resultate mit Timestamps reinzuschreiben. Das hilft hervorragend gegen „Wo war ich stehengeblieben...?“, und macht mir selbst viele Dinge klarer. Ich hoffe, dass es das spätere Zusammenschreiben wesentlich vereinfacht, weil einfach vieles schon in schriftlicher Form vorliegt.

Dieses "Führen eines Logbuches" erleichtert auch das Schreiben dieser Blogposts ungemein, weil ich einfach nur den ganzen Kladderadatsch seit dem letzten Post durchgucken und zusammenfassen muss ;-)
