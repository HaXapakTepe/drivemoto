$(document).ready(function () {
	const body = document.querySelector('body')
	const header = document.querySelector('.header')
	const burger = document.querySelector('.burger')
	const close = document.querySelector('.menu__close')
	const menu = document.querySelector('.menu')
	const range = document.getElementById('range')
	const accordion = document.querySelectorAll('.accordion')
	const accordionAlt = document.querySelectorAll('.accordionAlt')
	const accordionBot = document.querySelectorAll('.accordionBot')
	const accordionMobile = document.querySelectorAll('.accordionMobile')
	const accordionFooter = document.querySelectorAll('.accordionFooter')
	const accordionFooterContents = document.querySelectorAll(
		'.accordionFooter-content'
	)
	const videosSlide = document.querySelectorAll('.videos__slide')
	const tabs = document.querySelectorAll('.tab__target')
	const pages = document.querySelectorAll('.tab__info')
	const btnCatalogOpen = document.querySelectorAll('.btn--catalogOpen')
	const catalogModal = document.querySelector('.catalogModal')
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
		if (
			!menu.contains(event.target) &&
			!burger.contains(event.target) &&
			!header.contains(event.target)
		) {
			menu.classList.remove('menu--active')
			burger.classList.remove('burger--active')
			body.classList.remove('no-scroll')
		}
	}

	burger.addEventListener('click', toggleMenu)
	close.addEventListener('click', toggleMenu)
	document.addEventListener('click', clickOutsideMenu)

	btnCatalogOpen.forEach(btn => {
		btn.addEventListener('click', () => {
			btn.classList.toggle('btn--active')
			catalogModal.classList.toggle('catalogModal--active')
			body.classList.toggle('no-scroll')
			menu.classList.remove('menu--active')
		})
	})

	catalogModal?.addEventListener('click', e => {
		if (catalogModal.classList.contains('catalogModal--active')) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}

		if (
			!e.target.closest('.catalogModal__inner') ||
			e.target.closest('.catalogModal__close')
		) {
			catalogModal.classList.remove('catalogModal--active')
			document.body.classList.remove('no-scroll')
			btnCatalogOpen.forEach(btn => {
				btn.classList.remove('btn--active')
			})
		}
	})

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

	function animateNumbers(numElement, endValue) {
		let startValue = 0
		let duration = 2000 // Длительность анимации в миллисекундах (10 секунд)
		let startTime = null

		function animateStep(currentTime) {
			if (!startTime) startTime = currentTime
			const elapsedTime = currentTime - startTime
			const progress = elapsedTime / duration
			const currentValue = Math.floor(
				startValue + (endValue - startValue) * progress
			)

			if (progress >= 1) {
				numElement.textContent = endValue.toLocaleString()
			} else {
				numElement.textContent = currentValue.toLocaleString()
				requestAnimationFrame(animateStep)
			}
		}

		requestAnimationFrame(animateStep)
	}

	function handleIntersection(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const numElements = entry.target.querySelectorAll('.about__info-num')
				numElements.forEach(numElement => {
					const endValue = parseInt(numElement.dataset.num.replace(/\s/g, ''))
					animateNumbers(numElement, endValue)
				})
				observer.unobserve(entry.target)
			}
		})
	}

	const observer = new IntersectionObserver(handleIntersection, {
		threshold: 0.8,
	})

	const aboutInfo = document.querySelector('.about__info')
	if (aboutInfo) {
		observer.observe(aboutInfo)
	}

	$(window).scroll(function () {
		if ($(window).scrollTop() >= 200) {
			if (innerWidth > 993) {
				$('body').css('padding-top', '66px')
			} else if (innerWidth < 993 && innerWidth > 577) {
				$('body').css('padding-top', '130px')
			} else {
				$('body').css('padding-top', '110px')
			}
			if (!$('.header__fixed').hasClass('header__fixed--active')) {
				$('.header__fixed').hide().addClass('header__fixed--active').slideDown()
			}
		} else {
			$('.header__fixed').removeClass('header__fixed--active')
			$('body').css('padding-top', '')
		}
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
	const accordionBotFilter = document.querySelectorAll('.accordionBotFilter')
	accordionBotFilter?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()
			const content = acc.nextElementSibling
			if (acc.classList.contains('accordionBotFilter--active')) {
				acc.classList.remove('accordionBotFilter--active')
				content.style.maxHeight = '0'
			} else {
				acc.classList.add('accordionBotFilter--active')
				content.style.maxHeight = content.scrollHeight + 'px'
			}
		})
	})

	accordionFooter.forEach((acc, index) => {
		acc.addEventListener('click', e => {
			e.preventDefault()

			const content = accordionFooterContents[index]

			accordionFooter.forEach((accordion, i) => {
				if (
					accordion.classList.contains('accordionFooter--active') &&
					i !== index
				) {
					accordion.classList.remove('accordionFooter--active')
					accordionFooterContents[i].style.maxHeight = '0'
				}
			})

			if (acc.classList.contains('accordionFooter--active')) {
				acc.classList.remove('accordionFooter--active')
				content.style.maxHeight = '0'
			} else {
				acc.classList.add('accordionFooter--active')
				content.style.maxHeight = `${content.scrollHeight}px`
			}
		})
	})

	accordionBot?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()

			const content = acc.nextElementSibling
			const parent = acc.closest('.accordionBotFilter-content')

			if (acc.classList.contains('accordionBot--active')) {
				acc.classList.remove('accordionBot--active')
				content.style.maxHeight = '0'
				if (parent) {
					parent.style.maxHeight = parent.scrollHeight + 'px'
				}
			} else {
				acc.classList.add('accordionBot--active')
				content.style.maxHeight = content.scrollHeight + 'px'
				if (parent) {
					parent.style.maxHeight =
						parent?.scrollHeight + content.scrollHeight + 'px'
				}
			}
		})
	})

	if (innerWidth < 577) {
		accordionMobile?.forEach(acc => {
			acc.addEventListener('click', e => {
				e.preventDefault()
				const content = acc.querySelector('.accordionMobile__content')
				if (acc.classList.contains('accordionMobile--active')) {
					acc.classList.remove('accordionMobile--active')
					content.style.maxHeight = '0'
				} else {
					acc.classList.add('accordionMobile--active')
					content.style.maxHeight = content.scrollHeight + 'px'
				}
			})
		})
	}

	accordion?.forEach(acc => {
		acc.addEventListener('click', e => {
			e.preventDefault()
			const content = acc.querySelector('.accordion__content')
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
	if (document.querySelector('.promo__swiper')) {
		var promoSwiper = new Swiper('.promo__swiper', {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 32,
			navigation: {
				nextEl: `.promo__arrow-next`,
				prevEl: `.promo__arrow-prev`,
			},
		})
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
	const cardsSwiper = document.querySelectorAll('.cards__swiper')
	cardsSwiper?.forEach((swiper, index) => {
		cardsSwipers.push(setCardsSwiper(index + 1))
	})
	function setCardsSwiper(index) {
		return new Swiper(`.cards__swiper--${index}`, {
			navigation: {
				prevEl: `.cards__arrow-prev--${index}`,
				nextEl: `.cards__arrow-next--${index}`,
			},
			breakpoints: {
				1440: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 32,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 20,
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

	const cardSwipers = []
	const cardSwiper = document.querySelectorAll('.card__swiper')
	cardSwiper?.forEach((swiper, index) => {
		cardSwipers.push(setCardSwiper(index + 1))
	})
	function setCardSwiper(index) {
		return new Swiper(`.card__swiper--${index}`, {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 12,
			nested: true,
			pagination: {
				el: `.card__swiper-pagination--${index}`,
			},
		})
	}
})
