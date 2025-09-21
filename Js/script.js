tabs = document.querySelectorAll('.preview-tabs-header-items-item');
tabsContent = document.querySelectorAll('.preview-tabs-content');
tabs.forEach((element, index) => {
    element.addEventListener('click', () => {
        tabs.forEach(i => {
            i.classList.remove('active');
        })
        element.classList.add('active');
        tabsContent.forEach((item, i) => {
            if (i !== index) {
                item.classList.add('hidden');
            }
            else {
                item.classList.remove('hidden');
            }
        })
    })
});

const dataTabsTop = [
    {
        title: "Звёздные войны: Скайуокер. Восход",
        subtitle: "Фантастика, фэнтези, боевик, приключения",
        imageUrl: "images/png/starWars.png",
        rating: "6.70"
    },
    {
        title: "Побег из Претории",
        subtitle: "Триллер",
        imageUrl: "images/png/run.png",
        rating: "6.70"
    },
    {
        title: "Джокер",
        subtitle: "Триллер, драма, криминал",
        imageUrl: "images/png/joker.png",
        rating: "8.50"
    },
    {
        title: "Джентльмены",
        subtitle: "Боевик, комедия, криминал",
        imageUrl: "images/png/gentelmen.png",
        rating: "8.00"
    }
]
const dataTabsBot = [
    {
        title: "Ford против Ferrari",
        subtitle: "Биография, спорт, драма, боевик",
        imageUrl: "images/png/ford&ferrary.png",
        rating: "8.10"
    },
    {
        title: "3022",
        subtitle: "Фантастика, триллер",
        imageUrl: "images/png/future.png",
        rating: "4.90"
    },
    {
        title: "Хищные птицы: Потрясающая история Харли Квинн",
        subtitle: "Боевик, криминал, комедия",
        imageUrl: "images/png/birds.png",
        rating: "6.20"
    },
    {
        title: "Плохие парни навсегда",
        subtitle: "Боевик, комедия, криминал",
        imageUrl: "images/png/boys.png",
        rating: "6.90"
    }
]

const thirdDataTabsTop = [
    {
        title: "Побег из Претории",
        subtitle: "Триллер",
        imageUrl: "images/png/run.png",
        rating: "6.70"
    },
    {
        title: "Джокер",
        subtitle: "Триллер, драма, криминал",
        imageUrl: "images/png/joker.png",
        rating: "8.50"
    },
    {
        title: "Звёздные войны: Скайуокер. Восход",
        subtitle: "Фантастика, фэнтези, боевик, приключения",
        imageUrl: "images/png/starWars.png",
        rating: "6.70"
    },
    {
        title: "Джентльмены",
        subtitle: "Боевик, комедия, криминал",
        imageUrl: "images/png/gentelmen.png",
        rating: "8.00"
    }
]
const thirdDataTabsBot = [
    {
        title: "Ford против Ferrari",
        subtitle: "Биография, спорт, драма, боевик",
        imageUrl: "images/png/ford&ferrary.png",
        rating: "8.10"
    },
    {
        title: "3022",
        subtitle: "Фантастика, триллер",
        imageUrl: "images/png/future.png",
        rating: "4.90"
    },
    {
        title: "Хищные птицы: Потрясающая история Харли Квинн",
        subtitle: "Боевик, криминал, комедия",
        imageUrl: "images/png/birds.png",
        rating: "6.20"
    },
    {
        title: "Плохие парни навсегда",
        subtitle: "Боевик, комедия, криминал",
        imageUrl: "images/png/boys.png",
        rating: "6.90"
    }
]

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
        <div class="preview-tabs-content-card">
            <span class="preview-tabs-content-card-rating" style="background:${cardRate}">${movie.rating}</span>
            <img src="${movie.imageUrl}" class="preview-tabs-content-card-image">
            <p class="preview-tabs-content-card-title">${movie.title}</p>
            <p class="preview-tabs-content-card-subtitle">${movie.subtitle}</p>
        </div>
    `;
}

function renderMovies(containerId, cardData) {
    const container = document.getElementById(containerId);
    let cardsHTML = '';
    
    cardData.forEach(card => {
        cardsHTML += createMovieCard(card);
    });
    
    container.innerHTML = cardsHTML;
}

// Рендерим карточки при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderMovies('first-tabs-top', dataTabsTop);
    renderMovies('first-tabs-bot', dataTabsBot);
    renderMovies('second-tabs-top', dataTabsBot);
    renderMovies('second-tabs-bot', dataTabsTop);
    renderMovies('third-tabs-top', thirdDataTabsTop);
    renderMovies('third-tabs-bot', thirdDataTabsBot);
});