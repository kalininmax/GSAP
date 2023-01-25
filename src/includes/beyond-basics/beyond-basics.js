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
			this._initFlattenCurveBanner();
			this._initTitleEffects();
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
	_initFlattenCurveBanner() {
		const container = this.container.querySelector('#flatten-curve');
		const stage = container.querySelector('.beyond-basics__stage');
		const slides = container.querySelectorAll('.slide');
		const curveTallPath = container.querySelector('#curveTall');
		const curveFlatPath = container.querySelector('#curveFlat');

		const masterAnimation = gsap.timeline({ repeat: -1, repeatDelay: 2 });
		const slideDelay = '-=0.5';

		const slideAnim = slide => {
			const tl = gsap.timeline();
			const icon = slide.querySelector('.svg-wrapper');
			const text = slide.querySelector('p');
			const word1 = slide.querySelector('p span:nth-child(1)');
			const word2 = slide.querySelector('p span:nth-child(2)');

			tl.from(icon, { xPercent: -220, scale: 0.5, ease: 'power1.in' })
				.from(icon, { y: 150, ease: 'power1' }, '<')
				.from(icon, { opacity: 0, duration: 0.3 }, '<')

				.from(word1, { x: -170, duration: 0.3, ease: 'power1' }, '-=0.3')
				.from(word2, { x: 170, duration: 0.3, ease: 'power1' }, '<')
				.from(text, { opacity: 0, duration: 0.2 }, '<')

				.to(icon, { xPercent: 220, scale: 0.5, ease: 'power1' }, '+=0.5')
				.to(icon, { y: 150, ease: 'power1.in' }, '<')

				.to(text, { y: 30, ease: 'power1.in', opacity: 0, duration: 0.3 }, '<')
				.to(icon, { opacity: 0, duration: 0.3 }, '-=0.3');

			return tl;
		};

		const curveSlideAnim = slide => {
			const tl = gsap.timeline();
			const text = slide.querySelector('p');

			tl.from(slide, { opacity: 0, duration: 0.2 })
				.from(text, { y: -350, ease: 'power1.in', duration: 0.2 }, '+=0.7')
				.to(
					curveTallPath,
					{
						attr: {
							d: curveFlatPath.getAttribute('d'),
						},
						ease: 'power1.in',
						duration: 0.1,
					},
					'-=0.1'
				)
				.to(slide, { opacity: 0, duration: 0.2, ease: 'power1.in' }, '+=1');

			return tl;
		};

		gsap.set(stage, { autoAlpha: 1 });

		masterAnimation
			.add(slideAnim(slides[0]))
			.add(slideAnim(slides[1]), slideDelay)
			.add(slideAnim(slides[2]), slideDelay)
			.add(curveSlideAnim(slides[3]));
	}
	_initTitleEffects() {
		const container = this.container.querySelector('#title-effects');
		const stages = container.querySelectorAll('.beyond-basics__stage');

		gsap.registerEffect({
			name: 'slideIn',
			extendTimeline: true,
			defaults: {
				x: 0,
				y: 0,
				duration: 1,
				ease: 'power1',
				stagger: 0.03,
			},
			effect: (targets, config) => {
				const chars = targets.map(text => text.querySelectorAll('.letter'));
				const tl = gsap.timeline();

				tl.from(chars, {
					x: config.x,
					y: config.y,
					duration: config.duration,
					ease: config.ease,
					stagger: { each: config.stagger, ease: 'power1.in' },
				}).from(
					chars,
					{
						opacity: 0,
						duration: config.duration,
						ease: 'linear',
						stagger: { each: config.stagger, ease: 'power2' },
					},
					0
				);

				return tl;
			},
		});
		gsap.registerEffect({
			name: 'slideOut',
			extendTimeline: true,
			defaults: {
				x: 0,
				y: 0,
				duration: 0.6,
				ease: 'power1.in',
				stagger: 0.01,
			},
			effect: (targets, config) => {
				const chars = targets.map(text => text.querySelectorAll('.letter'));
				const tl = gsap.timeline();

				tl.to(chars, {
					x: config.x,
					y: config.y,
					duration: config.duration,
					ease: config.ease,
					stagger: { each: config.stagger, ease: 'power1' },
				}).to(
					chars,
					{
						opacity: 0,
						duration: config.duration,
						ease: 'linear',
						stagger: { each: config.stagger, ease: 'power2' },
					},
					0
				);

				return tl;
			},
		});
		gsap.registerEffect({
			name: 'twistIn',
			extendTimeline: true,
			defaults: {
				rotationX: 0,
				rotationY: 0,
				transformOrigin: '50% 50%',
				duration: 1,
				ease: 'back(3)',
				stagger: 0.05,
				parent: 'body',
			},
			effect: (targets, config) => {
				gsap.set(config.parent, { perspective: 300 });

				const words = targets.map(text => text.querySelectorAll('.word'));
				const tl = gsap.timeline();
				tl.from(words, {
					rotationX: config.rotationX,
					rotationY: config.rotationY,
					transformOrigin: config.transformOrigin,
					duration: config.duration,
					ease: config.ease,
					stagger: config.stagger,
				});
				tl.from(
					words,
					{
						opacity: 0,
						duration: config.duration / 2,
						ease: 'linear',
						stagger: config.stagger,
					},
					0
				);
				return tl;
			},
		});
		gsap.registerEffect({
			name: 'twistOut',
			extendTimeline: true,
			defaults: {
				rotationX: 0,
				rotationY: 0,
				transformOrigin: '50% 50%',
				duration: 0.5,
				ease: 'power1.in',
				stagger: 0.01,
				parent: 'body',
			},
			effect: (targets, config) => {
				gsap.set(config.parent, { perspective: 300 });

				const words = targets.map(text => text.querySelectorAll('.word'));
				const tl = gsap.timeline();
				tl.to(words, {
					rotationX: config.rotationX,
					rotationY: config.rotationY,
					transformOrigin: config.transformOrigin,
					duration: config.duration,
					ease: config.ease,
					stagger: config.stagger,
				});
				tl.to(
					words,
					{
						opacity: 0,
						duration: config.duration - 0.1,
						ease: 'linear',
						stagger: config.stagger,
					},
					0
				);
				return tl;
			},
		});

		stages.forEach((stage, index) => {
			const texts = stage.querySelectorAll('p');
			stage.timeline = gsap.timeline({ repeat: -1 });

			stage.addEventListener('click', evt => {
				evt.preventDefault();

				stage.timeline.play();
			});
			stage.addEventListener('contextmenu', evt => {
				evt.preventDefault();

				stage.timeline.reverse();
			});

			index === 0 &&
				texts.forEach((text, i) => {
					TextSplitter.split(text, true);
					stage.timeline
						.slideIn(text, { y: 200, ease: 'back' }, i > 0 ? '-=0.3' : 0)
						.addPause()
						.slideOut(text, { y: -200 });
				});

			index === 1 &&
				texts.forEach((text, i) => {
					TextSplitter.split(text);

					stage.timeline
						.twistIn(text, { rotationX: 120, transformOrigin: '50% 0%' }, i > 0 ? '-=0.3' : 0)
						.addPause()
						.twistOut(text, { rotationX: -120, transformOrigin: '50% 100%' });
				});

			gsap.set(stage, { autoAlpha: 1 });
		});
	}
}

export default new BeyondBasics();
