var VanillaRunOnDomReady = function() {
  // Create the map
  var map = L.map("map");

  // create a street map layer and add it to the map, making it the default basemap
  let streets = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  ).addTo(map);

  // create a satellite imagery layer
  let satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  );

  // create a satellite imagery layer
  let topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png");

  // create an object to hold layer names as you want them to appear in the basemap switcher list
  let basemapControl = {
    Standard: streets,
    Topographic: topo,
    Satellite: satellite
  };

  // display the control (switcher list) on the map, by default in the top right corner
  L.control.layers(basemapControl).addTo(map);

  // Set up the OSM layer
  //L.tileLayer(
  //  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 18
  // }).addTo(map);

  var polygon = L.polyline(
    [
    //   L.utm({ x: 600000, y: 6199999, zone: 55, band: "H" }).latLng(),
    //   L.utm({ x: 699999, y: 6199999, zone: 55, band: "H" }).latLng(),
    //   L.utm({ x: 699999, y: 6100000, zone: 55, band: "H" }).latLng(),
    //   L.utm({ x: 600000, y: 6100000, zone: 55, band: "H" }).latLng(),

      L.utm({ x: 600000, y: 6099999, zone: 55, band: "H" }).latLng(),
      L.utm({ x: 699999, y: 6099999, zone: 55, band: "H" }).latLng(),
      L.utm({ x: 699999, y: 6000000, zone: 55, band: "H" }).latLng(),
      L.utm({ x: 600000, y: 6000000, zone: 55, band: "H" }).latLng(),

      L.utm({ x: 600000, y: 6099999, zone: 55, band: "H" }).latLng()
    ],
    { color: "blue", fillColor: "transparent" }
  ).addTo(map);

  map.fitBounds(polygon.getBounds());

  function plot(x, y, title) {
    var item = L.utm({ x: x, y: y, zone: 55, band: "H", southHemi: true });
    var coord = item.latLng();

    // center of the map
    var marker = [coord.lat, coord.lng];

    var popup = L.popup({ autoClose: false, closeOnClick: false }).setContent(
      title
    );

    // add a marker in the given location
    L.marker(marker)
      .addTo(map)
      .bindPopup(popup)
      .openPopup();

    // L.marker(marker).addTo(map).bindTooltip(popup).openTooltip();

    // map.setView(marker, 12);
  }

  $("#plot").on("click", function() {
    var inputX = $("#easting").val();
    var inputY = $("#northing").val();
    if (!inputX || !inputY) return;

    var expandedX = "6" + inputX + "00";
    var expandedY = "60" + inputY + "00";

    plot(expandedX, expandedY, inputX + " " + inputY);

    // var expandedX = "6" + inputX + "00";
    // var expandedY = "61" + inputY + "00";

    // plot(expandedX, expandedY, inputX + " " + inputY);
  });
};

var alreadyrunflag = 0;

if (document.addEventListener)
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      alreadyrunflag = 1;
      VanillaRunOnDomReady();
    },
    false
  );
else if (document.all && !window.opera) {
  document.write(
    '<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"></script>'
  );
  var contentloadtag = document.getElementById("contentloadtag");
  contentloadtag.onreadystatechange = function() {
    if (this.readyState == "complete") {
      alreadyrunflag = 1;
      VanillaRunOnDomReady();
    }
  };
}

window.onload = function() {
  setTimeout("if (!alreadyrunflag){VanillaRunOnDomReady}", 0);
};
