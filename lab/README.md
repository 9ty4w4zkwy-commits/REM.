# REM Laboratorio — registro tecnico

## Obiettivo
Preparare la versione REM 5.6 approvata (due libri, onboarding, Focus Mode, lettura, audio, valutazioni) a iterazioni frequenti senza patch cumulative.

## Stato attuale (parziale)
- `rem-laboratorio.html`: pagina di prova separata dall'ufficiale.
- `lab/modules/focus-timer.js`: timer Focus estratto dal caricatore storico.
- `lab/modules/cover.js`: logica della copertina estratta.
- `lab/styles/legacy-overrides.css`: CSS del caricatore estratto.
- `lab/catalog/books.json`: inventario metadati dei due titoli; **non è ancora il catalogo attivo**.
- `lab/modules/episodes.js`: copia indipendente della logica episodi legacy (non ancora rifattorizzata internamente).
- `lab/modules/catalog.js`: carica e valida `books.json` ed espone `window.REMLabCatalog`; **la UI legacy non lo usa ancora per mostrare i libri**.

## Debito tecnico ancora aperto
1. Il file `REM_Iterazione3_Focus_Mode.html` (circa 26 MB) contiene ancora dati e logica di libri, capitoli, audio, onboarding, lettura e stato. **Non è stato riscritto**.
2. Il caricatore usa ancora sostituzioni testuali per apertura ebook e rating; eliminarle richiede un refactoring della sorgente.
3. Il catalogo JSON è caricato da un modulo indipendente, ma non governa ancora la UI; eliminarvi un libro oggi non lo rimuove dall'app.
4. Manca la verifica end-to-end su Safari iPhone e il confronto visivo con la versione ufficiale.

## Regole di rilascio
- Non modificare `index.html` o `rem-recupero-due-libri-focus.html` durante il lavoro in laboratorio.
- Non eliminare Casa finché il catalogo non governa realmente la UI.
- Una funzione per modulo; modifiche piccole, verificabili e reversibili.
- Test di regressione: onboarding 4 domande, due libri, Biblioteca, ebook, audio/episodi, stelline, timer Focus (5/10/personalizzato, pausa, riprendi, termina), progressi.
- Promozione in ufficiale solo dopo test e approvazione esplicita.

## Controlli effettuati
Sintassi JavaScript del caricatore e dei moduli, validità JSON e presenza dei riferimenti ai file CSS/JS. Nessun test browser iPhone completato.

## Correzione riscontrata nel laboratorio
Il file episodi legacy conteneva una parentesi graffa di chiusura in eccesso in `updateHomeMode`; corretta **solo** in `lab/modules/episodes.js`. La sintassi ora è valida. Il file ufficiale `rem-episodi-v5-6.js` è rimasto intatto.
