import { gsap } from 'gsap';

class BasicTween {
	constructor() {
		this.init();
	}

	init() {
		if (!document.querySelector('.basic-tween')) {
			return;
		}
		const Tweens = [];
		const playButtons = document.querySelectorAll('.basic-tween__button._play');
		const pauseButtons = document.querySelectorAll('.basic-tween__button._pause');
		const restartButtons = document.querySelectorAll('.basic-tween__button._restart');
		const stopButtons = document.querySelectorAll('.basic-tween__button._stop');

		playButtons.forEach((button, index) => {
			button.addEventListener('click', evt => {
				evt.preventDefault();

				Tweens[index].play();
			});
		});
		pauseButtons.forEach((button, index) => {
			button.addEventListener('click', evt => {
				evt.preventDefault();

				Tweens[index].pause();
			});
		});
		restartButtons.forEach((button, index) => {
			button.addEventListener('click', evt => {
				evt.preventDefault();

				Tweens[index].restart();
			});
		});
		stopButtons.forEach((button, index) => {
			button.addEventListener('click', evt => {
				evt.preventDefault();

				Tweens[index].progress(0).pause();
			});
		});

		Tweens.push(
			gsap.to('.basic-tween__img._fred._to', {
				x: 220,
				rotate: 360,
				duration: 1.5,
				paused: true,
			})
		);

		Tweens.push(
			gsap.from('.basic-tween__img._fred._from', {
				x: 220,
				rotate: 360,
				duration: 1.5,
				paused: true,
			})
		);

		Tweens.push(
			gsap.fromTo(
				'.basic-tween__img._fred._from-to',
				{
					x: 220,
					rotate: 360,
				},
				{
					x: 20,
					rotate: 0,
					duration: 1.5,
					paused: true,
				}
			)
		);

		Tweens.push(
			gsap.to('.basic-tween__img._fred._yoyo', {
				x: 220,
				rotate: 360,
				duration: 1.5,
				repeat: -1,
				yoyo: true,
				ease: 'linear',
				paused: true,
			})
		);

		Tweens.push(
			gsap.to('.basic-tween__img._fred._ease-linear', {
				x: 220,
				duration: 2,
				ease: 'linear',
				paused: true,
			})
		);

		Tweens.push(
			gsap.to('.basic-tween__img._fred._ease-back', {
				x: 220,
				duration: 1.5,
				ease: 'back(3)',
				paused: true,
			})
		);

		Tweens.push(
			gsap.to('.basic-tween__img._fred._ease-elastic', {
				x: 220,
				duration: 3,
				ease: 'elastic',
				paused: true,
			})
		);

		Tweens.push(
			gsap.to('.basic-tween__img._fred._ease-bounce', {
				x: 220,
				duration: 2,
				ease: 'bounce',
				paused: true,
			})
		);

		Tweens.push(
			gsap.to('.basic-tween__img._fred._stagger', {
				y: -100,
				stagger: { amount: 0.5, from: 'end' },
				repeat: -1,
				yoyo: true,
				paused: true,
			})
		);
	}
}

export default new BasicTween();
