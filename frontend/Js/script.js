import { dataTabsTop, dataTabsBot, dataTabsFirst, dataTabsSecond, dataTabsThird, thirdDataTabsTop, thirdDataTabsBot, cardContent, popularFirstDataTabsBot, popularSecondDataTabsBot, popularThirdDataTabsBot, feesContent } from "./data.js";
import card from "./card.js";
import fees from './fees.js';


export let isAuth = false;

// Login Window
export const loginCont = document.querySelector('#login');
const loginOpen = document.querySelector('#login-open');
const loginBtn = document.querySelector('#login-close');
const switchToReg = document.querySelector('.register-btn')

const registerCont = document.querySelector('#register');
const registerCloseBtn = document.querySelector('#register-close');

if (loginOpen) {
    loginBtn.addEventListener("click", () => {
        if (isAuth) {
            return
        }
        loginCont.classList.add('hidden');
        loginCont.classList.remove('anim');
    })
    loginOpen.addEventListener("click", () => {
        if (isAuth) {
            return
        }
        loginCont.classList.remove('hidden');
        loginCont.classList.add('anim');
    })
    loginCont.addEventListener("click", (click) => {
        if (isAuth) {
            return
        }
        if (click.target.classList.contains('login-container')) {
            loginCont.classList.add('hidden');
            loginCont.classList.remove('anim');
        }
    })
    document.body.addEventListener("keydown", function(event) {
        if (isAuth) {
            return
        }
        if (event.key === "Escape" && !loginCont.classList.contains('hidden')) {
            loginCont.classList.add('hidden');
            loginCont.classList.remove('anim');
        }
        if (event.key === "Escape" && !registerCont.classList.contains('hidden')) {
            registerCont.classList.add('hidden');
            registerCont.classList.remove('anim');
        }
    });
    switchToReg.addEventListener("click", () => {
        if (isAuth) {
            return
        }
        loginCont.classList.add('hidden');
        loginCont.classList.remove('anim');

        registerCont.classList.remove('hidden');
        registerCont.classList.add('anim');
    })
    registerCloseBtn.addEventListener("click", () => {
        if (isAuth) {
            return
        }
        registerCont.classList.add('hidden');
        registerCont.classList.remove('anim');
    })
    registerCont.addEventListener("click", (click) => {
        if (click.target.classList.contains('registration-container')) {
            if (isAuth) {
                return
            }
            registerCont.classList.add('hidden');
            registerCont.classList.remove('anim');
        }
    })
}


const tabs = document.querySelectorAll('.preview-tabs-header-items-item');
const tabsContent = document.querySelectorAll('.preview-tabs-content');
tabs.forEach((element, index) => {
    element.addEventListener('click', () => {
        tabs.forEach(i => {
            i.classList.remove('active');
        })
        element.classList.add('active');
        tabsContent.forEach((item, i) => {
            if (i !== index) {
                item.classList.add('hidden');
                item.classList.remove('anim');
            }
            else {
                item.classList.remove('hidden');
                item.classList.add('anim');
            }
        })
    })
});



function tabsRating(rate) {
    switch (true) {
        case (rate < 3):
            return 'red';
        case (rate >= 3 && rate < 5):
            return '#cb3f36';
        case (rate >= 5 && rate < 8):
            return '#89cb36';
        case (rate >= 8):
            return '#4bcb36';
        default:
            return 'black';
    }
}

function createMovieCard(movie, numb) {
    const cardRate = tabsRating(movie.rating);
    return `
        <a href="${movie.href}" class="preview-tabs-content-card ${numb === 4 ? "hidden-clild" : ""}">
            <span class="preview-tabs-content-card-rating" style="background:${cardRate}">${movie.rating}</span>
            <div class="preview-tabs-content-card-img" style="background:url(${movie.imageUrl})">
                <button class="preview-tabs-content-card-img-btn">
                    Посмотреть
                </button>
                <div class="preview-tabs-content-card-img-bg"></div>
            </div>
            
            <p class="preview-tabs-content-card-title">${movie.title}</p>
            <p class="preview-tabs-content-card-subtitle">${movie.subtitle}</p>
        </a>
    `;
}

