import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

// global.gsap = gsap;

// gsap.defaults({
// 	overwrite: 'auto',
// });

class GSAP {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			// Signal: require('./classes/Signal').default,
		};
		this.components = {
			BasicTween: require('../../includes/basic-tween/basic-tween'),
			Timelines: require('../../includes/timelines/timelines'),
			BeyondBasics: require('../../includes/beyond-basics/beyond-basics'),
			ScrollTriggerPage: require('../../includes/scroll-trigger/scroll-trigger'),
		};
		this.helpers = {};
		this.modules = {
			TextSplitter: require('./modules/TextSplitter'),
		};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');

			if (document.querySelector('.index-content')) {
				gsap
					.timeline()
					.from('.index-content h1', { autoAlpha: 0, scale: 10, duration: 0.7 })
					.from('.index-content svg', { autoAlpha: 0, x: '-100vw', ease: 'back(1.1)' })
					.from('.index  .header', {
						autoAlpha: 0,
						yPercent: -100,
						duration: 0.3,
						ease: 'back(1.1)',
					});
			}
		});
	}
}

global.GSAP = new GSAP();

if (module.hot) {
	module.hot.accept();
}
