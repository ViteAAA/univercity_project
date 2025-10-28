class Swiper {
    constructor(container) {
        this.container = container;
        this.prevBtn = container.querySelector('.swiper-prev-btn');
        this.nextBtn = container.querySelector('.swiper-next-btn');
        this.contentSlider = container.querySelector('.swiper');
        this.sliderItems = container.querySelectorAll('.swiper-item');
        this.counterElement = container.querySelector('.swiper-counter span');
        
        this.currentSlideIndex = 0;
        this.totalSlides = this.sliderItems.length;
        
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        // Инициализация кнопок
        this.prevBtn.addEventListener('click', () => {
            this.goToSlide(this.currentSlideIndex - 1);
            this.renderCounter();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.goToSlide(this.currentSlideIndex + 1);
            this.renderCounter();
        });
        
        // Инициализация свайпа
        this.contentSlider.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));
        
        this.contentSlider.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        this.contentSlider.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        this.contentSlider.addEventListener('touchend', this.handleEnd.bind(this));
        
        this.contentSlider.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        
        // Инициализация счетчика
        this.renderCounter();
    }
    
    renderCounter() {
        if (this.currentSlideIndex < 0) {
            this.counterElement.textContent = this.totalSlides;
        } else if (this.currentSlideIndex >= this.totalSlides) {
            this.counterElement.textContent = 1;
        } else {
            this.counterElement.textContent = this.currentSlideIndex + 1;
        }
    }
    
    goToSlide(index) {
        if (index < 0) {
            this.currentSlideIndex = this.totalSlides - 1;
        } else if (index >= this.totalSlides) {
            this.currentSlideIndex = 0;
        } else {
            this.currentSlideIndex = index;
        }
        
        this.contentSlider.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
    }
    
    handleStart(e) {
        if (e.type === 'touchstart') {
            this.startX = e.touches[0].clientX;
        } else {
            this.startX = e.clientX;
            e.preventDefault();
        }
        
        this.isDragging = true;
        this.contentSlider.style.transition = 'none';
    }
    
    handleMove(e) {
        if (!this.isDragging) return;
        
        if (e.type === 'touchmove') {
            this.currentX = e.touches[0].clientX;
        } else {
            this.currentX = e.clientX;
            e.preventDefault();
        }
        
        const diff = this.currentX - this.startX;
        this.contentSlider.style.transform = `translateX(calc(-${this.currentSlideIndex * 100}% + ${diff}px))`;
    }
    
    handleEnd(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.contentSlider.style.transition = '';
        
        const diff = this.currentX - this.startX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.goToSlide(this.currentSlideIndex - 1);
            } else {
                this.goToSlide(this.currentSlideIndex + 1);
            }
            this.renderCounter();
        } else {
            this.goToSlide(this.currentSlideIndex);
        }
    }
}

// Инициализация всех слайдеров на странице
document.addEventListener('DOMContentLoaded', () => {
    // Находим все контейнеры слайдеров
    const sliderContainers = document.querySelectorAll('.swiper-cont'); // или другой общий класс
    
    // Создаем экземпляры для каждого слайдера
    const sliders = [];
    sliderContainers.forEach(container => {
        sliders.push(new Swiper(container));
    });
    
    
});