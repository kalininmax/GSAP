import { gsap } from 'gsap';

class MaskImage {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.mask-image');

		if (!this.container) {
			return;
		}

		this.masks = this.container.querySelectorAll('.mask-image__img-mask');
		this.imgs = this.container.querySelectorAll('img');

		gsap.set(this.masks, { rotation: 0.1 });

		const tl = gsap
			.timeline({ repeat: -1, repeatDelay: 2 })
			.from(this.imgs[0], { scale: 2 })
			.to(this.masks[0], { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }, 0)
			.to(this.masks[0], { scale: 0.95, duration: 1.5 })
			.to(this.masks[0], { scale: 1.2, duration: 1, delay: 0.2, ease: 'power1.in' })
			.from(this.masks[1], { scale: 1.2, autoAlpha: 0, duration: 1 }, '<0.7')
			.to(this.masks[1], { scale: 0.95, duration: 1 }, '<')
			.to(this.masks[0], { opacity: 0, duration: 1 }, '<');
	}
}

export default new MaskImage();
