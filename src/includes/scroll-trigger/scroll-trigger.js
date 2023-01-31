import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextSplitter from '../../assets/js/modules/TextSplitter';

class ScrollTriggerBasics {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.scroll-trigger');

		if (!this.container) {
			return;
		}

		this._initCarAnim();

		window.addEventListener('load', () => {
			this._initAdAnim();
			this._initBasicParallax();
			this._initBasicCarParallax();

			const carAdContainers = this.container.querySelectorAll(
				'.scroll-trigger__section._car-ad-parallax'
			);

			carAdContainers.forEach(container => {
				this._initBasicAdParallaxSections(container);
			});
		});
	}
	_initCarAnim() {
		const carSection = this.container.querySelector('.scroll-trigger__section._car');
		const car = this.container.querySelector('#car').parentElement;
		const wheels = car.querySelectorAll('#wheel1, #wheel2');

		const width = window.innerWidth;
		const speed = width / 10;
		const endX = width - car.offsetWidth * 2;

		const circumference = wheels[0].getBBox().width * Math.PI;
		const rotation = (endX / circumference) * 360;
		const duration = endX / speed;
		const ease = 'sine.inOut';

		const carAnimation = gsap
			.timeline()
			.to(car, { duration: duration, x: endX, ease: ease })
			.to(
				wheels,
				{ duration: duration, rotation: rotation, transformOrigin: 'center', ease: ease },
				0
			);

		ScrollTrigger.create({
			trigger: carSection,
			animation: carAnimation,
			start: 'bottom bottom',
			end: '+=1000',
			scrub: 1,
			pin: true,
			// pinSpacer: carSection.parentElement,
		});
	}
	_initAdAnim() {
		const adSection = this.container.querySelector('.scroll-trigger__section._ad');
		const adLogo = adSection.querySelector('.logo');
		const adText = adSection.querySelector('.text');

		const adTextSplit = TextSplitter.split(adText);
		const adAnimation = gsap.timeline();
		adAnimation
			.from(adLogo, { width: 0, duration: 0.8, ease: 'power1.in' })
			.from(adTextSplit.words, { opacity: 0, yPercent: -100, stagger: 0.05, duration: 0.3 });

		gsap.set('.scroll-trigger__section._ad > *', { autoAlpha: 1 });

		ScrollTrigger.create({
			trigger: adSection,
			animation: adAnimation,
			start: 'top top',
			end: '+=1000',
			pin: true,
			scrub: 1,
		});
	}
	_initBasicParallax() {
		const container = this.container.querySelector('.scroll-trigger__section._basic-parallax');
		const backgroundElement = container.querySelector('.background');
		const middlegroundElement = container.querySelector('.middleground');
		const foregroundElement = container.querySelector('.foreground');
		const textElement = container.querySelector('.text');

		gsap
			.timeline({
				defaults: { ease: 'linear', duration: 1 },
				scrollTrigger: {
					trigger: container,
					start: 'top top',
					end: '+=320',
					toggleActions: 'restart none none reverse',
					scrub: 1,
					pin: true,
				},
			})
			.from(backgroundElement, { y: 50 })
			.from(middlegroundElement, { y: 150 }, 0)
			.from(foregroundElement, { y: 250 }, 0)
			.from(textElement, { y: 500 }, 0);
	}
	_initBasicCarParallax() {
		const container = this.container.querySelector('.scroll-trigger__section._car-parallax');
		const carWrapper = container.querySelector('.svg-wrapper');
		const car = container.querySelector('.svg-wrapper #car');
		const road = container.querySelector('.svg-wrapper #road');
		const trees = container.querySelector('.svg-wrapper #trees');

		gsap
			.timeline({
				defaults: { ease: 'linear', duration: 1 },
				scrollTrigger: {
					trigger: carWrapper,
					start: 'bottom bottom',
					end: 'bottom top',
					toggleActions: 'restart none none reverse',
					scrub: 1,
				},
			})
			.to(car, { y: '-=180' })
			.to(road, { y: '+=180' }, 0)
			.to(trees, { y: '+=250' }, 0);
	}
	_initBasicAdParallaxSections(container) {
		const background = container.querySelector('.background');
		const foreground = container.querySelector('.foreground');
		const text = foreground.querySelectorAll('p');

		const tl = gsap
			.timeline()
			.from(background, { backgroundPositionY: '40%', filter: 'brightness(0.5)', duration: 1 })
			.from(text, { y: 200, stagger: 0.1 }, 0);

		ScrollTrigger.create({
			trigger: container,
			start: 'top 65%',
			toggleActions: 'play none none reverse',
			animation: tl,
		});
	}
}

export default new ScrollTriggerBasics();
