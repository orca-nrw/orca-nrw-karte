import {mapErstellen, mapBorders, layerControlErstellen} from "../create-map.js";
import {grauerPunkt, blauerPunkt, orangerPunkt, gruenerPunkt} from "../define-markers.js";
import {createContent} from "../lists/netzwerk-liste.js";

// Layer groups definieren
let veroeffentlicht = L.layerGroup();
let gremienphase = L.layerGroup();
let entwurfsphase = L.layerGroup();
let hochschulstandort = L.layerGroup();

// Layer-Kontrollen erstellen
let overlayMaps = {
  "<span style='color: rgb(0,104,55);'>&#x25CF;</span> Veröffentlicht": veroeffentlicht,
  "<span style='color: rgb(249,147,28);'>&#x25CF;</span> Gremienphase": gremienphase,
  "<span style='color: rgb(42,168,226);'>&#x25CF;</span> Entwurfsphase": entwurfsphase,
  "<span style='color: rgb(128,128,128);'>&#x25CF;</span> Noch keine Policy": hochschulstandort
};
layerControlErstellen(overlayMaps);

// Standard-Werte für Layer-Kontrollen und Karte erstellen
const layers = [mapBorders, veroeffentlicht, gremienphase, entwurfsphase, hochschulstandort];
let map = await mapErstellen(layers);

// Legende hinzufügen
let legende = L.control({position: "bottomright"});
legende.onAdd = function (map) {
  let div = L.DomUtil.create("div", "legende");
  div.innerHTML += "<span style='color: rgb(0,104,55);'>&#x25CF; </span><span>Veröffentlicht</span>";
  div.innerHTML += "<br><span style='color: rgb(249,147,28);'>&#x25CF; </span><span>Gremienphase</span>";
  div.innerHTML += "<br><span style='color: rgb(42,168,226);'>&#x25CF; </span><span>Entwurfsphase</span>";
  div.innerHTML += "<br><span style='color: rgb(128,128,128);'>&#x25CF; </span><span>Noch keine Policy</span>";
  return div;
};
legende.addTo(map);

// Sidebar
if (!document.getElementById("list")) {
  let sidebar = "<div class='just-list'>" + await createContent() + "</div>";
  L.control.slideMenu(sidebar).addTo(map);
}

// Daten einlesen
let fetchData = await fetch("./db/standorte.json");
let standorte = await fetchData.json();

// Marker definieren
export var standortObjekt = {};
for (let standort of standorte) {
  // Phase und marker klären
  let phase;
  let marker;
  let policyVeroeffentlichung = "";
  if (standort.phase == 0) {
    phase = hochschulstandort;
    marker = grauerPunkt;
    policyVeroeffentlichung = "Noch keine Policy";
  } else if (standort.phase == 1) {
    phase = entwurfsphase;
    marker = blauerPunkt;
    policyVeroeffentlichung = "In Entwicklungsphase";
  } else if (standort.phase == 2) {
    phase = gremienphase;
    marker = orangerPunkt;
    policyVeroeffentlichung = "In Gremienphase";
  } else if (standort.phase == 3) {
    phase = veroeffentlicht;
    marker = gruenerPunkt;
    policyVeroeffentlichung = `Veröffentlicht am ${standort.policyVeroeffentlichung}`;
  }

  // Block Überschrift
  const blockUeberschrift = (standort.website) ? `<b><a href='${standort.website}' target='_blank'>${standort.name}</a></b>` : `<b>${standort.name}</b>`;

  // Block Kontaktpersonen/Mails
  let listePersonen = "";
  let ueberschriftPersonen = "";
  if (standort.kontaktpersonen.length >= 1) {
    ueberschriftPersonen = (standort.kontaktpersonen.length > 1) ? "<hr><b>Netzwerkstelle ORCA.nrw</b>" : "<hr><b>Netzwerkstelle ORCA.nrw</b>";
    for (let person of standort.kontaktpersonen) {
      let name = (person.website) ? `<br><a href='${person.website}' target='_blank'>${person.name}</a>` : `<br>${person.name}`;
      let mail = (person.mail) ? ` <a href='mailto:${person.mail}'><i class="far fa-envelope"></i></a>` : "";
      listePersonen += name + mail;
    }
  }
  let blockPersonen = ueberschriftPersonen + listePersonen;

  // Block Policy
  const link = (standort.policyLink) ? `<br><a href='${standort.policyLink}' target='_blank'>Link</a>` : "";
  const blockPolicy = "<hr><b>OER Policy</b><br>" + policyVeroeffentlichung + link;

  // Popup definieren
  let popup = L.responsivePopup().setContent(`${blockUeberschrift}${blockPersonen}${blockPolicy}`);

  // Alles zusammenführen und zur Karte hinzufügen
  standortObjekt[standort.id] = L.circle(standort.koordinaten, marker)
    .addTo(map)
    .addTo(phase)
    .bindPopup(popup)
    .bindTooltip(standort.name);
}