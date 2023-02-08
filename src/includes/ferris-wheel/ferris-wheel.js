import { gsap } from 'gsap';

class FerrisWheel {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.ferris-wheel');

		if (!this.container) {
			return;
		}

		const ferrisWheel = this.container.querySelector('.ferris-wheel__wheel');
		const wheelRadius = ferrisWheel.offsetWidth / 2;

		const createFerrisWheel = num => {
			for (let i = 0; i < num; i++) {
				const rotation = i * (360 / num);
				const basket = document.createElement('div');
				const arm = document.createElement('div');

				basket.classList.add('basket');
				arm.classList.add('arm');
				ferrisWheel.append(arm);
				arm.append(basket);

				gsap.set(basket, {
					transformOrigin: '40px 8px',
					x: wheelRadius - 40,
					y: -6,
					rotation: -rotation,
				});
				gsap.set(arm, { transformOrigin: 'left center', rotation: rotation, width: wheelRadius });
			}
		};

		createFerrisWheel(12);
		gsap.to(ferrisWheel, { autoAlpha: 1 });

		const baskets = ferrisWheel.querySelectorAll('.basket');

		const animation = gsap.timeline({ repeat: -1 });
		animation
			.to(ferrisWheel, { rotation: 360, duration: 30, ease: 'linear' })
			.to(
				baskets,
				{ rotation: '-=360', duration: animation.recent().duration(), ease: 'linear' },
				0
			);
	}
}

export default new FerrisWheel();
