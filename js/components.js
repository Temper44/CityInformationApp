export const chart = function () {
  //CHART.JS
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'a'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3, 32, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 5,
        },
      ],
    },
  });
};

export const map = function () {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGVtcGVyNDQiLCJhIjoiY2ttdjF2ZGswMDB3YTJ1dXRucjB3NjJoYyJ9.7vndcsMZHr7Imw_TIdfvMg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', //style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-74.5, 40], // starting position
    zoom: 9, // starting zoom
  });
  map.addControl(new mapboxgl.NavigationControl());

  /* map.flyTo({
    center: [0, 90],
    }); */

  // MAP STYLE
  var layerList = document.getElementById('menu');
  var inputs = layerList.getElementsByTagName('input');

  function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
  }

  // COLOR MENU
  var swatches = document.getElementById('swatches');
  var layer = document.getElementById('layer');
  var colors = ['#41b6c4', '#2c7fb8', '#feb24c', '#fd8d3c', '#f03b20'];

  colors.forEach(function (color) {
    var swatch = document.createElement('button');
    swatch.style.backgroundColor = color;
    swatch.addEventListener('click', function () {
      map.setPaintProperty(layer.value, 'fill-color', color);
    });
    swatches.appendChild(swatch);
  });
};
