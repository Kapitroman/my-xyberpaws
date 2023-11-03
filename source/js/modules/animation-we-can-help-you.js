import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {splitText} from '../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

export class AnimationWeCanHelpYou {
  constructor() {
    this.matchMedia = gsap.matchMedia();
    this.parent = document.querySelector('.we-can-help-you');
    this.title = this.parent.querySelector('.title');
    this.titleTranslateY = parseInt(getComputedStyle(this.title).height, 10) + 10;
    this.cards = this.parent.querySelectorAll('.content-item');
    this.button = this.parent.querySelector('.btn');
    this.splitText = splitText;
    this.splitText(this.title);
    this.words = this.parent.querySelectorAll('.word');
    this.animateWecanHelpYou();
  }

  animateWecanHelpYou() {
    this.matchMedia.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        gsap.utils.toArray(this.words).forEach((word) => {
          gsap.set(word, { y: this.titleTranslateY, opacity: 0 })
        });
        gsap.utils.toArray(this.cards).forEach((card) => {
          let cardTranslateY = parseInt(getComputedStyle(card).height, 10) + 10;
          gsap.set(card, { y: cardTranslateY, opacity: 0 })
        });
        gsap.set(this.button, { opacity: 0 });

        if (isDesktop) {
          const timeLine = gsap.timeline({
            scrollTrigger: {
              toggleActions: 'play pause resume pause',
              trigger: this.title,
              start: 'top 35%',
            },
          });
          timeLine
            .add('start')
            .to(this.words, {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.2,
            })
            .to(this.cards, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.15,
            }, 'start+=0.1')
            .to(this.button, {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            }, 'start+=1');
        }
        if (isMobile) {
          gsap.to(this.words, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.2,
            scrollTrigger: {
              toggleActions: 'play pause resume pause',
              trigger: this.title,
              start: 'top bottom',
            },
          });
          gsap.utils.toArray(this.cards).forEach((card) => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                toggleActions: 'play pause resume pause',
                start: 'top-=20px bottom',
              },
            });
          });
          gsap.to(this.button, {
            opacity: 1,
            delay: 0.15,
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.button,
              toggleActions: 'play pause resume pause',
              start: 'top bottom-=45px',
            },
          });
        }
      }
    )
  }
}
