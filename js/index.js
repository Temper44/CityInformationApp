import { chart, map } from './components.js';

document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

function initApp() {
  resposiveness();
  searchFunctionality();
  chart();
  map();
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
