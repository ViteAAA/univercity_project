import { reviews } from './data.js'

function renderReview(element) {
    let typeOfReview;
    let borderColor;
    switch (element.type) {
        case 1:
            typeOfReview = `<button class="recen good">
                                Положительная рецензия
                            </button>` 
            borderColor = "border-color: #57d043"
            break;
        case -1:
            typeOfReview = `<button class="recen bad">
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
                    <div class="reviews-item-top-avatar"></div>
                    <div class="reviews-item-top-name">
                        <h2>
                            ${element.author}
                        </h2>
                        ${typeOfReview}
                        
                        
                    </div>
                </div>
                <div class="reviews-item-top-awards">
                    <button class="reaction" id="like">
                        <img src="../images/svg/like.svg" alt="like">
                        <span>
                            3 245
                        </span>
                    </button>
                    <button class="reaction" id="dislike">
                        <img src="../images/svg/dislike.svg" alt="dislike">
                        <span>
                            420
                        </span>
                    </button>
                </div>
            </div>
            <div class="reviews-item-bot">
                <div class="reviews-item-bot-title">
                    <h2>
                        ${element.title}
                    </h2>
                </div>
                <div class="reviews-item-bot-text">
                    ${
                        
                        element.text.map(i => `<p class="reviews-item-bot-text-par">${i}</p>`).join('')
                    }
                </div>
            </div>
        </div>
    `
}

document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector("#reviews-content");
    reviews[0].text.forEach(i => {
        console.log(i)
    })
    reviews.forEach(item => {
        element.innerHTML += renderReview(item);
    });
})