import { gsap } from 'gsap';

class CardFlip {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.card-flip');

		if (!this.container) {
			return;
		}

		this.cardsContainer = this.container.querySelector('.card-flip__container');
		this.cards = this.container.querySelectorAll('.card-flip__card');
		this.faces = this.container.querySelectorAll('.card-flip__faces');

		const cardWidth = this.cards[0].offsetWidth;
		const cardHeight = this.cards[0].offsetHeight;
		const gapSize = Number.parseFloat(getComputedStyle(this.cardsContainer).gap, 10);
		const loserIndex = gsap.utils.random(0, this.faces.length - 1, 1);

		this.faces[loserIndex].classList.add('_loser');

		const xPos = index => {
			let i = index;
			while (i > 3) {
				i = i - 4;
			}

			return -cardWidth * i - gapSize * i + index * 2;
		};
		const yPos = index => {
			let i;
			if (index < 4) {
				i = 0;
			} else if (index > 3 && index < 8) {
				i = 1;
			} else {
				i = 2;
			}

			return -cardHeight * i - gapSize * i + index * 2;
		};

		this.faces.forEach((card, index, cards) => {
			const notLoserCards = [...cards].filter((_, i) => i !== loserIndex);
			const animation = gsap
				.timeline({ paused: true })
				.fromTo(card, { rotationY: 180 }, { rotationY: 0, ease: 'linear' });

			if (index === loserIndex) {
				animation
					.to(notLoserCards, {
						opacity: 0,
						scale: 0.9,
						duration: 0.3,
						ease: 'power1.in',
						stagger: 0.05,
					})
					.to([card.querySelectorAll('.card-flip__face')], {
						outline: 'none',
						borderColor: 'red',
						duration: 0.2,
						ease: 'linear',
						repeat: 10,
						yoyo: true,
					});
			}

			card.animation = animation;

			card.addEventListener('click', evt => {
				evt.preventDefault();

				card.animation.play();
				card.classList.add('_opened');
			});
		});

		this.initTl = gsap.timeline().from(this.cards, {
			x: xPos,
			y: yPos,
			stagger: { each: 0.05, from: 'end' },
			clearProps: 'all',
		});

		gsap.set(this.cardsContainer, { autoAlpha: 1 });
	}
}

export default new CardFlip();
