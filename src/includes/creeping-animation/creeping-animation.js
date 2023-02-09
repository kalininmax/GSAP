import { gsap } from 'gsap';
import TextSplitter from '../../assets/js/modules/TextSplitter';

class CreepingAnimation {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.creeping-animation');

		if (!this.container) {
			return;
		}

		const dotsContainer = this.container.querySelector('.creeping-animation__container._dots');
		const dotsWrapper = this.container.querySelector('.creeping-animation__dots-wrapper');
		const dots = dotsContainer.querySelectorAll('.creeping-animation__dot');

		const textContainer = this.container.querySelector('.creeping-animation__container._text');
		const text = textContainer.querySelector('p');

		gsap.set([dotsContainer, textContainer], { autoAlpha: 1 });

		const tl = gsap.timeline({
			repeat: -1,
			repeatRefresh: true,
			onRepeat: () => {
				if (gsap.getProperty(dots[0], 'x') > window.innerWidth - dotsWrapper.offsetWidth * 3) {
					tl.pause();
				}
			},
		});

		tl.to(dots, { x: '+=100', ease: 'power1.inOut', stagger: { each: 0.03, from: 'end' } }).to(
			dots,
			{
				y: -50,
				ease: 'sine.inOut',
				duration: 0.25,
				stagger: { each: 0.03, from: 'end', repeat: 1, yoyo: true },
			},
			0
		);

		const splitedText = TextSplitter.split(text, true);
		gsap.set(text, { xPercent: -105 });

		const textTl = gsap.timeline({
			repeat: -1,
			repeatRefresh: true,
			onRepeat: () => {
				if (gsap.getProperty(splitedText.letters[0], 'x') > window.innerWidth - text.offsetWidth) {
					textTl.pause();
				}
			},
		});

		textTl
			.to(splitedText.letters, {
				x: '+=100',
				ease: 'power1.inOut',
				stagger: { each: 0.03, from: 'end' },
			})
			.to(
				splitedText.letters,
				{
					y: -50,
					ease: 'sine.inOut',
					duration: 0.25,
					stagger: { each: 0.03, from: 'end', repeat: 1, yoyo: true },
				},
				0
			);
	}
}

export default new CreepingAnimation();
