# orca-nrw-karte

Version: 0.9.6. Stand: 2024-02-13.

Dies ist eine Karte, die alle Netzwerkstellen und OER-Policies der teilnehmenden Hochschulen in NRW darstellt.

## Einbindung in eigene Websites

 Die Karte kann mittels diesem Einbettungscode eingebettet werden:

 ```html
 <iframe src="https://mrkwnzl.github.io/orca-nrw-karte/karte.html" height="550" width="100%"></iframe>
 ```

 ## Standort-Datenbank

Die Standort-Datenbank findet sich unter `db/standorte.json`. Es handelt sich um ein Array mit einem JSON Object für jeden Standort. So ist die Datei aufgebaut:

```
[
  {
    "id": "",                         // Eine eindeutige ID. Notwendig.
    "name": "",                       // Name der Uni. Notwendig.
    "koordinaten": [ y, x ],          // Koordinaten auf der Karte in Pixeln. Notwendig.
    "phase": 1,                       // Aktuelle Projektphase. Bedeutung siehe unten. Notwendig.
    "website": "",                    // Website der Uni. Optional.
    "kontaktpersonen": [              // Netzwerkstellen. Optional.
      {
        "name": "",                   // Name der Netzwerkstelle. Notwendig.
        "abteilung": "",              // Abteilung, in der die Netzwerkstelle angesiedelt ist. Optional.
        "mail": "",                   // Mailadresse der Netzwerkstelle. Optional.
        "website": ""                 // Website der Netzwerkstelle. Optional.
      }
    ],
    "policyVeroeffentlichung": "",    // Datum der Veröffentlichung der OER-Policy. Optional.
    "policyLink": ""                  // Link zur OER-Policy. Optional.
  }
]
```

Die Entwicklungsphasen sind:

```
0 = Noch keine Policy.
1 = Entwurfsphase.
2 = Gremienphase.
3 = Veröffentlicht.
```

## Contribution

Pull Requests bitte auf den develop-Branch richten. Pull Request auf den main-Branch werden mit Hinweis auf den develop-Branch gelöscht.

## Lizenzen und Attribution

[CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) Marko Wenzel.

[Simple.css](https://simplecss.org) by Kev Quirk is licensed under the MIT license.

[Leaflet](https://leafletjs.com) by Vladimir Agafonkin is licensed under the BSD-2-Clause license.

[Leaflet.SlideMenu](https://github.com/unbam/Leaflet.SlideMenu) by Masashi Takeshita is licensed under the MIT License.