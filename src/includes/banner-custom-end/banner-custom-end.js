import { gsap } from 'gsap';

class BannerCustomEnd {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.banner-custom-end');

		if (!this.container) {
			return;
		}

		const banner = this.container.querySelector('.banner-custom-end__container');
		const title = banner.querySelector('.title');
		const items = banner.querySelectorAll('.item');
		const itemLabels = banner.querySelectorAll('.item p');
		const footer = banner.querySelector('.footer');

		const repeatsNum = 1;

		gsap.set(banner, { autoAlpha: 1 });

		const tl = gsap.timeline();

		tl.from(title, { opacity: 0 })
			.from(items, { opacity: 0, y: 50, scale: 0.5, stagger: 0.2 })
			.from(itemLabels, { opacity: 0, y: -50, stagger: 0.2 }, '<')
			.from(footer, { width: 0 })
			.add('resolve')
			.to([title, items, footer], { opacity: 0, stagger: 0.1, delay: 1 })
			.add('end');

		const masterTl = gsap.timeline();

		masterTl
			.add(tl.tweenTo('end', { repeat: repeatsNum > 1 ? repeatsNum - 2 : 0 }))
			.add(tl.tweenFromTo(0, 'resolve'))
			// custom ending here
			.to(footer, {
				backgroundColor: 'green',
				duration: 0.4,
				ease: 'linear',
				repeat: 10,
				yoyo: true,
			});
	}
}

export default new BannerCustomEnd();
