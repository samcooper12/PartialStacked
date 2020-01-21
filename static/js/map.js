


var health = 'HEALTH.csv'

var scores = []

var data

var tobe
var endpoint = '/counties_data'

d3.json(endpoint, function(data) {
	console.log(data)
  geo = data
  var type = data['type']
  var features = data['features']
  console.log(type)

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var counties = L.tileLayer("counties.json", {
    attribution: 'idk',
    maxZoom: 18,
    id: 'mapbox.dark'

  })

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, counties]
  });


    var counties = L.geoJson(data, {

        // Style each feature (in this case a neighborhood)
                  style: function(feature) {
                    return {
                      color: "white",
                      fillColor: '#74B6E6',
                      // fillOpacity: 0.5,
                      weight: 1.5
                    };
                  },
        
    }).addTo(myMap);
        // layers: [streetmap, counties]

createFeatures(data)
console.log('end of something')
});


function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3>")
      // "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var county_layer = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(county_layer);
}

function createMap(county_layer) {


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
    // "Counties": counties
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    // Earthquakes: earthquakes
    Counties: counties
  };

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


