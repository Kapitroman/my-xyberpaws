import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class AnimationWhatWeCanDo {
  constructor() {
    this.matchMedia = gsap.matchMedia();
    this.parent = document.querySelector('.what-we-can-do');
    this.titlePrimary = this.parent.querySelector('h2.title.title--rotation');
    this.titleSecondary = this.parent.querySelector('p.title.title--rotation');
    this.contentList = this.parent.querySelector('.what-we-can-do__content-list')
    this.cards = this.contentList.querySelectorAll('.content-item');
    this.button = this.parent.querySelector('.btn');
    this.image = this.parent.querySelector('.what-we-can-do__content-image img');

    this.animateTitle();
    this.animateCards();
  }

  animateCards() {
    this.matchMedia.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        gsap.utils.toArray(this.cards).forEach((card) => {
          gsap.set(card, { y: 200, opacity: 0 })
        });
        gsap.set(this.image, {  scale: 0, opacity: 0 });
        gsap.set(this.button, { opacity: 0 });

        if (isDesktop) {
          const timeLine = gsap.timeline({
            scrollTrigger: {
              trigger: this.contentList,
              start: 'top 35%',
            },
          });

          timeLine
            .add('start')
            .to(this.cards, {
              duration: 0.5,
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              stagger: 0.2,
            })
            .to(this.image, {
              scale: 1,
              duration: 0.7,
              opacity: 1,
            }, 'start+=0.85')
            .to(this.button, {
              duration: 0.4,
              opacity: 1,
              ease: 'power2.out',
            }, 'start+=0.7');
        }

        if (isMobile) {
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
            delay: 0.2,
            duration: 0.5,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.button,
              toggleActions: 'play pause resume pause',
              start: 'top-=20px bottom',
            },
          });

          gsap.to(this.image, {
            scale: 1,
            duration: 0.7,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: this.image,
              toggleActions: 'play pause resume pause',
              start: 'top-=20px bottom',
            },
          });
        }
      },
    );
  }

  animateTitle() {
    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: this.parent,
        strat: 'top center',
      },
    });
    timeLine
      .set(this.titlePrimary, { x: -300 })
      .set(this.titleSecondary, { x: 300 })
      .to(this.titlePrimary, {
        duration: 1,
        x: 0,
      })
      .to(this.titleSecondary, {
        duration: 1,
        x: 0,
      }, '<');
  }
}
