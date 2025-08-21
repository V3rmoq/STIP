document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

async function loadData() {
    try {
        const [xmlData, sortXsl, filterXsl] = await Promise.all([
            fetch('cookbook.xml').then(r => r.text()),
            fetch('sort.xsl').then(r => r.text()),
            fetch('filter.xsl').then(r => r.text())
        ]);

        // Оригінальні дані
        displayOriginalData(xmlData);

        // Сортування
        const sortedHtml = xsltTransform(xmlData, sortXsl);
        document.getElementById('sorted-data').innerHTML = sortedHtml;

        // Фільтрація
        const filteredHtml = xsltTransform(xmlData, filterXsl);
        document.getElementById('filtered-data').innerHTML = filteredHtml;

    } catch (error) {
        console.error('Помилка завантаження:', error);
        alert('Сталася помилка при завантаженні даних');
    }
}

function displayOriginalData(xmlData) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

    let html = `<table>
        <tr>
            <th>Тип</th>
            <th>Назва</th>
            <th>Калорійність</th>
            <th>Інгредієнти</th>
        </tr>`;

    xmlDoc.querySelectorAll('dish').forEach(dish => {
        const type = dish.querySelector('type').textContent;
        const name = dish.querySelector('name').textContent;
        const calories = dish.querySelector('calories').textContent;

        const ingredients = Array.from(dish.querySelectorAll('ingredient'))
            .map(ing => `${ing.querySelector('name').textContent} (${ing.querySelector('amount').textContent})`)
            .join(', ');

        html += `<tr>
            <td>${type}</td>
            <td>${name}</td>
            <td>${calories}</td>
            <td>${ingredients}</td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('original-data').innerHTML = html;
}

function xsltTransform(xmlData, xslData) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const xslDoc = parser.parseFromString(xslData, "text/xml");

        const processor = new XSLTProcessor();
        processor.importStylesheet(xslDoc);
        const resultDoc = processor.transformToDocument(xmlDoc);

        return new XMLSerializer().serializeToString(resultDoc);
    } catch (error) {
        console.error('Помилка XSLT:', error);
        return '<p>Помилка при обробці даних</p>';
    }
}
