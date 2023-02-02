import { ScrollTrigger } from 'gsap/ScrollTrigger';

class TriggerVideo {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.trigger-video');

		if (!this.container) {
			return;
		}

		const video = this.container.querySelector('.trigger-video__video');

		ScrollTrigger.create({
			trigger: video,
			start: 'bottom bottom',
			end: 'top top',
			markers: true,
			onEnter: () => video.play(),
			onLeave: () => video.pause(),
			onEnterBack: () => video.play(),
			onLeaveBack: () => video.pause(),
		});
	}
}

export default new TriggerVideo();
