export const pictureFetch = async function (textInput) {
  const pexelApiData = {
    key: '563492ad6f91700001000001af8ca5e9804243ccab1a370f31e6ca78',
    url: 'https://api.pexels.com/v1',
  };

  const pictureSearchTerm = getPictureSearchString(pexelApiData.url, textInput);
  const pictureFetchResults = await requestPictureData(
    pexelApiData.key,
    pictureSearchTerm
  );
  console.log(pictureFetchResults);
  if (
    pictureFetchResults.hasOwnProperty('photos') &&
    pictureFetchResults.photos.length >= 1
  ) {
    // returns true if attribut "photos" exists
    const pictrueProcessedResults = processPictureData(
      pictureFetchResults.photos
    );
    console.log(pictrueProcessedResults);
    return pictrueProcessedResults;
  } else {
    //TODO: error wrong input/ no Picture found
    return 'noPictureFound';
  }
};

function getPictureSearchString(url, textInput) {
  return `${url}/search?query=${textInput}&orientation=landscape&per_page=3`;
}

async function requestPictureData(key, pictureSearchTerm) {
  try {
    const response = await fetch(pictureSearchTerm, {
      headers: {
        Authorization: `${key}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    //TODO: error
    return false;
  }
}

function processPictureData(pictureFetchResults) {
  let altData = getPictureAltData(pictureFetchResults[0].url);
  const pictureObject = {
    src: pictureFetchResults[0].src.large,
    alt: altData,
  };

  return pictureObject;
}

function getPictureAltData(urlData) {
  let arr = urlData.split('/')[4].split('-');
  arr.pop();
  return arr.join(' ');
}

export const infoTextFetch = async function (textInput) {
  const wikiApiData = {
    url: 'https://en.wikipedia.org/api/rest_v1/page/summary',
  };

  const infoTextSearchTerm = getInfoTextSearchString(
    wikiApiData.url,
    textInput
  );
  const infoTextFetchResults = await requestInfoTextData(infoTextSearchTerm);
  console.log(infoTextFetchResults);
  if (infoTextFetchResults.title !== 'Not found') {
    const infoTextProcessedResults = processInfoTextData(infoTextFetchResults);
    return infoTextProcessedResults;
  } else {
    //TODO: error wrong input
    return 'noInfoTextFound';
  }
};

async function requestInfoTextData(infoTextSearchTerm) {
  try {
    const response = await fetch(infoTextSearchTerm);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getInfoTextSearchString(url, textInput) {
  return `${url}/${textInput}`;
}

function processInfoTextData(infoTextFetchResults) {
  const infoTextObject = {
    text: infoTextFetchResults.extract,
    urlDesktop: infoTextFetchResults.content_urls.desktop.page,
    urlMobile: infoTextFetchResults.content_urls.mobile.page,
  };
  return infoTextObject;
}
