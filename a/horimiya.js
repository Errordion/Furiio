'use strict';
let movieslide;
let windowW = 0;

const Movieslide = () => {
  movieslide = new Swiper('.p-movie_swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: true,
    speed: 1200,
    followFinger: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true, // ã‚¯ãƒªãƒƒã‚¯å¯èƒ½
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

const Param = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.target) {
    contslide.slideTo(params.target, 1200, true);
  }
};

let contslide;
const Contentslide = () => {
  contslide = new Swiper('.content_swiper', {
    slideClass: 'content_swiper-slide',
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    watchSlidesProgress: true, // ç¾åœ¨ã®ç§»å‹•ã®å€¤ã‚’å–å¾—
    freeModeMomentumBounce: false,
    mousewheel: true,
    parallax: true,
    hashNavigation: true,
  });

  $('.slide_progressbar__border').append('<div></div>');
  contslide.on('progress', function (_p) {
    let $slides = $('.content_swiper-slide');
    let _slidewidth_array = []; // ç©ºã®é…åˆ—ç”¨æ„
    let _total = 0;
    for (let $i = 0; $i < $slides.length - 1; $i++) {
      let _width = $('.content_swiper-slide:nth-of-type(' + [$i + 1] + ')').width();
      _total = _total + _width; // ã‚¹ãƒ©ã‚¤ãƒ‰ã®åˆè¨ˆé•·ã•
      _slidewidth_array.push(_width);
    }
    _total = _total - (window.innerWidth - $('.content_swiper-slide:nth-of-type('.concat($slides.length, ')')).width()); // å·¦åŸºæº–ã«èª¿æ•´
    let _current = 0;
    let _left2 = 0;
    for (let $j = 0; $j < $slides.length - 1; $j++) {
      let _ratio = (_slidewidth_array[$j] + _left2) / _total;
      _left2 = _left2 + _slidewidth_array[$j];
      if (_ratio <= _p) _current++;
    }

    $('.slide_progressbar__target-item').addClass('active');
    for (let $y = 0; $y < $slides.length; $y++) {
      if (_current < $y) $('.slide_progressbar__target-item:nth-of-type('.concat($y + 1, ')')).removeClass('active');
    }

    $('.slide_progressbar__target-item').removeClass('is-now');
    if (_p != 1) {
      $('.slide_progressbar__target-item:nth-of-type('.concat(_current + 1, ')')).addClass('is-now');
    } else {
      $('.slide_progressbar__target-item:nth-of-type('.concat($slides.length, ')')).addClass('is-now');
    }

    $('.slide_progressbar__border div').css({background: '#61b0e3', height: '100%', width: _p * 100 + '%'});
    let _min = 0.2; // ç¯„å›²ã®æœ€å°
    let _max = 0.55; // ç¯„å›²ã®æœ€å¤§
    let _diff = _max - _min; // æœ€å¤§å€¤
    let _left = 0; // ç¯„å›²å†…ã§ã®ç§»å‹•é‡
    if (contslide.progress >= _min && contslide.progress <= _max) {
      // è©²å½“ç¯„å›²ãŒ 0.2ã‚ˆã‚Šå¤§ãã„ã‹åŒã˜ã‹ ã‹ã¤ è©²å½“ç¯„å›²ãŒ 0.5ã‚ˆã‚Šå°ã•ã„ã‹åŒã˜ã‹
      _left = ((contslide.progress - _min) / _diff) * 100; // 0.2â†’0.5ã¾ã§ã®ç¯„å›²ã¯0ï½ž1ã«ã™ã‚‹ ç§»å‹•é‡-æœ€å°å€¤ / æœ€å¤§å€¤
      $('body').addClass('is-bg_show');
      if (windowW >= 768) {
        $('.p-bg2__inner').css({transform: 'translateX(' + '-' + _left / 5 + '%)'});
      } else {
        $('.p-bg2__inner').css({transform: 'translateX(' + '-' + _left / 2.5 + '%)'});
      }
    } else if (contslide.progress < _min) {
      _left = 0;
      $('body').removeClass('is-bg_show');
    } else if (contslide.progress > _max) {
      _left = 1;
      $('body').removeClass('is-bg_show');
    }
    // console.log(contslide.progress);
  });

  contslide.on('realIndexChange', function () {
    let _activeindex = contslide.activeIndex;
    $('.content_swiper-slide').eq(_activeindex).addClass('is-active');
  });
};

