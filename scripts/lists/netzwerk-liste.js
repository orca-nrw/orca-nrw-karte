let fetchData = await fetch("./db/standorte.json");
let standorte = await fetchData.json();

let content = "";

for (let standort of standorte) {
  let summary = `<summary>${standort.name}</summary>`;
  let website = `<b>Website:</b> <a href='${standort.website}' target='_blank'>${standort.website}</a>`;

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

  const link = (standort.policyLink) ? `<br><a href='${standort.policyLink}' target='_blank'>Link</a>` : "";
  const blockPolicy = "<hr><b>OER Policy</b><br>" + policyVeroeffentlichung + link;

  content += "<details><p>" + summary + website + blockPersonen + blockPolicy + "</p></details>";
}

document.getElementById("list").innerHTML = content;