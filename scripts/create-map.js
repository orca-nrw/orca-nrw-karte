// Overlays definieren
const bounds = [[0, 0], [524, 524]];
export const mapBorders = L.imageOverlay('img/orca-nrw-map_borders.svg', bounds);
const mapNoBorders = L.imageOverlay('img/orca-nrw-map_no-borders.svg', bounds);

let baseMaps = {
  "Mit Stadtgrenzen": mapBorders,
  "Ohne Stadtgrenzen": mapNoBorders
};

let layerControl;
export function layerControlErstellen(overlayMaps) {layerControl = L.control.layers(baseMaps, overlayMaps)};
let attribution = L.control.attribution({prefix: false, position: "bottomleft"}).addAttribution("<a href='http://creativecommons.org/licenses/by/4.0/'>CC-BY 4.0</a> Marko Wenzel & Frank Homp");

// Karte erstellen
export function mapErstellen(layers) {
  let map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    zoomSnap: 1,
    layers: layers,
    maxBounds: bounds,
    doubleClickZoom: false,
    scrollWheelZoom: false
  });

  // Berechnung Zoom Level
  // let element = document.getElementById('map');
  // let mapWidth = Math.log2(element.clientWidth / 524);
  // let mapHeight = Math.log2(element.clientHeight / 524);

  // const initialZoomLevel = (mapWidth > mapHeight) ? mapWidth : mapHeight;

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