import { gsap } from 'gsap';

class StepsEase {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.steps-ease');

		if (!this.container) {
			return;
		}

		const imgWrapper = this.container.querySelector('.steps-ease__img-wrapper');
		const images = imgWrapper.querySelectorAll('img');
		const imagesNumber = images.length;
		const progressSlider = this.container.querySelector('.steps-ease__progress-slider');

		const tl = gsap.to(imgWrapper, {
			xPercent: (imagesNumber - 1) * -100,
			duration: imagesNumber * 0.5,
			ease: `steps(${imagesNumber - 1})`,
			repeat: -1,
			repeatDelay: 3,
			yoyo: true,
			onUpdate: () => (progressSlider.value = tl.progress()),
		});

		progressSlider.addEventListener('input', evt => {
			tl.progress(evt.target.value).pause();

			clearTimeout(evt.target.TO);
			evt.target.TO = setTimeout(() => tl.play(), 5000);
		});
	}
}

export default new StepsEase();
