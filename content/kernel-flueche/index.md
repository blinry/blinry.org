---
title: Kernel-Flüche
published: 2010-07-30
tags: german, fun
---

*Wusstest du, dass sich im Linux-Kernel ganz schön viele Flüche befinden? Sehr unterhaltsam!*

Du brauchst den Quellcode des Kernels (in Ubuntu/Debian gibt's ein Paket namens *linux-source*, das den Kernel ins Verzeichnis */usr/src* legt). Dann gibst du folgende Befehle ein:
    
    cd /tmp
    tar xvf /usr/src/linux-source*
    cd linux-source*
    egrep -ir " (fuck|shit|crap)" .

Viel Spaß!
