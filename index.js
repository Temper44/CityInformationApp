document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

function initApp() {
  resposiveness();
  searchFunctionality();

  //MAP
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
          borderWidth: 11,
        },
      ],
    },
  });
}

function searchFunctionality() {
  const textInput = document.querySelector('#searchText');
  textInput.addEventListener('keydown', submitSearch);
  const form = document.querySelector('form');
  form.addEventListener('submit', submitSearch);
  function submitSearch(e) {
    if (e.key === 'Enter' || e.type == 'submit') {
      e.preventDefault();
      let textInput = document.querySelector('#searchText').value;
      console.log(textInput);
      console.log(e);
    } else {
      console.log('err');
    }
  }
}

function resposiveness() {
  phoneOnly();
  tabletUpper();

  function phoneOnly() {
    const phone = window.matchMedia('(max-width: 599px)');
    handlePhoneChange(phone);
    phone.addListener(handlePhoneChange);
    function handlePhoneChange(e) {
      if (e.matches) {
        let favourites = document.querySelector('#favourites');
        let history = document.querySelector('#history');
        console.log(favourites.textContent);
        favourites.innerHTML =
          '<i class="fas fa-star"></i><i class="fas fa-angle-down"></i>';
        /* let i = document.createElement('i');
        favourites.appendChild(i);
        favourites.firstElementChild.classList.add('fas', 'fa-star');
  
        let i2 = document.createElement('i');
        favourites.appendChild(i2);
        favourites.children[1].classList.add('fas', 'fa-angle-down'); */
        history.innerHTML =
          '<i class="fas fa-history"></i><i class="fas fa-angle-down"></i>';
      }
    }
  }
  function tabletUpper() {
    const tablet = window.matchMedia('(min-width: 599px)');
    handleTabletChange(tablet);
    tablet.addListener(handleTabletChange);
    function handleTabletChange(e) {
      if (e.matches) {
        let favourites = document.querySelector('#favourites');
        let history = document.querySelector('#history');
        console.log(favourites.textContent);
        favourites.innerHTML = 'Favourites <i class="fas fa-angle-down"></i>';
        /* let i = document.createElement('i');
        favourites.appendChild(i);
        favourites.firstElementChild.classList.add('fas', 'fa-star');
  
        let i2 = document.createElement('i');
        favourites.appendChild(i2);
        favourites.children[1].classList.add('fas', 'fa-angle-down'); */
        history.innerHTML = 'Histroy </i><i class="fas fa-angle-down"></i>';
      }
    }
  }
}
