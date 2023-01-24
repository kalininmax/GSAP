import { gsap } from 'gsap';
import TextSplitter from '../../assets/js/modules/TextSplitter';

const RAINBOW_COLORS = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'blueviolet'];

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
		this._initClearProps();

		window.addEventListener('load', () => {
			this._initAlternateText();
			this._initSpinText();
			this._initRubberText();
			this._initStaggeredText();
		});
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
	_initAlternateText() {
		const container = this.container.querySelector('#alternate-text');
		const stage = container.querySelector('.beyond-basics__stage');
		const button = container.querySelector('.button');
		const progressInput = container.querySelector('.section-progress__slider');
		const progressTime = container.querySelector('.section-progress__time');

		const texts = container.querySelectorAll('.beyond-basics__stage p');

		const animation = gsap.timeline({ paused: true });

		const updateButtonState = () => (button.textContent = animation.paused() ? 'Play' : 'Pause');

		const onAnimationUpdate = () => {
			progressInput.value = animation.progress();
			progressTime.textContent = animation.time().toFixed(2);
		};
		const onAnimationComplete = () => {
			button.textContent = 'Play';
		};

		progressInput.addEventListener('input', evt => animation.progress(evt.target.value).pause());
		progressInput.addEventListener('change', () => (button.textContent = 'Play'));
		button.addEventListener('click', evt => {
			evt.preventDefault();

			animation.paused(!animation.paused());

			animation.progress() === 1 && animation.restart();

			updateButtonState();
		});

		gsap.set(stage, { autoAlpha: 1 });

		gsap.registerEffect({
			name: 'rainbow',
			extendTimeline: true,
			defaults: {
				y: gsap.utils.wrap([-100, 100]),
				rotation: gsap.utils.wrap([-100, 100]),
				colors: RAINBOW_COLORS,
				stagger: 0.05,
			},
			effect: (targets, config) => {
				const chars = TextSplitter.split(targets[0], true).letters;
				const tl = gsap.timeline();

				tl.set(chars, { color: gsap.utils.wrap(config.colors) }).from(chars, {
					y: config.y,
					rotation: config.rotation,
					opacity: 0,
					stagger: config.stagger,
					onUpdate: onAnimationUpdate,
					onComplete: onAnimationComplete,
				});

				return tl;
			},
		});

		animation
			.rainbow(texts[0], { y: -100, rotation: -100, stagger: 0.1 })
			.rainbow(texts[1], { y: 100, rotation: 100 });
	}
	_initClearProps() {
		const container = this.container.querySelector('#clear-props');
		const resetButton = container.querySelector('button');
		const boxes = container.querySelectorAll('li');

		boxes.forEach(box =>
			box.addEventListener('click', evt => {
				evt.preventDefault();

				gsap.to(evt.target, { width: 100, backgroundColor: 'gray', duration: 0.3 });
			})
		);

		resetButton.addEventListener('click', evt => {
			evt.preventDefault();

			gsap.set(boxes, { clearProps: 'backgroundColor,width' });
		});
	}
	_initSpinText() {
		const container = this.container.querySelector('#spin-text');
		const stage = container.querySelector('.beyond-basics__stage');
		const button = container.querySelector('.button');
		const progressInput = container.querySelector('.section-progress__slider');
		const progressTime = container.querySelector('.section-progress__time');

		const text = container.querySelector('.beyond-basics__stage p');

		const animation = gsap.timeline({ paused: true });

		const updateButtonState = () => (button.textContent = animation.paused() ? 'Play' : 'Pause');

		const onAnimationUpdate = () => {
			progressInput.value = animation.progress();
			progressTime.textContent = animation.time().toFixed(2);
		};
		const onAnimationComplete = () => {
			button.textContent = 'Play';
		};

		progressInput.addEventListener('input', evt => animation.progress(evt.target.value).pause());
		progressInput.addEventListener('change', () => (button.textContent = 'Play'));
		button.addEventListener('click', evt => {
			evt.preventDefault();

			animation.paused(!animation.paused());

			animation.progress() === 1 && animation.restart();

			updateButtonState();
		});

		gsap.set(stage, { autoAlpha: 1 });

		gsap.registerEffect({
			name: 'spin',
			extendTimeline: true,
			defaults: {
				perspective: 400,
				rotationY: 360,
				stagger: { amount: 1 },
				duration: 1.2,
			},
			effect: (targets, config) => {
				const chars = TextSplitter.split(targets[0], true).letters;
				const tl = gsap.timeline();

				tl.set(chars, { transformPerspective: config.perspective }).to(chars, {
					rotationY: config.rotationY,
					stagger: config.stagger,
					duration: config.duration,
					ease: 'back(2)',
					onUpdate: onAnimationUpdate,
					onComplete: onAnimationComplete,
				});

				return tl;
			},
		});

		animation.spin(text);
	}
	_initRubberText() {
		const container = this.container.querySelector('#rubber-text');
		const stage = container.querySelector('.beyond-basics__stage');

		const text = container.querySelector('.beyond-basics__stage p');
		const chars = TextSplitter.split(text, true).letters;

		const scaleDistributor = gsap.utils.distribute({
			base: 0.2,
			amount: 1.3,
			from: 'center',
			ease: 'power1',
		});
		const distanceDistributor = gsap.utils.distribute({
			base: -200,
			amount: 400,
			ease: 'linear',
		});

		gsap.set(stage, { autoAlpha: 1 });
		gsap.from(chars, {
			scale: scaleDistributor,
			x: distanceDistributor,
			opacity: 0,
			repeat: -1,
			yoyo: true,
			stagger: {
				each: 0.01,
				from: 'center',
			},
		});
	}
	_initStaggeredText() {
		const container = this.container.querySelector('#staggered-text');
		const stage = container.querySelector('.beyond-basics__stage');

		const texts = container.querySelectorAll('.beyond-basics__stage p');
		const textsNumber = texts.length;
		const duration = 0.5;
		const pause = 1;
		const stagger = duration + pause;
		const repeatDelay = stagger * (textsNumber - 1) + pause;

		const animation = gsap.timeline();

		gsap.set(stage, { autoAlpha: 1 });
		gsap.set(texts, { transformOrigin: '50% 50% -70' });
		animation
			.from(texts, {
				rotationX: -90,
				opacity: 0,
				duration: duration,
				stagger: { each: stagger, repeat: -1, repeatDelay: repeatDelay },
			})
			.to(
				texts,
				{
					rotationX: 90,
					opacity: 0,
					duration: duration,
					stagger: { each: stagger, repeat: -1, repeatDelay: repeatDelay },
				},
				stagger
			);
	}
}

export default new BeyondBasics();
