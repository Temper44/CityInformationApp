export const resposiveness = function () {
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
        history.innerHTML = 'History </i><i class="fas fa-angle-down"></i>';
      }
    }
  }
};

export const changePicture = function (pictureResultData) {
  if (pictureResultData !== 'noPictureFound') {
    const image = document.querySelector('.image');
    image.src = pictureResultData.src;
    image.alt = pictureResultData.alt;
    // console.log(document.querySelector('.image'));
  } else {
    // TODO: default picture
  }
};

export const changeInfoText = function (infoTextData) {
  if (infoTextData !== 'noInfoTextFound') {
    const summaryText = document.querySelector('.summaryText');
    const summaryTextLink = document.querySelector('.summaryTextLink');
    summaryText.firstChild.textContent = infoTextData.text;

    const tabletSize = window.matchMedia('(max-width: 900px)');
    handleTableteChange(tabletSize);
    tabletSize.addListener(handleTableteChange);
    function handleTableteChange(e) {
      if (e.matches) {
        summaryTextLink.href = infoTextData.urlMobile;
      }
    }
    const desktopSize = window.matchMedia('(min-width: 901px)');
    handleDesktopChange(desktopSize);
    desktopSize.addListener(handleDesktopChange);
    function handleDesktopChange(e) {
      if (e.matches) {
        summaryTextLink.href = infoTextData.urlDesktop;
      }
    }
  }
};
