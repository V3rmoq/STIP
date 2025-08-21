// Функція для завантаження та відображення XML вмісту
function loadAndDisplayXML() {
    // Створюємо XMLHttpRequest для завантаження файлу
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'cookbook.xml', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Відображаємо XML у вікні браузера
            document.getElementById('xmlDisplay').textContent = xhr.responseText;
        }
    };
    xhr.send();
}

// Завантажуємо XML при завантаженні сторінки
window.onload = loadAndDisplayXML;
