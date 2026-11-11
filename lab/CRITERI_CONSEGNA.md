# REM — criteri di uscita dal laboratorio

Aggiornato: 11 novembre 2026. Questo documento è un controllo di consegna, non una dichiarazione di completamento.

## Obiettivo e vincoli
- Riferimento ufficiale approvato: `rem-recupero-due-libri-focus.html` su `main`, da non modificare.
- Lavorare solo sul ramo `rem-lab-modularizzazione-v1`.
- REM 5.6 deve restare il riferimento per aspetto, gerarchia, interazioni e Focus Mode.
- Il catalogo deve pilotare libri, capitoli e presentazione, senza sostituzioni fragili di stringhe.
- Il libro «La casa oltre il bosco» va eliminato **solo dalla versione candidata** quando il catalogo modulare è verificato, mantenendo «Il conte di Montecristo». Non rimuoverlo dall'originale approvato.
- Non chiedere test all'utente prima di avere un URL singolo funzionante su iPhone.

## Stato verificato
- [x] Ramo separato, file ufficiale non modificato.
- [x] Catalogo JSON e testi originali estratti in file separati.
- [x] Lettore modulare, navigazione capitoli, progressi locali, ricerca, note, temi, Focus di base.
- [x] Workflow per controlli statici e browser Chromium mobile simulato.
- [ ] Tutti i test dell'ultimo commit verdi.
- [ ] Confronto visivo documentato, schermata per schermata, con REM 5.6.
- [ ] Migrazione dell'onboarding approvato (attualmente solo prima schermata semplificata).
- [ ] Funzionalità audio reale, oppure disabilitazione esplicita delle opzioni non supportate.
- [ ] Catalogo candidato con solo Montecristo, senza modificare la sorgente originale.
- [ ] URL di anteprima unico accessibile da Safari iPhone, distinto dal sito ufficiale.
- [ ] Test Safari iPhone e verifica manuale delle interazioni principali.
- [ ] Verifica finale delle regressioni e approvazione prima di qualsiasi promozione su `main`.

## Regola anti-loop
Non introdurre nuove funzionalità accessorie prima di aver chiuso i test, verificato il confronto visivo e predisposto la candidata con catalogo finale. Ogni aggiornamento deve riportare risultati positivi, problemi e blocchi ancora aperti. Un test statico verde non implica compatibilità Safari né fedeltà visiva.
