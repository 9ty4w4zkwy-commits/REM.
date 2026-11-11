# REM — Modularizzazione controllata (ramo di sviluppo)

## Stato verificato
- La versione pubblicata ufficiale è `rem-recupero-due-libri-focus.html` e non va modificata senza approvazione.
- `rem-laboratorio.html` carica ancora `REM_Iterazione3_Focus_Mode.html` e applica sostituzioni testuali.
- `lab/catalog/books.json` è inventario, non sorgente attiva della UI.
- `lab/modules/catalog.js` carica dati, ma la UI legacy non dipende ancora da essi.
- La sorgente storica pesa circa 26 MB.
- Non sono documentati test end-to-end su Safari iPhone.

## Obiettivo del ramo
1. Inventariare riferimenti a libri, contenuti, stato, navigazione e funzioni.
2. Estrarre il catalogo senza modificare l'esperienza visiva.
3. Collegare rendering Biblioteca/Home al catalogo, mantenendo invariati i due libri.
4. Estrarre contenuti/capitoli, poi eliminare gradualmente il caricatore a sostituzioni.
5. Centralizzare token, logo e componenti grafici solo dopo confronto con lo stile ufficiale.
6. Eseguire test di regressione: onboarding, Home, Biblioteca, lettura, audio, Focus timer, progressi e rating.

## Regole
- Lavorare su questo ramo, non sulla versione ufficiale né sul main pubblicato.
- Non rimuovere `La casa oltre il bosco` finché il catalogo non governa la UI.
- Non dichiarare completata la modularizzazione prima di test funzionali e visivi.
- `lab/styles/design-tokens.css` è una predisposizione **non attiva**: valori e logo sono provvisori e non devono essere interpretati come grafica approvata.
- Richiedere approvazione prima della promozione a main/ufficiale.
