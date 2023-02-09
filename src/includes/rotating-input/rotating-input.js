import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

class RotatingInput {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.rotating-input');

		if (!this.container) {
			return;
		}

		const container = this.container;
		const cols = this.container.querySelectorAll('.rotating-input__col');
		const outputs = this.container.querySelectorAll('.rotating-input__output');

		gsap.set(container, {
			backgroundColor: `rgb(${outputs[0].textContent}, ${outputs[1].textContent}, ${outputs[2].textContent})`,
		});

		cols.forEach((item, index) => {
			const input = item.querySelector('.button');
			const output = item.querySelector('.rotating-input__output');

			gsap.set(input, { rotation: outputs[index].textContent });

			Draggable.create(input, {
				type: 'rotation',
				bounds: { maxRotation: 255 },
				onDrag: function () {
					output.textContent = Number.parseInt(gsap.utils.wrap(0, 256, this.rotation), 10);
					gsap.set(container, {
						backgroundColor: `rgb(${outputs[0].textContent}, ${outputs[1].textContent}, ${outputs[2].textContent})`,
					});
				},
			});
		});
	}
}

export default new RotatingInput();
