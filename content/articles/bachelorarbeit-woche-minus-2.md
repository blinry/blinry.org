---
title: "Bachelorarbeit: Woche -2"
published: 2013-06-11T19:50+0200
tags: german, thesis
---

*In den kommenden Monaten möchte ich hier über den Entstehungsprozess meiner Bachelorarbeit berichten. Das soll mich zu einer strukturierten, kontinuierlichen Arbeitsweise motivieren -- und vielleicht ist es auch ganz unterhaltsam zu lesen, in welche Fallen und Probleme ich so laufe. :-P*

*Das Thema geistert mir schon seit einiger Zeit im Kopf herum, und die Bachelorarbeit ist eine gute Gelegenheit, sich mal intensiv damit auseinanderzusetzen. Hier ist die erste Themenbeschreibung:*

Es geht um Entwurf und Umsetzung eines Frameworks zum Erstellen interaktiver
Kommandozeilen-Tutorials.

Zur Motivation: Momentan kranken Tutorials zum Erlernen von Shells oder Skriptsprachen meiner Meinung nach daran, dass der Benutzer seine Aufmerksamkeit zwischen dem Terminal und dem Textdokument, das das Tutorial enthält, hin- und herwandern lassen muss. Das Tutorial ist statisch und kann weder auf Fehler des Benutzers reagieren, noch die Erfüllung von Lernzielen überprüfen.
Die Tutorials, die mit dem angestrebten Framework erstellt werden können, unterscheiden sich insofern davon, als dass der erklärende Text mit den Benutzereingaben und den Reaktionen der Kommandozeile verwoben sein soll.

