// ============================================
// ФИЛОСОФСКИЙ МАГАЗИН ИДЕЙ
// ============================================
// Этот скрипт управляет интерактивностью карточек с философскими идеями
// Мы используем современный JavaScript (ES6+) для создания динамического интерфейса
// Обратите внимание на модульную структуру и разделение ответственности

// ============================================
// ДАННЫЕ: Коллекция философских идей
// ============================================
// Каждая идея представлена объектом с информацией о философе и его теории
// Это "товары" нашего магазина - мудрость, которую можно приобрести

const philosophicalIdeas = [
    {
        id: 1,
        philosopher: "Платон",
        era: "Древняя Греция",
        image: "🏛️",
        theory: "Теория идей: Мир чувственных вещей — лишь тень мира идей. Истинное знание достигается через разум, а не через чувства.",
        price: 2 // "Стоимость" идеи в единицах кармы
    },
    {
        id: 2,
        philosopher: "Аристотель",
        era: "Древняя Греция",
        image: "📜",
        theory: "Золотая середина: Добродетель находится посередине между двумя пороками — избытком и недостатком.",
        price: 2
    },
    {
        id: 3,
        philosopher: "Декарт",
        era: "XVII век",
        image: "🤔",
        theory: "Cogito, ergo sum: «Я мыслю, следовательно, я существую». Сомнение является доказательством существования мыслящего субъекта.",
        price: 1
    },
    {
        id: 4,
        philosopher: "Ницше",
        era: "XIX век",
        image: "⚡",
        theory: "Сверхчеловек: Человек должен преодолеть себя, отвергнуть традиционную мораль и создать собственные ценности.",
        price: 3
    },
    {
        id: 5,
        philosopher: "Кант",
        era: "XVIII век",
        image: "⚖️",
        theory: "Категорический императив: Поступай только согласно той максиме, которая может стать всеобщим законом.",
        price: 2
    },
    {
        id: 6,
        philosopher: "Сартр",
        era: "XX век",
        image: "🎭",
        theory: "Экзистенциализм: Существование предшествует сущности. Человек обречён быть свободным и несёт полную ответственность за свой выбор.",
        price: 2
    },
    {
        id: 7,
        philosopher: "Конфуций",
        era: "Древний Китай",
        image: "☯️",
        theory: "Учение о добродетели: Благородный человек требует всего от себя, ничтожный — от других.",
        price: 1
    },
    {
        id: 8,
        philosopher: "Маркс",
        era: "XIX век",
        image: "🔨",
        theory: "Исторический материализм: История человечества — это история классовой борьбы. Бытие определяет сознание.",
        price: 3
    }
];

// ============================================
// СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ============================================
// Храним текущее состояние в отдельном объекте для удобства управления
// Это простой аналог состояния в современных фреймворках

const appState = {
    karmaLevel: 0,           // Уровень кармы пользователя (1-10)
    maxSlots: 0,             // Максимальное количество идей, которые можно выбрать
    selectedCards: [],       // Массив ID выбранных карточек
    isInitialized: false     // Флаг инициализации приложения
};

// ============================================
// DOM ЭЛЕМЕНТЫ
// ============================================
// Кэшируем ссылки на часто используемые элементы DOM
// Это улучшает производительность и делает код чище

let elements = {};

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ============================================
// Точка входа в приложение. Вызывается после загрузки DOM

document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем ссылки на DOM элементы
    initializeElements();
    
    // Навешиваем обработчики событий
    attachEventListeners();
    
    // Генерируем карточки с идеями
    renderCards();
    
    console.log('🏛️ Философский магазин готов к работе!');
});

// ============================================
// ФУНКЦИЯ: Инициализация DOM элементов
// ============================================
// Собираем все необходимые элементы в один объект для удобного доступа

function initializeElements() {
    elements = {
        karmaSetup: document.getElementById('karmaSetup'),
        karmaDisplay: document.getElementById('karmaDisplay'),
        karmaInput: document.getElementById('karmaInput'),
        setKarmaBtn: document.getElementById('setKarmaBtn'),
        resetKarmaBtn: document.getElementById('resetKarmaBtn'),
        karmaValue: document.getElementById('karmaValue'),
        availableSlots: document.getElementById('availableSlots'),
        totalSlots: document.getElementById('totalSlots'),
        cardsGrid: document.getElementById('cardsGrid'),
        emptyMessage: document.getElementById('emptyMessage')
    };
}

