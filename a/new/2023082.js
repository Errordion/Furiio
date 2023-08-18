'use strict';
const $body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
  On.ready();
});

window.addEventListener('load', () => {
  On.load();
});
window.addEventListener('resize', () => {
  kvFit.init();
});

const On = {
  ready() {
    $body.classList.add('is-ready');

    Scroll.init();
  },
  load() {
    $body.classList.add('is-load');
    scrollEffect.init();
    Scroll.init();
    pageTop.init();
    Modal.init();
    Menu.init();
    youtube.init();
    KvSlide.init();
    mouseMove.init();
    kvFit.init();
  },
};

const mouseMove = {
  set() {
    window.addEventListener('mousemove', (e) => {
      let x = e.clientX / 150;
      let y = e.clientY / 150;

      const $target = document.querySelectorAll('[data-mousemove-target]').forEach(($target) => {
        $target.style.transform = 'translate('
          .concat(x, 'px,')
          .concat(y, 'px) rotate(')
          .concat(x * 0.8, 'deg)');
      });
    });
  },
  init() {
    mouseMove.set();
  },
};

const Scroll = {
  instance: null,
  set() {
    this.instance = new SCROLL_MODULE('[data-scroll]', {
      duration: 800,
      easing: SCROLL_MODULE.easeOutQuart,
      offset: 0,
    });
  },
  init() {
    this.set();
  },
};

const kvFit = {
  set() {
    document.querySelectorAll('.p-kv__image').forEach(($target) => {
      const height = $target.offsetHeight;
      const winHeight = window.innerHeight;

      if (height <= winHeight) {
        document.querySelector('.p-kv__left').classList.add('is-relative');
      } else {
        document.querySelector('.p-kv__left').classList.remove('is-relative');
      }
    });
  },
  init() {
    this.set();
  },
};

const KvSlide = {
  instance: null,
  spWidth: 768,
  set() {
    new Swiper('.p-kv__image-item', {
      speed: 1000,
      effect: 'fade',
      loop: true,
      autoplay: {
        delay: 5000,
      },
      fadeEffect: {
        crossFade: true,
      },
    });
  },
  init() {
    if (window.innerWidth <= this.spWidth) {
      this.set();
    }
  },
};

const Menu = {
  set() {
    if (document.querySelectorAll('.is-top').length) {
      if (window.scrollY > 100) {
        document.querySelector('[data-menu-btn]').classList.add('is-active');
      } else {
        document.querySelector('[data-menu-btn]').classList.remove('is-active');
      }
    } else {
      document.querySelector('[data-menu-btn]').classList.add('is-active');
    }

    window.addEventListener('scroll', () => {
      if (document.querySelectorAll('.is-top').length) {
        if (window.scrollY > 100) {
          document.querySelector('[data-menu-btn]').classList.add('is-active');
        } else {
          document.querySelector('[data-menu-btn]').classList.remove('is-active');
        }
      }
      if (window.scrollY > 500) {
        document.querySelector('[data-pagetop]').classList.add('is-current');
      } else {
        document.querySelector('[data-pagetop]').classList.remove('is-current');
      }
    });
    document.querySelectorAll('[data-menu-btn]').forEach(($item) => {
      $item.addEventListener('click', () => {
        $body.classList.toggle('is-menu-open');
      });
    });
    document.querySelectorAll('[data-link]').forEach(($item) => {
      $item.addEventListener('click', (e) => {
        $body.classList.remove('is-menu-open');
        Scroll.instance.anime(e.currentTarget.dataset.link, 1000);
      });
    });
    if (location.hash) {
      const target = location.hash.replace('#', '');
      if (document.querySelectorAll('.p-' + target).length) {
        setTimeout(function () {
          Scroll.instance.anime('.p-' + target, 1000);
        }, 100);
      }
    }
  },
  init() {
    Menu.set();
  },
};

const pageTop = {
  set() {
    document.querySelectorAll('[data-pagetop]').forEach(($item) => {
      $item.addEventListener('click', () => {
        $item.classList.add('is-active');

        setTimeout(() => {
          Scroll.instance.anime(0, 1000);
        }, 700);
        setTimeout(() => {
          $item.classList.remove('is-active');
        }, 1100);
      });
    });
  },
  init() {
    pageTop.set();
  },
};

const scrollEffect = {
  instance: null,
  set() {
    this.instance = new SCROLL_EFFECT_MODULE({elem: '[data-scroll-effect]'});
  },
  init() {
    scrollEffect.set();
  },
};
const Modal = {
  instance: null,
  set() {
    let _html = '';
    let _script = '';
    const _template_function_advanced = function (type, data) {
      if (type === 'brightcove') {
        const _brightcove_account = '4838167534001';
        _html =
          '\n          <section class="m-modal {{ defaultClassName }}" id="{{ id }}" data-modal-type>\n            <div class="m-modal__bg" data-modal-ui-close></div>\n            <div class="m-modal__content">\n              {{ contentStart }}\n                <div class="video">\n                  <video data-video-id="'
            .concat(data, '" data-account="')
            .concat(
              _brightcove_account,
              '" \n                    data-player="default" data-embed="default" data-application-id class="video-js" controls></video>\n                </div>\n              {{ contentEnd }}\n              <div class="m-modal__close-btn" data-modal-ui-close></div>\n            </div>\n          </section>\n          <style>.m-modal__content .video { width: 100%; }</style>\n          <style>.m-modal__content .video::before { content: ""; display: block; width: 100%; padding-top: 56%; }</style>\n          <style>.m-modal__content .video-js { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style>'
            );

        _script = document.createElement('script');
        _script.src = '//players.brightcove.net/'.concat(_brightcove_account, '/default_default/index.min.js');
        document.querySelector('head').appendChild(_script);
      } else {
        _html =
          '\n            <section class="m-modal {{ defaultClassName }}" id="{{ id }}" data-modal-type>\n              <div class="m-modal__bg"></div>\n              <div class="m-modal__content">\n              <div class="m-modal__close-btn" data-modal-ui-close></div>\n                {{ content }}\n              </div>\n            </section>';
      }
      return _html;
    };
    this.instance = new MODAL_MODULE({
      defaultModalStyle: true,
      defaultClassName: 'm-modal-custom',
      customModalHtml: _template_function_advanced,
    });
  },
  init() {
    Modal.set();
  },
};

const youtube = {
  set() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let MovieElm = document.querySelectorAll('.js-movie')[0].dataset.id;

    window.onYouTubeIframeAPIReady = () => {
      new YT.Player('js-bgplayer', {
        videoId: MovieElm,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
        playerVars: {
          playsinline: 1,
          controls: 0,
          loop: 1,
        },
      });

      // ใใฅใผใใ€่ชๅ•ๅ็”
      function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
      }
      // ใซใผใ—ๅ็”
      function onPlayerStateChange(event) {
        switch (event.data) {
          case YT.PlayerState.ENDED:
            event.target.playVideo();
            break;
        }
      }
    };
  },
  init() {
    if (document.querySelectorAll('.js-movie').length > 0) {
      youtube.set();
    }
  },
};
