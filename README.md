# spotimeet

### Flusso requests tipico

`/artist?q=gigi`
Cerca tutti gli artisti con questa keyword. 

Se *non vi è alcun record* nella collection **artists** mongo, verranno cercati su spotify con il token dell'utente loggato.

I tours possono risultare vuoti se non precedentemente presenti. *Successivamente* all'invio della **response** sarà contattata la API di Ticketone per la ricerca degli eventi.
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

La risposta contiene anche i `tours` dell'artista. Il tour `_id` viene utilizzato per cercare le date degli eventi nella collection **events**
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
    "d'alessio"
  ],
  "tours": [
    {
      "_id": "665af46ac5b4ccfcdebe36d6",
      "repo_id": "3491031",
      "__v": 0,
      "image": "https://ticketone.it/obj/media/IT-eventim/teaser/222x222/2024/gigi-dalessio-napoli-biglietti-2.jpg",
      "name": "Gigi D'Alessio - Uno Come Te - L'emozione continua",
      "url": "https://ticketone.it/gigi-dalessio-uno-come-te-lemozione-continua-3491031"
    },
    ...
  ]
}
```

`/group/artist/665228cdc7f742572b7feac8`
Cerca tutti gli eventi dell'artista, i cui `_id` sono utilizzati per joinare i gruppi.

Gli eventi sono raggruppati per tours.

**NB.** viene utilizzato il document ID dell'artista, non è più necessario contattare spotify.
```
[
  {
    "_id": "665af46ac5b4ccfcdebe36d6",
    "repo_id": "3491031",
    "__v": 0,
    "image": "https://ticketone.it/obj/media/IT-eventim/teaser/222x222/2024/gigi-dalessio-napoli-biglietti-2.jpg",
    "name": "Gigi D'Alessio - Uno Come Te - L'emozione continua",
    "url": "https://ticketone.it/gigi-dalessio-uno-come-te-lemozione-continua-3491031",
    "events": [
      {
        "_id": "665af46ac5b4ccfcdebe36e1",
        "repo_id": "18117435",
        "__v": 0,
        "city": "NAPOLI",
        "date": "2024-06-08T19:00:00.000Z",
        "url": "https://ticketone.it/event/gigi-dalessio-uno-come-te-lemozione-continua-piazza-del-plebiscito-18117435/"
      },
      ...
    ]
  },
  ...
]
```

`/group/event/665af46ac5b4ccfcdebe36e1`
Restituisce l'object ID del gruppo, utile per autenticarsi al socket di chat

Il resto dei metadati in `event` e `event.tour` può essere usato per compilare una eventuale schermata di microfrontend.
```
{
  "event": {
    "_id": "665af46ac5b4ccfcdebe36e1",
    "repo_id": "18117435",
    "__v": 0,
    "city": "NAPOLI",
    "date": "2024-06-08T19:00:00.000Z",
    "tour": {
      "_id": "665af46ac5b4ccfcdebe36d6",
      "repo_id": "3491031",
      "__v": 0,
      "image": "https://ticketone.it/obj/media/IT-eventim/teaser/222x222/2024/gigi-dalessio-napoli-biglietti-2.jpg",
      "name": "Gigi D'Alessio - Uno Come Te - L'emozione continua",
      "url": "https://ticketone.it/gigi-dalessio-uno-come-te-lemozione-continua-3491031"
    },
    "url": "https://ticketone.it/event/gigi-dalessio-uno-come-te-lemozione-continua-piazza-del-plebiscito-18117435/"
  },
  "members": [...],
  "messages": [...],
  "_id": "665af8e6168f20a0f5d96654",
  "__v": 0
}
```

`/group/global/665228cdc7f742572b7feac8`
Restituisce l'object ID del gruppo GLOBALE, non legato ad alcun evento
```
{
  "artist": {
    "_id": "665228cdc7f742572b7feac8",
    "name": "Gigi D'Alessio",
    "uri": "spotify:artist:4eSMsVzRJHhN1aq0IvZcyn",
    "followers": 502913,
    "image": "https://i.scdn.co/image/ab6761610000e5eb4d76c44c7fb0a3784ebbd77f",
    "url": "https://open.spotify.com/artist/4eSMsVzRJHhN1aq0IvZcyn",
    "searchTerm": [
      "gigi",
      "d'alessio"
    ],
    "tours": [
      {
        "_id": "665af46ac5b4ccfcdebe36d5",
        "repo_id": "3502211",
        "__v": 0,
        "image": "https://ticketone.it/obj/media/IT-eventim/teaser/222x222/2024/gigi-outdoor-biglietti-2.jpg",
        "name": "Gigi Outdoor 2024",
        "url": "https://ticketone.it/gigi-outdoor-2024-3502211"
      },
      ...
    ],
    "__v": 0,
    "lastUpdate": "2024-06-01T10:19:48.016Z"
  },
  "members": [...],
  "messages": [...],
  "_id": "665af95c168f20a0f5d9665c",
  "__v": 0
}
```