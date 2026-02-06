1. Tap (tocco singolo)

Interazioni immediate, gratificanti.

🐾 Blink & Smile

Cosa succede: il gatto sbatte gli occhi, la bocca accenna un sorriso.

Perché funziona: risposta rapida → “è vivo”.

Tecnica:

Animare scaleY degli occhi (0.1 → 1).

Bocca: path morph o opacity swap.

🐱 Head Tilt

Cosa succede: la testa si inclina leggermente a sinistra/destra.

Extra: alterna lato a ogni tap.

Tecnica:

transform-origin: center bottom

rotate(-8deg) / rotate(8deg)

✨ Micro bounce

Cosa succede: piccolo rimbalzo elastico.

Timing: 150–250 ms.

Tecnica:

scale(0.98) → scale(1.02) → scale(1)

2. Long press (pressione prolungata)

Qui puoi costruire “personalità”.

😻 Purr mode

Cosa succede: il gatto vibra lentamente, occhi socchiusi.

Feedback: piccole linee o cuoricini che appaiono.

Tecnica:

Oscillazione translateX(±1px)

Loop finché il dito è premuto.

💤 Sleepy cat

Cosa succede: occhi chiusi + “Zzz” che salgono.

Uscita: rilascio → sbadiglio.

Tecnica:

Zzz come <text> o <path> con opacity + translateY.

3. Swipe (accarezzare il gatto)

Perfetto per touch.

👉 Swipe left/right = Tail wag

Cosa succede: la coda si muove nella direzione dello swipe.

Tecnica:

Coda separata in un <g>

rotate() con transform-origin alla base.

⬆️ Swipe up = Happy jump

Cosa succede: saltino + occhi grandi.

⬇️ Swipe down = offeso / imbronciato

Tecnica:

Jump: translateY(-10px)

Faccia: cambio espressione via opacity.

4. Zone-based interaction (tocchi diverse parti)
👂 Tocchi le orecchie

Reazione: orecchie che si abbassano (fastidio).

Bonus: terzo tap → scatto indietro.

🐽 Tocchi il naso

Reazione: starnuto o occhi strabuzzati.

Tecnica:

Naso come elemento separato con scale(1.2).

🐾 Tocchi la pancia

Reazione: rotola / “attacca la mano” (giocoso).

5. Idle animations (quando non tocchi)

Fondamentali per dare vita.

Coda che si muove lentamente ogni 4–6 s

Orecchie che tremolano

Occhi che seguono il cursore / punto di touch

Respiro leggero (scaleY corpo)

6. Combo / Easter eggs

Per sorprendere.

3 tap rapidi → gatto impazzisce per 1 secondo

Long press + swipe → gatto scappa

Tap notturno (dark mode) → occhi che brillano

7. Consigli tecnici SVG (importanti)

Separa SEMPRE:

testa

occhi

bocca

coda

orecchie
in <g> distinti

Usa:

pointer-events: bounding-box

touchstart / touchend (non solo click)

Preferisci:

transform (non animare path se non necessario)

Durate brevi e easing tipo:

cubic-bezier(0.34, 1.56, 0.64, 1) (effetto “cute”).