// ============================================
// ФУНКЦИЯ: Привязка обработчиков событий
// ============================================
// Разделяем логику обработки событий от рендеринга

function attachEventListeners() {
    // Обработчик установки уровня кармы
    elements.setKarmaBtn.addEventListener('click', handleSetKarma);
    
    // Обработчик сброса кармы
    elements.resetKarmaBtn.addEventListener('click', handleResetKarma);
    
    // Обработчик нажатия Enter в поле ввода кармы
    elements.karmaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSetKarma();
        }
    });
}

// ============================================
// ФУНКЦИЯ: Обработка установки кармы
// ============================================
// Валидирует ввод и инициализирует состояние приложения

function handleSetKarma() {
    const karmaValue = parseInt(elements.karmaInput.value);
    
    // Валидация: карма должна быть от 1 до 10
    if (isNaN(karmaValue) || karmaValue < 1 || karmaValue > 10) {
        alert('Карма должна быть числом от 1 до 10. Будьте скромнее или амбициознее!');
        return;
    }
    
    // Обновляем состояние
    appState.karmaLevel = karmaValue;
    appState.maxSlots = karmaValue;
    appState.selectedCards = [];
    appState.isInitialized = true;
    
    // Обновляем UI
    updateKarmaDisplay();
    toggleKarmaSetup(false);
    
    // Перерисовываем карточки (чтобы обновить их состояние)
    renderCards();
}

// ============================================
// ФУНКЦИЯ: Обработка сброса кармы
// ============================================
// Возвращает приложение в исходное состояние

function handleResetKarma() {
    appState.karmaLevel = 0;
    appState.maxSlots = 0;
    appState.selectedCards = [];
    appState.isInitialized = false;
    
    updateKarmaDisplay();
    toggleKarmaSetup(true);
    renderCards();
}

// ============================================
// ФУНКЦИЯ: Переключение видимости настройки кармы
// ============================================

function toggleKarmaSetup(show) {
    if (show) {
        elements.karmaSetup.classList.remove('hidden');
        elements.karmaDisplay.classList.add('hidden');
    } else {
        elements.karmaSetup.classList.add('hidden');
        elements.karmaDisplay.classList.remove('hidden');
    }
}

// ============================================
// ФУНКЦИЯ: Обновление отображения кармы
// ============================================

function updateKarmaDisplay() {
    elements.karmaValue.textContent = appState.karmaLevel;
    elements.totalSlots.textContent = appState.maxSlots;
    elements.availableSlots.textContent = appState.maxSlots - appState.selectedCards.length;
}

// ============================================
// ФУНКЦИЯ: Рендеринг карточек
// ============================================
// Создаёт HTML для каждой карточки и добавляет в сетку

function renderCards() {
    // Очищаем сетку
    elements.cardsGrid.innerHTML = '';
    
    // Генерируем карточки для каждой идеи
    philosophicalIdeas.forEach(idea => {
        const card = createCardElement(idea);
        elements.cardsGrid.appendChild(card);
    });
    
    // Показываем/скрываем сообщение о пустоте
    updateEmptyMessage();
}

// ============================================
// ФУНКЦИЯ: Создание элемента карточки
// ============================================
// Создаёт DOM-элемент карточки с использованием БЭМ-классов

function createCardElement(idea) {
    // Создаём основной контейнер карточки
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.id = idea.id;
    card.dataset.price = idea.price;
    
    // Проверяем, выбрана ли эта карточка
    const isSelected = appState.selectedCards.includes(idea.id);
    if (isSelected) {
        card.classList.add('card--selected');
    }
    
    // Проверяем, доступна ли карточка для выбора (хватает ли кармы)
    const isAvailable = !appState.isInitialized || canSelectCard(idea.price);
    if (!isAvailable && !isSelected) {
        card.classList.add('card--unavailable');
    }
    
    // Внутренняя структура карточки (лицевая и обратная стороны)
    card.innerHTML = `
        <div class="card__inner">
            <div class="card__front">
                <div class="card__image">${idea.image}</div>
                <h3 class="card__philosopher">${idea.philosopher}</h3>
                <p class="card__era">${idea.era}</p>
                <div class="card__price">💎 ${idea.price}</div>
                ${isSelected ? '<div class="card__status">Выбрано</div>' : ''}
            </div>
            <div class="card__back">
                <h3 class="card__theory-title">Теория:</h3>
                <p class="card__theory">${idea.theory}</p>
                <button class="card__select-btn ${isSelected ? 'card__select-btn--active' : ''}">
                    ${isSelected ? '✓ Приобретено' : 'Приобрести идею'}
                </button>
            </div>
        </div>
    `;
    
    // Добавляем обработчик клика
    card.addEventListener('click', () => handleCardClick(idea));
    
    return card;
}

