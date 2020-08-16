var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

  navToggle.classList.remove('main-nav__toggle--nojs')

navToggle.addEventListener('click', function() {
  navMain.classList.toggle('main-nav--opened');
  navMain.classList.toggle('main-nav--closed');
});
