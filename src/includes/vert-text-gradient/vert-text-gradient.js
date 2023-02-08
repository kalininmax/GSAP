import { gsap } from 'gsap';

class VertTextGradient {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.vert-text-gradient');

		if (!this.container) {
			return;
		}

		const colorTitles = this.container.querySelectorAll(
			'.vert-text-gradient__container._colors h2'
		);
		const whiteTitles = this.container.querySelectorAll('.vert-text-gradient__container._white h2');
		const whiteTexts = this.container.querySelectorAll('.vert-text-gradient__container._white p');

		colorTitles.forEach(title => {
			gsap.to(title, {
				backgroundImage: 'linear-gradient(#f60 100%, #ff0 200%, #f60 300%)',
				ease: 'linear',
				scrollTrigger: {
					trigger: title,
					start: 'top center',
					end: 'bottom center',
					scrub: 1,
					markers: true,
				},
			});
		});

		whiteTitles.forEach(title => {
			gsap.to(title, {
				backgroundImage: 'linear-gradient(45deg, #000 -100%, #eee 50%, #000 100%)',
				ease: 'linear',
				scrollTrigger: {
					trigger: title,
					start: 'top center',
					end: 'bottom center',
					scrub: 1,
					markers: true,
				},
			});
		});

		whiteTexts.forEach(text => {
			gsap.from(text, {
				opacity: 0,
				y: 50,
				scrollTrigger: {
					trigger: text,
					start: 'top 60%',
					end: 'bottom center',
					scrub: 1,
				},
			});
		});
	}
}

export default new VertTextGradient();
