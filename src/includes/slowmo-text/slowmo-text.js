import { gsap } from 'gsap';
import TextSplitter from '../../assets/js/modules/TextSplitter';

class SlowMoText {
	constructor() {
		window.addEventListener('load', () => this.init());
	}

	init() {
		this.container = document.querySelector('.slowmo-text');

		if (!this.container) {
			return;
		}

		const title = this.container.querySelector('h1');
		const splitedTitle = TextSplitter.split(title);
		const titleWords = splitedTitle.words;

		const tl = gsap.timeline({ repeat: -1 });
		const duration = 2;

		gsap.set(title, { autoAlpha: 1 });

		tl.fromTo(
			titleWords,
			{ scale: 0 },
			{ duration: duration, scale: 6, ease: 'slow(0.5, 0.8)', stagger: duration }
		).from(
			titleWords,
			{ duration: duration, opacity: 0, ease: 'slow(0.5, 0.8, true)', stagger: duration },
			'<'
		);
	}
}

export default new SlowMoText();
