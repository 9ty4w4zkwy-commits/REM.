# Audit funzionale REM 5.6 → candidata modulare

Fonte: ispezione della struttura HTML del file originale `REM_Iterazione3_Focus_Mode.html` (copia caricata dall'utente); verifica della candidata `rem-candidata.html` e di `lab/modules/app-core.js`. Questo **non** sostituisce il confronto visivo con screenshot.

| Area | Originale approvato | Candidata | Esito |
| --- | --- | --- | --- |
| Navigazione | Home e Biblioteca distinte, `homeView`, `libraryView` | Biblioteca iniziale, nessuna Home equivalente | **Manca** |
| Discovery | «Scelti per te», risposte modificabili, «Continua a leggere», «Novità», sezioni gratis/premium | Ricerca libri e cronologia letture | **Manca la discovery** |
| Biblioteca | Griglia libri e possibilità di aggiungere libri/capitoli | Catalogo JSON con libro singolo e testo migrato | **Parziale** |
| Scheda libro | «Un libro. Tre modi di viverlo», scelta Cartaceo/Ebook/Audio | Selettore formati; solo ebook attivo nella candidata | **Parziale, per scelta prudente** |
| Cartaceo | Pagina indicativa, parole lette, ricerca del punto, conversione in ebook/audio | Sincronizzazione cartacea disabilitata | **Manca** |
| Ebook | Lettura, selezione frase/segnalibro, tema chiaro/scuro, dimensione testo | Lettura completa, capitoli, note, temi, dimensione testo, progressi | **Parziale: manca selezione frase/segnalibro** |
| Audio | Lettore audio nel prototipo originale | Audio non disponibile nella candidata | **Manca** |
| Focus | Focus Mode integrata nella UX approvata | Timer e lettura immersiva autonomi | **Parziale: da confrontare** |
| Onboarding | Percorso originale integrato con preferenze e discovery | Benvenuto semplificato con tema | **Manca la parità** |
| Mobile | Prototipo approvato come riferimento | Test Chromium con viewport mobile; Safari reale non testato | **Non verificato** |

## Valutazione
**Rischio principale:** non basta rifinire la demo modulare. Per rispettare il riferimento REM 5.6 servono migrazione delle schermate Home/discovery, scheda libro e flussi di lettura, oltre a un confronto visivo reale. Il catalogo modulare è pronto a supportare questo lavoro; la parità funzionale **non è raggiunta**.

## Ordine di intervento (senza nuove funzioni accessorie)
1. Chiudere i test automatici della candidata.
2. Recuperare Home, discovery e scheda libro con la gerarchia dell'originale.
3. Recuperare onboarding e selezione/segnalibro; definire esplicitamente quali funzioni audio/cartaceo siano realisticamente implementabili.
4. Confrontare screenshot per schermata, predisporre anteprima indipendente e test Safari iPhone.

Non modificare il riferimento ufficiale su `main`.
