import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

		const mm = gsap.matchMedia();

		mm.add({ isMobile: '(max-width: 600px)', isDesktop: '(min-width: 601px)' }, context => {
			const { isMobile, isDesktop } = context.conditions;

			if (isDesktop) {
				cards.forEach((card, index) => {
					const cols = card.querySelectorAll('.responsive-cards__item-col');
					const distance = index % 2 === 0 ? -100 : 100;

					const tl = gsap.timeline({ paused: true });

					tl.from(cols, { xPercent: gsap.utils.wrap([distance, -distance]), duration: 0.5 }).from(
						cols,
						{ opacity: 0, duration: 0.3 },
						0
					);

					ScrollTrigger.create({
						trigger: card,
						start: 'top 80%',
						onEnter: () => tl.play(),
					});
					ScrollTrigger.create({
						trigger: card,
						start: 'top bottom',
						onLeaveBack: () => tl.pause(0),
					});
				});
			}

			if (isMobile) {
				const cols = document.querySelectorAll('.responsive-cards__item-col');

				cols.forEach(column => {
					const tl = gsap.timeline({ paused: true, defaults: { opacity: 0, duration: 0.5 } });

					if (column.classList.contains('_img')) {
						tl.from(column, { scale: 0.8 });
					} else {
						tl.from(column, { y: 100 });
					}

					ScrollTrigger.create({
						trigger: column,
						start: 'top 90%',
						onEnter: () => tl.play(),
					});
					ScrollTrigger.create({
						trigger: column,
						start: 'top bottom',
						onLeaveBack: () => tl.pause(0),
					});
				});
			}
		});
	}
}

export default new ResponsiveCards();
