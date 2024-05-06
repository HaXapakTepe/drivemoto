if (document.querySelector('.map')) {
	if (document.querySelector('#mapYandex')) {
		var points = [
			[
				'<div class="map-baloon"><p>г. Набережные Челны, Мензелинский тракт, 22/1 (1 этаж)</p></div>',
				55.70671442813047,
				52.391260497601,
			],
			[
				'<div class="map-baloon"><p>г. Казань, пр-кт Победы,200</p></div>',
				55.801611973104926,
				49.21166816877036,
			],
		]

		ymaps.ready(init)

		function init() {
			var myMap = new ymaps.Map('mapYandex', {
				center: [56.5, 50],
				zoom: 6,
			})

			var myCollection = new ymaps.GeoObjectCollection()

			for (var i = 0; i < points.length; i++) {
				var myPlacemark = new ymaps.Placemark(
					[points[i][1], points[i][2]],
					{
						balloonContent: points[i][0],
					},
					{
						iconLayout: 'default#image',
						iconImageHref: '/assets/images/icons/mappin.svg',
						iconImageSize: [56, 73],
					}
				)
				myCollection.add(myPlacemark)
			}

			myMap.geoObjects.add(myCollection)

			// Обработчик клика на адрес
			var addressTitles = document.querySelectorAll('.stores__item-title')
			addressTitles.forEach(function (title) {
				title.addEventListener('click', function () {
					var coords = this.getAttribute('data-coords').split(',')
					myMap.setCenter([coords[0], coords[1]], 16)
				})
			})
		}
	}
	if (document.querySelector('#mapYandexAlt')) {
		var points = [
			[
				'<div class="map-baloon"><p>г. Набережные Челны, Мензелинский тракт, 22/1 (1 этаж)</p></div>',
				55.70671442813047,
				52.391260497601,
				'/assets/images/icons/mappin-accent.svg',
				[56, 73], // Размер иконки для второй метки
			],
			[
				'<div class="map-baloon"><p>г. Казань, пр-кт Победы,200</p></div>',
				55.801611973104926,
				49.21166816877036,
				'/assets/images/icons/mappin.svg',
				[32, 38], // Размер иконки для первой метки
			],
		]

		ymaps.ready(init)

		function init() {
			var myMap = new ymaps.Map('mapYandexAlt', {
				center: [56.5, 50],
				zoom: 6,
			})

			var myCollection = new ymaps.GeoObjectCollection()

			for (var i = 0; i < points.length; i++) {
				var myPlacemark = new ymaps.Placemark(
					[points[i][1], points[i][2]],
					{
						balloonContent: points[i][0],
					},
					{
						iconLayout: 'default#image',
						iconImageHref: points[i][3],
						iconImageSize: points[i][4], // Используем размер иконки из массива
					}
				)
				myCollection.add(myPlacemark)
			}

			myMap.geoObjects.add(myCollection)

			// Обработчик клика на адрес
			var addressTitles = document.querySelectorAll('.stores__item-title')
			addressTitles.forEach(function (title) {
				title.addEventListener('click', function () {
					var coords = this.getAttribute('data-coords').split(',')
					myMap.setCenter([coords[0], coords[1]], 16)
				})
			})
		}
	}
}
