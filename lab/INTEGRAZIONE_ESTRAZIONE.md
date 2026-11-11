# Integrazione dei contenuti originali — stato aggiornato

## Implementato nel ramo sperimentale

- I file `lab/content/book_montecristo.json` (452 segmenti) e `lab/content/book_casa-oltre-bosco.json` (278 segmenti) sono stati estratti dal prototipo originale e pubblicati nel ramo `rem-lab-modularizzazione-v1`.
- `lab/catalog/books.json` dichiara i percorsi dei contenuti; `lab/modules/app-core.js` carica i file, raggruppa i segmenti per capitolo e li presenta nel lettore modulare.
- I capitoli e il formato scelto vengono conservati in localStorage. Il Focus timer dispone di avvio, pausa e azzeramento.
- Se un file originale non è disponibile o presenta segmenti incompleti, il lettore segnala l'errore senza sostituirlo silenziosamente con contenuti dimostrativi.
- I controlli statici e il test browser in Chromium con viewport mobile sono stati completati con successo fino al commit `e1b02f74b949cccaffd406cb159955cdbdd11767`.

## Non ancora implementato o verificato

- Il lettore modulare **non** riproduce ancora la grafica e i flussi della REM 5.6 approvata.
- L'audio non è ancora integrato: il formato audiolibro mostra correttamente uno stato non disponibile.
- Non sono ancora stati migrati onboarding, sincronizzazione completa e gli altri flussi legacy.
- Non è stato eseguito un test su Safari iPhone reale.
- Il ramo di sviluppo non sostituisce il sito pubblicato su main. La versione ufficiale resta invariata.

## Prossimo obiettivo

Migrare progressivamente l'interfaccia approvata in componenti separati, mantenendo catalogo e capitoli come sorgente dati e verificando ogni fase con test browser.
