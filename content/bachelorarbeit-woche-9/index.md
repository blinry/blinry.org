---
title: "Bachelorarbeit, Woche 9: DSL-Syntax"
published: 2013-09-04T10:31+0200
tags: german,report
---

Der [letze Eintrag](/bachelorarbeit-woche-3/) ist nun schon eine ganze Weile her, höchste Zeit für ein Statusupdate!

## Sprache

Die Sprache, in der man Tutorials verfassen kann, nenne ich *nutsh*, in Analogie zur *Nut Shell*. Sie ist viele Iterationen durchlaufen, bis ich etwas fand, was mir mächtig genug erscheint, möglichst einfach zu lesen und zu schreiben und simpel umzusetzen ist. Die Irrwege schildere ich vielleicht ein anderes Mal ;-)

### Grundlagen

Die Sprache basiert stark auf Strings (`"blabla"`). Stringausdrücke kann man verknüpfen (`"bla"+"bla"`), sowie auf Gleichheit überprüfen (`"bla" == "bla"`). Außerdem kann man überprüfen ob ein String einem Regulären Ausdruck entspricht (`"bla" =~ "b.."`). Jeder String kann als Wahrheitswert interpretiert werden, der bei einem leeren String *falsch* ist, ansonsten *wahr*. Die Vergleichsoperatoren geben bei Erfolg den (beliebig gewählten) String `"true"` zurück. Die üblichen logischen Operationen (`!` für *nicht*, `&&` für *und* sowie `||` für *oder*) sind entsprechend definiert.

Es gibt noch die Kontrollfluss-Strukturen *if-else* sowie *prompt*, und man kann Funktionen definieren und aufrufen, und das reicht dann auch schon. Variablen sind nicht notwendig, weil man die auch in der Zielsprache definieren kann.

Naja, und typische C-Kommentare gibt es auch (`//` für Zeilenkommentare, `/* ... */` für Blockkommentare).

### Grundbefehle

Ganz zentral ist die Ausgabe von erklärendem Text. Dieser wird eingerückt und farbig hervorgehoben.

    say("Dies ist erklärender Text")

Weil der Befehl so oft verwendet wird, kann man auch einfach schreiben:

    "Dies ist die Kurzform"

Um einen Befehl im Kommandozeilen-Prozess auszuführen, benutzt man `run`. Rückgabewert ist die Ausgabe des Befehls.

    run("echo testinhalt > /tmp/testdatei")

Ich überlege noch, ob auch hier eine Abkürzungsmöglichkeit sinnvoll wäre, etwa

    !"echo testinhalt > /tmp/testdatei"

### Kontrollfluss

Ganz wichtig ist die *Prompt-Schleife*:

    prompt {
        // Befehle
    }

Sie Semantik ist die einer Endlosschleife, zu deren Beginn jeweils ein Befehl vom Benutzer eingelesen wird. Sie kann durch ein `break` verlassen werden.

Es gibt zwei eingebaute Funktionen `command` und `output`, die jeweils das zuletzt eingegebene Kommando und dessen Ausgabe zurückgeben.

Weiterhin gibt es if-else Ausdrücke, deren Syntax stark von Go beeinflusst ist (keine Klammern um die Bedingung):

    if command =~ "^rm " {
        "OMG!"
    } else {
        "Brav!"
    }

### Funktions-Definition

Mehrfach verwendete Codeschnipsel kann man in Funktionen auslagern:

    def exit_status {
        return(run("echo $?"))
    }

    def say_twice(text) {
        say(text)
        say(text)
    }

    prompt {
        say_twice("Der Rückgabewert war '"+exit_status+"'")
    }

Funktionen ohne Argumente können auch ganz ohne Klammern aufgerufen werden.

### Umgebende Zustände

Möchte man für eine Gruppe von Prompt-Schleifen die gleichen Bedinungen überprüfen, kann man diese Syntax benutzen:

    def help {
        if command =~ "help" {
            "Don't panic!"
        }
    }

    help {
        prompt {
            if command =~ "panic" {
                break
            }
        }

        "Zweite Chance..."
        prompt {
            if command =~ "panic" {
                break
            }
        }
    }

Das bedeutet: "Zu Beginn jedes Prompt-Durchlaufs, führe die Funktion `help` einmal aus. Das geht auch mit mehreren Funktionen:

    def stay_in(dir) {
        if ! run("pwd") =~ "^"+dir {
            say("Bitte komm wieder zurück nach `"+dir+"`!")
            prompt {
                if run("pwd") =~ "^"+dir {
                    break
                }
            }
            "Okay, weiter im Text."
        }
    }

    def help {
        if command =~ "help" {
            "Don't panic!"
        }
    }

    run("cd /tmp")

    stay_in("/tmp"), help {
        "Wie spät ist es?"
        prompt {
            if command == "date" {
                break
            }
        }

        "Und wer bist du?"
        prompt {
            if command == "whoami" {
                break
            }
        }
    }

Die Syntax einer solchen "Zustands-Schachtelung" hat mich am längsten aufgehalten, mit dem Ergebnis bin ich aber sehr zufrieden.

### Was noch fehlt

Ein Tutorial braucht Metainformationen (Zielsprache, Name, nutsh-Version), man braucht eingebaute Funktionen zum Springen zwischen Lektionen und vielleicht auch ein `goto`, das wird sich zeigen.

