document.addEventListener('DOMContentLoaded', function() {
    // Загрузка XML
    fetch('cookbook.xml')
        .then(response => response.text())
        .then(data => {
            document.getElementById('xml-block').innerHTML = 
                `<pre>${escapeHtml(data)}</pre>`;
        })
        .catch(error => console.error('Error loading XML:', error));

    // Загрузка DTD
    fetch('cookbook.dtd')
        .then(response => response.text())
        .then(data => {
            document.getElementById('dtd-block').innerHTML = 
                `<pre>${escapeHtml(data)}</pre>`;
        })
        .catch(error => console.error('Error loading DTD:', error));

    // Загрузка XSD
    fetch('cookbook.xsd')
        .then(response => response.text())
        .then(data => {
            document.getElementById('xsd-block').innerHTML = 
                `<pre>${escapeHtml(data)}</pre>`;
        })
        .catch(error => console.error('Error loading XSD:', error));

    // Функция для экранирования HTML-символов
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
