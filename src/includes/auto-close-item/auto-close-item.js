import { gsap } from 'gsap';

class AutoCloseItem {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.auto-close-item');

		if (!this.container) {
			return;
		}

		this.items = this.container.querySelectorAll('.auto-close-item__item');

		this.items.forEach(item => {
			const openButton = item.querySelector('.auto-close-item__open');
			const closeButton = item.querySelector('.auto-close-item__close');

			const animation = gsap.timeline({ paused: true });
			animation
				.to(item, { width: 200, duration: 0.4 })
				.from(closeButton, { autoAlpha: 0, x: '-=10', scale: 0.4, duration: 0.2 }, '-=0.2');

			item.animation = animation;

			openButton.addEventListener('click', evt => {
				evt.preventDefault();

				if (this.activeItem) {
					this.activeItem.animation.reverse();
					this.activeItem.classList.remove('_active');
				}

				item.animation.play();
				this.activeItem = item;
				this.activeItem.classList.add('_active');
			});

			closeButton.addEventListener('click', evt => {
				evt.preventDefault();
				evt.stopPropagation();

				item.animation.reverse();
				this.activeItem.classList.remove('_active');
			});
		});
	}
}

export default new AutoCloseItem();
