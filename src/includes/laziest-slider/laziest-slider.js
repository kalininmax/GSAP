import { gsap } from 'gsap';

class LaziestSlider {
	constructor() {
		window.addEventListener('load', () => this.init());
	}

	init() {
		this.container = document.querySelector('.laziest-slider');

		if (!this.container) {
			return;
		}

		this.slidesWrapper = this.container.querySelector('.laziest-slider__container');
		this.slides = this.slidesWrapper.querySelectorAll('.laziest-slider__slide');
		this.prevButton = this.container.querySelector('.button._prev');
		this.nextButton = this.container.querySelector('.button._next');
		this.autoPlay = this.container.querySelector('.laziest-slider__checkbox');
		this.progressBar = this.container.querySelector('.laziest-slider__progress-bar');
		this.dots = this.container.querySelectorAll('.laziest-slider__dot');

		this.slidesNum = this.slides.length;
		this.maxIndex = this.slidesNum - 1;
		this.currentIndex = 0;
		this.currentSlide = this.slides[this.currentIndex];
		this.isAnimating = false;
		this.isAutoplay = false;

		this._onPrevButtonClick = this._onPrevButtonClick.bind(this);
		this._onNextButtonClick = this._onNextButtonClick.bind(this);
		this._onAutoPlayChange = this._onAutoPlayChange.bind(this);

		this.prevButton.addEventListener('click', this._onPrevButtonClick);
		this.nextButton.addEventListener('click', this._onNextButtonClick);
		this.autoPlay.addEventListener('change', this._onAutoPlayChange);

		this.timer = gsap
			.timeline({ paused: true })
			.from(this.progressBar, {
				scaleX: 0,
				transformOrigin: 'left center',
				duration: 3,
				ease: 'linear',
				onComplete: () => this._nextSlide(),
			})
			.to(this.progressBar, { opacity: 0, duration: 0.2 });
		this.dots.forEach((dot, dotIndex) => {
			dot.addEventListener('click', evt => {
				evt.preventDefault();

				this.currentIndex = dotIndex;
				if (this.isAutoplay) {
					this.stopAutoPlay();
				}
				this._hideSlide();
			});
		});

		gsap.set(this.slidesWrapper, { autoAlpha: 1 });

		this._showSlide();
	}

	_hideSlide() {
		if (!this.isAnimating) {
			gsap.to(this.currentSlide, { opacity: 0, onComplete: () => this._showSlide() });
			gsap.to(this.currentSlide.querySelector('.laziest-slider__slide-number'), { scale: 0 });
			this.isAnimating = true;
		}
	}
	_showSlide() {
		this.isAnimating = false;
		this.currentSlide = this.slides[this.currentIndex];
		console.log(this.currentSlide);
		gsap.to(this.currentSlide, { opacity: 1 });
		gsap.fromTo(
			this.currentSlide.querySelector('.laziest-slider__slide-number'),
			{ scale: 0 },
			{
				scale: 1,
				onComplete: () => {
					if (this.isAutoplay) {
						this.timer.restart();
					}
				},
			}
		);
	}
	_nextSlide() {
		if (this.currentIndex < this.maxIndex) {
			this.currentIndex++;
		} else {
			this.currentIndex = 0;
		}
		this._hideSlide();
	}
	_onPrevButtonClick(evt) {
		evt.preventDefault();

		if (this.currentIndex > 0) {
			this.currentIndex--;
		} else {
			this.currentIndex = this.maxIndex;
		}
		if (this.isAutoplay) {
			this.stopAutoPlay();
		}
		this._hideSlide();
	}
	_onNextButtonClick(evt) {
		evt.preventDefault();

		if (this.isAutoplay) {
			this.stopAutoPlay();
		}
		this._nextSlide();
	}
	_onAutoPlayChange(evt) {
		if (evt.currentTarget.checked) {
			this._nextSlide();
			this.isAutoplay = true;
		} else {
			this.timer.pause(0);
			this.isAutoplay = false;
		}
	}
	stopAutoPlay() {
		this.autoPlay.checked = false;
		this.autoPlay.dispatchEvent(new Event('change'));
	}
}

export default new LaziestSlider();
