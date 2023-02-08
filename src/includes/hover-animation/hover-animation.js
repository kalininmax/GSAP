import { gsap } from 'gsap';

class HoverAnimation {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.hover-animation');

		if (!this.container) {
			return;
		}

		this.rectButtons = this.container.querySelectorAll('.button._rect');
		this.circleButtons = this.container.querySelectorAll('.button._circle');

		this.rectButtons.forEach(button => {
			const barElement = document.createElement('span');
			barElement.classList.add('bar');
			button.append(barElement);

			gsap.set(barElement, { autoAlpha: 1, scaleX: 0, transformOrigin: 'left center' });

			const tl = gsap.timeline({ paused: true, defaults: { duration: 0.5 } });
			let exitTime = 0;

			tl.to(barElement, { scaleX: 1 }).addPause();
			exitTime = tl.duration();

			tl.to(barElement, { xPercent: 100 });

			button.addEventListener('mouseenter', () => {
				if (tl.time() < exitTime) {
					tl.play();
				} else {
					tl.restart();
				}
			});

			button.addEventListener('mouseleave', () => {
				if (tl.time() < exitTime) {
					tl.reverse();
				} else {
					tl.play();
				}
			});
		});

		this.circleButtons.forEach(button => {
			const buttonRadius = button.offsetWidth / 2;
			const circleSize = 10;
			const circlesContainer = document.createElement('span');
			circlesContainer.classList.add('circles-container');
			button.append(circlesContainer);

			const createCircles = num => {
				for (let i = 0; i < num; i++) {
					const circle = document.createElement('span');
					const circleWrapper = document.createElement('span');
					circle.classList.add('circle');
					circlesContainer.append(circleWrapper);
					circleWrapper.append(circle);
					gsap.set(circleWrapper, { rotation: i * (360 / num) });
					gsap.set(circle, { x: buttonRadius + circleSize * 1.3 });
				}
			};

			createCircles(12);

			const tl = gsap.timeline({ paused: true });
			const circles = button.querySelectorAll('.circle');
			let exitTime = 0;

			tl.from(circles, {
				x: buttonRadius - circleSize,
				duration: 0.4,
				stagger: {
					each: 0.05,
					ease: 'power1',
				},
			})
				.to(
					circles,
					{
						autoAlpha: 1,
						duration: 0.2,
						stagger: {
							each: 0.05,
							ease: 'power1',
						},
					},
					'<0.15'
				)
				.addPause();
			exitTime = tl.duration();

			tl.to(circles, {
				x: 80,
				scale: 2,
				opacity: 0,
				duration: 0.3,
				stagger: {
					each: 0.08,
					from: 'end',
				},
			});
			tl.to(
				circlesContainer,
				{ rotation: 360, duration: tl.recent().duration(), ease: 'power1.in' },
				'<'
			);

			button.addEventListener('mouseenter', () => {
				if (tl.time() < exitTime) {
					tl.play();
				} else {
					tl.restart();
				}
			});

			button.addEventListener('mouseleave', () => {
				if (tl.time() < exitTime) {
					tl.reverse();
				} else {
					tl.play();
				}
			});
		});
	}
}

export default new HoverAnimation();