Vorbilder sind dabei auf der einen Seite Text-Adventures bzw. Multi-User Dungeons, die ein ähnliches User Interface haben, als auch existierende Tutorials a la "Try $LANGUAGE in your Browser" (siehe z.B. [Try Ruby](http://tryruby.org), [Try Git](http://try.github.io), [Try Haskell](http://tryhaskell.org)), die allerdings noch bei weitem nicht so dynamisch sind, wie ich mir das wünschen würde.

Hier folgt eine beispielhafte Sitzung, die im Stil eines Text-Adventures ausgeschmückt ist. Diese Erzählweise ist natürlich optional, gefällt mir aber sehr. Der eingerückte Text ist die Handlung, die automatisch erscheint, der Rest ist normale Shell-Interaktion.

        "Eines der wichtigsten Dinge, die ich dir beibringen möchte, ist
        Hilfe zur Selbsthilfe. Hier, ich möchte dir ein Geschenk
        machen."

        Der Meister zieht ein dickes, in Leder gebundenes Buch hervor
        und reicht es dir. Es trägt die Aufschrift 'man'.

        "Dieses Buch enthält das gesammelte Wissen über unsere Welt. Um
        etwas darin nachzuschlagen, sag einfach 'man', gefolgt von dem
        Kommando, über das du etwas wissen möchtest. Möchtest du das
        einmal ausprobieren? Sag dann 'q' wie 'quit', um das Buch wieder
        zu schließen."

    $ man mkdir

        Das Handbuch beginnt, vor dir in der Luft zu schweben und
        schlägt von selbst die Seite über 'mkdir' auf.

    [Anzeige der manpage]

        Das Buch schließt sich wieder.

        "Gut. Ich möchte dir eine Aufgabe stellen, die dich im Umgang
        mit dem Handbuch schulen wird. Ich habe in dieser Höhle eine
        unsichtbare Glaskugel verborgen. Finde heraus, wie du das
        Kommando `ls` dazu bringst, verborgene Gegenstände anzuzeigen.
        Dann bring die Glaskugel in die Abstellkammer."

    $ ls
    abstellkammer/
    schriftrolle
    $ man ls

    [Anzeige der manpage]

    $ ls - A

        Die Luft um dich herum vibriert, und du spürst, wie das
        Universum dich anschreit:

    ls: cannot access -: No such file or directory
    ls: cannot access A: No such file or directory

        "Oh, da hast du dich versprochen: Zwischen das '-' und das 'A'
        gehört kein Leerzeichen!"

    $ ls -A

        Für einen kurzen Moment erfüllt helles Licht die Höhle und du
        kannst sehen, was sich darin befindet:

    abstellkammer/
    schriftrolle
    .glaskugel

        Kurz darauf wird es wieder dunkler.

    $ rm .glaskugel

        Ein Blitz fährt aus deinem ausgestreckten Zeigefinger und trifft
        die Glaskugel, welche in tausend Stücke zerspringt.

        Der Meister seufzt, und setzt eine neue Glaskugel auf den Boden.

        "Diese Dinger sind teuer! Bitte bring diese in die
        Abstellkammer."

    $ echo hilfe

        Deine Stimme hallt von den Wänden der Höhle wieder:

    hilfe

        "Um Dinge zu bewegen, sag `mv`. Lies den ersten Abschnitt im
        Handbuch, um zu erfahren, wie man das Kommando benutzt."

    $ man mv

    [Anzeige der manpage]

    $ mv .glaskugel abstellkammer

        "Ausgezeichnet! Du siehst, wie hilfreich das Handbuch ist. Es
        enthält übrigens auch einen Eintrag über sich selbst."

        "Pass gut auf dein Handbuch auf. Es wird dir ein treuer Freund
        werden."

Einen Codenamen habe ich auch schon: *nutsh*, von "in a nutshell" = "kurz und bündig".
Das Framework soll universell für beliebige Kommandozeileninterfaces einsetzbar sein und könnte beispielsweise zum Lehren folgender Systeme benutzt werden:

- System-Shells (bash, zsh, ...)
- Read-Eval-Print-Loops diverser Programmiersprachen (Ruby, Python, Haskell, ...)
- Tools wie Git oder andere VCS'e, Makefiles, diverse Compiler-Toolchains
- UNIX-Verzeichnisstruktur (das dann "erkundet" werden kann und in dem man ebenfalls Aufgaben erledigen soll)

Um das System zu realisieren, muss eine DSL zur Beschreibung der Tutorials entworfen werden, mit deren Hilfe man bequem Ziele, Fehlerabfragen mit anschließenden Hilfestellungen, Vor- und Nachbedingungen sowie Constraints eingeben kann, die letztendlich eine große state machine modellieren. Der Entwurf einer solchen Sprache wäre vermutlich Hauptproblem der Arbeit. Diese Beschreibung muss dann geeignet geparst und interpretiert/ausgeführt werden (ich habe die Compiler-Vorlesungen gehört).

Technisch soll es so umgesetzt werden, dass nutsh gebuffert mit dem darunterliegenden interaktiven Prozess kommuniziert und -- für den Anwender verborgen -- Bedingungen überprüft und Veränderungen an der Umgebung vornimmt. Die Eingaben des Benutzers und die Ausgaben des Prozesses werden durchgereicht, aber wie oben mit Anmerkungen versehen (Hinweise auf Tippfehler oder falsche Syntax etc.).
Herausforderungen werden hierbei Steuerungskommandos (Pos1, Pfeiltasten) und Shell-spezifische Funktionen wie Tab-Completion sein, die von nutsh verstanden werden müssen, damit das eingegebene Kommando vollständig ermittelt werden kann.

Ein nice-to-have feature wäre ein Webinterface, um nutsh nicht lokal installieren zu müssen.

*Soweit die erste Beschreibung. Das Thema kam ganz gut an, ich werde sehen, dass ich möglichst große Teile des Systems verallgemeinere, um es wissenschaftlich wiederverwertbar zu machen.*

*Nächster Schritt ist dann eine mündliche Themenvorstellung in zwei Wochen, bevor die Arbeit angemeldet wird.*
