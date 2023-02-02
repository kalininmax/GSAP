import { gsap } from 'gsap';

class ResponsiveCards {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.responsive-cards');

		if (!this.container) {
			return;
		}

		const cards = this.container.querySelectorAll('.responsive-cards__item');

		cards.forEach((card, index) => {
			const cols = card.querySelectorAll('.responsive-cards__item-col');
			const distance = index % 2 === 0 ? -100 : 100;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: card,
					start: 'top bottom',
					toggleActions: 'play none none reverse',
				},
			});

			tl.from(cols, { opacity: 0, xPercent: gsap.utils.wrap([distance, -distance]) });
		});
	}
}

export default new ResponsiveCards();
