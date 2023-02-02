import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class PathFollower {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.path-follower');

		if (!this.container) {
			return;
		}

		const svg = this.container.querySelector('.path-follower__svg');
		const mainPath = svg.querySelector('.main-line');
		const mainPathLength = mainPath.getTotalLength();
		const ball1 = svg.querySelector('.ball01');

		gsap.defaults({ ease: 'linear' });

		gsap.set(mainPath, { strokeDasharray: mainPathLength, strokeDashoffset: mainPathLength });

		const pulses = gsap
			.timeline({
				defaults: {
					scale: 2,
					autoAlpha: 1,
					transformOrigin: 'center',
					ease: 'elastic(2.5, 1)',
				},
			})
			.to('.ball02, .text01', {}, 1.92)
			.to('.ball03, .text02', {}, 3.25)
			.to('.ball04, .text03', {}, 4.65);
		const tl = gsap
			.timeline({
				scrollTrigger: {
					trigger: svg,
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			})
			.set(ball1, { autoAlpha: 1 })
			.set(mainPath, { autoAlpha: 1 })
			.to(mainPath, { strokeDashoffset: 0, duration: 10 }, 0)
			.to(
				ball1,
				{ duration: 10, motionPath: { path: mainPath, align: mainPath, alignOrigin: [0.5, 0.5] } },
				0
			)
			.add(pulses, 0);
	}
}

export default new PathFollower();
