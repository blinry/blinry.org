\version "2.18.2"

#(set! paper-alist (cons '("sticker" . (cons (* 105 mm) (* 35 mm))) paper-alist))
#(set-default-paper-size "sticker")

\header {
  tagline = ""
}

\layout {
  indent = #0
  \context {
    \Score
    \omit BarNumber
  }
}

\score {
  \relative c'' {
    \numericTimeSignature
    \time 4/4
    \key c \major
    c4. d g,4
    d'4. e4. g16 f e c~
    \override Staff.Clef #'stencil = ##f
    c4. d g,4~
    g4. r4 g16 g a c a c
  }

  \layout { }
}
