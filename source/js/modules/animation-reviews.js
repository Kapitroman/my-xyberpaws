import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {splitText} from '../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

export class AnimationReviews {
  constructor() {
    this.parent = document.querySelector('.reviews');
    this.title = this.parent.querySelector('.title');
    this.titleTranslateY = parseInt(getComputedStyle(this.title).height, 10) + 10;
    this.slider = this.parent.querySelector('.reviews__slider');
    this.buttons = this.parent.querySelector('.reviews__buttons');
    this.splitText = splitText;
    this.splitText(this.title);
    this.words = this.parent.querySelectorAll('.word');
    this.animateReviews();
  }

  animateReviews() {
    gsap.set(this.slider, { x: -100, opacity: 0 });
    gsap.set(this.words, { y: this.titleTranslateY, opacity: 0 });
    gsap.set(this.buttons, { y: 150, opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.parent,
        start: 'top 50%',
      },
    });
    tl
      .to(this.slider, {
        x: 0,
        opacity: 1,
        duration: 1,
      })
      .to(this.buttons, {
        y: 0,
        opacity: 1,
        duration: 1,
      }, '<')
      .to(this.words, {
        y: 0,
        opacity: 1,
        duration: 0.15,
      }, '<+=0.15');
  }
}
