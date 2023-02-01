import { gsap } from 'gsap';

class LayeredPinning {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.layered-pinning');

		if (!this.container) {
			return;
		}

		const panelsContainer = this.container.querySelector('.layered-pinning__container');
		const panels = panelsContainer.querySelectorAll('.layered-pinning__section');
		const notLastPanels = this.container.querySelectorAll(
			'.layered-pinning__section:not(:last-child)'
		);

		gsap.set(panels, { zIndex: (i, target, targets) => targets.length - i });

		const tl = gsap.timeline({ defaults: { ease: 'linear' } });

		tl.to(notLastPanels, {
			yPercent: -100,
			stagger: 0.5,
			scrollTrigger: {
				trigger: panelsContainer,
				start: 'bottom bottom',
				end: '+=' + window.innerHeight * notLastPanels.length,
				scrub: true,
				pin: true,
			},
		});
	}
}

export default new LayeredPinning();
