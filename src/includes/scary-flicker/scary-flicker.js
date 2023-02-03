import { gsap } from 'gsap';

class ScaryFlicker {
	constructor() {
		window.addEventListener('load', () => this.init());
	}

	init() {
		this.container = document.querySelector('.scary-flicker');

		if (!this.container) {
			return;
		}

		const title = document.querySelectorAll('h1');

		gsap.set(title, { autoAlpha: 1 });

		const scaryAnim = gsap.from(title[0], {
			opacity: 0,
			scale: 0.95,
			rotation: -2,
			duration: 0.5,
			repeat: 1,
			yoyo: true,
			ease: 'rough({ template: power0.none, strength: 5, points: 50, taper: "none", randomize: true, clamp: true })',
		});

		const shivverAnim = gsap.to(title[1], {
			x: 5,
			duration: 2,
			repeat: 1,
			yoyo: true,
			ease: 'rough({ template: power0.none, strength: 15, points: 80, taper: "in", randomize: false, clamp: false })',
		});

		window.addEventListener('click', () => {
			scaryAnim.restart();
			shivverAnim.restart();
		});
	}
}

export default new ScaryFlicker();
