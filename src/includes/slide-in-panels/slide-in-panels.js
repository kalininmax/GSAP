import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class SlideInPanels {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.slide-in-panels');

		if (!this.container) {
			return;
		}

		const panelsContainer = this.container.querySelector('.slide-in-panels__container');
		const panels = panelsContainer.querySelectorAll('.slide-in-panels__section');

		const tl = gsap.timeline({ defaults: { ease: 'linear', duration: 2 } });

		tl.from(panels[1], { xPercent: -100 })
			.from(panels[2], { xPercent: 100 })
			.from(panels[3], { yPercent: -100 })
			.from(panels[4], { yPercent: 100 });

		ScrollTrigger.create({
			animation: tl,
			trigger: panelsContainer,
			start: 'top top',
			end: '+=' + window.innerHeight * panels.length,
			scrub: true,
			pin: true,
			pinSpacer: panelsContainer.parentElement,
		});
	}
}

export default new SlideInPanels();
