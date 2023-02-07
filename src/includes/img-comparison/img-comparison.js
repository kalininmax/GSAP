import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

class ImgComparison {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.img-comparison');

		if (!this.container) {
			return;
		}

		const imageWrapper = this.container.querySelector('.img-comparison__container');
		const button = this.container.querySelector('button');
		const clippedImage = imageWrapper.querySelector('img:nth-of-type(2)');

		gsap.set(button, { x: imageWrapper.offsetWidth / 2 - button.offsetWidth });

		Draggable.create(button, {
			type: 'x',
			bounds: imageWrapper,
			onDrag: function () {
				const x =
					imageWrapper.offsetWidth - button.offsetWidth - gsap.getProperty(this.target, 'x');
				console.log(x);
				gsap.set(clippedImage, { clipPath: `inset(0px ${x}px 0px 0px)` });
			},
		});
	}
}

export default new ImgComparison();
