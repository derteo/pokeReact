# PokéReact — Pokédex

Pokédex web moderno costruito con **React 19**, **Material UI** e i dati pubblici di **[PokéAPI](https://pokeapi.co/)**. Permette di sfogliare, filtrare, cercare e consultare i dettagli di tutti i Pokémon del Pokédex nazionale (1–1025), con interfaccia responsive e supporto al tema chiaro/scuro.

> Progetto didattico, non affiliato a Nintendo, Game Freak o The Pokémon Company. Tutti i dati (nomi, sprite, statistiche, descrizioni) sono forniti da PokéAPI.

---

## Indice

1. [Funzionalità](#funzionalità)
2. [Stack tecnologico](#stack-tecnologico)
3. [Struttura del progetto](#struttura-del-progetto)
4. [Requisiti](#requisiti)
5. [Guida all'installazione (da zero, su una nuova macchina)](#guida-allinstallazione-da-zero-su-una-nuova-macchina)
6. [Avvio del progetto](#avvio-del-progetto)
7. [Script disponibili](#script-disponibili)
8. [Build di produzione e anteprima](#build-di-produzione-e-anteprima)
9. [Configurazione ed eventuali variabili d'ambiente](#configurazione-ed-eventuali-variabili-dambiente)
10. [Risoluzione dei problemi più comuni](#risoluzione-dei-problemi-più-comuni)
11. [Crediti e licenza dei dati](#crediti-e-licenza-dei-dati)

---

## Funzionalità

### Pagina Home — Pokédex sfogliabile
- **Griglia responsive di card**: ogni Pokémon è mostrato con numero identificativo (`#001`, `#025`, ecc.), artwork ufficiale, nome e tipi. La griglia si adatta automaticamente al dispositivo (1 colonna su mobile, fino a 4 su desktop).
- **Filtro per tipo**: un menu a tendina permette di filtrare l'intero Pokédex per tipo (Fuoco, Acqua, Erba, ecc.). Il filtro è riflesso nell'URL (`?type=fire`), quindi è condivisibile e persiste al ricaricamento della pagina.
- **Paginazione**: i risultati (20 Pokémon per pagina) sono paginati con un controllo dedicato in fondo alla pagina; anche la pagina corrente è salvata nell'URL (`?page=2`). Se un numero di pagina non valido viene inserito manualmente, l'app corregge automaticamente all'ultima pagina disponibile.
- **Stato di caricamento**: durante il recupero dei dati vengono mostrati skeleton loader animati al posto delle card, per un'esperienza percepita più fluida.
- **Gestione errori**: in caso di problemi con l'API viene mostrato un messaggio d'errore chiaro invece di una schermata vuota o bianca.

### Ricerca globale (barra di navigazione)
- Campo di ricerca **autocomplete** sempre visibile in alto, che suggerisce i Pokémon mentre si digita, cercando sia per nome che per numero di Pokédex.
- Ammette anche testo libero (es. "mr mime" viene convertito automaticamente nello slug corretto `mr-mime` richiesto dalle API).
- Selezionando un suggerimento o premendo Invio si viene reindirizzati direttamente alla scheda del Pokémon.

### Pagina di dettaglio Pokémon
- **Scheda completa**: artwork ufficiale in alta risoluzione, numero identificativo, nome, tipi (con chip colorati coerenti con il tipo), altezza, peso e descrizione testuale (Pokédex flavor text, con priorità alla lingua italiana e fallback all'inglese se non disponibile).
- **Abilità**: elenco delle abilità del Pokémon, con indicazione delle abilità nascoste ("nascosta").
- **Statistiche base**: barre di progresso per HP, Attacco, Difesa, Attacco Speciale, Difesa Speciale e Velocità, con valore numerico e proporzione visiva rispetto al massimo teorico (255).
- **Navigazione rapida Precedente/Successivo**: due frecce permettono di scorrere il Pokédex nazionale Pokémon per Pokémon senza tornare alla lista. I pulsanti si disabilitano automaticamente ai confini del Pokédex nazionale (#1 e #1025) e per le forme speciali/alternative (es. Pikachu Gigamax), dove una navigazione sequenziale non avrebbe senso.
- **Skeleton dedicato** durante il caricamento e pagina di errore con link di ritorno al Pokédex se il Pokémon richiesto non esiste.

### Tema chiaro / scuro
- Interruttore in alto a destra per passare da tema chiaro a scuro in qualunque momento.
- La preferenza scelta viene **salvata nel browser** (`localStorage`) e riproposta ai successivi accessi; alla primissima visita l'app rispetta automaticamente la preferenza di sistema (`prefers-color-scheme`).

### Pagina 404
- Qualunque URL non riconosciuto (Pokémon inesistente escluso, che ha una propria gestione errori) mostra una pagina 404 a tema con link di ritorno alla Home.

### Qualità e robustezza tecnica
- **Routing lato client** con React Router: navigazione istantanea senza ricaricare la pagina.
- **Code-splitting per rotta**: ogni pagina viene caricata solo quando serve, riducendo il peso del bundle iniziale e velocizzando il primo caricamento.
- **Retry automatico delle chiamate API**: in caso di errori di rete transitori o di limitazioni temporanee da parte di PokéAPI (HTTP 429/5xx), le richieste vengono ritentate automaticamente con backoff prima di mostrare un errore all'utente.
- **Annullamento richieste in corso** (`AbortController`): se l'utente cambia pagina o filtro prima che una richiesta precedente sia terminata, questa viene annullata per evitare aggiornamenti di stato inutili o inconsistenti.
- **Cache in-memory** dell'indice completo dei Pokémon usato dalla ricerca, per evitare di riscaricarlo ad ogni digitazione.

---

## Stack tecnologico

| Ambito | Tecnologia |
|---|---|
| Libreria UI | [React 19](https://react.dev/) |
| Componenti / design system | [Material UI (MUI) v9](https://mui.com/) |
| Routing | [React Router v8](https://reactrouter.com/) |
| Build tool / dev server | [Vite](https://vite.dev/) |
| Linting | [ESLint](https://eslint.org/) |
| Dati | [PokéAPI](https://pokeapi.co/) (API REST pubblica, nessuna chiave richiesta) |

Non sono presenti backend, database o servizi esterni da configurare: l'applicazione è un **client puro** (Single Page Application) che comunica direttamente con le API pubbliche di PokéAPI.

---

## Struttura del progetto

```
pokeReact/
├── index.html                  # Entry point HTML
├── package.json                # Dipendenze e script npm
├── vite.config.js              # Configurazione Vite
├── eslint.config.js            # Configurazione ESLint
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # Bootstrap dell'app React
    ├── App.jsx                  # Routing, tema e code-splitting delle pagine
    ├── theme.js                 # Definizione del tema MUI (chiaro/scuro)
    ├── index.css                # Stili globali di base
    ├── api/
    │   └── pokeapi.js           # Client HTTP verso PokéAPI (con retry automatico)
    ├── hooks/
    │   ├── usePokemonList.js    # Lista paginata/filtrata dei Pokémon (Home)
    │   ├── usePokemonDetail.js  # Dettaglio di un singolo Pokémon
    │   ├── usePokemonIndex.js   # Indice completo per la ricerca (con cache)
    │   └── useTypeList.js       # Elenco dei tipi disponibili per il filtro
    ├── pages/
    │   ├── HomePage.jsx         # Pagina Pokédex con griglia, filtro e paginazione
    │   ├── PokemonDetailPage.jsx# Scheda di dettaglio Pokémon
    │   └── NotFoundPage.jsx     # Pagina 404
    ├── components/
    │   ├── Layout/
    │   │   ├── Layout.jsx       # Struttura comune (navbar + contenuto + footer)
    │   │   └── Navbar.jsx       # Barra di navigazione con ricerca e toggle tema
    │   ├── PokemonCard.jsx      # Card Pokémon nella griglia
    │   ├── PokemonCardSkeleton.jsx
    │   ├── PokemonDetailSkeleton.jsx
    │   ├── StatBar.jsx          # Barra statistica (HP, Attacco, ecc.)
    │   ├── TypeChip.jsx         # Etichetta colorata per il tipo
    │   └── ErrorState.jsx       # Componente di errore riutilizzabile
    └── utils/
        └── pokemon.js           # Funzioni di formattazione (nomi, id, colori tipo, ecc.)
```

---

## Requisiti

Per eseguire il progetto su una macchina nuova servono solo due strumenti:

- **Node.js** versione **20 o superiore** (consigliata la versione LTS più recente, o comunque Node 22+). Node.js include automaticamente **npm**, il gestore di pacchetti usato dal progetto.
- Una connessione internet attiva, perché l'app scarica i dati in tempo reale da PokéAPI (non funziona offline).

Non sono richiesti database, Docker, chiavi API o altri servizi esterni.

### Come verificare se Node.js è già installato

Aprire un terminale (su Windows: *Prompt dei comandi* o *PowerShell*; su macOS/Linux: *Terminale*) e digitare:

```bash
node -v
npm -v
```

Se entrambi i comandi restituiscono un numero di versione (es. `v22.x.x` e `10.x.x`), Node.js è già installato correttamente e si può passare direttamente alla sezione [Guida all'installazione](#guida-allinstallazione-da-zero-su-una-nuova-macchina).

Se invece il terminale restituisce un errore tipo "comando non trovato", Node.js non è installato: seguire i passi seguenti.

### Installazione di Node.js (se non presente)

1. Andare sul sito ufficiale [nodejs.org](https://nodejs.org/).
2. Scaricare la versione **LTS** (consigliata per la maggior parte degli utenti) corrispondente al proprio sistema operativo (Windows, macOS o Linux).
3. Eseguire l'installer scaricato e seguire la procedura guidata lasciando le opzioni predefinite (npm viene installato automaticamente insieme a Node.js).
4. Al termine, riaprire il terminale e ripetere i comandi `node -v` e `npm -v` per confermare l'installazione.

In alternativa, su Linux è possibile installare Node.js tramite gestore di pacchetti (es. `sudo apt install nodejs npm` su Debian/Ubuntu) oppure tramite un version manager come [nvm](https://github.com/nvm-sh/nvm), utile se in futuro si dovranno gestire più versioni di Node.js sulla stessa macchina.

---

## Guida all'installazione (da zero, su una nuova macchina)

1. **Ottenere il codice del progetto** sulla nuova macchina, ad esempio copiando l'intera cartella `pokeReact` (via chiavetta USB, cloud, ecc.) oppure clonandola da un repository Git, se disponibile:

   ```bash
   git clone <url-del-repository>
   cd pokeReact
   ```

   Se invece si è semplicemente copiata la cartella del progetto, aprire un terminale ed entrare nella cartella:

   ```bash
   cd percorso/della/cartella/pokeReact
   ```

2. **Installare le dipendenze del progetto**. Questo comando legge il file `package.json` e scarica in locale (nella cartella `node_modules`, creata automaticamente) tutte le librerie necessarie al funzionamento dell'app:

   ```bash
   npm install
   ```

   L'operazione può richiedere da qualche decina di secondi a qualche minuto, a seconda della velocità della connessione. È normale che al termine vengano mostrati alcuni avvisi ("warning") relativi a versioni delle dipendenze: non sono bloccanti e non impediscono il funzionamento dell'app.

A questo punto l'installazione è completa e il progetto è pronto per essere avviato.

---

## Avvio del progetto

Per avviare l'applicazione in modalità sviluppo (quella consigliata per testarla in locale):

```bash
npm run dev
```

Il terminale mostrerà un output simile a:

```
  VITE ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

A questo punto:

1. Aprire un browser (Chrome, Firefox, Edge, Safari, ecc.).
2. Digitare nella barra degli indirizzi l'URL indicato, tipicamente **`http://localhost:5173`**.
3. L'app Pokédex dovrebbe caricarsi mostrando la griglia dei primi Pokémon.

La modalità sviluppo include l'**hot reload**: qualsiasi modifica al codice sorgente viene riflessa immediatamente nel browser senza bisogno di ricaricare manualmente la pagina.

Per interrompere il server di sviluppo, tornare al terminale e premere `Ctrl + C`.

> Nota: se la porta 5173 risulta già occupata da un altro processo, Vite sceglierà automaticamente la prima porta libera successiva (es. 5174) e lo indicherà a schermo.

---

## Script disponibili

Tutti i comandi vanno eseguiti dalla cartella principale del progetto (dove si trova `package.json`):

| Comando | Descrizione |
|---|---|
| `npm run dev` | Avvia il server di sviluppo locale con hot reload, per testare l'app durante lo sviluppo. |
| `npm run build` | Genera la versione ottimizzata per la produzione nella cartella `dist/`. |
| `npm run preview` | Avvia un piccolo server locale che serve la build di produzione appena generata, utile per verificarla prima del deploy. |
| `npm run lint` | Analizza il codice sorgente alla ricerca di problemi di stile o potenziali errori, tramite ESLint. |

---

## Build di produzione e anteprima

Quando si vuole generare una versione del sito pronta per essere pubblicata online (ad esempio su un hosting statico):

```bash
npm run build
```

Il comando crea (o sovrascrive) la cartella `dist/`, contenente file HTML, CSS e JavaScript ottimizzati e minificati, pronti per essere caricati su un qualsiasi hosting statico (Netlify, Vercel, GitHub Pages, un normale server web, ecc.).

Per verificare in locale che la build di produzione funzioni correttamente prima di pubblicarla:

```bash
npm run preview
```

Il comando avvia un server locale (di norma su `http://localhost:4173`) che serve esattamente i file generati in `dist/`, così da poterli testare in condizioni il più possibile simili a quelle reali.

---

## Configurazione ed eventuali variabili d'ambiente

Il progetto **non richiede alcuna configurazione aggiuntiva**: non sono necessarie chiavi API, file `.env` o credenziali di alcun tipo, poiché PokéAPI è un servizio pubblico e gratuito, interrogato direttamente dal browser dell'utente.

L'unico requisito di funzionamento è una connessione internet attiva al momento dell'uso dell'app.

---

## Risoluzione dei problemi più comuni

**"Comando `npm` non riconosciuto" durante l'installazione o l'avvio**
Node.js non è installato correttamente, oppure il terminale è stato aperto prima di completare l'installazione. Chiudere e riaprire il terminale; se il problema persiste, reinstallare Node.js seguendo la [guida sopra](#installazione-di-nodejs-se-non-presente).

**Errori durante `npm install`**
Provare a cancellare la cartella `node_modules` e il file `package-lock.json`, poi ripetere l'installazione da capo:

```bash
rm -rf node_modules package-lock.json
npm install
```

*(su Windows, con PowerShell, usare invece `Remove-Item -Recurse -Force node_modules, package-lock.json`)*

**La pagina si apre ma non mostra alcun Pokémon / restano visibili solo gli skeleton di caricamento**
Verificare la connessione internet: l'app dipende da PokéAPI (`https://pokeapi.co`) per funzionare. Se il servizio è temporaneamente sovraccarico, l'app effettua automaticamente alcuni tentativi di richiesta prima di mostrare un messaggio d'errore esplicito.

**Porta già in uso**
Se compare un errore relativo alla porta 5173 già occupata, chiudere l'altro processo che la sta utilizzando oppure lasciare che Vite selezioni automaticamente una porta alternativa (viene indicata a schermo nell'output del comando `npm run dev`).

**La ricerca nella barra di navigazione non restituisce risultati subito dopo l'avvio**
Al primo caricamento l'indice di ricerca (l'elenco completo dei Pokémon) viene scaricato in background: può richiedere qualche istante prima di essere disponibile, specialmente con connessioni lente.

---

## Crediti e licenza dei dati

- Tutti i dati relativi ai Pokémon (nomi, sprite, statistiche, tipi, descrizioni) sono forniti da **[PokéAPI](https://pokeapi.co/)**, un progetto open source e gratuito.
- Pokémon e i relativi nomi sono marchi registrati di Nintendo, Game Freak e The Pokémon Company. Questo progetto è realizzato a puro **scopo didattico** e non è in alcun modo affiliato o sponsorizzato da tali aziende.
