document.addEventListener('DOMContentLoaded', function() {
    // Завдання 1 - Управління підменю
    const menuItems = document.querySelectorAll('.has-submenu');

    menuItems.forEach(item => {
        // Показуємо підменю при наведенні
        item.addEventListener('mouseenter', function() {
            const submenu = this.querySelector('.sub-menu');
            submenu.style.opacity = '1';
            submenu.style.visibility = 'visible';
        });

        // Ховаємо підменю при відведенні курсора
        item.addEventListener('mouseleave', function() {
            const submenu = this.querySelector('.sub-menu');
            submenu.style.opacity = '0';
            submenu.style.visibility = 'hidden';
        });
    });

    // Завдання 2 - Анімація руху зображення
    const movingObject = document.getElementById('movingObject');
    const container = document.querySelector('.animation-container');
    const animateButton = document.getElementById('animateButton');

    let animationId;
    let isAnimating = false;
    const duration = 2000; // Тривалість анімації (2 секунди)
    let startTime;

    // Скидання позиції до початкової (правий верхній кут)
    function resetPosition() {
        movingObject.style.transform = 'translate(0, 0)';
    }

    // Функція анімації
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Розміри контейнера та об'єкта
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const objectWidth = movingObject.offsetWidth;
        const objectHeight = movingObject.offsetHeight;

        // Відстань для переміщення
        const moveX = containerWidth - objectWidth;
        const moveY = containerHeight - objectHeight;

        // Ефект плавності (easing)
        const easingProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Застосовуємо трансформацію
        movingObject.style.transform = `translate(
            ${-easingProgress * moveX}px, 
            ${easingProgress * moveY}px
        )`;

        // Продовжуємо анімацію, доки не завершиться
        if (progress < 1) {
            animationId = requestAnimationFrame(animate);
        } else {
            stopAnimation();
            animateButton.textContent = 'Запустити анімацію';
        }
    }

    // Запуск анімації
    function startAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        startTime = null;
        resetPosition();
        animationId = requestAnimationFrame(animate);
    }

    // Зупинка анімації
    function stopAnimation() {
        cancelAnimationFrame(animationId);
        isAnimating = false;
    }

    // Обробник кнопки
    animateButton.addEventListener('click', function() {
        if (isAnimating) {
            stopAnimation();
            this.textContent = 'Запустити анімацію';
        } else {
            startAnimation();
            this.textContent = 'Зупинити';
        }
    });

    // Ініціалізація початкової позиції
    resetPosition();
});