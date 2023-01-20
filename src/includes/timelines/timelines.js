import { gsap } from 'gsap';

class Timelines {
	constructor() {
		this.init();
	}

	init() {
		if (!document.querySelector('.timelines')) {
			return;
		}

		const Tweens = [];
		const playButtons = document.querySelectorAll('.timelines__button._play');
		const pauseButtons = document.querySelectorAll('.timelines__button._pause');
		const restartButtons = document.querySelectorAll('.timelines__button._restart');
		const stopButtons = document.querySelectorAll('.timelines__button._stop');
		const restartFredsButton = document.querySelector('.timelines__button._restart-freds');

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
		restartFredsButton.addEventListener('click', evt => {
			evt.preventDefault();

			Tweens[0].play('freds');
		});

		Tweens.push(
			gsap
				.timeline({ paused: true })
				.from('.timelines__img._bg', { autoAlpha: 0, duration: 1 })
				.from('.timelines__img._title', { autoAlpha: 0, scale: 0, duration: 1, ease: 'back' })
				.from(
					'.timelines__img._fred',
					{ autoAlpha: 0, yPercent: 150, stagger: 0.1, ease: 'back' },
					'freds'
				)
				.from('.timelines__img._time', { autoAlpha: 0, xPercent: 100, duration: 0.4 }, '<')
		);

		const initFinalProject = () => {
			Tweens.push(
				gsap
					.timeline({ defaults: { ease: 'back' }, paused: true })
					.fromTo(
						'.timelines__stage._final-project',
						{ background: '#fff' },
						{
							background:
								'linear-gradient(to right, #fff 0%, #fff 35%, rgb(214, 93, 245) 77%, rgb(214, 93, 245) 100%)',
						}
					)
					.from('.timelines__stage-title span:nth-child(1)', { x: 80, autoAlpha: 0, duration: 1 })
					.from(
						'.timelines__stage-title span:nth-child(2)',
						{ x: -80, autoAlpha: 0, duration: 1 },
						'<'
					)
					.from('.timelines__stage-text', { y: 30, autoAlpha: 0 }, '-=0.2')
					.from('.timelines__stage-link', { y: 20, autoAlpha: 0 }, '-=0.4')
					.set('.timelines__stage-svg-wrapper', { autoAlpha: 1 })
					.from('#items > g', {
						scale: 0,
						transformOrigin: 'center',
						stagger: 0.1,
					})
			);
		};

		window.addEventListener('load', () => {
			initFinalProject();
		});
	}
}

export default new Timelines();
