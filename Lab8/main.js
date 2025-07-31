// Функция для загрузки и отображения содержимого файла
function loadFileContent(filename, elementId) {
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки файла: ${filename}`);
            }
            return response.text();
        })
        .then(content => {
            document.getElementById(elementId).textContent = content;
        })
        .catch(error => {
            console.error(error);
            document.getElementById(elementId).textContent = error.message;
        });
}

// Загружаем содержимое всех файлов при открытии страницы
window.onload = function() {
    loadFileContent('cookbook.dtd', 'dtd-content');
    loadFileContent('cookbook.xml', 'xml-content');
    loadFileContent('cookbook.xsd', 'xsd-content');
};
