# REM — Piano di sviluppo del prototipo

## Principi
- Mobile-first: uso prioritario su iPhone/Safari, compatibile desktop.
- Riferimento visivo: Switch STEP5C_Correzioni_Home_Audio_Netlify.zip (versione approvata). Non modificare grafiche senza approvazione.
- Primo libro: Il conte di Montecristo. Catalogo estensibile a tre libri.
- HTML/CSS/JS leggero, niente MP3 incorporati in base64.
- Iterazioni tracciate su GitHub; prima di dichiarare funzionante una feature, verificarla.

## MoSCoW — trascrizione delle priorità dal documento «MoSCoW Method v2»
### Must
1. Switch tra formati, sviluppato a wave (un formato alla volta).
2. Community con condivisione della libreria e degli scaffali digitali.
3. Personalizzazione della lettura sul modello Netflix: capire il lettore attraverso il comportamento, non chiedere semplicemente cosa gli piace.

### Should
1. Trailer del libro.
2. Recap dell'episodio precedente.
3. Libri in episodi con cliffhanger e durata prevista.
4. Focus Mode con impostazioni predefinite personalizzabili (opzioni da decidere).

### Could (non priorità della prima release)
- Trailer episodio successivo; eventi narrativi di gamification; libro LEGO; recensioni creative; mappa recap; biblioteca interrogabile con AI; lettura AI personalizzata.

### Won't
- Nessuna voce definita.

## Implementazione per fasi
- Fase 0: collegamento repository e pubblicazione automatica (da configurare).
- Fase 1: migrazione visiva della Step 5C, rimozione asset pesanti inline, lettore del Conte di Montecristo.
- Fase 2: Must e Should, con prototipi esplicitamente distinti dalle funzioni che richiedono backend o utenti reali (community, raccomandazioni comportamentali).
- Fase 3: estensione a tre libri, test iPhone/desktop.

> Questo documento è una roadmap iniziale, non una dichiarazione di funzionalità già implementate.
