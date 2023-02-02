import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

class SvgMegaScroll {
	constructor() {
		window.addEventListener('load', () => {
			this.init();
		});
	}

	init() {
		this.container = document.querySelector('.svg-mega-scroll');

		if (!this.container) {
			return;
		}

		this.svgWrapper = this.container.querySelector('.svg-mega-scroll__svg-wrapper');
		this.svg = this.svgWrapper.querySelector('.svg-mega-scroll__svg');

		this.ship = this.svg.querySelector('#ship');
		this.shipSmoke = this.svg.querySelectorAll('.ship-smoke');
		this.fish = this.svg.querySelector('#esa');
		this.fishRope = this.svg.querySelector('#esa-rope');
		this.topHill = this.svg.querySelector('#top-hill');
		this.moon = this.svg.querySelector('.moon-main');
		this.moonElements = this.svg.querySelectorAll('.moon-el');
		this.bubbles = this.svg.querySelectorAll('#bubbles1, #bubbles2');
		this.starFish = this.svg.querySelectorAll('.star');
		this.chins = this.svg.querySelectorAll('#chin1, #chin2, #chin3, #chin4');

		gsap.defaults({ ease: 'none' });

		this._initIntroAnim();
		this._initBgFishesAnim();
		this._initBigFishAnim();
		this._initRockOnSidesAnim();
		this._initOctopusAnim();
		this._initFuguAnim();
		this._initStarfishAnim();
		this._initSubmarineAnim();
		this._initChinsAnim();
		this._initTreasureAnim();
		this._initWater();
		this._initBubbles();
	}
	_initIntroAnim() {
		const ship = gsap.timeline({ onComplete: () => this._initFishAnim() });
		const smoke = gsap.timeline({ repeat: -1 });
		const moon = gsap.timeline();

		ship
			.set(document.body, { overflow: 'hidden' })
			.set(this.svg, { autoAlpha: 1 })
			.from(this.ship, { x: -100, duration: 2.5 })
			.from(this.topHill, { x: -40, duration: 2 }, 0)
			.from(this.svgWrapper, { scale: 1.2, transformOrigin: 'top', duration: 2.6 }, 0)
			.from(this.fish, { opacity: 0 })
			.set(document.body, { clearProps: 'overflow' });

		smoke
			.from(this.shipSmoke, {
				scale: 0,
				transformOrigin: 'center center',
				stagger: 0.3,
			})
			.to(this.shipSmoke, { opacity: 0 }, '<0.5');

		moon
			.from(
				this.moon,
				{
					transformOrigin: 'center center',
					scale: 0.2,
					duration: 2,
				},
				0
			)
			.from(
				this.moonElements,
				{
					scale: 0.2,
					opacity: 0,
					transformOrigin: 'center center',
					duration: 2,
					stagger: 0.2,
				},
				0
			);
	}
	_initFishAnim() {
		const ropeLength = this.fishRope.getTotalLength();

		gsap
			.timeline({
				defaults: { duration: 1 },
				scrollTrigger: {
					trigger: this.svg,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 1,
				},
			})
			.set(
				this.fishRope,
				{ autoAlpha: 1, strokeDasharray: ropeLength, strokeDashoffset: ropeLength },
				0
			)
			.from(this.fishRope, { strokeDashoffset: ropeLength }, 0)
			.to(this.fish, { y: 2020 }, 0);
	}
	_initBgFishesAnim() {
		let x = 0;
		let mx = 0;
		const xDis = 80;
		const topBtm = 'top bottom+=30%';
		const repeat = 15;

		const bFishesTop = gsap.timeline({
			scrollTrigger: {
				trigger: '#small-fishes-right',
				start: topBtm,
			},
		});
		const bFishesMid = gsap.timeline({
			scrollTrigger: {
				trigger: '#small-fishes-left',
				start: topBtm,
			},
		});
		const sFishesTop = gsap.timeline({
			scrollTrigger: {
				trigger: '#small-fishes-right1, #small-fishes-right2',
				start: topBtm,
			},
		});
		const sFishesBtm = gsap.timeline({
			scrollTrigger: {
				trigger: '#small-fishes-left1',
				start: topBtm,
			},
		});

		for (let i = 0; i < repeat; i++) {
			x += xDis;
			mx -= xDis;

			bFishesTop
				.set('#small-fishes-right', { x: -200 })
				.set('#small-fishes-right', { autoAlpha: 1 })
				.set('.b-fishes-top', { x: x })
				.to('.b-fishes-top', {
					x: x + xDis,
					ease: 'power3.out',
					duration: 1,
					delay: 0.5,
					stagger: 0.01,
				});

			bFishesMid
				.set('#small-fishes-left', { x: 0 })
				.set('#small-fishes-left', { autoAlpha: 1 })
				.set('.b-fishes-mid', { x: mx })
				.to('.b-fishes-mid', {
					x: mx - xDis,
					ease: 'power3.out',
					duration: 1,
					delay: 0.5,
					stagger: 0.01,
				});

			sFishesTop
				.set('#small-fishes-right1, #small-fishes-right2', { x: -600 })
				.set('#small-fishes-right1, #small-fishes-right2', { autoAlpha: 1 })
				.set('.s-fishes-top, .s-fishes-mid ', { x: x })
				.to('.s-fishes-top, .s-fishes-mid', {
					x: x + xDis,
					ease: 'power2.out',
					duration: 1.2,
					delay: 0.6,
					stagger: 0.01,
				});

			sFishesBtm
				.set('#small-fishes-left1', { x: 400 })
				.set('#small-fishes-left1', { autoAlpha: 1 })
				.set('.s-fishes-btm', { x: mx })
				.to('.s-fishes-btm', {
					x: mx - xDis,
					ease: 'power3.out',
					duration: 1.5,
					delay: 0.7,
					stagger: 0.02,
				});
		}
	}
	_initBigFishAnim() {
		gsap.set('#y-fish-left1, #y-fish-left', {
			rotation: 30,
			transformOrigin: 'right',
		});

		gsap.set('#y-fish-right', {
			rotation: -30,
			transformOrigin: 'left',
		});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#y-fish-left1',
					scrub: true,
					start: 'bottom bottom',
					end: '+=600',
				},
			})
			.to('#y-fish-left1', {
				rotation: -30,
				transformOrigin: 'right',
			});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#y-fish-left',
					scrub: true,
					start: 'bottom-=450 bottom',
					end: '+=650',
				},
			})
			.to('#y-fish-left', {
				rotation: -30,
				transformOrigin: 'right',
			});

		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#y-fish-right',
					start: 'bottom-=300 bottom',
					end: '+=500',
					scrub: true,
				},
			})
			.to('#y-fish-right', {
				rotation: 30,
				transformOrigin: 'left',
			});
	}
	_initRockOnSidesAnim() {
		gsap.to('#rock-left-w, #rock-right-w, #rock-right-w1', {
			yPercent: 10,
			scrollTrigger: {
				scrub: true,
			},
		});

		gsap.to('#rock-right-b1, #rock-right-b, #rock-left-b', {
			yPercent: -50,
			scrollTrigger: {
				scrub: true,
			},
		});
	}
	_initOctopusAnim() {
		const octopus = gsap.timeline();

		octopus
			.to('.tako-mouth', { x: -30 }, 0)
			.to('#tako-right-eye, #tako-left-eye', { x: -10 }, 0)
			.from(
				'#tako-hi',
				{
					scale: 0,
					transformOrigin: 'right bottom',
				},
				0
			)
			.to(
				'#tako',
				{
					y: 50,
					repeat: -1,
					duration: 3,
					yoyo: true,
				},
				0
			);

		ScrollTrigger.create({
			trigger: '#tako',
			animation: octopus,
			start: 'top-=250 center',
			end: 'top 100px',
			toggleActions: 'restart none none reverse',
		});

		gsap.set('#kurage', {
			y: 100,
		});

		gsap.to('#kurage', {
			y: 150,
			repeat: -1,
			yoyo: true,
			duration: 5,
			ease: 'power1.inOut',
		});

		gsap.to('#ika', {
			y: -600,
			duration: 20,
		});
	}
	_initFuguAnim() {
		const fugu = document.querySelector('#fugu');

		const fuguTl = gsap.timeline({
			paused: true,
			defaults: {
				ease: 'power4.in',
			},
		});

		fuguTl
			.to('#fugu-body, #fugu-body1', { scale: 1.3, transformOrigin: 'center center' })
			.to('#fugu-mouth', { scale: 1.3, x: -15, transformOrigin: 'center center' }, 0)
			.to('#fugu-eye', { scale: 2, x: -10 }, 0)
			.to('#fugu-fin', { x: 10 }, 0);

		fugu.addEventListener('mouseenter', function () {
			fuguTl.play();
		});
	}
	_initStarfishAnim() {
		gsap.to(this.starFish, {
			duration: 3,
			rotation: 20,
			transformOrigin: 'center center',
			repeat: -1,
			yoyo: true,
		});
	}
	_initSubmarineAnim() {
		const subTube = this.svg.querySelector('#sub-tube');
		const subTubeLength = subTube.getTotalLength();

		const tubeAnim = gsap.timeline({
			paused: true,
			delay: 1,
			defaults: { duration: 2, ease: 'linear', yoyo: true, yoyoEase: 'linear', repeat: -1 },
		});

		gsap.set(subTube, {
			strokeDasharray: subTubeLength,
			strokeDashoffset: subTubeLength * 0.42,
		});

		tubeAnim
			.to(subTube, {
				strokeDashoffset: 0,
			})
			.from('#sub-small-glass', { x: 21 }, '<');

		const kaeruAnim = gsap.timeline();

		gsap.set('#kaeru', {
			y: 100,
		});

		kaeruAnim
			.to('#kaeru', {
				y: 0,
				duration: 1,
			})
			.from('#kaeru-mouth', {
				scale: 0.2,
				duration: 0.7,
				transformOrigin: 'center',
			})
			.from('#k-eye-p1, #k-eye-p', {
				x: -3,
				duration: 2,
				yoyo: true,
			});

		ScrollTrigger.create({
			trigger: '#sub',
			animation: kaeruAnim,
			start: 'top-=350 center',
			onToggle: () => tubeAnim.play(),
		});
	}
	_initChinsAnim() {
		gsap.from(this.chins, {
			y: 20,
			stagger: {
				each: 0.3,
			},
			repeat: -1,
			yoyo: true,
		});
	}
	_initTreasureAnim() {
		const tre = document.querySelector('#tre');

		const treTl = gsap.timeline({ paused: true });

		treTl.to('#tre', {
			rotation: -10,
			transformOrigin: 'center bottom',
			repeat: 5,
			yoyo: true,
			duration: 0.1,
		});

		tre.addEventListener('mouseenter', function () {
			treTl.restart();
		});
	}
	_initWater() {
		const waterTl = gsap.timeline({ repeat: -1, yoyo: true, ease: 'power1.inOut' });

		waterTl
			.to('.water-btm', { x: 20, duration: 3 }, 0)
			.to('.water-mid', { x: -30, duration: 3 }, 0)
			.to('.water-top', { x: -40, duration: 4 }, 0)
			.to('.water-btw', { x: -30, duration: 2 }, 0);
	}
	_initBubbles() {
		const tl = gsap.timeline();

		gsap.to(this.bubbles, {
			x: -100,
			repeat: -1,
			yoyo: true,
			duration: 2,
			ease: 'power1.inOut',
		});

		tl.set(this.bubbles, {
			y: 500,
			opacity: 0.8,
		}).to(this.bubbles, {
			opacity: 0,
			y: -200,
			scale: 0.8,
			duration: 15,
			repeat: -1,
			ease: 'power1.inOut',
		});
	}
}

export default new SvgMegaScroll();
