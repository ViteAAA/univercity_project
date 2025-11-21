import { dataTabsTop, dataTabsBot, dataTabsFirst, dataTabsSecond, dataTabsThird, thirdDataTabsTop, thirdDataTabsBot, cardContent, popularFirstDataTabsBot, popularSecondDataTabsBot, popularThirdDataTabsBot, feesContent } from "./data.js";
import card from "./card.js";
import fees from './fees.js';



// Login Window
const loginCont = document.querySelector('#login');
const loginOpen = document.querySelector('#login-open');
const loginBtn = document.querySelector('#login-close');
const switchToReg = document.querySelector('.register-btn')

const registerCont = document.querySelector('#register');
const registerCloseBtn = document.querySelector('#register-close');

if (loginOpen) {
    loginBtn.addEventListener("click", () => {
        loginCont.classList.add('hidden');
        loginCont.classList.remove('anim');
    })
    loginOpen.addEventListener("click", () => {
        loginCont.classList.remove('hidden');
        loginCont.classList.add('anim');
        
    })
    loginCont.addEventListener("click", (click) => {
        if (click.target.classList.contains('login-container')) {
            loginCont.classList.add('hidden');
            loginCont.classList.remove('anim');
        }
    })
    document.body.addEventListener("keydown", function(event) {
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
        loginCont.classList.add('hidden');
        loginCont.classList.remove('anim');

        registerCont.classList.remove('hidden');
        registerCont.classList.add('anim');
    })
    registerCloseBtn.addEventListener("click", () => {
        registerCont.classList.add('hidden');
        registerCont.classList.remove('anim');
    })
    registerCont.addEventListener("click", (click) => {
        if (click.target.classList.contains('registration-container')) {
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


