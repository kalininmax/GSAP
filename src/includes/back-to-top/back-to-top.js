import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class BackToTop {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.back-to-top');
		this.pageWrapper = document.querySelector('.wrapper');

		if (!this.container || !this.pageWrapper) {
			return;
		}

		const link = this.container.querySelector('.back-to-top__link-wrapper a');

		const tl = gsap
			.timeline()
			.set(this.container, { autoAlpha: 1 })
			.from(this.container, { yPercent: 100, ease: 'back' })
			.from(link, { xPercent: -100, duration: 0.35 });

		ScrollTrigger.create({
			trigger: this.pageWrapper,
			start: '75% bottom',
			animation: tl,
			toggleActions: 'play none none reverse',
			fastScrollEnd: true,
		});
	}
}

export default BackToTop;
