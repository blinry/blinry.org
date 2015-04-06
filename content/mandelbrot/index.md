---
title: "Java-Applet: Mandelbrot-Menge"
published: 2011-01-23
tags: german, art, cs
---

Ich lese gerade den *New Turing Omnibus*, ein Buch, das grundlegende Themen der Informatik vorstellt. In einem Kapitel geht es um Fraktale, genauer: Die Mandelbrot-Menge. Ich konnte nicht anders, als den Algorithmus zu implementieren. Das Ergebnis ist atemberaubend.

[Applet öffnen](view/)

Bei etwa 100-Trillionen-facher Vergrößerung ist Schluss: Hier hört stößt der Datentyp `double` an seine Grenzen.

## Algorithmus

Für jeden Pixel mit der Koordinate (j,k) definiert man sich die komplexe Zahl `c = j + ki` sowie ein `x = 0 + 0i` und führt wiederholt (z.B: 100 mal) die Zuweisung `x = x*x + c` aus. Ist der Betrag von x dann noch kleiner als 2, wird wird der Pixel schwarz dargestellt, ansonsten kriegt er ne schöne Farbe. Das ist alles.

Die Mandelbrot-Menge ist übrigens *verbunden*, alle schwarzen Punkte hängen zusammen.
