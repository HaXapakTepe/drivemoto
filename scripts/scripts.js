$(document).ready(function () {
	const body = document.querySelector('body')
	const burger = document.querySelector('.burger')
	const close = document.querySelector('.menu__close')
	const menu = document.querySelector('.menu')
	const menuItem = document.querySelectorAll('.menu__item')
	const accordion = document.querySelectorAll('.accordion')
	const accordionAlt = document.querySelectorAll('.accordionAlt')
	const accordionBot = document.querySelectorAll('.accordionBot')
	const videosSlide = document.querySelectorAll('.videos__slide')
	const tabs = document.querySelectorAll('.tab__target')
	const pages = document.querySelectorAll('.tab__info')
	const detailsInfoActionsIcon = document.querySelectorAll(
		'.details__info-actions__icon'
	)
	const detailsInfoVariationsItem = document.querySelectorAll(
		'.details__info-variations__item'
	)

	const toggleMenu = () => {
		menu.classList.toggle('menu--active')
		burger.classList.toggle('burger--active')
		body.classList.toggle('no-scroll')
	}

	const clickOutsideMenu = event => {
		if (!menu.contains(event.target) && !burger.contains(event.target)) {
			menu.classList.remove('menu--active')
			burger.classList.remove('burger--active')
			body.classList.remove('no-scroll')
		}
	}

	burger.addEventListener('click', toggleMenu)
	close.addEventListener('click', toggleMenu)
	document.addEventListener('click', clickOutsideMenu)

	// if (burger) {
	//   menuItem.forEach((item) => {
	//     item.addEventListener('click', () => {
	//       burger.classList.toggle('active')
	//       menu.classList.remove('active')
	//       body.classList.remove('no-scroll')
	//     })
	//   })
	// }

	detailsInfoActionsIcon?.forEach(icon => {
		icon.addEventListener('click', function () {
			this.classList.toggle('details__info-actions__icon--active')
		})
	})

	detailsInfoVariationsItem?.forEach(icon => {
		icon.addEventListener('click', function () {
			detailsInfoVariationsItem.forEach(icon => {
				icon.classList.remove('details__info-variations__item--active')
			})
			this.classList.add('details__info-variations__item--active')
		})
	})

	Fancybox.bind('[data-fancybox]')

	$('.select__loca-box').select2({
		dropdownParent: $('.select__loca'),
	})

	$('.select__singIn-box').select2({
		dropdownParent: $('.select__singIn'),
		// placeholder: 'Выберите из списка',
	})

	$('.select__sorting-box').select2({
		dropdownParent: $('.select__sorting'),
	})

	videosSlide?.forEach(elem => {
		const videosHidden = elem.querySelector(
			'.videos__slide-hidden'
		)?.firstElementChild
		elem.addEventListener('click', () => {
			videosHidden.click()
		})
	})

	function handleTabClick(
		tabs,
		pages,
		activeTabClass,
		activePageClass,
		opacityPageClass
	) {
		tabs.forEach((tab, idx) => {
			tab.addEventListener('click', () => {
				tabs.forEach(tab => tab.classList.remove(activeTabClass))
				pages.forEach(page => {
					page.classList.remove(activePageClass)
					page.classList.remove(opacityPageClass)
				})

				tab.classList.add(activeTabClass)
				pages[idx].classList.add(activePageClass)

				setTimeout(() => {
					pages[idx].classList.add(opacityPageClass)
				}, 380)
			})
		})
	}

	handleTabClick(
		tabs,
		pages,
		'tab__target--active',
		'tab__info--active',
		'tab__info--opacity'
	)

	accordionBot?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()
			// const content = acc.querySelector('.accordionBot-content')
			const content = acc.nextElementSibling
			if (acc.classList.contains('accordionBot--active')) {
				acc.classList.remove('accordionBot--active')
				content.style.maxHeight = '0'
			} else {
				acc.classList.add('accordionBot--active')
				content.style.maxHeight = content.scrollHeight + 'px'
			}
		})
	})

	accordion?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()
			const content = acc.querySelector('.accordion__content')
			// const content = acc.nextElementSibling
			if (acc.classList.contains('accordion--active')) {
				acc.classList.remove('accordion--active')
				content.style.maxHeight = '0'
			} else {
				acc.classList.add('accordion--active')
				content.style.maxHeight = content.scrollHeight + 'px'
			}
		})
	})

	accordionAlt?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()
			const content = acc.previousElementSibling
			const reviewsItemText = content.firstElementChild
			console.log(reviewsItemText)
			if (acc.classList.contains('accordionAlt--active')) {
				setTimeout(() => {
					reviewsItemText.style.webkitLineClamp = '4'
				}, 500)
				acc.classList.remove('accordionAlt--active')
				content.style.maxHeight = '0'
			} else {
				reviewsItemText.style.webkitLineClamp = 'initial'
				acc.classList.add('accordionAlt--active')
				content.style.maxHeight = content.scrollHeight + 'px'
			}
		})
	})

	const range = document.getElementById('range')

	if (range) {
		const lower = document.getElementById('lower-value')
		const upper = document.getElementById('upper-value')
		const inputs = [lower, upper]
		function rangeFunc() {
			inputs?.forEach(function (input, handle) {
				input.addEventListener('change', function () {
					range.noUiSlider.setHandle(handle, this.value)
				})
				input.addEventListener('keydown', function (e) {
					const values = range.noUiSlider.get()
					const value = Number(values[handle])
					const steps = range.noUiSlider.steps()
					const step = steps[handle]
					let position
					switch (e.which) {
						case 13:
							range.noUiSlider.setHandle(handle, this.value)
							break
						case 38:
							position = step[1]
							if (position === false) {
								position = 1
							}
							if (position !== null) {
								range.noUiSlider.setHandle(handle, value + position)
							}
							break
						case 40:
							position = step[0]
							if (position === false) {
								position = 1
							}
							if (position !== null) {
								range.noUiSlider.setHandle(handle, value - position)
							}
							break
					}
				})
			})
		}

		function noUiSliderCreate() {
			noUiSlider?.create(range, {
				connect: true,
				start: [1000000, 6000000],
				format: wNumb({
					decimals: 0,
				}),
				range: {
					min: 0,
					max: 12000000,
				},
			})
			range.noUiSlider.on('update', function (values, handle) {
				inputs[handle].value = values[handle]
			})
		}
		noUiSliderCreate()

		rangeFunc()

		lower.addEventListener('focus', function () {
			lower.value = ''
		})

		upper.addEventListener('focus', function () {
			upper.value = ''
		})

		lower.addEventListener('input', function () {
			const inputValue = lower.value

			if (inputValue.length > 8) {
				lower.value = inputValue.slice(0, 7)
			}
		})

		upper.addEventListener('input', function () {
			const inputValue = upper.value

			if (inputValue.length > 8) {
				upper.value = inputValue.slice(0, 7)
			}
		})
	}

	if (document.querySelector('[name="phone"]')) {
		const element = document.querySelector('[name="phone"]')
		const maskOptions = {
			mask: '+{7} 000 000 00 00',
		}
		const mask = IMask(element, maskOptions)
	}

	if (document.querySelector('.certificate__swiper')) {
		var certificateSwiper = new Swiper('.certificate__swiper', {
			slidesPerView: 4,
			spaceBetween: 32,
			breakpoints: {
				993: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
				769: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
				577: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				361: {
					slidesPerView: 1.8,
					spaceBetween: 16,
				},
				320: {
					slidesPerView: 1.2,
					spaceBetween: 16,
				},
			},
			navigation: {
				nextEl: `.certificate__arrow-next`,
				prevEl: `.certificate__arrow-prev`,
			},
		})
	}

	if (document.querySelector('.videos__swiper')) {
		var videosSwiper = new Swiper('.videos__swiper', {
			slidesPerView: 4,
			spaceBetween: 32,
			breakpoints: {
				993: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
				769: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
				577: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				361: {
					slidesPerView: 1.8,
					spaceBetween: 16,
				},
				320: {
					slidesPerView: 1.2,
					spaceBetween: 16,
				},
			},
			navigation: {
				nextEl: `.videos__arrow-next`,
				prevEl: `.videos__arrow-prev`,
			},
		})
	}

	if (document.querySelector('.details__swiper')) {
		var swiperSmall = new Swiper('.details__swiperSmall', {
			loop: true,
			spaceBetween: 16,
			slidesPerView: 6,
			freeMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				1800: {
					slidesPerView: 6,
					spaceBetween: 16,
				},
				1300: {
					slidesPerView: 5,
					spaceBetween: 16,
				},
				993: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
				769: {
					slidesPerView: 6,
					spaceBetween: 16,
				},
				577: {
					slidesPerView: 5,
					spaceBetween: 16,
				},
				414: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
				320: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
			},
		})
		var swiperBig = new Swiper('.details__swiperBig', {
			loop: true,
			spaceBetween: 10,
			effect: 'flip',
			thumbs: {
				swiper: swiperSmall,
			},
		})
	}
	if (document.querySelector('.gallery__swiper')) {
		var gallerySwiper = new Swiper('.gallery__swiper', {
			slidesPerView: 4,
			spaceBetween: 32,
			breakpoints: {
				993: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
				769: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
				577: {
					slidesPerView: 2,
					spaceBetween: 16,
				},
				361: {
					slidesPerView: 1.8,
					spaceBetween: 16,
				},
				320: {
					slidesPerView: 1.2,
					spaceBetween: 16,
				},
			},
			navigation: {
				nextEl: `.gallery__arrow-next`,
				prevEl: `.gallery__arrow-prev`,
			},
		})
	}

	const slidersSwipers = []
	const sliderSwiper = document.querySelectorAll('.slider__swiper')
	sliderSwiper?.forEach((swiper, index) => {
		slidersSwipers.push(setSlidersSwiper(index + 1))
	})
	function setSlidersSwiper(index) {
		return new Swiper(`.slider__swiper--${index}`, {
			navigation: {
				prevEl: `.slider__arrow-prev--${index}`,
				nextEl: `.slider__arrow-next--${index}`,
			},
			breakpoints: {
				992: {
					slidesPerView: 3,
					spaceBetween: 32,
				},
				768: {
					slidesPerView: 2.1,
					spaceBetween: 24,
				},
				576: {
					slidesPerView: 1.6,
					spaceBetween: 16,
				},
				414: {
					slidesPerView: 1.5,
					spaceBetween: 12,
				},
				320: {
					slidesPerView: 1.1,
					spaceBetween: 12,
				},
			},
		})
	}

	const cardsSwipers = []
	const cardSwiper = document.querySelectorAll('.cards__swiper')
	cardSwiper?.forEach((swiper, index) => {
		cardsSwipers.push(setCardsSwiper(index + 1))
	})
	function setCardsSwiper(index) {
		return new Swiper(`.cards__swiper--${index}`, {
			navigation: {
				prevEl: `.cards__arrow-prev--${index}`,
				nextEl: `.cards__arrow-next--${index}`,
			},
			breakpoints: {
				992: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 24,
				},
				576: {
					slidesPerView: 1.8,
					spaceBetween: 16,
				},
				414: {
					slidesPerView: 1.4,
					spaceBetween: 12,
				},
				320: {
					slidesPerView: 1.1,
					spaceBetween: 12,
				},
			},
		})
	}
})
