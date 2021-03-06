var myMap = L.map("map", {
    center: [40.7, -94.5],
    zoom: 8
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
 
    
  d3.json(url, function(data) {
    function sytle(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: colorPicker(feature.properties.mag),
        color: "#000000",
        radius: Radius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
    function colorPicker(magnitude) {
      switch (true) {
        case magnitude > 5:
          return "#ea2c2c";
        case magnitude > 4:
          return "#ea822c";
        case magnitude > 3:
          return "#ee9c00";
        case magnitude > 2:
          return "#eecc00";
        case magnitude > 1:
          return "#d4ee00";
        default:
          return "#98ee00";
        }
    }
         
    function Radius(magnitude) {
      if (magnitude=== 0) {
        return 1;
      }
      return magnitude *3;
    }
    
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      Sytle: sytle,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    }).addTo(myMap);

    var legend = L.control({
      position: "bottomright"
    });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var grades = [0, 1, 2, 3, 4, 5];
      var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
    };
    legend.addTo(myMap);
  

     });