function renderMovies(containerId, cardData) {
    // const container = document.getElementById(containerId);
    const container = document.querySelectorAll(`#${containerId}`);
    let cardsHTML = '';
    let numb = 0;
    
    cardData.forEach(card => {
        numb++;
        cardsHTML += createMovieCard(card, numb);
        numb = numb == 4 ? 0 : numb;
    });
    if (container.length === 1) {
        container[0].innerHTML = cardsHTML;
    }
    else {
        container.forEach(element => {
            element.innerHTML = cardsHTML;
        })
    }
    
}

// Рендерим карточки при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // renderMovies('first-tabs-top', dataTabsTop);
    // renderMovies('first-tabs-bot', dataTabsBot);
    // renderMovies('second-tabs-top', dataTabsBot);
    // renderMovies('second-tabs-bot', dataTabsTop);
    // renderMovies('third-tabs-top', thirdDataTabsTop);
    // renderMovies('third-tabs-bot', thirdDataTabsBot);
    // renderMovies('pop-item-1', popularFirstDataTabsBot);
    // renderMovies('pop-item-2', popularSecondDataTabsBot);
    renderMovies('first-tabs', dataTabsFirst);
    renderMovies('second-tabs', dataTabsSecond);
    renderMovies('third-tabs', dataTabsThird);
    renderMovies('pop-item-1', popularFirstDataTabsBot);
    renderMovies('pop-item-2', popularSecondDataTabsBot);
});

// counter of likes & dislikes
const likeButton = document.querySelector('#like');
const dislikeButton = document.querySelector('#dislike');


const like = document.querySelector('#like span');
const dislike = document.querySelector('#dislike span');
let counterLike = 0;
let counterDislike = 0;

if (like && dislike) {
    likeButton.addEventListener('click', () => {
        counterLike++;
        like.textContent = counterLike;
    });
    
    dislikeButton.addEventListener('click', () => {
        counterDislike++;
        dislike.textContent = counterDislike;
    });
}


// cards

const cardCont = document.querySelector('#card-cont');

if (cardCont) {
    cardContent.forEach(element => {
        cardCont.innerHTML += card(element.text, element.img);
    })
}



const popTabs = document.querySelectorAll('#popular-tab');
const popTabsContent = document.querySelectorAll('.popular .tabs-content-item');
popTabs.forEach((element, index) => {
    element.addEventListener('click', () => {
        popTabs.forEach(i => {
            i.classList.remove('active');
        })
        element.classList.add('active');
        popTabsContent.forEach((item, i) => {
            if (i !== index) {
                item.classList.remove('anim');
                item.classList.add('hidden');
            }
            else {
                item.classList.remove('hidden');
                item.classList.add('anim');
            }
        })
    })
});

const feesTabs = document.querySelectorAll('.fees-tabs-header-items-item');
const tabsFeesContent = document.querySelectorAll('.fees-bottom-item');
feesTabs.forEach((element, index) => {
    element.addEventListener('click', () => {
        feesTabs.forEach(i => {
            i.classList.remove('active');
        })
        element.classList.add('active');
        tabsFeesContent.forEach((item, i) => {
            if (i !== index) {
                item.classList.add('hidden');
                item.classList.remove('anim');
            }
            else {
                item.classList.remove('hidden');
                item.classList.add('anim');
            }
        })
    })
});

const feesCont = document.querySelectorAll('#fees-card');


feesContent.forEach(i => {
    feesCont.forEach(element => {
        element.innerHTML += fees(i.id, i.title, i.price, i.text, i.img);
    })
})




