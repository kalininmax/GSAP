import { gsap } from 'gsap';

class Counters {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.counters');

		if (!this.container) {
			return;
		}

		this.items = this.container.querySelectorAll('.counters__list li');

		this.coursesNum = this.container.querySelector('.counters__number._courses');
		this.lessonsNum = this.container.querySelector('.counters__number._lessons');
		this.studentsNum = this.container.querySelector('.counters__number._students');

		gsap.registerEffect({
			name: 'counter',
			extendTimeline: true,
			defaults: {
				start: 0,
				increment: 1,
				duration: 0.5,
				ease: 'power1',
			},
			effect: (targets, config) => {
				const tl = gsap.timeline();
				const num = targets[0].innerText.replace(/,/g, '');
				targets[0].innerText = num;

				tl.from(
					targets,
					{
						innerText: config.start,
						duration: config.duration,
						ease: config.ease,
						snap: { innerText: config.increment },
						modifiers: {
							innerText: innerText =>
								gsap.utils
									.snap(config.increment, innerText)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
						},
					},
					0
				);

				return tl;
			},
		});

		const tl = gsap.timeline();

		tl.from(this.items, { opacity: 0, stagger: { amount: 0.7 } })
			.counter(this.coursesNum, { start: 0, duration: 1, ease: 'linear' }, 0)
			.counter(this.lessonsNum, { start: 0, duration: 1, ease: 'linear' }, 0)
			.counter(this.studentsNum, { start: 0, duration: 1, ease: 'linear' }, 0);
	}
}

export default new Counters();
