import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {splitText} from '../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

export class AnimationWhoWeAre {
  constructor() {
    this.parent = document.querySelector('.who-we-are');

    this.timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: this.parent,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play pause resume pause',
      },
      paused: true,
    });
    this.timeLineImages = gsap.timeline();

    this.titlePrimary = this.parent.querySelector('h2.title.title--rotation');
    this.titleSecondary = this.parent.querySelector('p.title.title--rotation');
    this.aboutText = this.parent.querySelector('.who-we-are__description');
    this.aboutTextTranslateY = parseInt(getComputedStyle(this.aboutText).height, 10) / 4 + 5;

    this.matchMedia = gsap.matchMedia();
    this.splitText = splitText;

    this.splitText(this.aboutText)

    this.animateEmployees();
    this.animateTitles();
  }

  animateEmployees() {
    this.matchMedia.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
      },
      (context) => {
        // eslint-disable-next-line no-unused-vars
        const { isDesktop, isMobile } = context.conditions;

        const animalsEmployeesThumbs = Array.from(document.querySelectorAll('.who-we-are__employees-icon'));
        const animalEmployees = Array.from(document.querySelectorAll('.who-we-are__employees-item'));
        animalsEmployeesThumbs.forEach((item, index) => {
          this.timeLineImages.to(item.querySelector('svg'), {
            ease: 'power3.inOut',
            fill: '#E600A1',
            duration: 0.375,
            repeat: 3,
            yoyo: true,
          });

          const employeesItem = animalEmployees[index];

          if (index === 0) {
            this.timeLineImages
              .set(employeesItem, { display: 'block', opacity: 0, scale: 0 }, '<')
              .to(employeesItem, {
                opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out',
              }, '<')
              .to(employeesItem, {
                rotation: 10, duration: 0.45, yoyo: true, repeat: 1, ease: 'power1.inOut',
              })
              .to(employeesItem, { opacity: 0, duration: 0.3, ease: 'power1.in' })
              .set(employeesItem, { display: 'none' });
          }

          if (index === 1) {
            this.timeLineImages
              .set(employeesItem, {
                display: 'block', opacity: 0, scale: 0, y: isDesktop ? -200 : -50,
              }, '<')
              .to(employeesItem, {
                opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out',
              }, '<')
              .to(employeesItem, {
                rotation: 10, y: 0, duration: 0.9, ease: 'bounce.out',
              })
              .to(employeesItem, { opacity: 0, duration: 0.3, ease: 'power1.in' })
              .set(employeesItem, { display: 'none' });
          }

          if (index === 2) {
            this.timeLineImages
              .set(employeesItem, { display: 'block', opacity: 0, scale: 0 }, '<')
              .to(employeesItem, {
                opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out',
              }, '<')
              .to(employeesItem, {
                rotation: -10, scale: 1.4, duration: 0.45, yoyo: true, repeat: 1, ease: 'power1.inOut',
              })
              .to(employeesItem, { opacity: 0, duration: 0.3, ease: 'power1.in' })
              .set(employeesItem, { display: 'none' });
          }

          if (index === 3) {
            this.timeLineImages
              .set(employeesItem, { display: 'block', opacity: 0, x: 200 }, '<')
              .to(employeesItem, { opacity: 1, duration: 0.3, ease: 'power1.out' }, '<')
              .to(employeesItem, { x: 0, duration: 0.7, ease: 'power1.out' }, '<')
              .to(employeesItem, {
                opacity: 0, duration: 0.3, delay: 0.5, ease: 'power1.in',
              })
              .set(employeesItem, { display: 'none' });
          }

          if (index === 4) {
            this.timeLineImages
              .set(employeesItem, { display: 'block', opacity: 0, scale: 0 }, '<')
              .to(employeesItem, {
                opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out',
              }, '<')
              .to(employeesItem, {
                rotation: -10, duration: 0.45, yoyo: true, repeat: 1, ease: 'power1.inOut',
              })
              .to(employeesItem, { opacity: 0, duration: 0.3, ease: 'power1.in' })
              .set(employeesItem, { display: 'none' });
          }

          if (index === 5) {
            this.timeLineImages
              .set(employeesItem, { display: 'block', opacity: 0, scale: 0 }, '<')
              .to(employeesItem, { opacity: 1, duration: 0.3, ease: 'power1.out' }, '<')
              .to(employeesItem, { scale: 1.2, duration: 1.2, ease: 'power1.out' }, '<')
              .to(employeesItem, {
                rotation: -10, yoyo: true, repeat: 3, duration: 0.3, ease: 'power1.inOut',
              }, '<')
              .to(employeesItem, { opacity: 0, duration: 0.3, ease: 'power1.in' })
              .set(employeesItem, { display: 'none' });
          }

          if (index === 6) {
            this.timeLineImages
              .set(employeesItem, {
                display: 'block', opacity: 0, scale: 0, y: -50,
              }, '<')
              .to(employeesItem, {
                opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out',
              }, '<')
              .to(employeesItem, { y: 0, duration: 0.9, ease: 'bounce.out' })
              .to(employeesItem, { opacity: 0, duration: 0.3, ease: 'power1.in' })
              .set(employeesItem, { display: 'none' });
          }
        });
        this.timeLineImages.repeat(-1);
      },
    );
  }

  animateTitles() {
    this.timeLine
      .set(this.titlePrimary, { x: -369 })
      .set(this.titleSecondary, { x: 369 })
      .set('.who-we-are__description .word', { y: this.aboutTextTranslateY, opacity: 0 })
      .to(this.titlePrimary, {
        duration: 1,
        x: 0,
      })
      .to(this.titleSecondary, {
        duration: 1,
        x: 0,
      }, '<')
      .to('.who-we-are__description .word', {
        duration: 0.4,
        y: 0,
        opacity: 1,
        stagger: 0.04,
      })
      .add(this.timeLineImages, '-=1');
  }
}
