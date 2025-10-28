export default function feesCard(title, id, price, text, img) {
    return `
        <a href="#" class="fees-card">
            <img src="${img}" alt="pause">
            <div class="fees-content">
                <p class="fees-card-title">
                    <span>${id}.</span> ${title}
                </p>
                <p class="fees-card-price">
                    ${price}
                </p>
                <p class="fees-card-text">
                    ${text}
                </p>
            </div>
        </a>
    `
}