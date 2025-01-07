import {mapErstellen, mapBorders, layerControlErstellen} from "../create-map.js";
import {grauerPunkt, blauerPunkt, orangerPunkt, gruenerPunkt} from "../define-markers.js";
import {createContent} from "../lists/netzwerk-liste.js";

// Layer groups definieren
let oerPolicyStatus = L.layerGroup();
let hochschulstandort = L.layerGroup();

// Layer-Kontrollen erstellen
let overlayMaps = {
  "OER Policy Status": oerPolicyStatus
};
layerControlErstellen(overlayMaps);

let params;
if (location.href.includes("?")) {
  params = location.href.split("?")[1].split("&");
}
const oerPolicyDefault = (params?.includes("oer_policy_default=false")) ? false : true;


// Standard-Werte für Layer-Kontrollen und Karte erstellen
const layers = [mapBorders, hochschulstandort];
if (oerPolicyDefault) {layers.push(oerPolicyStatus);};
export const map = await mapErstellen(layers);

// Legenden hinzufügen
let legende = L.control({position: "bottomright"});
legende.onAdd = function (map) {
  let div = L.DomUtil.create("div", "legende");
  div.innerHTML += "<span style='color: rgb(64, 64, 64); font-size: initial'>&#x26AC; </span><span>Hochschule der DH.NRW</span>";
  return div;
};

let oerPolicyLegende = L.control({position: "bottomright"});
oerPolicyLegende.onAdd = function (map) {
  let div = L.DomUtil.create("div", "legende");
  div.innerHTML += "<span style='color: rgb(64, 64, 64); font-size: initial'>&#x26AC; </span><span>Hochschule der DH.NRW</span>";
  div.innerHTML += "<br><span style='color: rgb(42, 168, 226);'>&#x25CF; </span><span>… mit OER Policy in Entwurfsphase</span>";
  div.innerHTML += "<br><span style='color: rgb(249, 147, 28);'>&#x25CF; </span><span>… mit OER Policy in Gremienphase</span>";
  div.innerHTML += "<br><span style='color: rgb(0, 104, 55);'>&#x25CF; </span><span>… mit veröffentlichter OER Policy</span>";
  return div;
};

if (oerPolicyDefault) {
  oerPolicyLegende.addTo(map);
} else {
  legende.addTo(map);
}

// Daten einlesen
let fetchData = await fetch("./db/standorte.json");
let standorte = await fetchData.json();

// Marker definieren
export var standortObjekt = {};
for (let standort of standorte) {
  // Phase und marker klären
  let marker;
  let policyVeroeffentlichung = "";
  if (standort.phase == 0) {
    marker = grauerPunkt;
    policyVeroeffentlichung = "Noch keine Policy";
  } else if (standort.phase == 1) {
    marker = blauerPunkt;
    policyVeroeffentlichung = "In Entwurfsphase";
  } else if (standort.phase == 2) {
    marker = orangerPunkt;
    policyVeroeffentlichung = "In Gremienphase";
  } else if (standort.phase == 3) {
    marker = gruenerPunkt;
    if (standort.policyVeroeffentlichung) {
      policyVeroeffentlichung = `Veröffentlicht am ${standort.policyVeroeffentlichung}`;
    }
  }

  // Block Überschrift
  const blockUeberschrift = (standort.website) ? `<b><a href='${standort.website}' target='_blank'>${standort.name}</a></b>` : `<b>${standort.name}</b>`;

  // Block Kontaktpersonen/Mails
  let listePersonen = "";
  let ueberschriftPersonen = "";
  if (standort.kontaktpersonen.length >= 1) {
    ueberschriftPersonen = (standort.kontaktpersonen.length > 1) ? "<hr>Netzwerkstelle ORCA.nrw<b></b>" : "<hr> <b></b>";
    for (let person of standort.kontaktpersonen) {
      let name = (person.website) ? `<br><a href='${person.website}' target='_blank'>${person.name}</a>` : `<br>${person.name}`;
      let mail = (person.mail) ? ` <a href='mailto:${person.mail}'><i class="far fa-envelope"></i></a>` : "";
      listePersonen += name + mail;
    }
  }
  let blockPersonen = ueberschriftPersonen + listePersonen;

  // Block Policy
  const link = (standort.policyLink) ? `<a href='${standort.policyLink}' target='_blank'><b>OER-Policy</b></a>` : "<b>OER-Policy</b>";
  const blockPolicy = (standort.phase > 0) ? "<hr>" + link + "<br>" + policyVeroeffentlichung : "";

  // Popup definieren
  let popup = L.popup().setContent(`${blockUeberschrift}${blockPersonen}${blockPolicy}`);

  // Alles zusammenführen und zur Karte hinzufügen
  standortObjekt[standort.id] = L.circle(standort.koordinaten, grauerPunkt)
    .addTo(hochschulstandort)
    .bindPopup(popup)
    .bindTooltip(standort.name);

  if (standort.phase > 0) {
    standortObjekt[standort.id] = L.circle(standort.koordinaten, marker)
      .addTo(oerPolicyStatus)
      .bindPopup(popup)
      .bindTooltip(standort.name);
  }
}

// Sidebar
if (!document.getElementById("list")) {
  let sidebar = "<div class='just-list'>" + await createContent(standortObjekt) + "</div>";
  L.control.slideMenu(sidebar).addTo(map);
}

map.on('overlayadd', function (eventLayer) {
  if (eventLayer.name === 'OER Policy Status') {
    this.removeControl(legende);
    oerPolicyLegende.addTo(this);
  }
});

map.on('overlayremove', function (eventLayer) {
  if (eventLayer.name === 'OER Policy Status') {
    this.removeControl(oerPolicyLegende);
    legende.addTo(this);
  }
});