const _template_function_advanced = function (type, data, dataAll, elemOpen, elem) {
  let _html = '';

  if (type === 'youtube') {
    // youtubeå ´åˆ
    _html =
      '\n      <section class="m-modal {{ defaultClassName }}" id="{{ id }}" data-modal-type>\n        <div class="m-modal__bg"></div>\n        <div class="m-modal__content">\n          <div class="m-modal__youtube">\n          {{ content }}\n          </div>\n        </div>\n        <div class="m-modal__close-btn" data-modal-ui-close>\n          <span class="p-in_text">CLOSE</span>\n        </div>\n      </section>';
  } else {
    // é€šå¸¸ã®ãƒ¢ãƒ¼ãƒ€ãƒ«è¦ç´ ã®å ´åˆ
    _html =
      '\n      <section class="m-modal {{ defaultClassName }}" id="{{ id }}" data-modal-type>\n        <div class="m-modal__content">\n          {{ content }}\n        </div>\n        <div class="m-modal__close-btn" data-modal-ui-close>\n          <span class="p-in_text">CLOSE</span>\n        </div>\n      </section>';
  }
  return _html;
};

let _activenum = 0;
const Progressbtn = () => {
  $('[data-active-slide]').on('click', function () {
    _activenum = $(this).data('active-slide');
    contslide.slideTo(_activenum, 1200, true);
    if ($('body').hasClass('menu-open')) {
      $('body').removeClass('menu-open');
    }
  });
  $('.p-nav__content').on('click', function () {
    $('body').removeClass('menu-open');
  });
};

const ScrollEffect = () => {
  new MODAL_MODULE({customModalHtml: _template_function_advanced});
};

const RandomAnime = () => {
  // å†å¸°
  let randanime = (_index) => {
    let _rand = Math.floor(Math.random() * 6000) + 4000; // 4000~6000ã®é–“ã§ãƒ©ãƒ³ãƒ€ãƒ ã«
    setTimeout(function () {
      $('.l-section__deco').eq(_index).removeClass('active');
      setTimeout(function () {
        $('.l-section__deco').eq(_index).addClass('active');
        randanime(_index);
      }, 4500);
    }, _rand);
  };
  // åˆå›žèµ·å‹•
  $('.l-section__deco').each(function (index) {
    randanime(index); // ãƒ©ãƒ³ãƒ€ãƒ ã®å‡¦ç†ã«indexã®å€¤ã‚’æ¸¡ã™
  });
};

const Pagination = () => {
  let $slides = $('.content_swiper-slide');
  let _slidewidth_array = []; // ç©ºã®é…åˆ—ç”¨æ„

  let _total = 0;
  for (let $i = 0; $i < $slides.length - 1; $i++) {
    let _width = $('.content_swiper-slide:nth-of-type(' + [$i + 1] + ')').width();
    _total = _total + _width; // ã‚¹ãƒ©ã‚¤ãƒ‰ã®åˆè¨ˆé•·ã•
    _slidewidth_array.push(_width);
  }

  _total = _total - (window.innerWidth - $('.content_swiper-slide:nth-of-type('.concat($slides.length, ')')).width()); // å·¦åŸºæº–ã«èª¿æ•´

  let _left = 0;
  for (let $j = 0; $j < $slides.length - 2; $j++) {
    let _moveLeft = Math.floor(((_slidewidth_array[$j] + _left) / _total) * 100);
    $('.slide_progressbar__target-item:nth-of-type(' + ($j + 2) + ')').css('left', _moveLeft + '%');
    _left = _left + _slidewidth_array[$j];
  }
};

const UpdateDom = () => {
  windowW = $(window).width();
};

$(function () {
  UpdateDom();
  Contentslide();
});

$(window).on('load', function () {
  ScrollEffect();
  if ($('.p-movie_swiper .swiper-slide').length > 1) {
    Movieslide();
  } else {
    $('.p-movie__slider').addClass('slide_none');
  }
  Progressbtn();
  Param();
  RandomAnime();
});

$(window).on('load resize', function () {
  UpdateDom();
  Pagination();
  contslide.update();
  contslide.updateProgress();
});