import {mapErstellen, mapBorders, layerControlErstellen} from "../create-map.js";
import {grauerPunkt, blauerPunkt, orangerPunkt, gruenerPunkt} from "../define-markers.js";

// Layer groups definieren
let schreibberatung = L.layerGroup();

// Layer-Kontrollen erstellen
let overlayMaps = {

};
layerControlErstellen(overlayMaps);

// Standard-Werte für Layer-Kontrollen und Karte erstellen
const layers = [mapBorders, schreibberatung]
let map = mapErstellen(layers);

// Daten einlesen
let fetchData = await fetch("./db/beratungsstellen.json");
let standorte = await fetchData.json();

// Marker definieren
let standortObjekt = [];
for (let standort of standorte) {
  // Phase und marker klären
  let marker = gruenerPunkt;

  // Block Überschrift
  const blockUeberschrift = (standort.website) ? `<b><a href='${standort.website}' target='_blank'>${standort.name}</a></b>` : `<b>${standort.name}</b>`;

  // Block Kontaktpersonen/Mails
  let listeBeratungsstellen = "";
  let ueberschriftBeratungsstellen = "<hr><b>Beratungsstellen</b>";
  let richtigeKategorie = false;
  if (standort.beratungsstellen.length >= 1) {
    for (let stelle of standort.beratungsstellen) {
      if (stelle.kategorien.includes("schreiben")) richtigeKategorie = true;
      let name = (stelle.website) ? `<br><a href='${stelle.website}' target='_blank'>${stelle.name}</a>` : `<br>${stelle.name}`;
      let mail = (stelle.mail) ? ` <a href='mailto:${stelle.mail}'><i class="far fa-envelope"></i></a>` : "";
      listeBeratungsstellen += name + mail;
    }
  }
  let blockBeratungsstellen = ueberschriftBeratungsstellen + listeBeratungsstellen;

  // Popup definieren
  let popup = L.responsivePopup().setContent(`${blockUeberschrift}${blockBeratungsstellen}`);

  // Alles zusammenführen und zur Karte hinzufügen
  if (richtigeKategorie) {
    standortObjekt[standort.id] = L.circle(standort.koordinaten, marker);
    standortObjekt[standort.id].addTo(map)
    standortObjekt[standort.id].bindPopup(popup);
    standortObjekt[standort.id].bindTooltip(standort.name);
  }
}