import { gsap } from 'gsap';

class BurnInGallery {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.burnin-gallery');

		if (!this.container) {
			return;
		}

		const imagesWrapper = this.container.querySelector('.burnin-gallery__container');
		const images = imagesWrapper.querySelectorAll('img');

		gsap.set(imagesWrapper, { autoAlpha: 1 });
		gsap.set(images, { opacity: 0 });

		const tl = gsap.timeline({ repeat: -1 });

		images.forEach(img => {
			tl.set(img, { opacity: 1 })
				.fromTo(
					img,
					{ filter: 'contrast(0.5) brightness(6)' },
					{ filter: 'contrast(1) brightness(1)', ease: 'power2' }
				)
				.to(
					img,
					{ filter: 'contrast(0.5) brightness(6)', duration: 0.2, ease: 'power2.in' },
					'+=1.5'
				);
		});
	}
}

export default new BurnInGallery();
