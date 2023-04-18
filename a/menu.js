'use strict';
const Menu = () => {
  $('.p-nav__btn').on('click', function () {
    if ($('body').hasClass('menu-open')) {
      $('body').removeClass('menu-open');
    } else {
      $('body').addClass('menu-open');
    }
  });
};

$(window).on('load', function () {
  Menu();
  $('body').addClass('is-ready');
  if ($('.p-hero').length) {
    setTimeout(function () {
      $('body').addClass('is-load');
    }, 2600);
  } else {
    $('body').addClass('is-load');
  }
});