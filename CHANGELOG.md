# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0] - 2023-05-11
### Added
- Neue Karte mit Stadt/Kreis-Labeln hinzugefügt.
- Die Karte kann nun mit dem Mausrad gezoomt werden.

### Changed
- Die Farbe der Standorte ohne OER-Policy ist nun heller, damit es für Perseonen mit Farbsehschwäche leichter von anderen Status unterscheidbar ist.
- Update der Kontaktdaten.

### Fixed
- Rechtschreibfehler korrigiert.

## [0.7.0] - 2023-03-21
### Added
- Die Karte ohne Standortliste hat nun ein Ausklappmenu mit der Standortliste.

### Changed
- Updates zur Standortdatenbank

### Removed
- Die Karte ohne Stadtgrenzen wurde entfernt.

## [0.6.1] - 2023-03-06
### Changed
- Policy-Veröffentlichungsstatus TH Köln aktualisiert.

## [0.6.0] - 2023-02-21
### Added
- Neue Karte mit Liste der Standorte sowie eine einzelne Liste.

## [0.5.2] - 2022-09-16
### Fixed
- Typos in der ReadMe korrigiert.

## [0.5.1] - 2022-09-07
### Changed
- standorte.json auf den Stand gebracht.

### Fixed
- Beratungsstellenkarte funtioniert wieder.

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