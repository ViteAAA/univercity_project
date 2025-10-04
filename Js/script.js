import { dataTabsTop, dataTabsBot, thirdDataTabsTop, thirdDataTabsBot, cardContent, popularFirstDataTabsBot } from "./data.js";
import card from "./card.js"
// import data from "./data.json" with { type: "json" };

console.log(dataTabsBot);

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

function createMovieCard(movie) {
    const cardRate = tabsRating(movie.rating);
    return `
        <a href="${movie.href}" class="preview-tabs-content-card">
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
    
    cardData.forEach(card => {
        cardsHTML += createMovieCard(card);
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
    renderMovies('first-tabs-top', dataTabsTop);
    renderMovies('first-tabs-bot', dataTabsBot);
    renderMovies('second-tabs-top', dataTabsBot);
    renderMovies('second-tabs-bot', dataTabsTop);
    renderMovies('third-tabs-top', thirdDataTabsTop);
    renderMovies('third-tabs-bot', thirdDataTabsBot);
    renderMovies('pop-item-1', popularFirstDataTabsBot);
    renderMovies('pop-item-2', popularFirstDataTabsBot);
});

// counter of likes & dislikes
const likeButton = document.querySelector('#like');
const dislikeButton = document.querySelector('#dislike');


const like = document.querySelector('#like span');
const dislike = document.querySelector('#dislike span');
let counterLike = 0;
let counterDislike = 0;


likeButton.addEventListener('click', () => {
    counterLike++;
    like.textContent = counterLike;
});

dislikeButton.addEventListener('click', () => {
    counterDislike++;
    dislike.textContent = counterDislike;
});

// cards

const cardCont = document.querySelector('#card-cont');

cardContent.forEach(element => {
    cardCont.innerHTML += card(element.text, element.img);
})


const popTabs = document.querySelectorAll('#popular-tab');
const popTabsContent = document.querySelectorAll('.preview-tabs-content');
popTabs.forEach((element, index) => {
    element.addEventListener('click', () => {
        popTabs.forEach(i => {
            i.classList.remove('active');
        })
        element.classList.add('active');
        // tabsContent.forEach((item, i) => {
        //     if (i !== index) {
        //         item.classList.add('hidden');
        //     }
        //     else {
        //         item.classList.remove('hidden');
        //     }
        // })
    })
});

const prevBtn = document.querySelector('.swiper-prev-btn');
const nextBtn = document.querySelector('.swiper-next-btn');
const contentSlider = document.querySelector('.swiper');
const sliderItem = document.querySelectorAll('.swiper-item');
let currentSlideIndex = 0; // Tracks the currently active slide
const totalSlides = sliderItem.length;


function renderCounter(count) {
    if (currentSlideIndex < 0) {
        count = totalSlides;
    } else if (currentSlideIndex >= totalSlides) {
        document.querySelector('.swiper-counter span').textContent = 1;
    } else {
        document.querySelector('.swiper-counter span').textContent = currentSlideIndex + 1;
    }
    
}
function goToSlide(index) {
    // Ensure the index loops around (infinite loop)
    if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else {
        currentSlideIndex = index;
    }

    
    
    // Move the slides container
    contentSlider.style.transform = `translateX(-${currentSlideIndex * 100 }%)`;
}

// Add event listeners to the buttons
prevBtn.addEventListener('click', () => {
    goToSlide(currentSlideIndex - 1);
    
    renderCounter(currentSlideIndex);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentSlideIndex + 1);
    renderCounter(currentSlideIndex);
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('counterLike: ' + counterLike);
    like.textContent = counterLike;
    dislike.textContent = counterDislike;
})