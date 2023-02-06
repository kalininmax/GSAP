import { gsap, Power3 } from 'gsap';

class Snowflakes {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.snowflakes');

		if (!this.container) {
			return;
		}

		this.flakesNum = 50;
		this.maxWidth = this.container.offsetWidth;
		this.maxHeight = this.container.offsetHeight;

		for (let i = 0; i < this.flakesNum; i++) {
			const flake = this._createFlake();
			this._animateFlake(flake);
		}

		document.addEventListener('click', () =>
			gsap.globalTimeline.paused(!gsap.globalTimeline.paused())
		);
	}
	_createFlake() {
		const flake = document.createElement('div');
		const className = 'flake _flake' + gsap.utils.random(1, 4, 1);
		flake.setAttribute('class', className);
		this.container.appendChild(flake);
		return flake;
	}
	_animateFlake(flake) {
		const scaleFactor = Power3.easeIn(Math.random());
		const scale = gsap.utils.interpolate(0.3, 2, scaleFactor);
		const duration = gsap.utils.interpolate(2, 4, 1 - scaleFactor);
		const opacity = gsap.utils.interpolate(0.5, 1, scaleFactor);
		gsap.set(flake, {
			x: gsap.utils.random(0, this.maxWidth),
			y: -250,
			scale: scale,
			opacity: opacity,
		});
		gsap.to(flake, {
			x: '+=200',
			y: this.maxHeight + 200,
			duration: duration,
			delay: 'random(0,4)',
			ease: 'none',
			rotation: 'random(-60, 200)',
			onComplete: () => this._animateFlake(flake),
		});
	}
}

export default new Snowflakes();
