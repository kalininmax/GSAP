import { gsap } from 'gsap';

class BeyondBasics {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.beyond-basics');

		if (!this.container) {
			return;
		}

		this._initHermanOnPath();
	}

	_initHermanOnPath() {
		const container = this.container.querySelector('#herman-on-path');
		const button = container.querySelector('.button');
		const progressInput = container.querySelector('.section-progress__slider');
		const progressTime = container.querySelector('.section-progress__time');

		const motionpath = container.querySelector('#motionpath');
		const herman = container.querySelector('#herman');
		const home = container.querySelector('#home');
		const candy = container.querySelector('#candy');
		const dogpark = container.querySelector('#dogpark');
		const school = container.querySelector('#school');

		const hermanOnPathAnimation = gsap.to(herman, {
			duration: 6,
			ease: 'linear',
			paused: true,
			motionPath: {
				path: motionpath,
				align: herman,
			},
			onUpdate: () => {
				progressInput.value = hermanOnPathAnimation.progress();
				progressTime.textContent = hermanOnPathAnimation.time().toFixed(2);
			},
			onComplete: () => {
				button.textContent = 'Play';
			},
		});

		const updateButtonState = () =>
			(button.textContent = hermanOnPathAnimation.paused() ? 'Play' : 'Pause');

		button.addEventListener('click', evt => {
			evt.preventDefault();

			hermanOnPathAnimation.paused(!hermanOnPathAnimation.paused());

			hermanOnPathAnimation.progress() === 1 && hermanOnPathAnimation.restart();

			updateButtonState();
		});

		progressInput.addEventListener('input', evt =>
			hermanOnPathAnimation.progress(evt.target.value).pause()
		);
		progressInput.addEventListener('change', () => (button.textContent = 'Play'));

		home.addEventListener('click', () => {
			hermanOnPathAnimation.pause();
			gsap.to(hermanOnPathAnimation, { progress: 0, onComplete: updateButtonState });
		});

		candy.addEventListener('click', () => {
			hermanOnPathAnimation.pause();
			gsap.to(hermanOnPathAnimation, { progress: 0.5, onComplete: updateButtonState });
		});

		dogpark.addEventListener('click', () => {
			hermanOnPathAnimation.pause();
			gsap.to(hermanOnPathAnimation, { progress: 0.9, onComplete: updateButtonState });
		});

		school.addEventListener('click', () => {
			hermanOnPathAnimation.pause();
			gsap.to(hermanOnPathAnimation, { progress: 1, onComplete: updateButtonState });
		});
	}
}

export default new BeyondBasics();
