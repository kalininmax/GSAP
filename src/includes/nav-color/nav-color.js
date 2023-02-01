import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class NavColor {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.nav-color');

		if (!this.container) {
			return;
		}

		const sectionColors = ['dodgerblue', 'salmon', 'green', 'purple', 'maroon'];
		const navColors = ['#1174d5', '#d96a5d', '#087008', '#640864', '#660b0b'];
		const sections = this.container.querySelectorAll('.nav-color__section');
		const header = document.querySelector('.header');
		let headerHeight = header.offsetHeight;

		const headerColorAnim = index =>
			gsap.to(header, {
				'--bg-color': navColors[index],
				ease: 'linear',
				duration: 0.2,
			});

		gsap.set(header, { '--bg-color': navColors[0] });
		gsap.set(sections, { backgroundColor: gsap.utils.wrap(sectionColors) });

		sections.forEach((section, index) => {
			ScrollTrigger.create({
				trigger: section,
				start: () => 'top ' + headerHeight,
				end: () => 'bottom ' + headerHeight,
				onEnter: () => headerColorAnim(index),
				onEnterBack: () => headerColorAnim(index),
			});
		});

		ScrollTrigger.addEventListener('refreshInit', () => {
			headerHeight = header.offsetHeight;
		});
	}
}

export default new NavColor();