// ============================================
// ФУНКЦИЯ: Обработка клика по карточке
// ============================================
// Поворачивает карточку и обрабатывает выбор/снятие выбора

function handleCardClick(idea) {
    // Если приложение не инициализировано, просто поворачиваем карточку
    if (!appState.isInitialized) {
        flipCard(idea.id);
        return;
    }
    
    const isSelected = appState.selectedCards.includes(idea.id);
    
    if (isSelected) {
        // Снимаем выбор
        deselectCard(idea.id);
    } else {
        // Пытаемся выбрать
        if (canSelectCard(idea.price)) {
            selectCard(idea.id);
            flipCard(idea.id);
        } else {
            // Недостаточно кармы - показываем анимацию ошибки
            shakeCard(idea.id);
        }
    }
}

// ============================================
// ФУНКЦИЯ: Проверка возможности выбора карточки
// ============================================

function canSelectCard(price) {
    const currentSelectionCost = appState.selectedCards.reduce((total, id) => {
        const idea = philosophicalIdeas.find(i => i.id === id);
        return total + (idea ? idea.price : 0);
    }, 0);
    
    return (currentSelectionCost + price) <= appState.karmaLevel;
}

// ============================================
// ФУНКЦИЯ: Выбор карточки
// ============================================

function selectCard(id) {
    if (!appState.selectedCards.includes(id)) {
        appState.selectedCards.push(id);
        updateKarmaDisplay();
        updateCardStatus(id, true);
        updateEmptyMessage();
    }
}

// ============================================
// ФУНКЦИЯ: Снятие выбора с карточки
// ============================================

function deselectCard(id) {
    const index = appState.selectedCards.indexOf(id);
    if (index !== -1) {
        appState.selectedCards.splice(index, 1);
        updateKarmaDisplay();
        updateCardStatus(id, false);
        updateEmptyMessage();
        
        // Перерисовываем все карточки, чтобы обновить доступность
        renderCards();
    }
}

// ============================================
// ФУНКЦИЯ: Обновление статуса карточки
// ============================================

function updateCardStatus(id, isSelected) {
    const card = elements.cardsGrid.querySelector(`[data-id="${id}"]`);
    if (card) {
        if (isSelected) {
            card.classList.add('card--selected');
            const statusEl = document.createElement('div');
            statusEl.className = 'card__status';
            statusEl.textContent = 'Выбрано';
            card.querySelector('.card__front').appendChild(statusEl);
            
            const btn = card.querySelector('.card__select-btn');
            if (btn) {
                btn.classList.add('card__select-btn--active');
                btn.textContent = '✓ Приобретено';
            }
        } else {
            card.classList.remove('card--selected');
            const statusEl = card.querySelector('.card__status');
            if (statusEl) statusEl.remove();
            
            const btn = card.querySelector('.card__select-btn');
            if (btn) {
                btn.classList.remove('card__select-btn--active');
                btn.textContent = 'Приобрести идею';
            }
        }
    }
}

// ============================================
// ФУНКЦИЯ: Поворот карточки
// ============================================

function flipCard(id) {
    const card = elements.cardsGrid.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.classList.toggle('card--flipped');
    }
}

// ============================================
// ФУНКЦИЯ: Анимация ошибки (тряска)
// ============================================

function shakeCard(id) {
    const card = elements.cardsGrid.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.classList.add('card--shake');
        setTimeout(() => {
            card.classList.remove('card--shake');
        }, 500);
    }
}

// ============================================
// ФУНКЦИЯ: Обновление сообщения о пустоте
// ============================================

function updateEmptyMessage() {
    if (appState.selectedCards.length === 0 && appState.isInitialized) {
        elements.emptyMessage.classList.remove('hidden');
    } else {
        elements.emptyMessage.classList.add('hidden');
    }
}

// ============================================
// КОНЕЦ СКРИПТА
// ============================================
// Надеюсь, вам понравился этот маленький философский магазин!
// Помните: истинная мудрость не покупается, но иногда полезно освежить знания 😉
