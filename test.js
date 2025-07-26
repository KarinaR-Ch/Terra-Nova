document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.home__slider-wrapper');
    const slides = document.querySelectorAll('.home__slide');
    const dots = document.querySelectorAll('.dot');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 секунд

    // Ініціалізація слайдера
    function initSlider() {
        updateSlider();
        slideInterval = setInterval(nextSlide, slideDuration);
        
        // Пауза при наведенні
        sliderWrapper.addEventListener('mouseenter', pauseSlider);
        sliderWrapper.addEventListener('mouseleave', resumeSlider);
    }

    // Оновлення відображення слайдера
    function updateSlider() {
        // Приховуємо всі слайди
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Показуємо поточний слайд
        slides[currentIndex].classList.add('active');
        
        // Оновлюємо активні точки
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Перехід до конкретного слайду
    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateSlider();
        
        // Скидання таймеру автоматичної прокрутки
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Наступний слайд
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Попередній слайд
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Пауза слайдера
    function pauseSlider() {
        clearInterval(slideInterval);
    }

    // Відновлення слайдера
    function resumeSlider() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Обробники подій для стрілок
    arrowLeft.addEventListener('click', prevSlide);
    arrowRight.addEventListener('click', nextSlide);

    // Обробники подій для точок
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            if (slideIndex !== currentIndex) {
                goToSlide(slideIndex);
            }
        });
    });

    // Обробники клавіатури
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === ' ') {
            pauseSlider();
        }
    });

    // Ініціалізація слайдера
    initSlider();
});