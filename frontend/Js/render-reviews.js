import { reviews } from './data.js'
import { isAuth, loginCont } from './script.js';

function renderReview(element) {
    let typeOfReview;
    let borderColor;
    switch (element.type) {
        case 'positive':
            typeOfReview = `<button class="recen good">
                            Положительная рецензия
                            </button>`
            borderColor = "border-color: #57d043"
            break;
        case 'negative':
            typeOfReview = `<button class="recen neg">
                Отрицательная рецензия
                </button>`
            borderColor = "border-color: #e04141"
            break;

        default:
            typeOfReview = `<button class="recen neit">
                    Нейтральная рецензия
                    </button>`
            borderColor = "border-color: #fff065"
            break;
    }
    return `
                <div class="reviews-item" style="${borderColor}">
                        <div class="reviews-item-top">
                            <div class="reviews-item-top-about">
                                <div class="reviews-item-top-name">
                                    <h2>
                                        ${element.author}
                                    </h2>
                                    ${typeOfReview}
                                
                                
                                </div>
                            </div>
                        
                        </div>
                    <div class="reviews-item-bot">
                        <div class="reviews-item-bot-title">
                            <h2>
                                ${element.title}
                            </h2>
                        </div>
                        <div class="reviews-item-bot-text">
                            ${element.text.map(i => `<p class="reviews-item-bot-text-par">${i}</p>`).join('')}
                        </div>
                    </div>
                </div>
            `
}
const allReviews = document.querySelector('#allReviews')
const goodReviews = document.querySelector('#goodReviews')
const badReviews = document.querySelector('#badReviews')
const okReviews = document.querySelector('#okReviews')

function renderThis(type) {
    const element = document.querySelector("#reviews-content");
    reviews.then(items => {
        const filteredItems = type ? items.filter(item => item.type === type) : items;
        const html = filteredItems.map(item => renderReview(item)).join('');
        element.innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderThis(undefined);
    
    // Правильно - передаем функции, а не вызываем их
    allReviews.parentElement.addEventListener("click", () => renderThis(undefined));
    goodReviews.parentElement.addEventListener("click", () => renderThis('positive'));
    badReviews.parentElement.addEventListener("click", () => renderThis('negative'));
    okReviews.parentElement.addEventListener("click", () => renderThis('neutral'));
});



document.addEventListener('DOMContentLoaded', (event) => {
    // Находим форму
    const form = document.querySelector('#reviewForm');
    if (!form) {
        return;
    }
    // Добавляем обработчик события 'submit'
    form.addEventListener('submit', function (e) {
        // Предотвращаем стандартную отправку формы
        e.preventDefault();

        // 1. Выполнение проверки формы
        // Здесь вы можете добавить свои критерии проверки.
        // Например, проверка длины текста отзыва или названия статьи.

        const articleTitle = form.elements['article_title'].value;
        const reviewText = form.elements['review_text'].value;

        if (articleTitle.length < 3) {
            alert('Название статьи должно содержать не менее 3 символов.');
            return;
        }

        if (reviewText.length < 10) {
            alert('Текст отзыва должен содержать не менее 10 символов.');
            return;
        }

        // Если проверки прошли успешно, продолжаем выполнение

        // 2. Получение имени пользователя
        fetch('http://127.0.0.1:8000/users/protected_username', {
            method: 'GET', // или 'POST', если это POST на бэкенде
            credentials: 'include' // если требуется отправлять куки
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при получении имени пользователя.');
                }
                return response.json();
            })
            .then(userData => {
                const username = userData.username;

                // 3. Сбор данных формы для отправки
                const formData = new FormData(form);
                // Добавляем полученное имя пользователя к данным
                formData.append('username', username);
                let mark;
                switch (formData.get('type')) {
                    case 'positive':
                        mark = 1
                        break;
                    case 'neutral':
                        mark = 0;
                        break;
                    default:
                        mark = -1;
                        break;
                }

                // Преобразуем FormData в JSON объект
                const data = {
                    username: username, // Получено из эндпоинта /users/protected_username
                    type: formData.get('rating'), // Пример: значение из радио-кнопки (positive, neutral, negative)
                    avatar: "default.png", // Пример: если у вас есть поле для аватара, или значение по умолчанию
                    title: formData.get('article_title'), // Значение из input article_title
                    text: formData.get('review_text').split('\n')
                };
                // formData.forEach((value, key) => {
                //     data[key] = value;
                // });

                // 4. Отправка данных на конечный эндпоинт
                return fetch('http://127.0.0.1:8000/reviews/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при отправке отзыва.');
                }
                return response.json();
            })
            .then(result => {
                // Обработка успешного ответа
                if (result) {
                    alert('Отзыв успешно отправлен!');
                    // Опционально: сбросить форму после успешной отправки
                    form.reset();
                } else {
                    alert('Не удалось отправить отзыв. Попробуйте снова.');
                }
            })
            .catch(error => {
                // Обработка любых ошибок в цепочке fetch
                console.error('Произошла ошибка:', error);
                alert(error.message);
            });
    });


    const reviewContainer = document.querySelector('#reviewContainer');
    const reviewClose = document.querySelector('#reviewClose');
    const reviewBtn = document.querySelector('#reviewBtn')
    if (reviewContainer) {
        reviewContainer.addEventListener("click", (position) => {
            if (position.target.classList.contains('form-container')) {
                reviewContainer.classList.add('hidden');
            }
        })
        reviewBtn.addEventListener("click", () => {
            if (!isAuth) {
                loginCont.classList.remove('hidden');
                loginCont.classList.add('anim');
            }
            else {
                reviewContainer.classList.remove('hidden');
                reviewContainer.classList.add('anim');
            }
        })
        reviewClose.addEventListener("click", () => {
            reviewContainer.classList.add('hidden');
            reviewContainer.classList.remove('anim');
        })
    }


    async function CountOfReviews() {
        const reviewsData = await reviews;


        let counterBad = 0;
        let counterGood = 0;
        let counterOk = 0;

        allReviews.textContent = reviewsData.length;

        reviewsData.forEach(i => {
            switch (i.type) {
                case 'positive':
                    counterGood++;
                    break;
                case 'negative':
                    counterBad++;
                    break;

                default:
                    counterOk++;
                    break;
            }
        })
        goodReviews.textContent = counterGood;
        badReviews.textContent = counterBad;
        okReviews.textContent = counterOk;


    }
    CountOfReviews();
});