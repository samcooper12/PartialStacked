
var counties = 'counties.json'
// Grabbing our GeoJSON data..
d3.json(counties, function(data) {
// var counties = '/data/counties.json'
var myMap = L.map("map", {
    center: [45.51179, -122.67563],
    // center: [45.51179, -100.67563],
    zoom: 5
    // layers: [streetmap, counties]
  });
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        // fillColor: chooseColor(feature.properties.borough),
        fillColor: '#74B6E6',
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
  }).addTo(myMap);
});
// console.log(data)

// //   }).addTo(myMap);
// $( window ).on( "load", function(data) {
// // });
// // var e = data['features'][0]
// // var e = data['type']
// // console.log('e')
// // console.log(e)

// // console.log(data.length)
// var myMap = L.map("map", {
//   // Portland OR
//     center: [45.51179, -122.67563],
//   // US
//     // center: [39.977825662466266, -98.934902125],
//     // center: [45.51179, -100.67563],
//     zoom: 5,
//     maxZoom: 7
//     // layers: [streetmap, counties]
//   });

//   var counties = L.geoJson(data, {

//     // Style each feature (in this case a neighborhood)
//     style: function(feature) {
//       return {
//         color: "white",
//         fillColor: '#74B6E6',
//         // fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
    
//   }).addTo(myMap);


//   var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(myMap)

//   var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.dark",
//     accessToken: API_KEY
//   }).addTo(myMap)

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   }

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Counties: counties
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load

//   var controls = L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

// // var e = data['features'][0]
// // console.log('e')
// // console.log(e)
// })


// /*

// var counties = 'data/counties.json'

// var myMap = L.map("map", {
//   // Portland OR
//     center: [45.51179, -122.67563],
//   // US
//     // center: [39.977825662466266, -98.934902125],
//     // center: [45.51179, -100.67563],
//     zoom: 5,
//     maxZoom: 7

//     // layers: [streetmap, counties]
//   });


// d3.json(counties, function(data) {


// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//   maxZoom: 18,
//   // Grey background
//   // id: "mapbox.grey",
//   id: "mapbox.streets",
//   accessToken: API_KEY
// }).addTo(myMap);


//   // Creating a geoJSON layer with the retrieved data
//   L.geoJson(data, {

//     // Style each feature (in this case a neighborhood)
//     style: function(feature) {
//       return {
//         color: "white",
//         fillColor: '#74B6E6',
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
    
//   }).addTo(myMap);
// })
// });
// */
