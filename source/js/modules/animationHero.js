import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import {splitText} from '../utils/split-text';

gsap.registerPlugin(MotionPathPlugin);

export class AnimationHero {
  constructor() {
    this.matchMedia = gsap.matchMedia();
    this.timeLine = gsap.timeline();
    this.timeLineRepeat = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    this.parent = document.querySelector('.hero');
    this.title = this.parent.querySelector('.hero__title');
    this.titleTranslateY = parseInt(getComputedStyle(this.title).height, 10) / 2 + 10;
    this.discription = this.parent.querySelector('.hero__description');
    this.discriptionTranslateY = parseInt(getComputedStyle(this.discription).height, 10) / 2 + 10;
    this.splitText = splitText;
    this.buttons = this.parent.querySelector('.hero__buttons');
    this.buttonsTranslateY = parseInt(getComputedStyle(this.buttons).height, 10) + 10;
    this.imageHelix = this.parent.querySelector('.hero__image-helix');
    this.cmsTransitionY = parseInt(getComputedStyle(this.imageHelix).width, 10) / 14.4;
    this.imageScreen = this.parent.querySelector('.hero__image-screen');
    this.imageSuccess = this.parent.querySelector('.hero__image-success');

    this.splitText(this.title);
    this.splitText(this.discription);

    this.animateHero();
  }

  animateHero() {
    this.matchMedia.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
      },
      (context) => {
        // eslint-disable-next-line no-unused-vars
        const { isDesktop, isMobile } = context.conditions;
        this.timeLine
          .set(this.imageHelix, { scale: 2, opacity: 0 })
          .set('.hero__title .word', { y: this.titleTranslateY, opacity: 0 })
          .set('.hero__description .word', { y: this.discriptionTranslateY, opacity: 0 })
          .set('.hero__image-cms', { scale: 0, opacity: 1 })
          .set(this.imageScreen, { scale: 0.8, opacity: 0 })
          .set(this.imageSuccess, { scale: 0.2, opacity: 0 })
          .set(this.buttons, { opacity: 0, y: this.buttonsTranslateY })
          .set(this.parent, { opacity: 1 })
          .add('start')
          .to(this.imageHelix, {
            scale: 1,
            duration: 1,
            opacity: 1,
            ease: 'power1.out',
          }, 'start')
          .add('endHeroImage')
          .to('.hero__title .word', {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power1.out',
          }, 'start')
          .to(this.imageScreen, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
          }, 'endHeroImage-=0.3')
          .to('.hero__description .word', {
            y: 0,
            scale: 1,
            stagger: 0.02,
            duration: 0.7,
            opacity: 1,
          }, 'start+=0.4')
          .to(this.buttons, {
            y: 0,
            duration: 0.35,
            opacity: 1,
          }, 'endHeroImage-=0.15')
          .add(
            this.timeLineRepeat
              .add('startRepeat')
              .to('.hero__image-cms', {
                scale: 1.2,
                duration: 0.35,
                stagger: 0.6,
              })
              .to('.hero__image-cms', {
                duration: 4.5,
                ease: 'none',
                stagger: 0.6,
                motionPath: isDesktop ? { path: '#path', align: '#path', alignOrigin: [0.5, 0.8] } : { path: '#path1', align: '#path1', alignOrigin: [0.5, 0.8] },
              }, '<')
              .to('.hero__image-cms', {
                stagger: 0.6,
                duration: 0.7,
                scale: 0,
                rotation: 50,
                y: -this.cmsTransitionY,
              }, '<3.9')
              .to(this.imageScreen, {
                opacity: 0,
                scale: 0,
                duration: 0.25,
                ease: 'power1.in',
              }, '>-0.5')
              .add('success')
              .to(this.imageSuccess, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out',
              }, 'success')
              .to('.star', {
                opacity: 1,
                duration: 0.2,
                stagger: {
                  each: 0.03,
                },
              }, 'success')
              .to('.star', {
                rotation: 180,
                duration: 0.5,
                repeatDelay: 0.2,
                repeat: 1,
                yoyo: true,
                transformOrigin: 'center center',
              }, '>')
              .to(this.imageSuccess, {
                scale: 0,
                duration: 0.2,
                ease: 'power1.in',
              }, '>')
              .to('.star', {
                opacity: 0,
                duration: 0.2,
                ease: 'power1.in',
              }, '<')
              .to(this.imageScreen, {
                opacity: 1,
                scale: 1,
                duration: 0.2,
              }, '>'),
            'start+=0.7',
          );
      }
    )
  }
}
