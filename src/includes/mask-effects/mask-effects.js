import { gsap } from 'gsap';
import TextSplitter from '../../assets/js/modules/TextSplitter';

class MaskEffects {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.mask-effects');

		if (!this.container) {
			return;
		}

		gsap.registerEffect({
			name: 'clip',
			defaults: {
				direction: 'full',
				duration: 1,
				ease: 'power1.in',
			},
			extendTimeline: true,
			effect: (targets, config) => {
				const direction = {
					top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
					bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
					left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
					right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
					full: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					midX: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
					midY: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
					center: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
				};

				if (getComputedStyle(targets[0]).clipPath === 'none') {
					gsap.set(targets, { clipPath: direction['full'] });
				}

				const tl = gsap.timeline().to(targets, {
					clipPath: direction[config.direction],
					duration: config.duration,
					ease: config.ease,
				});

				return tl;
			},
		});

		this.demoContainers = this.container.querySelectorAll('.mask-effects__container');

		gsap.set(this.demoContainers, { autoAlpha: 1 });

		const mainTl = gsap.timeline({ paused: true });

		const anim1 = this._initAnim1();
		const anim2 = this._initAnim2();
		const anim3 = this._initAnim3();
		const anim4 = this._initAnim4();

		mainTl.add(anim1).addPause().add(anim2).addPause().add(anim3).addPause().add(anim4);

		window.addEventListener('click', () => mainTl.play());
	}
	_initAnim1() {
		const titleWrapper = this.demoContainers[0].querySelector('.mask-effects__title-wrapper');
		const subtitle = this.demoContainers[0].querySelector('.mask-effects__subtitle');
		const subtitleSplit = TextSplitter.split(subtitle);

		const tl = gsap
			.timeline({ defaults: { duration: 0.5 } })
			.from(titleWrapper, { width: 0, duration: 0.8, ease: 'power1.in' })
			.from(subtitleSplit.words, { opacity: 0, yPercent: -100, stagger: 0.05 });

		window.addEventListener('resize', () => {
			gsap.set(titleWrapper, { clearProps: 'all' });
		});

		return tl;
	}
	_initAnim2() {
		const title = this.demoContainers[1].querySelector('.mask-effects__title');
		const subtitle = this.demoContainers[1].querySelector('.mask-effects__subtitle');

		const tl = gsap
			.timeline({ defaults: { duration: 0.5 } })
			.from(title, { yPercent: 100 })
			.from(subtitle, { yPercent: -100 }, 0);

		return tl;
	}
	_initAnim3() {
		const title = this.demoContainers[2].querySelector('.mask-effects__title');

		gsap.set(title, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });

		const tl = gsap
			.timeline()
			.from(title, { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' });

		return tl;
	}
	_initAnim4() {
		const title = this.demoContainers[3].querySelector('.mask-effects__title._new-year');

		const tl = gsap
			.timeline({ repeat: -1, repeatDelay: 3, yoyo: true })
			.clip(title, { direction: 'right' })
			.clip(title)
			.clip(title, { direction: 'left' })
			.clip(title)
			.clip(title, { direction: 'center' })
			.clip(title)
			.clip(title, { direction: 'midX' })
			.clip(title)
			.clip(title, { direction: 'midY' });

		return tl;
	}
}

export default new MaskEffects();
