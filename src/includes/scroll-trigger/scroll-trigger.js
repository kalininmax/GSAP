import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextSplitter from '../../assets/js/modules/TextSplitter';

class ScrollTriggerPage {
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
}

export default new ScrollTriggerPage();
