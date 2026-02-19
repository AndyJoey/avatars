            function saveCharacter() {
			localStorage.setItem('ponyCharacter', JSON.stringify(currentItems));
			}
	
		// Хранит текущее состояние персонажа
			let currentItems = {
			  head: 'images/head/0.png',
			  ears: 'images/ears/00.png',
			  eyes: 'images/eyes/00.png',
			  'color-eyes': 'images/color-eyes/00.png',
			  mane: '',
			  tail: '',
			  clothes: '',
			  hats: '',
			  accessories: '',
			  horns: '',
			  wings: ''
			};
        /**
         * Функция для показа выбранного раздела и скрытия остальных
         * @param {string} sectionId - ID секции, которую нужно показать
         */
        function showSection(sectionId) {
            // Скрыть все секции
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Показать выбранную секцию
            document.getElementById(sectionId).classList.add('active');
            
            // Убрать активный класс у всех пунктов меню
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Найти и активировать текущую ссылку в меню
            const currentLink = document.querySelector(`.nav-links a[onclick="showSection('${sectionId}')"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
        
        /**
         * Функция для переключения между вкладками
         * @param {string} tabId - ID вкладки, которую нужно показать
         */
			function showTab(tabId) {
				  // Сохраняем цвет для предыдущей вкладки (если это mane/tail)
				  if (currentActiveTab === 'mane' || currentActiveTab === 'tail') {
					const activeColorTab = document.querySelector(`#${currentActiveTab} .color-tab.active`);
					if (activeColorTab) {
					  const onclickAttr = activeColorTab.getAttribute('onclick');
					  const match = onclickAttr.match(/showColor\('([^']+)'/);
					  if (match) currentActiveColor[currentActiveTab] = match[1];
					}
				  }

				  // Скрыть все вкладки
				  document.querySelectorAll('.tab-content').forEach(tab => {
					tab.classList.remove('active');
				  });
				  // Показать выбранную вкладку
				  document.getElementById(tabId).classList.add('active');
				  // Убрать активный класс у всех кнопок-вкладок
				  document.querySelectorAll('.tab').forEach(tab => {
					tab.classList.remove('active');
				  });
				  // Активировать текущую кнопку вкладки
				  const currentTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
				  if (currentTab) currentTab.classList.add('active');

				  // Обновляем текущую активную вкладку
				  currentActiveTab = tabId;

				  // Восстанавливаем сохранённый цвет для mane/tail
				  if (tabId === 'mane' || tabId === 'tail') {
					showColor(currentActiveColor[tabId], tabId);
				  }
			}
        
        // При загрузке страницы убедиться, что первый раздел активен
		document.addEventListener('DOMContentLoaded', function() {

		const savedCharacter = localStorage.getItem('ponyCharacter');

		if (savedCharacter) {

			currentItems = JSON.parse(savedCharacter);

			for (let part in currentItems) {
			const layer = document.getElementById('layer-' + part);

			if (layer && currentItems[part]) {
				layer.src = currentItems[part];
				  // 🔥 ОЧИЩАЕМ старые z-index классы
				const zIndexClasses = ['low-zindex','high-low-zindex', 'medium-zindex', 'hight-zindex'];
				zIndexClasses.forEach(cls => layer.classList.remove(cls));
				const items = document.querySelectorAll(`.price-item img`);

			items.forEach(img => {
			    const onclickAttr = img.getAttribute('onclick');
				if (!onclickAttr) return;

				if (!onclickAttr.includes(`'${part}'`)) return;

				if (img.src === layer.src) {
					const match = onclickAttr.match(/selectItem\([^,]+,[^,]+,\s*'([^']+)'/);
					if (match) {
						layer.classList.add(match[1]);
							}
			}
			});
			}

			updateRemoveButton(part);
			}

		} else {
			// если нет сохранения — просто применяем дефолтные значения из currentItems
			for (let part in currentItems) {
			const layer = document.getElementById('layer-' + part);

			if (layer && currentItems[part]) {
				layer.src = currentItems[part];
				  // 🔥 ОЧИЩАЕМ старые z-index классы
			const zIndexClasses = ['low-zindex','high-low-zindex', 'medium-zindex', 'hight-zindex'];
			zIndexClasses.forEach(cls => layer.classList.remove(cls));
				const items = document.querySelectorAll('.price-item img');

			items.forEach(img => {
			 const onclickAttr = img.getAttribute('onclick');
			if (!onclickAttr) return;

			// Проверяем, что это именно тот part
			if (!onclickAttr.includes(`'${part}'`)) return;

			if (img.src === layer.src) {
				const match = onclickAttr.match(/selectItem\([^,]+,[^,]+,\s*'([^']+)'/);
				if (match) {
					layer.classList.add(match[1]);
				}
			}
			});
			}

			updateRemoveButton(part);
			}
		}

		});
					
			// Храним активную вкладку и выбранные цвета для mane/tail
			let currentActiveTab = 'head'; // по умолчанию активна вкладка head
			const currentActiveColor = {
			  'mane': 'color1',      // цвет по умолчанию для mane
			  'tail': 'tail-color1'  // цвет по умолчанию для tail
			};
		// Функция выбора предмета
			function selectItem(part, imageUrl, specialClass) {

			  const layer = document.getElementById('layer-' + part);

			  // Дефолтные изображения (для обязательных частей)
			  const defaultImages = {
				'head': 'images/head/0.png',
				'ears': 'images/ears/00.png',
				'eyes': 'images/eyes/00.png',
				'color-eyes': 'images/color-eyes/00.png'
			  };

			  // 🔹 ЕСЛИ нажали на тот же самый предмет → снимаем
			  if (currentItems[part] === imageUrl) {

				if (defaultImages[part]) {
				  // если часть обязательная — возвращаем дефолт
				  layer.src = defaultImages[part];
				  currentItems[part] = defaultImages[part];
				} else {
				  // если необязательная — убираем полностью
				  layer.src = '';
				  currentItems[part] = '';
				}

				updateRemoveButton(part); // 🔥 ОБЯЗАТЕЛЬНО
				return;
			  }

			  // 🔹 ИНАЧЕ надеваем новый предмет
			  layer.src = imageUrl;
			  currentItems[part] = imageUrl;

			  // убираем старые классы z-index
			  const zIndexClasses = ['low-zindex','high-low-zindex', 'medium-zindex', 'hight-zindex'];
			  zIndexClasses.forEach(cls => layer.classList.remove(cls));

			  // если есть специальный класс — добавляем
			  if (specialClass) {
				layer.classList.add(specialClass);
			  }

			  updateRemoveButton(part); // 🔥 ОБЯЗАТЕЛЬНО
			  saveCharacter();
			}
		
			function removeItem(part) {

			  const layer = document.getElementById('layer-' + part);

			  const defaultImages = {
				'head': 'images/head/0.png',
				'ears': 'images/ears/00.png',
				'eyes': 'images/eyes/00.png',
				'color-eyes': 'images/color-eyes/00.png'
			  };

			  if (defaultImages[part]) {
				layer.src = defaultImages[part];
				currentItems[part] = defaultImages[part];
			  } else {
				layer.src = '';
				currentItems[part] = '';
			  }

			  updateRemoveButton(part); // 🔥 обязательно
			  saveCharacter();
			}
			
			function resetCharacter() {

				  // список обязательных дефолтных частей
				  const defaultImages = {
					'head': 'images/head/0.png',
					'ears': 'images/ears/00.png',
					'eyes': 'images/eyes/00.png',
					'color-eyes': 'images/color-eyes/00.png'
				  };

				  // перебираем все части персонажа
				  for (let part in currentItems) {

					// находим соответствующий слой
					const layer = document.getElementById('layer-' + part);

					// если слой не найден — пропускаем
					if (!layer) continue;

					// если часть обязательная — возвращаем дефолт
					if (defaultImages[part]) {
					  layer.src = defaultImages[part];
					  currentItems[part] = defaultImages[part];
					} 
					// если нет — полностью очищаем
					else {
					  layer.src = '';
					  currentItems[part] = '';
					}

					// обновляем отображение крестика
					updateRemoveButton(part);
				  }
				  magicFlash();
				}
			
			
			function updateRemoveButton(part) {

			  const tab = document.getElementById('tab-' + part);

			  const defaultImages = {
				'head': 'images/head/0.png',
				'ears': 'images/ears/00.png',
				'eyes': 'images/eyes/00.png',
				'color-eyes': 'images/color-eyes/00.png'
			  };

			  const currentImage = currentItems[part];

			  // 1️⃣ Если картинки нет — крестик не нужен
			  if (!currentImage) {
				tab.classList.remove('has-item');
				return;
			  }

			  // 2️⃣ Если это дефолтная картинка — крестик НЕ показываем
			  if (
				defaultImages[part] &&
				currentImage.endsWith(defaultImages[part])
			  ) {
				tab.classList.remove('has-item');
				return;
			  }

			  // 3️⃣ Во всех остальных случаях — показываем крестик
			  tab.classList.add('has-item');
			}
			
			
			// Функция для показа выбранного цвета и скрытия остальных
			function showColor(colorId, tabName) {
			  // Работаем ТОЛЬКО внутри указанной вкладки (mane/tail)
			  if (tabName) {
				const tabContainer = document.getElementById(tabName);
				if (tabContainer) {
				  // Скрыть все цветовые секции внутри этой вкладки
				  tabContainer.querySelectorAll('.color-content').forEach(section => {
					section.classList.remove('active');
				  });
				  // Показать нужную секцию
				  const colorSection = document.getElementById(colorId);
				  if (colorSection) colorSection.classList.add('active');

				  // Обновить активные кнопки ТОЛЬКО внутри этой вкладки
				  tabContainer.querySelectorAll('.color-tab').forEach(tab => {
					tab.classList.remove('active');
				  });
				  const activeTab = Array.from(tabContainer.querySelectorAll('.color-tab')).find(tab => 
					tab.getAttribute('onclick').includes(`'${colorId}'`)
				  );
				  if (activeTab) activeTab.classList.add('active');
				  return;
				}
			  }

			  // Старый код (для обратной совместимости, если tabName не передан)
			  document.querySelectorAll('.color-content').forEach(section => {
				section.classList.remove('active');
			  });
			  document.getElementById(colorId)?.classList.add('active');
			  document.querySelectorAll('.color-tab').forEach(tab => {
				tab.classList.remove('active');
			  });
			  const activeTab = Array.from(document.querySelectorAll('.color-tab')).find(tab => 
				tab.getAttribute('onclick').includes(`'${colorId}'`)
			  );
			  if (activeTab) activeTab.classList.add('active');
			}		
			
			function randomizeCharacter() {

			  const parts = [
				'head',
				'ears',
				'eyes',
				'color-eyes',
				'mane',
				'tail',
				'clothes',
				'hats',
				'accessories',
				'horns',
				'wings'
			  ];

			  parts.forEach(part => {

				const items = document.querySelectorAll(`#${part} .price-item img`);
				if (!items.length) return;

				const randomItem = items[Math.floor(Math.random() * items.length)];

				// 🔥 Пытаемся вытащить specialClass из onclick
				const onclickAttr = randomItem.getAttribute('onclick');

				let specialClass = null;

				if (onclickAttr) {
				  const match = onclickAttr.match(/selectItem\([^,]+,[^,]+,\s*'([^']+)'/);
				  if (match) {
					specialClass = match[1];
				  }
				}

				selectItem(part, randomItem.src, specialClass);

			  });
			magicFlash();
			}
			
			function magicFlash() {
			  const preview = document.querySelector('.avatar-preview-container');

			  preview.classList.remove('avatar-magic');
			  void preview.offsetWidth; // перезапуск анимации
			  preview.classList.add('avatar-magic');

			  preview.addEventListener('animationend', () => {
				preview.classList.remove('avatar-magic');
				}, { once: true });
			}
			
			function downloadAvatar() {

			  const canvas = document.createElement('canvas');
			  const size = 105;
			  canvas.width = size;
			  canvas.height = size;

			  const ctx = canvas.getContext('2d');

			  const layers = document.querySelectorAll('.avatar-layer');

			  const sortedLayers = Array.from(layers).sort((a, b) => {
				return parseInt(getComputedStyle(a).zIndex) - parseInt(getComputedStyle(b).zIndex);
			  });

			  sortedLayers.forEach(layer => {
				if (layer.getAttribute("src")) {
				  ctx.drawImage(layer, 0, 0, size, size);
				}
			  });

			  const link = document.createElement('a');
			  link.download = 'my-pony.png';
			  link.href = canvas.toDataURL('image/png');

			  document.body.appendChild(link); // важно для некоторых браузеров
			  link.click();
			  document.body.removeChild(link);
			}

			document.querySelectorAll('.command-item').forEach(item => {

				// создаём элемент уведомления один раз
				const notice = document.createElement('div');
				notice.className = 'copy-notice';
				notice.innerText = 'Скопировано';
				item.appendChild(notice);

				item.addEventListener('click', () => {
					const command = item.querySelector('.command-title').innerText.trim();

					navigator.clipboard.writeText(command).then(() => {
						item.classList.add('show-copy');

						setTimeout(() => {
							item.classList.remove('show-copy');
						}, 1000);
					});
				});
			});

			document.querySelector('.details-toggle').addEventListener('click', function() {
			const block = document.querySelector('.details-images');

			if (block.style.display === 'flex') {
				block.style.display = 'none';
				this.textContent = 'Подробнее';
			} else {
				block.style.display = 'flex';
				this.textContent = 'Скрыть';
			}
		});
		const lightbox = document.getElementById('lightbox');
		const lightboxImg = lightbox.querySelector('img');

		document.querySelectorAll('.details-images img').forEach(img => {
			img.addEventListener('click', () => {
				lightboxImg.src = img.src;
				lightbox.classList.add('active');
			});
		});

		// закрытие по клику вне картинки
		lightbox.addEventListener('click', () => {
			lightbox.classList.remove('active');
		});
		document.getElementById('lightbox-close')
		.addEventListener('click', () => {
			lightbox.classList.remove('active');
		});


		const slides = document.querySelectorAll('.info-slide');
		const dots = document.querySelectorAll('.dot');
		const leftArrow = document.querySelector('.info-arrow.left');
		const rightArrow = document.querySelector('.info-arrow.right');

		let current = 0;

		function updateSlider(index) {
			slides.forEach(s => s.classList.remove('active'));
			dots.forEach(d => d.classList.remove('active'));

			slides[index].classList.add('active');
			dots[index].classList.add('active');

			current = index;

			leftArrow.classList.toggle('hidden', current === 0);
			rightArrow.classList.toggle('hidden', current === slides.length - 1);
		}

		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				updateSlider(index);
			});
		});

		rightArrow.addEventListener('click', () => {
			if (current < slides.length - 1) {
				updateSlider(current + 1);
			}
		});

		leftArrow.addEventListener('click', () => {
			if (current > 0) {
				updateSlider(current - 1);
			}
		});

		updateSlider(0);
