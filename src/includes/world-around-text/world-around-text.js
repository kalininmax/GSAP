import { gsap } from 'gsap';

class WorldAroundText {
	constructor() {
		window.addEventListener('load', () => this.init());
	}

	init() {
		this.container = document.querySelector('.world-around-text');

		if (!this.container) {
			return;
		}

		const title = this.container.querySelector('h1');
		const titleLines = title.querySelectorAll('h1 > span');

		const tl = gsap.timeline({ repeat: -1 });

		gsap.set(title, { autoAlpha: 1 });

		tl.set(titleLines, { x: '-100vw' })
			.to(titleLines, { x: '100vw', duration: 2, ease: 'slow(0.4, 1.2)', stagger: 0.2 }, '0.5')
			.from(titleLines, { scale: 0, duration: 2, ease: 'slow(0.3, 0.6, true)', stagger: 0.2 }, '<');
	}
}

export default new WorldAroundText();
