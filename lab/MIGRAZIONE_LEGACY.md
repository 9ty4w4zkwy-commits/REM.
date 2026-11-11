# Piano di estrazione dal legacy (senza modifiche alla versione ufficiale)

## Stato di accesso alla sorgente
Il file `REM_Iterazione3_Focus_Mode.html` pesa circa 26 MB. Non è stato possibile scaricarlo integralmente nell'ambiente di analisi; **nessuna estrazione dei contenuti completi è stata effettuata**. Non attribuire al testo dimostrativo la qualità di capitolo completo.

## Inventario delle dipendenze note
- `rem-laboratorio.html`: recupera HTML legacy e applica sostituzioni testuali per apertura ebook e valutazioni.
- `lab/modules/catalog.js`: legge `lab/catalog/books.json` ma non governa l'interfaccia legacy.
- `lab/modules/episodes.js`: mantiene una mappa statica di due titoli e presenta schede episodio dimostrative.
- `lab/modules/focus-timer.js`: timer estratto, non ancora validato su Safari.
- `lab/modules/cover.js`: copertina estratta, non ancora validata su Safari.
- `lab/styles/legacy-overrides.css`: correzioni visive legacy.
- `rem-modulare-demo.html`: nuova dimostrazione indipendente, **non** migrazione funzionale.

## Contratti per la migrazione
1. Un ID stabile per libro; riferimenti da capitoli a libro validati.
2. Capitoli e metadati separati dalla UI, senza testo incorporato nei componenti.
3. Posizione di lettura per libro e formato; la conversione di posizione tra formati richiede una mappatura esplicita e verificata, non una corrispondenza inventata.
4. Asset audio esterni e autorizzati, con stato indisponibile esplicito se assenti.
5. Token di design centralizzati e componenti indipendenti dai colori del marchio.
6. Nessuna promozione a main finché onboarding, Biblioteca, ebook, audio, rating, timer, progressi e grafica non superano regressione.

## Procedura successiva
Ottenere una copia integrale del legacy in un ambiente con accesso al file; censire script inline, dati base64, riferimenti audio, catalogo e gestione stato. Estrarre prima il catalogo attivo, poi i capitoli e gli asset, usando fixture e test. Confrontare comportamento e aspetto con la versione approvata su Safari iPhone.
