import { gsap } from 'gsap';

class LaziestSlider {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.laziest-slider');

		if (!this.container) {
			return;
		}

		this.slides = this.container.querySelectorAll('.laziest-slider__slide');
		this.slidesNumber = this.slides.length;

		gsap.to(this.slides, {
			x: '-=100%',
			delay: 1.5,
			repeat: this.slidesNumber - 2,
			repeatDelay: 1,
			repeatRefresh: true,
		});
	}
}

export default new LaziestSlider();
