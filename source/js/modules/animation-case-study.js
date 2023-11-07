import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {splitText} from '../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

export class AnimationCaseStudy {
  constructor() {
    this.matchMedia = gsap.matchMedia();
    this.splitText = splitText;
    this.parent = document.querySelector('.case-study');
    this.title = this.parent.querySelector('h2.title');
    this.splitText(this.title);
    this.titleTranslateY = parseInt(getComputedStyle(this.title).height, 10) + 10;
    this.words = this.title.querySelectorAll('.word');
    this.cardItems = this.parent.querySelectorAll('.case-study-item');
    this.designer = this.parent.querySelector('.case-study__designer');
    this.designerSign = this.parent.querySelector('.case-study__designer-sign');
    this.animateCaseStudy();
  }

  animateCaseStudy() {
    gsap.utils.toArray(this.words).forEach((word) => {
      gsap.set(word, { y: this.titleTranslateY, opacity: 0 })
    });
    gsap.set(this.cardItems, { opacity: 0, y: 100 });
    gsap.set(this.designer, { y: 200, scale: 0.05, rotation: -45 });
    gsap.set(this.designerSign, { opacity: 0 });
    this.matchMedia.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
      },
      (context) => {
        // eslint-disable-next-line no-unused-vars
        const { isDesktop, isMobile } = context.conditions;
        gsap.to(this.words, {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.15,
          scrollTrigger: {
            trigger: this.title,
            toggleActions: 'play pause resume none',
            start: 'top 30%',
          },
        });
        gsap.utils.toArray(this.cardItems).forEach((card) => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              toggleActions: 'play pause resume none',
              start: 'top-=100px 35%',
            },
          });
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.parent,
            start: 'bottom-=50 bottom',
            toggleActions: 'play complete play reset',
          },
        });
        tl.to(this.designer, {
          y: isDesktop ? -50 : 0,
          rotation: 0,
          scale: 1,
          duration: 1.3,
        }).to(this.designerSign, {
          opacity: 1,
          duration: 0.3,
        }, '>-=0.5');
      },
    );
  }
}
