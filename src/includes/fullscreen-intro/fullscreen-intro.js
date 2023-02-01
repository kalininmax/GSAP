import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class FullscreenIntro {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.fullscreen-intro');

		if (!this.container) {
			return;
		}

		const circle = this.container.querySelector('.fullscreen-intro__circle');
		const heroSection = this.container.querySelector('.fullscreen-intro__hero');
		const moreContent = this.container.querySelector('.fullscreen-intro__content');
		const animWrapper = this.container.querySelector('.fullscreen-intro__animation');
		const title = this.container.querySelector('.fullscreen-intro__headings p:nth-child(1)');
		const subtitle = this.container.querySelector('.fullscreen-intro__headings p:nth-child(2)');
		const logo = this.container.querySelector('.fullscreen-intro__logo');
		const rotator = this.container.querySelector('.fullscreen-intro__rotator');
		const rotatorTexts = rotator.querySelectorAll('.h1');

		gsap.set(circle, { xPercent: -50, yPercent: -50, autoAlpha: 1 });

		const center = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		};

		Math.getDistance = (x1, y1, x2, y2) => {
			let xs = x2 - x1;
			let ys = y2 - y1;
			xs *= xs;
			ys *= ys;
			return Math.sqrt(xs + ys);
		};

		const radius = Math.getDistance(0, 0, center.x, center.y);
		const fullWidth = radius * 2;
		const percentIncrease = fullWidth / 100;

		const scrollTimeline = gsap
			.timeline({ paused: true })
			.to(title, { y: -100, opacity: 0 })
			.to(subtitle, { y: 100, opacity: 0 }, '<')
			.set(rotator, { opacity: 1 }, '<')
			.from(rotatorTexts, { opacity: 0, scale: 0, stagger: 1 }, '<')
			.to(rotatorTexts, { opacity: 0, scale: 2, stagger: 1 }, '<+1');

		const enableScrollTimeline = () => {
			gsap.set(moreContent, { display: 'block' });

			ScrollTrigger.create({
				trigger: heroSection,
				start: 'top top',
				end: '+=' + window.innerHeight * 3,
				animation: scrollTimeline,
				scrub: 0.5,
				pin: true,
			});
		};

		gsap
			.timeline({ onComplete: enableScrollTimeline })
			.to(circle, { x: '90vw' })
			.to(circle, { x: '50vw', scale: percentIncrease, duration: 1, ease: 'power1.in' })
			.set(animWrapper, { autoAlpha: 1 }, '<0.5')
			.from(title, { xPercent: -100, opacity: 0, duration: 1 }, '<')
			.from(subtitle, { xPercent: 100, opacity: 0, duration: 1 }, '<0.25')
			.from(logo, { scale: 0.3, opacity: 0, duration: 0.5 }, '<0.5')
			.duration(5);
	}
}

export default new FullscreenIntro();
