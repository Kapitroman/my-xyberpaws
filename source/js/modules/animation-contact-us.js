import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {splitText} from '../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

export class AnimationContactUs {
  constructor() {
    this.matchMedia = gsap.matchMedia();
    this.splitText = splitText;
    this.parent = document.querySelector('.contact-us');
    this.title = this.parent.querySelector('.title');
    this.titleTranslateY = parseInt(getComputedStyle(this.title).height, 10) + 10;
    this.splitText(this.title);
    this.words = this.title.querySelectorAll('.word');
    this.imageContainer = this.parent.querySelector('.contact-us__container-image');
    this.imageText = this.parent.querySelector('.contact-us__text');
    this.splitText(this.imageText);
    this.imageTextWords = this.imageText.querySelectorAll('.word');
    this.imageTextTranslateY = parseInt(getComputedStyle(this.imageText).height, 10) / 3 + 10;
    this.fieldsContainer = this.parent.querySelector('.contact-us__fields-container');
    this.fieldGroups = this.fieldsContainer.querySelectorAll('.contact-us__field-group');
    this.fieldGroupTranslateY = parseInt(getComputedStyle(this.fieldsContainer).height, 10) / 3 + 10;
    this.button = this.parent.querySelector('.btn');

    this.animateContactUs();
  }

  animateContactUs() {
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
        gsap.utils.toArray(this.imageTextWords).forEach((word) => {
          gsap.set(word, { y: this.imageTextTranslateY, opacity: 0 })
        });
        gsap.utils.toArray(this.fieldGroups).forEach((field) => {
          gsap.set(field, { y: this.fieldGroupTranslateY, opacity: 0 })
        });
        gsap.set(this.imageContainer, { opacity: 0, scale: 0 });
        gsap.set(this.button, { opacity: 0 });

        if (isDesktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: this.parent,
              start: 'top 60%',
            },
          });

          tl
            .add('start')
            .to(this.words, {
              y: 0,
              opacity: 1,
              stagger: 0.07,
              duration: 0.55,
            })
            .to(this.imageContainer, {
              scale: 1,
              duration: 1,
              opacity: 1,
            }, 'start+=1')
            .to(this.imageTextWords, {
              y: 0,
              duration: 1,
              opacity: 1,
              stagger: 0.08,
            }, 'start+=1.2')
            .to(this.fieldGroups, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.2,
            }, 'start+=1.65')
            .to(this.button, {
              duration: 0.9,
              opacity: 1,
            });
        }

        if (isMobile) {
          gsap.to(this.words, {
            scrollTrigger: {
              trigger: this.title,
              start: 'top-=60px bottom',
            },
            y: 0,
            stagger: 0.07,
            duration: 0.55,
            opacity: 1,
          });

          gsap.to(this.imageContainer, {
            scrollTrigger: {
              trigger: this.imageContainer,
              start: 'center 95%',
            },
            scale: 1,
            duration: 1,
            opacity: 1,
          });

          gsap.to(this.imageTextWords, {
            scrollTrigger: {
              trigger: this.imageText,
              start: 'center 95%',
            },
            y: 0,
            delay: 0.3,
            duration: 1,
            opacity: 1,
            stagger: 0.08,
          });

          gsap.utils.toArray(this.fieldGroups).forEach((groupFields) => {
            gsap.to(groupFields, {
              y: 0,
              duration: 0.9,
              opacity: 1,
              scrollTrigger: {
                trigger: groupFields,
                start: 'top-=20px bottom',
              },
            });
          });

          gsap.to(this.button, {
            duration: 0.9,
            opacity: 1,
            scrollTrigger: {
              trigger: this.button,
              start: 'top-=20px bottom',
            },
          });
        }
      },
    );
  }
}
