export default function card(text, img) {
    return `
        <a href="pages/film_page.html" class="card">
            <div class="card-img" style="background: url(${img});">
                <img src="images/svg/pause.svg" alt="pause">
            </div>
            <p class="card-text">
                ${text}
            </p>
        </a>
    `
}