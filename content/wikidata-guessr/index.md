---
title: Wikidata Guessr
tags: software, game
published: 2017-06-25
---

At the Wikidata-Wahldaten-Workshop in 2017, I made this guessing game. It works a bit like Geoguessr, but it's powered by open data from Wikidata:

You get a picture, and need to guess where on the Earth the depicted object is! To generate the quiz, I sample from all Wikidata objects that have both a [coordinate loction](https://www.wikidata.org/wiki/Property:P625), as well as an [image](https://www.wikidata.org/wiki/Property:P18).

[Play it here!](https://guessr.blinry.org)

[![](bridges.png)](https://guessr.blinry.org)

## Make your own quiz!

The best thing is that you can make your own quizzes! In the dropdown in the bottom left, there's already some ideas, like "only guess the location of parliament buildings". But here's how to make your own type of quiz:

1. Go to [wikidata.org](https://www.wikidata.org).
2. Enter a type of object into the search box in the top right, in singular, for example "bridge".
3. Click the dropdown popup that has the correct description.
4. Copy the Q-number in the title of the page. For "bridge", it's *Q12280*.
5. Add the Q-number to the base URL of the game, like this: `https://guessr.blinry.org/?Q12280`
6. Enjoy your new quiz!
