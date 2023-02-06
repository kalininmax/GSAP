import { gsap } from 'gsap';

class RandomMotion {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.random-motion');

		if (!this.container) {
			return;
		}

		this.demo = this.container.querySelector('.random-motion__container');
		this.targets = this.demo.querySelectorAll('.bug');
		this.targetSize = this.targets[0].offsetWidth;
		this.maxPos = this.demo.offsetWidth - this.targetSize;

		this.pxPerSecond = 300;

		gsap.set('.bug', { backgroundColor: gsap.utils.wrap(['#f6c', '#77BF98', '#4B9AE8']) });
		this.targets.forEach(target => this._moveTarget(target));

		window.addEventListener('resize', () => {
			this.destroy();

			clearTimeout(this.TO);
			this.TO = setTimeout(() => this.init(), 500);
		});
	}
	_moveTarget(target) {
		const curPos = {
			x: gsap.getProperty(target, 'x'),
			y: gsap.getProperty(target, 'y'),
		};

		const newPos = {
			x: gsap.utils.random(0, this.maxPos),
			y: gsap.utils.random(0, this.maxPos),
		};

		const deltaX = curPos.x - newPos.x;
		const deltaY = curPos.y - newPos.y;
		const distance = Math.hypot(deltaX, deltaY);
		const duration = distance / this.pxPerSecond + 1;

		const rotation = (Math.atan2(newPos.y - curPos.y, newPos.x - curPos.x) * 180) / Math.PI;

		target.tl = gsap.timeline();

		target.tl.to(target, { rotation: rotation + '_short', duration: 0.2 });

		target.tl.to(
			target,
			{
				x: newPos.x,
				y: newPos.y,
				duration: duration,
				ease: 'linear',
				onComplete: () => {
					this._moveTarget(target);
				},
			},
			0
		);
	}
	destroy() {
		this.targets.forEach(target => {
			gsap.set(target, { clearProps: 'x,y,rotation' });
			target.tl.kill();
		});
	}
}

export default new RandomMotion();