// Send to Backend
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Валидация паролей
    const password = this.querySelector('input[name="password"]').value;
    const repeatPassword = this.querySelector('input[name="repeat-password"]').value;
    
    if (password !== repeatPassword) {
        showMessage('Пароли не совпадают!', 'error');
        return;
    }
    
    // Сбор данных формы
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        femail: this.querySelector('input[name="femail"]').value,
        username: this.querySelector('input[name="username"]').value,
        password: password,
        number: this.querySelector('input[name="number"]').value,
    };
    
    try {
        const response = await fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage('Регистрация успешна!', 'success');
            console.log('Успешно:', result);
            // Перенаправление или очистка формы
            this.reset();
        } else {
            const error = await response.json();
            showMessage(`Ошибка: ${error.detail || 'Неизвестная ошибка'}`, 'error');
            console.error('Ошибка сервера:', error);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }

    
});


// Is Register user?
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    

    const formData = new FormData(this);
    const loginData = {
        username: formData.get('nickName'),  // Преобразуем nickName в username
        password: formData.get('password')
    };
    
    try {
        const response = await fetch('http://127.0.0.1:8000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(loginData)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(response)
            
            if (result.access === true) {
                console.log('Вход выполнен успешно!', 'success');
                location.reload()
                // Перенаправление или другие действия после успешного входа
            } else {
                console.log('Неверные учетные данные', 'error');
            }
        } else {
            console.log('Ошибка сервера. Попробуйте позже.', 'error');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showMessage('Ошибка сети. Проверьте подключение.', 'error');
    }
});


async function checkAuth() {
    try {
        const response = await fetch('http://127.0.0.1:8000/users/protected', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, // Важно: отправляем куки
            credentials: 'include' 
        });
        
        if (response.ok) {
            const data = await response.json();
            isAuth = true;
            console.log('Пользователь авторизован');
            return true;
        } else {
            console.log('Пользователь не авторизован');
            return false;
        }
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        return false;
    }
}

// async function logOut() {
//     try {
//         console.log('Starting logout process...');
        
//         const response = await fetch('http://127.0.0.1:8000/users/logout', {
//             method: 'POST',  // ← ИЗМЕНИТЕ НА POST
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include'
//         });
        
//         console.log('Logout response status:', response.status);
        
//         if (response.ok) {
//             const data = await response.json();
//             console.log('Logout successful:', data);
            
//             // Очищаем куки на клиенте
//             clearAllCookies();
            
//             // Обновляем интерфейс
//             // updateUIAfterLogout();
            
//             return true;
//         } else {
//             const errorText = await response.text();
//             console.log('Logout failed:', response.status, errorText);
            
//             // Все равно очищаем куки на клиенте
//             clearAllCookies();
//             // updateUIAfterLogout();
            
//             return false;
//         }
//     } catch (error) {
//         console.error('Logout error:', error);
        
//         // При ошибке сети все равно очищаем локально
//         clearAllCookies();
//         // updateUIAfterLogout();
        
//         return false;
//     }
// }

async function logOut() {
    try {
        const response = await fetch('http://127.0.0.1:8000/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, // Важно: отправляем куки
            credentials: 'include' 
        });
        
        if (response.ok) {
            const data = await response.json();
            isAuth = true;
            console.log('Пользователь авторизован');
            location.reload()
            clearAllCookies()
        } else {
            console.log('Пользователь не авторизован');
        }
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
    }
}


function clearAllCookies() {
    const cookies = document.cookie.split(";");
    
    for (let cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        
        // Удаляем куку
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
    console.log('All cookies cleared locally');
}

checkAuth().then(isAuthenticated => {
    // Использование
    if (isAuthenticated) {
        console.log(isAuth)
    } else {
        console.log(isAuth)
    }
    isAuth = isAuthenticated;
    if (isAuth) {
        loginOpen.textContent = "Выйти";
    }
    
})

if (loginOpen) { 
    loginOpen.addEventListener("click", () => {
        console.log("click")
        if (!isAuth) {
            return
        }
        logOut()
    })
}





