import {mobileVhFix} from './utils/mobile-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
// import {CustomSelect} from './modules/select/custom-select';
// import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';

import {Burger} from './modules/burger';
import {StickyHeader} from './modules/sticky-header';
import {initMoveTo} from './modules/init-move-to';
import {initReviewsSlider} from './modules/init-reviews-slider';

import {AnimationHero} from './modules/animation-hero';
import {AnimationWeCanHelpYou} from './modules/animation-we-can-help-you';
import {AnimationWhoWeAre} from './modules/animation-who-we-are';
import {AnimationCaseStudy} from './modules/animation-case-study';
import {AnimationReviews} from './modules/animation-reviews';
import {AnimationWhatWeCanDo} from './modules/animation-what-we-can-do';
import {AnimationContactUs} from './modules/animation-contact-us';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  mobileVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    // uploadFile();
    // uploadImageDrop();
    // const select = new CustomSelect();
    // select.init();
    const form = new Form();
    window.form = form;
    form.init();

    const burger = new Burger();
    burger.init();
    const stickyHeader = new StickyHeader();
    stickyHeader.init();
    initMoveTo();
    initReviewsSlider();

    new AnimationHero();
    new AnimationWeCanHelpYou();
    new AnimationWhoWeAre();
    new AnimationCaseStudy();
    new AnimationReviews();
    new AnimationWhatWeCanDo();
    new AnimationContactUs();

  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
