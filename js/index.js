import { chart, map } from './components.js';
import { checkValid } from './helperFunctions.js';
import {
  resposiveness,
  changePicture,
  changeInfoText,
} from './HTMLmanipulate.js';
import { pictureFetch, infoTextFetch } from './dataFunctions.js';

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

  async function submitSearch(e) {
    if (e.key === 'Enter' || e.type == 'submit') {
      e.preventDefault();
      let textInput = document.querySelector('#searchText').value;
      if (checkValid(textInput)) {
        const pictureResultData = await pictureFetch(textInput);
        changePicture(pictureResultData);
        const infoTextResultData = await infoTextFetch(textInput);
        changeInfoText(infoTextResultData);
      }
    }
  }
}
