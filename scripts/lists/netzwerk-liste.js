import {map, standortObjekt} from "../maps/netzwerk-karte.js";

if (document.getElementById("list")) {
  document.getElementById("list").innerHTML = await createContent(standortObjekt);
}

export async function createContent(standortObjekt) {

  window.standortObjekt = standortObjekt;
  window.map = map;
  window.centerMod = (document.getElementById("list")) ? 0 : -150;

  let fetchData = await fetch("./db/standorte.json");
  let standorte = await fetchData.json();

  standorte.sort(byNameAscending);

  console.log(standortObjekt);

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

  let data = "";
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
      linkPopup = ` | <a id="openPopupLink" href="#" onclick="standortObjekt['${standort.id}'].openPopup(); map.setView([standortObjekt['${standort.id}']._latlng.lat, standortObjekt['${standort.id}']._latlng.lng + centerMod], 0); return false">Auf Karte zeigen</a>`;
    }

    const link = (standort.policyLink) ? `<br><a href='${standort.policyLink}' target='_blank'>Link</a>` : "";
    const blockPolicy = "<hr><b>OER Policy</b><br>" + policyVeroeffentlichung + link;

    data += "<details class='location-list'>" + summary + website + linkPopup + blockPersonen + blockPolicy + "</details>";
  }

  return data;
}