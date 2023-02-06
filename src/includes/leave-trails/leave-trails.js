import { gsap } from 'gsap';

class LeaveTrails {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.leave-trails');

		if (!this.container) {
			return;
		}

		this.demo = this.container.querySelector('.leave-trails__container');
		this.target = this.container.querySelector('.target');
		this.demoSize = this.demo.offsetWidth;
		this.targetSize = this.target.offsetWidth;
		this.distance = this.demoSize - this.targetSize;

		this.dotsNumber = 100;
		this.tracerDots = this._createTracerDots(this.dotsNumber);

		this.tl = gsap.timeline({
			defaults: { duration: 2 },
			repeat: -1,
			yoyo: true,
		});
		this.tl
			.to(this.target, { x: this.distance, ease: 'sine.in' })
			.to(this.target, { y: this.distance, ease: 'sine' }, 0)
			.to(this.target, { x: 0, ease: 'sine.in' })
			.to(this.target, { y: 0, ease: 'sine' }, '<');

		this._placeTracerDots();
		this.tl.restart();

		window.addEventListener('resize', () => {
			this.destroy();
			clearTimeout(this.TO);
			this.TO = setTimeout(() => this.init(), 500);
		});
	}
	_createTracerDots(numDots) {
		for (let i = 0; i < numDots; i++) {
			const dot = document.createElement('div');

			dot.setAttribute('class', 'dot tracer');
			gsap.set(dot, { scale: 0.3 });
			this.demo.appendChild(dot);
		}

		return this.demo.querySelectorAll('.tracer');
	}
	_placeTracerDots() {
		this.tracerDots.forEach((el, index) => {
			this.tl.progress(index / this.dotsNumber);
			this.tl.set(
				el,
				{
					x: gsap.getProperty(this.target, 'x'),
					y: gsap.getProperty(this.target, 'y'),
					opacity: 0.5,
				},
				this.tl.time()
			);
		});
	}
	destroy() {
		this.tl.pause(0);
		this.tl.kill();
		this.tracerDots.forEach(dot => dot.remove());
	}
}

export default new LeaveTrails();
