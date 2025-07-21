async function loadData() {
    try {
        const [xmlRes, sortRes, filterRes] = await Promise.all([
            fetch('cookbook.xml'),
            fetch('sort.xsl'),
            fetch('filter.xsl')
        ]);

        const [xmlText, sortText, filterText] = await Promise.all([
            xmlRes.text(),
            sortRes.text(),
            filterRes.text()
        ]);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const sortDoc = parser.parseFromString(sortText, "text/xml");
        const filterDoc = parser.parseFromString(filterText, "text/xml");

        fillTable('originalTable', xmlDoc);

        const sortProcessor = new XSLTProcessor();
        sortProcessor.importStylesheet(sortDoc);
        const sortedDoc = sortProcessor.transformToDocument(xmlDoc);
        fillTable('sortedTable', sortedDoc);

        const filterProcessor = new XSLTProcessor();
        filterProcessor.importStylesheet(filterDoc);
        const filteredDoc = filterProcessor.transformToDocument(xmlDoc);
        fillTable('filteredTable', filteredDoc);

    } catch (error) {
        console.error('Помилка завантаження:', error);
    }
}

function fillTable(tableId, xmlDoc) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';

    xmlDoc.querySelectorAll('dish').forEach(dish => {
        const type = dish.querySelector('type').textContent;
        const name = dish.querySelector('name').textContent;
        const calories = dish.querySelector('calories').textContent;

        const ingredients = Array.from(dish.querySelectorAll('ingredients ingredient'))
            .map(ing => `${ing.querySelector('name').textContent} (${ing.querySelector('amount').textContent})`)
            .join(', ');

        const row = `
            <tr>
                <td>${type}</td>
                <td>${name}</td>
                <td>${calories}</td>
                <td>${ingredients}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', loadData);