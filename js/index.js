import { chart, map } from './components.js';
import { checkValid } from './helperFunctions.js';
import {
  resposiveness,
  changePicture,
  changeInfoText,
  changeWeather,
  changeCity,
  changeNews,
  changeMap,
  changeDate,
  changeTime,
  changeBackgroundColor,
  restoreDataLocal,
} from './HTMLmanipulate.js';
import { pictureFetch, infoTextFetch, newsFetch, locationFetch, timeFetch, weatherFetch } from './dataFunctions.js';

document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

function initApp() {
  colorModes();
  let myChart = chart();
  resposiveness(myChart);
  searchFunctionality(myChart);
  map();
}

function searchFunctionality(myChart) {
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
        const newsResultData = await newsFetch(textInput);
        changeNews(newsResultData);
        const locationData = await locationFetch(textInput);
        changeCity(locationData);
        changeMap(locationData);
        const timeData = await timeFetch(locationData);
        let currentDay = changeDate(timeData);
        changeTime(timeData);
        const weatherData = await weatherFetch(locationData);
        changeWeather(weatherData, myChart, currentDay);
      }
    }
  }
}

function colorModes() {
  restoreDataLocal();
  let colorContainerHTML = document.querySelector('.colorContainer');
  colorContainerHTML.addEventListener('click', changeBackgroundColor);
}
