---
title: "Bachelorarbeit, Woche 13: Gliederung"
published: 2013-10-05T10:33+0200
tags: german, thesis, report
---

## Blick zurück

So, der [Vorkurs](/bachelorarbeit-woche-11/) lief gut, die Teilnehmer schienen mir recht glücklich mit der Nut Shell, ich habe viel positives Feedback bekommen. Ich habe eine kleine Umfrage durchgeführt, um Spaß und Lernfortschritt quantifizieren zu können, die Ergebnisse werde ich in den kommenden Wochen hier veröffentlichen.

## Blick nach vorn

Nun habe ich noch einen Monat zum tatsächlichen Schreiben der Arbeit. Hierzu habe ich eine grobe Gliederung entworfen, unten dargestellt als Outline. Die eingeklammerten Zeilen sind keine eigenen Abschnitte, sondern
Zusammenfassungen der vorgesehenen Inhalte.

Ich habe versucht, den Hauptteil "von unten nach oben" zu strukturieren, also
tatsächlich in der Reihenfolge, in der die Komponenten aufeinander aufbauen:

    Abstract
        (Purpose)
        (Design + evaluation methods)
        (Major results)
        (Summary of conclusions)
    Introduction
        (Topic: Command line tutorials)
        (Motivation: Traditional, static tutorials have problems)
            (Attention shift)
            (No goal affirmation)
            (No reaction to mistakes)
        (Core idea: Interlace tutorial text and CLI)
        (Role model: Text adventures)
        (Research question: Is this approach "better"?)
        (Prior approaches)
            (Try Ruby/Git/Haskell)
            (What's missing in them)
        (Conventions in this thesis)
    Overview
        (Goals and principles)
            (Basic event loop: prompt -> editing -> execution/output)
            (Adaptability to arbitrary "targets")
            (Annotation + environment changing, otherwise raw CLI interaction)
        (Steps of this thesis)
        (Diagram: Layers)
    Design
        Command line parser
            Purpose
                (Recognizing parts of command line output)
            Background
                (How a terminal works)
                (Escape characters)
                (Readline key combinations)
            Architecture
                (Component diagram)
                (Parser EBNF)
            Problems and workarounds
                (Command line editing)
                (...)
        Internal DSL
            (Purpose: High-level layer around CLI parser)
            (Description of necessary DSL calls)
        The nutsh language
            Purpose
                (Describes a self-contained teaching unit, a "lesson")
            Design goals
                (Easy to read and write)
                    (Use syntax the user already knows: Regex + Go syntax)
                    (Introduce new syntax for often-used semantics)
                (Minimize redundance)
                    (DRY, allow reuse of code snippets)
            Properties
                (String-based)
                (Functional)
            Lexical elements
                (Token types)
                (Diagram: State machine)
            Syntax
                (EBNF of language constructs)
            Parsing
                (How YACC works)
            Semantics
                (Specification of language constructs)
            Interpreter
                (State)
                (Function stack)
            Automated testing
                (Motivation)
                (Testing algorithm)
            Examples
    Implementation
        Used technologies
            (Go)
            (kr/pty for terminal emulation)
        High-level design
            (Diagram: Package diagram)
        Command line tool
            Usage
            Builtin functions
    Application and evaluation
        Methods
            Setting
                (Description of setting: Preparatory course for CS students)
                (Previous teaching method)
                (Groups)
            Tutorial
                (Content, examples)
                (Best practises in lesson writing)
            Survey
                (Questions)
        Results
            (Pretty graphs)
            (Statistical evaluation)
    Conclusions
        (Discussion of survey results)
    Limitations and future directions
        (Future directions:)
            (Automated typo detection)
            (Simplified prompt syntax)
            (Lesson dependency tree)
        (Outlook, future of the Nut Shell)
    Acknowledgements
        (...)
    References
        (...)
    Appendix A: Example lesson
        (nutsh source code)
        (Execution output)
    Appendix B: Table of terminal escape codes
        (...)
    Affidavit
        ("Erklärung an Eides statt")

Mit dem langen Kapitel zur Sprache (Spezifikation inklusive Erläuterungen zum
Parsen, Interpretieren, etc.) bin ich noch nicht so zufrieden, vielleicht ist
es lohnend, einige Abschnitte in den "Implementation"-Teil zu verschieben.
Das bricht aber die schöne bottom-up-Struktur. Hm.
