document.addEventListener('DOMContentLoaded', function() {
    const transformButton = document.getElementById('transformButton');
    const photo = document.getElementById('photo');
    const caption = document.getElementById('caption');
    const container = document.getElementById('photoContainer');
    let isTransformed = false;

    transformButton.addEventListener('click', function() {
        if (!isTransformed) {
            // 1. Центрування у верхній частині
            container.style.marginTop = '20px';

            // 2. Показ підпису
            caption.style.opacity = '1';

            // 3. Зменшення розміру фото у 2 рази
            photo.style.width = '150px';  // 300px / 2 = 150px
            photo.style.height = '200px'; // 400px / 2 = 200px

            transformButton.textContent = 'Повернути назад';
            isTransformed = true;
        } else {
            // Повернення до початкового стану
            container.style.marginTop = '50px';
            caption.style.opacity = '0';
            photo.style.width = '300px';
            photo.style.height = '400px';

            transformButton.textContent = 'Трансформувати фото';
            isTransformed = false;
        }
    });
});