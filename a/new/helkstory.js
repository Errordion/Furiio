'use strict';
const episodeSlide = {
  term1: undefined,
  term2: undefined,
  set() {
    let start = document.querySelector('[data-episode-index]').dataset.episodeIndex - 1;

    const length = document.querySelectorAll('[data-episode-image]').length;

    for (let i = 0; i < length; i++) {
      let num = i + 1;
      let slideitem = document.querySelectorAll('[data-episode-image]')[i].childNodes[1];
      let page = 'js-image-page' + num + '';

      document.querySelectorAll('[data-episode-image] .p-in-nav')[i].classList.add(page);
      slideitem.classList.add('js-image-slide' + num + '');

      new Swiper('.js-image-slide' + num + '', {
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        pagination: {
          el: '.js-image-page' + num + '',
          clickable: true,
          renderBullet: function (index, className) {
            let image = [];

            document.querySelectorAll('.js-image-slide' + num + ' .p-in-list-item').forEach(($target) => {
              image.push($target.children[0].getAttribute('src'));
            });
            return '<div class="p-in-nav-item '.concat(className, '">\n                <img src="').concat(image[index], '" alt="">\n              </div>');
          },
        },
      });
    }

    this.term1 = new Swiper('[data-episode-slide-01]', {
      speed: 1000,
      effect: 'fade',
      allowTouchMove: false,
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: '[data-goods-slide-nav]',
        clickable: true,
        renderBullet: function (index, className) {
          let image = [];

          document.querySelectorAll('.p-goods_detail__content-image-list-item').forEach(($target) => {
            image.push($target.children[0].getAttribute('src'));
          });
          return '<div class="p-goods_detail__content-image-nav-item '.concat(className, '">\n              <img src="').concat(image[index], '" alt="">\n            </div>');
        },
      },
    });
    document.querySelectorAll('[data-episode-btn01]').forEach(($target) => {
      $target.addEventListener('click', function () {
        document.querySelectorAll('[data-episode-btn01]').forEach(($btn) => {
          $btn.classList.remove('is-current');
        });
        this.classList.add('is-current');
        let index = this.dataset.episodeBtn01 - 1;
        episodeSlide.term1.slideTo(index);
      });
    });
    this.term1.slideTo(start);

    // this.term2 = new Swiper('[data-episode-slide-02]', {
    //   speed: 1000,
    //   effect: 'fade',
    //   allowTouchMove: false,
    //   fadeEffect: {
    //     crossFade: true
    //   },
    // });
    // document.querySelectorAll('[data-episode-btn02]').forEach(($target) => {
    //   $target.addEventListener('click',function(){
    //     document.querySelectorAll('[data-episode-btn02]').forEach(($btn) => {
    //       $btn.classList.remove('is-current');
    //     });
    //     this.classList.add('is-current');
    //     let index = this.dataset.episodeBtn02- 1;
    //     episodeSlide.term2.slideTo(index);
    //   });
    // });
  },
  init() {
    this.set();
  },
};

const termChange = {
  set() {
    function activeTab(num) {
      document.querySelectorAll('[data-term]').forEach(($target) => {
        $target.classList.remove('is-current');
        let index = num;
        let target = $target.dataset.term;
        if (target === index) {
          $target.classList.add('is-current');
        }
      });
    }
    const start = document.querySelector('[data-term-index]').dataset.termIndex;
    // document.querySelectorAll('[data-term-btn]')[start - 1].classList.add('is-current');
    activeTab(start);

    document.querySelectorAll('[data-term-btn]').forEach(($btn) => {
      $btn.addEventListener('click', function () {
        document.querySelectorAll('[data-term-btn]').forEach(($item, index) => {
          $item.classList.remove('is-current');
        });
        let index = this.dataset.termBtn;
        this.classList.add('is-current');
        activeTab(index);
      });
    });
  },
  init() {
    termChange.set();
  },
};

const contentTab = {
  set() {
    function activeTab(num) {
      document.querySelectorAll('[data-tab]').forEach(($target) => {
        $target.classList.remove('is-current');
        let index = num;
        let target = $target.dataset.tab;
        if (target === index) {
          $target.classList.add('is-current');
        }
      });
      document.querySelectorAll('[data-title]').forEach(($target) => {
        $target.classList.remove('is-current');
        let index = num;
        let target = $target.dataset.title;
        if (target === index) {
          $target.classList.add('is-current');
        }
      });
    }
    const start = document.querySelector('[data-tab-index]').dataset.tabIndex;
    activeTab(start);
    document.querySelectorAll('[data-tab-btn]')[start - 1].classList.add('is-current');

    document.querySelectorAll('[data-tab-btn]').forEach(($btn, index) => {
      $btn.addEventListener('click', function () {
        document.querySelectorAll('[data-tab-btn]').forEach(($item, index) => {
          $item.classList.remove('is-current');
        });
        let index = this.dataset.tabBtn;
        $btn.classList.add('is-current');
        activeTab(index);
      });
    });
  },
  init() {
    this.set();
  },
};

window.addEventListener('load', () => {
  episodeSlide.init();
  termChange.init();
  contentTab.init();
});
