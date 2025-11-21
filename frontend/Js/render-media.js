import { media } from "./data.js";

function renderMedia(element) {
    return `
        <a href="../${element.href}" class="media-item">
            <div class="media-item-poster" style="background-image: url(../${element.imageUrl});">
                <button class="media-item-poster-btn">
                    Посмотреть
                </button>
                <div class="media-item-poster-bg"></div>
            </div>
            <h3 class="media-item-title">
                ${element.title}
            </h3>
        </a>
    `
}

document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector('#media-content');
    media.forEach(element => {
        content.innerHTML += renderMedia(element);
    });
})