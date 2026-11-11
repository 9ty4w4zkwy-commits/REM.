# Verifica visiva candidata REM — 11 novembre 2026

## Metodo
Esaminate le schermate PNG catturate automaticamente da Chrome mobile (390 × 844) per candidata: onboarding, Home, Biblioteca, dettaglio e lettore; confrontato l'onboarding con lo screenshot della REM 5.6 approvata, acquisito alla stessa larghezza. **Non è un test Safari e non dimostra parità visiva complessiva con la REM 5.6.**

## Riscontri verificati
- **Onboarding:** la candidata riprende logo REM, palette scura, quattro segmenti di progresso, testo e pulsante menta. Rispetto all'originale, l'intestazione è leggermente più in alto, il titolo usa un carattere e una disposizione differenti, e il pulsante «Iniziamo» compare più in basso. La cattura precedente usava `fullPage:true` anche per un overlay fisso: mostrava contenuto sottostante fuori dalla viewport, creando un artefatto nel confronto; corretto lo script di cattura.
- **Home:** leggibile, con titolo editoriale, proposta Montecristo, ripresa della lettura e novità. Non è ancora una riproduzione dell'architettura completa di REM 5.6: mancano alcune sezioni e interazioni della Home originale.
- **Biblioteca/dettaglio:** il percorso verso Montecristo è presente, ma le copertine, la gerarchia e la composizione del dettaglio non sono ancora equivalenti all'interfaccia originale.
- **Lettore:** contenuto originale presente e leggibile; barra di avanzamento, scelta capitolo e opzioni visive funzionano nei test Chrome. Il layout rimane più tecnico e meno immersivo della REM 5.6.
- **Funzionalità non equivalenti:** audio e cartaceo sono esplicitamente non disponibili nella candidata; la parità con le tre modalità originali non è stata raggiunta.

## Gate prima della consegna iPhone
1. Ottenere un URL HTTPS indipendente dalla GitHub Pages ufficiale e verificare che serva HTML/JS/JSON correttamente.
2. Verificare Safari iOS su dispositivo reale, inclusi touch, safe area, persistenza, scorrimento e apertura del lettore.
3. Riesaminare visivamente Home, dettaglio e lettore contro le schermate di riferimento, senza dichiarare parità prematura.
4. Non alterare il ramo principale né la REM 5.6 approvata.

**Stato:** candidato tecnicamente verificato in Chrome; **non ancora approvato visivamente né collaudato su iPhone Safari**.
