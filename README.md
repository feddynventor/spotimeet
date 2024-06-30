# spotimeet

### Flusso requests tipico

`/artist?q=gigi`
Cerca tutti gli artisti con questa keyword. 

Se *non vi è alcun record* nella collection **artists** mongo, verranno cercati su spotify con il token dell'utente loggato.

I tours possono risultare vuoti se è la prima volta che si ricerca. *Successivamente* all'invio della **response** sarà contattata la API di Ticketone per la ricerca degli eventi.
```
[
  {
    "_id": "665228cdc7f742572b7feac8",
    "name": "Gigi D'Alessio",
    "uri": "4eSMsVzRJHhN1aq0IvZcyn",
    "followers": 502913,
    "image": "https://i.scdn.co/image/ab6761610000e5eb4d76c44c7fb0a3784ebbd77f",
    "url": "https://open.spotify.com/artist/4eSMsVzRJHhN1aq0IvZcyn",
    "searchTerm": [
      "gigi",
      "d'alessio"
    ],
    "tours": [],
    "__v": 0,
    "lastUpdate": "2024-06-01T10:19:48.016Z"
  }
]
```

`/artist/4eSMsVzRJHhN1aq0IvZcyn`
Restituisce artista tramite URI di spotify.

Se non presente nella collection **artists** mongo, viene cercato su spotify direttamente con l'ID fornito.

La risposta contiene anche i `tours` dell'artista. Essendo nel model `Artist` memorizzati come documenti inline, si usa il repo_id ovvero l'ID di ticketone per la indicizzazione e come chiave primaria
```
{
  "_id": "665228cdc7f742572b7feac8",
  "name": "Gigi D'Alessio",
  "uri": "4eSMsVzRJHhN1aq0IvZcyn",
  "followers": 502913,
  "image": "https://i.scdn.co/image/ab6761610000e5eb4d76c44c7fb0a3784ebbd77f",
  "url": "https://open.spotify.com/artist/4eSMsVzRJHhN1aq0IvZcyn",
  "searchTerm": [
    "gigi",
    "Gigi D'Alessio",
    "d'alessio"
  ],
  "tours": [
    {
      "repo_id": "3502211",
      "name": "Gigi Outdoor 2024",
      "image": "https://ticketone.it/obj/media/IT-eventim/teaser/222x222/2024/gigi-outdoor-biglietti-2.jpg",
      "url": "https://ticketone.it//artist/gigi-d-alessio/gigi-outdoor-2024-3502211/"
    },
    ...
  ],
  "lastUpdate": "2024-06-19T17:48:08.359Z"
}
```

`/group/artist/667da5d65fddf4f6d83f5024`
Si fa riferimento alla risorsa `group` dato che l'intento è cercare gruppi di eventi per l'artista selezionato.

Gli eventi sono raggruppati per tours.

L' `_id` dell'evento è utilizzato per joinare i gruppi.

Viene indicato se l'utente chiamante è già membro o meno

**NB.** viene utilizzato il document ID dell'artista, ora la logica è disaccoppiata da Spotify.
```
[
  {
    "repo_id": "3502211",
    "name": "Gigi Outdoor 2024",
    "image": "https://ticketone.it/obj/media/IT-eventim/teaser/222x222/2024/gigi-outdoor-biglietti-2.jpg",
    "url": "https://ticketone.it//artist/gigi-d-alessio/gigi-outdoor-2024-3502211/",
    "events": [
      {
        "_id": "667da5d89918f6cfb952e2d9",
        "city": "PALERMO",
        "date": "2024-07-05T19:00:00.000Z",
        "url": "https://ticketone.it/event/gigi-dalessio-gigi-outdoor-2024-velodromo-borsellino-17798170/",
        "isMember": true
      },
      {
        "_id": "667da5d89918f6cfb952e2df",
        "city": "ASTI",
        "date": "2024-07-12T19:30:00.000Z",
        "url": "https://ticketone.it/event/gigi-dalessio-gigi-outdoor-2024-piazza-alfieri-18695056/",
        "isMember": false
      },
    ...
    ]
  },
  ...
]
```

`/group/event/667da5d89918f6cfb952e2e8`
Restituisce il documento `Group`, utile per autenticarsi al socket della chat

Il documento `tour` viene recuperato tramite una Promise aggiuntiva, al di fuori di populate di mongoose

Il resto dei metadati in `event` e `event.tour` può essere usato per compilare una eventuale schermata di microfrontend.

```
{
  "_id": "667db0939918f6cfb952e895",
  "event": {
    "_id": "667da5d89918f6cfb952e2e8",
    "city": "BARLETTA",
    "date": "2024-07-17T19:00:00.000Z",
    "tour": {
      "repo_id": "3502211",
      "name": "Gigi Outdoor 2024",
      "image": "https://ticketone.it/obj/media/IT-eventim/teaser/222x222/2024/gigi-outdoor-biglietti-2.jpg",
      "url": "https://ticketone.it//artist/gigi-d-alessio/gigi-outdoor-2024-3502211/"
    },
    "url": "https://ticketone.it/event/gigi-dalessio-gigi-outdoor-2024-fossato-del-castello-18494887/"
  },
  "artist": {
    "_id": "667da5d65fddf4f6d83f5024",
    "name": "Gigi D'Alessio",
    "uri": "4eSMsVzRJHhN1aq0IvZcyn",
    "followers": 515007,
    "image": "https://i.scdn.co/image/ab6761610000e5eb4d76c44c7fb0a3784ebbd77f",
    "url": "https://open.spotify.com/artist/4eSMsVzRJHhN1aq0IvZcyn",
  },
  "members": 2
}
```

`/group/global/667da5d65fddf4f6d83f5024`
Restituisce l'object ID del gruppo GLOBALE, non legato ad alcun evento
```
{
  "_id": "667ea0b79918f6cfb95351cf",
  "artist": {
    "_id": "667da5d65fddf4f6d83f5024",
    "name": "Gigi D'Alessio",
    "uri": "4eSMsVzRJHhN1aq0IvZcyn",
    "followers": 515007,
    "image": "https://i.scdn.co/image/ab6761610000e5eb4d76c44c7fb0a3784ebbd77f",
    "url": "https://open.spotify.com/artist/4eSMsVzRJHhN1aq0IvZcyn",
  },
  "event": null,
  "members": 1
}
```
