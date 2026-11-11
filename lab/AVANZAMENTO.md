# Stato REM Laboratorio — ramo modularizzazione

## Fatto
- Isolato un ramo che non altera la versione pubblicata.
- Creata una demo autonoma con catalogo JSON realmente usato per la Biblioteca.
- Separato un estratto dimostrativo di Montecristo in chapters.json.
- Il titolo Casa è presente nell'inventario ma non apribile nella demo finché i contenuti non vengono migrati: nessuna falsa promessa di disponibilità.
- Introdotta validazione di ID univoci e riferimenti capitolo/libro.
- Predisposto controllo automatico Node.js e verifica sintattica tramite GitHub Actions.
- Colore d'accento della demo modificabile senza riscrivere l'app.

## Non fatto / limiti
- **Non è stata migrata REM 5.6**: la demo non ha onboarding, UX e tutte le funzioni approvate.
- **Non è stata migrata la libreria completa**: solo un breve estratto testuale dimostrativo, non un episodio completo.
- Audio e switch sincronizzato tra ebook, audio e cartaceo non sono implementati; il selettore mostra stati dimostrativi.
- La versione principale del Laboratorio continua a usare il caricatore legacy.
- Mancano test browser end-to-end e verifica visiva Safari iPhone.
- Le verifiche automatiche controllano schema e sintassi, non l'esperienza utente.

## Prossima fase ad alto rischio
Analizzare il file storico da 26 MB e individuare le fonti effettive di catalogo, capitoli, copertine, audio, stato e navigazione. Migrare in piccoli passaggi, senza sostituzioni testuali cumulative e senza intervenire su main. Ogni passaggio va confrontato con REM 5.6 e verificato su Safari prima della promozione.
