
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9vdHNlODQiLCJhIjoiY2lrandjOTFyMDh5bHUybTZsMnQzZGhzYiJ9.v4EUTBiszBVhvt1wNek2DQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 5,
    center: [-118.825026, 37.452485]
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
}

for (var i = 0; i < inputs.length; i++) {
    //inputs[i].onclick = switchLayer;
}

const colors = ['#088', '#880', '#008', '#808']

map.on('load', function () {
  $.getJSON("../static/json/jsoncounties-CA.min.json", function (json) {

    if (!json.features) {
      return
    }
    
    let counties = json.features.counties

    for (let j = 0; j < counties.length; j++) {
      const { name, geometry } = counties[j]

      map.addSource(name+i+j, {
          'type': 'geojson',
          'data': {
              'type': 'Feature',
              'geometry': {
                  'type': 'Polygon',
                  'coordinates': geometry.coordinates 
              }
          }
      });

      let rand = colors[Math.floor(Math.random() * colors.length)]
      map.addLayer({
          'id': name+i+j,
          'type': 'fill',
          'source': name+i+j,
          'layout': {},
          'paint': {
              'fill-color': rand,
              'fill-opacity': 0.7
          }
      });
    }
  });

    /*
    map.addSource('alabama', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': 
            }
        }
    });

    map.addLayer({
        'id': 'alabama',
        'type': 'fill',
        'source': 'alabama',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    });
    */
});
