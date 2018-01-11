(function () {
  var header = document.querySelector('.header');
  var headerNavContainer = header.querySelector('.header__nav-container');
  var menuOpenButton = header.querySelector('.header__menu-button');

  menuOpenButton.addEventListener('click', function () {
    headerNavContainer.classList.toggle('header__nav-container--menu-opened');
  });
})();
