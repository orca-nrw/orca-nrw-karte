// Overlays definieren
const bounds = [[0, 0], [524, 524]];
export const mapBorders = L.imageOverlay('img/orca-nrw-map_borders.svg', bounds);

// Falls mehrere Karten genutzt werden, hier hinzufügen und L.control.layers(baseMaps, overlayMaps) ergänzen
// let baseMaps = {
//   "NRW": mapBorders,
// };

let layerControl;
export function layerControlErstellen(overlayMaps) {
  layerControl = L.control.layers(null, overlayMaps);
};

let attribution = L.control.attribution({
  prefix: false,
  position: "bottomleft"
}
).addAttribution("<a href='http://creativecommons.org/licenses/by/4.0/'>CC-BY 4.0</a> Marko Wenzel & Frank Homp");

// Karte erstellen
export async function mapErstellen(layers) {
  let map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    zoomSnap: 1,
    layers: layers,
    maxBounds: bounds,
    doubleClickZoom: false,
    scrollWheelZoom: false
  });

  layerControl.addTo(map);
  map.setView([262, 262], 0);
  map.attributionControl.setPrefix(false);
  attribution.addTo(map);

  // Kommentar entfernen, um Koordinaten mit Klick anzuzeigen
  function onMapClick(e) {
    if (event.altKey) {
      alert("You clicked the map at " + e.latlng);
    } else {
      return;
    }
  }
  map.on('click', onMapClick);

  return map;
}