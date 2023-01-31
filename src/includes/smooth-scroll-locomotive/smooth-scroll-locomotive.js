import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class SmoothScrollLocomotive {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.smooth-scroll-locomotive');

		if (!this.container) {
			return;
		}

		// 3rd party library setup:
		const locoScroll = new LocomotiveScroll({
			el: this.container,
			smooth: true,
		});

		// When the smooth scroller updates, tell ScrollTrigger to update() too (sync positioning):
		locoScroll.on('scroll', ScrollTrigger.update);

		// Tell ScrollTrigger to use these proxy methods for the "smooth-scroll" element since Locomotive Scroll is hijacking things
		ScrollTrigger.scrollerProxy(this.container, {
			scrollTop(value) {
				return arguments.length
					? locoScroll.scrollTo(value, 0, 0)
					: locoScroll.scroll.instance.scroll.y;
			}, // we don't have to define a scrollLeft because we're only scrolling vertically.
			getBoundingClientRect() {
				return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
			},
			// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
			pinType: this.container.style.transform ? 'transform' : 'fixed',
		});

		this._initClockAnimation();

		// Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
		ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

		// After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
		ScrollTrigger.refresh();
	}
	_initClockAnimation() {
		const clockWrapper = this.container.querySelector('.svg-wrapper._clock');
		const bigHand = clockWrapper.querySelector('#bigHand');
		const smallHand = clockWrapper.querySelector('#smallHand');

		gsap.set([bigHand, smallHand], { svgOrigin: '200 200' });

		const tl = gsap
			.timeline({ defaults: { duration: 3, ease: 'linear' } })
			.to(bigHand, { rotation: 360 })
			.to(smallHand, { rotation: 35 }, 0);

		ScrollTrigger.create({
			trigger: clockWrapper,
			start: 'center center',
			end: '+=320',
			scroller: this.container,
			toggleClass: 'active',
			animation: tl,
			scrub: 1,
			pin: true,
		});
	}
}

export default new SmoothScrollLocomotive();
