import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SlowMo, RoughEase } from 'gsap/EasePack';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SlowMo, RoughEase);

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
			BasicTween: require('../../includes/basic-tween/basic-tween').default,
			Timelines: require('../../includes/timelines/timelines').default,
			BeyondBasics: require('../../includes/beyond-basics/beyond-basics').default,
			ScrollTriggerBasics: require('../../includes/scroll-trigger/scroll-trigger').default,
			SmoothScrollLocomotive:
				require('../../includes/smooth-scroll-locomotive/smooth-scroll-locomotive').default,
			FullscreenIntro: require('../../includes/fullscreen-intro/fullscreen-intro').default,
			BackToTop: require('../../includes/back-to-top/back-to-top').default,
			NavColor: require('../../includes/nav-color/nav-color').default,
			SlideInPanels: require('../../includes/slide-in-panels/slide-in-panels').default,
			LayeredPinning: require('../../includes/layered-pinning/layered-pinning').default,
			SvgMegaScroll: require('../../includes/svg-mega-scroll/svg-mega-scroll').default,
			TriggerVideo: require('../../includes/trigger-video/trigger-video').default,
			PathFollower: require('../../includes/path-follower/path-follower').default,
			ResponsiveCards: require('../../includes/responsive-cards/responsive-cards').default,
			SlowMoText: require('../../includes/slowmo-text/slowmo-text').default,
			WorldAroundText: require('../../includes/world-around-text/world-around-text').default,
			ScaryFlicker: require('../../includes/scary-flicker/scary-flicker').default,
			StepsEase: require('../../includes/steps-ease/steps-ease').default,
			LaziestSlider: require('../../includes/laziest-slider/laziest-slider').default,
			LeaveTrails: require('../../includes/leave-trails/leave-trails').default,
			RandomMotion: require('../../includes/random-motion/random-motion').default,
			Counters: require('../../includes/counters/counters').default,
			AutoCloseItem: require('../../includes/auto-close-item/auto-close-item').default,
			Snowflakes: require('../../includes/snowflakes/snowflakes').default,
			MaskEffects: require('../../includes/mask-effects/mask-effects').default,
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

			new this.components.BackToTop();
		});
	}
}

global.GSAP = new GSAP();

if (module.hot) {
	module.hot.accept();
}
