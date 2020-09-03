var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

  navToggle.classList.remove('main-nav__toggle--nojs')
  navMain.classList.remove('main-nav--opened');
  navMain.classList.add('main-nav--closed');

navToggle.addEventListener('click', function() {
  navMain.classList.toggle('main-nav--opened');
  navMain.classList.toggle('main-nav--closed');
});

var buttons = document.querySelectorAll('.modal-open');
var modal = document.querySelector('.modal');

buttons.forEach(function(links) {
links.addEventListener('click', function (evt) {
  evt.preventDefault();
  modal.classList.add('modal__open');
});
});

modal.addEventListener('click', function () {
  event.target.classList.remove('modal__open');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
      modal.classList.remove('modal__open');
    }
});