Was ich außerdem möchte, ist ein eingebauter Befehl `expect`, mit dem man automatisiert überprüfen kann, ob man durch Eingabe dieses Befehls in den entsprechenden Zustand gelangt.

## Umsetzung

Das Lexen, also das Zerlegen des Sourcecodes in seine Bestandteile (Strings, Keywords, Identifier, Operatoren, Klammern) ist hier so einfach, dass ich das in einer kurzen Funktion selbst mache.

Zum Parsen, also zum Erkennen der Struktur, benutze ich die *yacc*-Version, die zusammen mit Go ausgeliefert wird, und mache damit ganz gute Erfahrungen.

Den resultierenden Parse-Baum kann man dann sehr einfach interpretieren, auch dazu später vielleicht einmal mehr.

## Wie geht es weiter?

Ich habe noch anderthalb Wochen bis zum Beginn des Vorkurses, in denen ich Inhalte erstellen und die aufgeführten noch fehlenden Sprachelemente umsetzen werde. Ich werde eine Onlineevaluation vorbereiten, um die Eindrücke der Vorkurs-Teilnehmer etwas quantifizieren zu können. Insbesondere wird es eine zweite "Kontrollgruppe" geben, die noch mit den alten Aufgabenblättern arbeitet, um eine Vergleichsmöglichkeit zu haben.

Ich bin gespannt!

Zum Abschluss noch die kurze Lektion aus dem [letzen Blogpost](/bachelorarbeit-woche-3/) in *nutsh*:

    def common_mistakes {
        if command == "1s" {
            "Das ist ein kleines L, keine Eins! Probier's nochmal!"
        }
        if command == ".." {
            "`..` ist der Name des Verzeichnisses, du musst noch dazusagen,
            was du damit machen möchtest. Um \"hinzugehen\", schreib `cd`
            davor."
        }
        if command == "cd.." {
            "Da fehlt noch ein Leerzeichen zwischen `cd` und `..`!"
        }
    }

    def stayinroot {
        if !(run("pwd") =~ run("echo $ROOT")) {
            run("cd $ROOT")
            "Bleib bitte erstmal hier."
        }
    }

    run("ROOT=/tmp/nutsh")

    run("rm -rf $ROOT")
    run("mkdir $ROOT")
    run("cd $ROOT")

    run("mkdir schuhkarton")
    run("mkdir schrank")
    run("touch schrank/jacke")
    run("touch schrank/hut")
    run("touch linker_schuh")

    "Hallo! Willkommen in der Nut-Shell! Ich möchte dir zeigen, wie du
    mithilfe der Kommandozeile schnell und einfach mit Dateien und
    Verzeichnissen umgehen kannst."

    "Legen wir gleich los: Tipp mal `ls` ein und drück Enter."

    common_mistakes, stayinroot {
        prompt {
            if command == "ls" {
                "Genau. `ls` steht kurz für \"list\" und zeigt dir die
                Dateien und Verzeichnisse an, die sich in deinem
                \"aktuellen\" Verzeichnis befinden. Die Verzeichnisse
                werden dabei blau dargestellt."

                "Du bist gerade in einem Ordner namens `/tmp/nutsh` - das
                steht auch in dem blauen Text, den wir \"Prompt\" nennen.
                Der Prompt endet mit einem Dollarzeichen, das heißt soviel
                wie: \"Du kannst jetzt ein Kommando eingeben!\""

                break
            }
        }

        "Du hast vielleicht gesehen, dass sich hier ein Verzeichnis namens
        `schrank` befindet. Um dieses zu deinem aktuellen Verzeichnis zu
        machen, tippst du `cd`, dann ein Leerzeichen und dann den Namen des
        Verzeichnisses, in das du möchtest. Begib dich doch mal in den
        Schrank und sieh dich darin um!"

        prompt {
            if run("pwd") == run("echo $ROOT/schrank") {
                if command == "ls" {
                    "Genau. Hast du bemerkt, wie sich der Prompt geändert
                    hat?"

                    break
                }
            }
        }

        "Und wenn du wieder aus dem Schrank herausmöchtest? Die Abkürzung
        für das Verzeichnis oberhalb des aktuellen ist `..`!"

        prompt {
            if run("pwd") == run("echo $ROOT") {
                break
            }
        }

        "Gut. So, nun brauchen wir ein wenig Magie... *pling*"

        "[Der Schrank rumpelt und ächzt]"

        run("mkdir -p $ROOT/schrank/magische_tür/tür{1..3}")
        run("touch $ROOT/schrank/magische_tür/tür2/rechter_schuh")

        "Im Schrank hat sich nun etwas verändert. Geh hinein und such den
        rechten Schuh."

        prompt {
            if run("pwd") == run("echo $ROOT/schrank/magische_tür/tür2") {
                if command =~ "ls" {
                    "Du hast ihn gefunden! Nun komm wieder aus dem Schrank
                    heraus!"

                    break
                }
            }
        }

        prompt {
            if run("pwd") == run("echo $ROOT") {
                break
            }
        }

        "Gut! So, das war eine Einführung in `ls` und `cd`. Hier ist das
        Tutorial erstmal zu Ende! Danke!"
    }
