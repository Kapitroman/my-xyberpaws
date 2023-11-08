//const sliderSwiper = document.querySelector('.reviews__slider');
const sliderSwiper = document.querySelector('.swiper');
let swiper;

const initSwiper = (slider) => {
// eslint-disable-next-line no-undef

  swiper = new Swiper(slider, {
    /*
    autoplay: {
      delay: 1000,
      speed: 800,
      disableOnInteraction: false,
    },
    */
    //loop: true,
    //slidesPerView: 3,
    //spaceBetween: 30,
    /*
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
    },
    */
    navigation: {
      nextEl: slider.querySelector('.reviews__button-next'),
      prevEl: slider.querySelector('.reviews__button-prev'),
    }
  });
};

const initReviewsSlider = () => {
  if (!sliderSwiper) {
    return;
  }

  initSwiper(sliderSwiper);
};

export {initReviewsSlider};
