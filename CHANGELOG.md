# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2022-09-02
### Changed
- Die Karte wurde etwas generalisiert und ermöglicht jetzt leichter, auch andere Daten zu zeigen.
- standorte.json aktualisiert.
- Die Skripte für die einzelnen Karten wurden der Übersicht halber in einen Ordner geschoben.
- Karte wurde angepasst, so dass nur NRW zu sehen ist.
- Die Karte startet nun immer mit Zoomlevel 0, unabhängig von der Größe des Containers.

### Fixed
- Das Label für Hochschulstandorte zeigt jetzt an, dass es sich um ORCA-Mitglieder handelt, die nur keine OER Policy haben.
- Der Leaflet-Container füllt nun die komplette Größe des Containers.

## [0.4.0] - 2022-09-01
### Changed
- Das initiale Zoomlevel hängt nun von der Größe des Containers ab. Ist der Container größer als 524 px in mindestens einer Dimension, ist das Zoomlevel 1, sonst 0.

## [0.3.0] - 2022-08-30
### Added
- develop-Branch hinzugefügt, um Änderungen lokal zu testen, bevor sie live geschaltet werden. Alle Pull Requests bitte auf den develop-Branch anwenden.
- README.md mit Inhalt gefüllt.

### Removed
- Abteilung der Netzwerkstellen. Alle wichtigen Infos findet man auf deren Homepage.

## [0.2.0] - 2022-08-29
### Added
- Alt-Klick zeigt koordinaten auf der Karte.
- Popups zeigen nur die Infos, die auch in standorte.json eingetragen sind.
- Legende hinzugefügt.
- Lizenzen & Attribution hinzugefügt.

## [0.1.0] - 2022-08-27
- Initial release