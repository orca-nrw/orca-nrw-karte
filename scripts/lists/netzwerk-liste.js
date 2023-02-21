import {standortObjekt} from "../maps/netzwerk-karte.js";

window.standortObjekt = standortObjekt;

let fetchData = await fetch("./db/standorte.json");
let standorte = await fetchData.json();

let content = "";

standorte.sort(byNameAscending);

function byNameAscending(itemA, itemB) {
  let nameA = itemA.name.toLowerCase();
  let nameB = itemB.name.toLowerCase();

  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  } else {
    return 0;
  }
}

for (let standort of standorte) {
  let summary = `<summary class='location-list'>${standort.name}</summary>`;
  let website = `<a href='${standort.website}' target='_blank'>Website</a>`;

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

  let policyVeroeffentlichung = "";
  if (standort.phase == 0) {
    policyVeroeffentlichung = "Noch keine Policy";
  } else if (standort.phase == 1) {
    policyVeroeffentlichung = "In Entwicklungsphase";
  } else if (standort.phase == 2) {
    policyVeroeffentlichung = "In Gremienphase";
  } else if (standort.phase == 3) {
    policyVeroeffentlichung = `Veröffentlicht am ${standort.policyVeroeffentlichung}`;
  }

  let linkPopup = "";
  if (document.title != "ORCA-Netzwerk und OER Policies an Hochschulen in NRW – Auflistung") {
    linkPopup = ` | <a id="hello" href="#" onclick="standortObjekt['${standort.id}'].openPopup()">Auf Karte zeigen</a>`;
  }

  const link = (standort.policyLink) ? `<br><a href='${standort.policyLink}' target='_blank'>Link</a>` : "";
  const blockPolicy = "<hr><b>OER Policy</b><br>" + policyVeroeffentlichung + link;

  content += "<details class='location-list'>" + summary + website + linkPopup + blockPersonen + blockPolicy + "</details>";
}

document.getElementById("list").innerHTML = content;