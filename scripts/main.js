// Punkte definieren
const blauerPunkt = {
  color: 'rgb(42,168,226)',
  fillColor: 'rgb(42,168,226)',
  fillOpacity: 1,
  radius: 3
};

const orangerPunkt = {
  color: 'rgb(249,147,28)',
  fillColor: 'rgb(249,147,28)',
  fillOpacity: 1,
  radius: 3
};

const gruenerPunkt = {
  color: 'rgb(0,104,55)',
  fillColor: 'rgb(0,104,55)',
  fillOpacity: 1,
  radius: 3
}

const grauerPunkt = {
  color: 'rgb(128,128,128)',
  fillColor: 'rgb(128,128,128))',
  fillOpacity: 1,
  radius: 1.5
}

// Layer groups definieren
let veroeffentlicht = L.layerGroup();
let gremienphase = L.layerGroup();
let entwurfsphase = L.layerGroup();
let hochschulstandort = L.layerGroup();

// Overlays definieren
let bounds = [[0, 0], [526, 524]];
let mapBorders = L.imageOverlay('img/orca-nrw-map_borders.svg', bounds);
let mapNoBorders = L.imageOverlay('img/orca-nrw-map_no-borders.svg', bounds);

let baseMaps = {
  "Mit Stadtgrenzen": mapBorders,
  "Ohne Stadtgrenzen": mapNoBorders
};

let overlayMaps = {
  "<span style='color: rgb(0,104,55);'>&#x25CF;</span> Veröffentlicht": veroeffentlicht,
  "<span style='color: rgb(249,147,28);'>&#x25CF;</span> Gremienphase": gremienphase,
  "<span style='color: rgb(42,168,226);'>&#x25CF;</span> Entwurfsphase": entwurfsphase,
  "<span style='color: rgb(128,128,128);'>&#x25CF;</span> Hochschulstandort": hochschulstandort
};

let layerControl = L.control.layers(baseMaps, overlayMaps);
let attribution = L.control.attribution({prefix: false, position: "bottomleft"}).addAttribution("<a href='http://creativecommons.org/licenses/by/4.0/'>CC-BY 4.0</a> Marko Wenzel");

// Karte erstellen
export let map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  layers: [mapBorders, veroeffentlicht, gremienphase, entwurfsphase, hochschulstandort],
  maxBounds: bounds,
  doubleClickZoom: false,
  scrollWheelZoom: false
});

layerControl.addTo(map);
map.fitBounds(bounds);
map.attributionControl.setPrefix(false);
attribution.addTo(map);

let fetchDataStandorte = await fetch("./db/standorte.json");
let standorte = await fetchDataStandorte.json();

// Legende hinzufügen
let legende = L.control({position: "bottomright"});

legende.onAdd = function (map) {
  let div = L.DomUtil.create("div", "legende");
  div.innerHTML += "<span style='color: rgb(0,104,55);'>&#x25CF;</span> <span>Veröffentlicht</span>";
  div.innerHTML += "<br><span style='color: rgb(249,147,28);'>&#x25CF;</span> <span> Gremienphase</span>";
  div.innerHTML += "<br><span style='color: rgb(42,168,226);'>&#x25CF;</span> <span> Entwurfsphase</span>";
  div.innerHTML += "<br><span style='color: rgb(128,128,128);'>&#x25CF;</span> <span> Hochschulstandort</span>";
  return div;
};

legende.addTo(map);

// Standorte definieren
let standortObjekt = [];
for (let standort of standorte) {
  // Variablen & Konstanten definieren
  let phase;
  let marker;
  let listePersonen = "";
  let personen = "";
  const standortUeberschrift = (standort.website) ? `<b><a href='${standort.website}' target='_blank'>${standort.name}</a></b>` : `<b>${standort.name}</b>`
  const veroeffentlichung = (standort.policyVeroeffentlichung) ? `<br>Veröffentlicht am ${standort.policyVeroeffentlichung}` : "<br>Nicht veröffentlicht";
  const link = (standort.policyLink) ? `<br><a href='${standort.policyLink}' target='_blank'>Zur Policy</a>` : "";
  const policy = (standort.policyLink) ? "<hr><b>OER-Policy</b>" + veroeffentlichung + link : "";

  // Phase und marker klären
  if (standort.phase == 0) {
    phase = hochschulstandort;
    marker = grauerPunkt;
  } else if (standort.phase == 1) {
    phase = entwurfsphase;
    marker = blauerPunkt;
  } else if (standort.phase == 2) {
    phase = gremienphase;
    marker = orangerPunkt;
  } else if (standort.phase == 3) {
    phase = veroeffentlicht;
    marker = gruenerPunkt;
  }

  // Kontaktpersonen/Mails
  if (standort.kontaktpersonen.length >= 1) {
    for (let person of standort.kontaktpersonen) {
      let name = (person.website) ? `<br><a href='${person.website}' target='_blank'>${person.name}</a>` : `<br>${person.name}`;
      let mail = (person.mail) ? ` <a href='mailto:${person.mail}'><i class="far fa-envelope"></i></a>` : "";
      listePersonen = listePersonen + name + mail;
    }
    personen = (standort.kontaktpersonen.length > 1) ? "<hr><b>ORCA-Netzwerkstellen</b>" + listePersonen : "<hr><b>ORCA-Netzwerkstelle</b>" + listePersonen;
  }

  // Popup definieren
  let popup = L.responsivePopup().setContent(`${standortUeberschrift}${personen}${policy}`);

  // Alles zusammenführen und zur Karte hinzufügen
  standortObjekt[standort.id] = L.circle(standort.koordinaten, marker);
  standortObjekt[standort.id].addTo(map)
  standortObjekt[standort.id].addTo(phase);
  standortObjekt[standort.id].bindPopup(popup);
  standortObjekt[standort.id].bindTooltip(standort.name);
}

// Kommentar entfernen, um Koordinaten mit Klick anzuzeigen
function onMapClick(e) {
  if (event.altKey) {
    alert("You clicked the map at " + e.latlng);
  } else {
    return;
  }
}

map.on('click', onMapClick);