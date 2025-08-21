// Глобальна змінна для зберігання XML документа
let xmlDocument = null;

// Функція для завантаження XML документа
function loadXML() {
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<cookbook>
    <dish>
        <type>Гаряча страва</type>
        <name>Борщ</name>
        <measure>Порція</measure>
        <ingredients>
            <ingredient>
                <name>Буряк</name>
                <amount>300 г</amount>
            </ingredient>
            <ingredient>
                <name>Капуста</name>
                <amount>200 г</amount>
            </ingredient>
            <ingredient>
                <name>Картопля</name>
                <amount>3 шт</amount>
            </ingredient>
        </ingredients>
        <recipe>Нарізати овочі, обсмажити цибулю, додати м'ясо, варити 40 хвилин.</recipe>
        <calories>150 ккал</calories>
    </dish>

    <dish>
        <type>Салат</type>
        <name>Олів'є</name>
        <measure>Порція</measure>
        <ingredients>
            <ingredient>
                <name>Картопля</name>
                <amount>4 шт</amount>
            </ingredient>
            <ingredient>
                <name>Морква</name>
                <amount>2 шт</amount>
            </ingredient>
            <ingredient>
                <name>Яйце</name>
                <amount>3 шт</amount>
            </ingredient>
        </ingredients>
        <recipe>Відварити овочі та яйця, нарізати кубиками, змішати з майонезом.</recipe>
        <calories>250 ккал</calories>
    </dish>

    <dish>
        <type>Десерт</type>
        <name>Сирники</name>
        <measure>Порція (3 шт)</measure>
        <ingredients>
            <ingredient>
                <name>Сир</name>
                <amount>500 г</amount>
            </ingredient>
            <ingredient>
                <name>Борошно</name>
                <amount>100 г</amount>
            </ingredient>
            <ingredient>
                <name>Яйце</name>
                <amount>2 шт</amount>
            </ingredient>
        </ingredients>
        <recipe>Змішати сир з яйцями, додати борошно і цукор, сформувати сирники, обсмажити.</recipe>
        <calories>200 ккал</calories>
    </dish>

    <dish>
        <type>Випічка</type>
        <name>Млинці</name>
        <measure>Порція (2 шт)</measure>
        <ingredients>
            <ingredient>
                <name>Молоко</name>
                <amount>500 мл</amount>
            </ingredient>
            <ingredient>
                <name>Борошно</name>
                <amount>200 г</amount>
            </ingredient>
            <ingredient>
                <name>Яйце</name>
                <amount>2 шт</amount>
            </ingredient>
        </ingredients>
        <recipe>Змішати всі інгредієнти, тісто повинно бути рідким, випікати на сковороді.</recipe>
        <calories>180 ккал</calories>
    </dish>

    <dish>
        <type>Гаряча страва</type>
        <name>Гречана каша</name>
        <measure>Порція</measure>
        <ingredients>
            <ingredient>
                <name>Гречка</name>
                <amount>100 г</amount>
            </ingredient>
            <ingredient>
                <name>Вода</name>
                <amount>200 мл</amount>
            </ingredient>
        </ingredients>
        <recipe>Промити гречку, залити водою, варити 20 хвилин, додати масло.</recipe>
        <calories>120 ккал</calories>
    </dish>

    <dish>
        <type>Салат</type>
        <name>Цезар</name>
        <measure>Порція</measure>
        <ingredients>
            <ingredient>
                <name>Куряче філе</name>
                <amount>150 г</amount>
            </ingredient>
            <ingredient>
                <name>Листя салату</name>
                <amount>50 г</amount>
            </ingredient>
        </ingredients>
        <recipe>Обсмажити куряче філе, змішати з листям салату та соусом.</recipe>
        <calories>180 ккал</calories>
    </dish>

    <dish>
        <type>Супи</type>
        <name>Грибний суп</name>
        <measure>Порція</measure>
        <ingredients>
            <ingredient>
                <name>Гриби</name>
                <amount>300 г</amount>
            </ingredient>
            <ingredient>
                <name>Картопля</name>
                <amount>3 шт</amount>
            </ingredient>
        </ingredients>
        <recipe>Нарізати гриби та овочі, варити 25 хвилин, додати вершки.</recipe>
        <calories>160 ккал</calories>
    </dish>

    <dish>
        <type>Випічка</type>
        <name>Шарлотка</name>
        <measure>Порція (1/8 пирога)</measure>
        <ingredients>
            <ingredient>
                <name>Яблука</name>
                <amount>3 шт</amount>
            </ingredient>
            <ingredient>
                <name>Борошно</name>
                <amount>200 г</amount>
            </ingredient>
        </ingredients>
        <recipe>Збити яйця з цукром, додати борошно, випікати 40 хвилин.</recipe>
        <calories>220 ккал</calories>
    </dish>

    <dish>
        <type>Гаряча страва</type>
        <name>Пельмені</name>
        <measure>Порція (10 шт)</measure>
        <ingredients>
            <ingredient>
                <name>Борошно</name>
                <amount>200 г</amount>
            </ingredient>
            <ingredient>
                <name>Фарш</name>
                <amount>300 г</amount>
            </ingredient>
        </ingredients>
        <recipe>Замісити тісто, зліпити пельмені, варити 5-7 хвилин.</recipe>
        <calories>250 ккал</calories>
    </dish>

    <dish>
        <type>Десерт</type>
        <name>Медовик</name>
        <measure>Порція (1/10 торта)</measure>
        <ingredients>
            <ingredient>
                <name>Борошно</name>
                <amount>400 г</amount>
            </ingredient>
            <ingredient>
                <name>Мед</name>
                <amount>100 г</amount>
            </ingredient>
        </ingredients>
        <recipe>Замісити тісто, випікати коржі, змастити сметаною.</recipe>
        <calories>300 ккал</calories>
    </dish>
</cookbook>`;

    // Відображаємо XML у вікні браузера
    document.getElementById('xmlDisplay').textContent = xmlString;

    // Парсимо XML за допомогою DOM XML методів
    const parser = new DOMParser();
    xmlDocument = parser.parseFromString(xmlString, "text/xml");

    // Перевіряємо на помилки парсингу
    if (xmlDocument.getElementsByTagName("parsererror").length > 0) {
        alert('Помилка парсингу XML: ' + xmlDocument.getElementsByTagName("parsererror")[0].textContent);
        return;
    }

    alert('XML документ успішно завантажено та розпарсено!');
}

// Функція для отримання CSS класу для типу страви
function getTypeClass(type) {
    const typeMap = {
        'Гаряча страва': 'type-hot',
        'Салат': 'type-salad',
        'Десерт': 'type-dessert',
        'Випічка': 'type-baking',
        'Супи': 'type-soup'
    };
    return typeMap[type] || '';
}

// Функція для створення HTML таблиці з XML даних
function createTable() {
    if (!xmlDocument) {
        alert('Спочатку завантажте XML документ!');
        return;
    }

    const dishes = xmlDocument.getElementsByTagName('dish');
    const tableContainer = document.getElementById('tableContainer');

    // Створюємо таблицю за допомогою DOM методів
    const table = document.createElement('table');

    // Створюємо заголовок таблиці
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ['Тип страви', 'Назва', 'Порція', 'Інгредієнти', 'Рецепт', 'Калорійність'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Створюємо тіло таблиці
    const tbody = document.createElement('tbody');

    // Обробляємо кожну страву з XML
    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];
        const row = document.createElement('tr');

        // Отримуємо дані з XML за допомогою DOM методів
        const type = dish.getElementsByTagName('type')[0].textContent;
        const name = dish.getElementsByTagName('name')[0].textContent;
        const measure = dish.getElementsByTagName('measure')[0].textContent;
        const ingredients = dish.getElementsByTagName('ingredient');
        const recipe = dish.getElementsByTagName('recipe')[0].textContent;
        const calories = dish.getElementsByTagName('calories')[0].textContent;

        // Створюємо список інгредієнтів
        const ingredientsList = document.createElement('ul');
        ingredientsList.className = 'ingredients-list';

        for (let j = 0; j < ingredients.length; j++) {
            const ingredient = ingredients[j];
            const ingName = ingredient.getElementsByTagName('name')[0].textContent;
            const amount = ingredient.getElementsByTagName('amount')[0].textContent;

            const li = document.createElement('li');
            li.textContent = `${ingName}: ${amount}`;
            ingredientsList.appendChild(li);
        }

        // Створюємо комірки таблиці
        const typeCell = document.createElement('td');
        const typeSpan = document.createElement('span');
        typeSpan.className = `type-badge ${getTypeClass(type)}`;
        typeSpan.textContent = type;
        typeCell.appendChild(typeSpan);

        const nameCell = createCell(name);
        const measureCell = createCell(measure);

        const ingredientsCell = document.createElement('td');
        ingredientsCell.appendChild(ingredientsList);

        const recipeCell = document.createElement('td');
        recipeCell.className = 'recipe-content';
        recipeCell.textContent = recipe;

        const caloriesCell = document.createElement('td');
        const caloriesSpan = document.createElement('span');
        caloriesSpan.className = 'calories-badge';
        caloriesSpan.textContent = calories;
        caloriesCell.appendChild(caloriesSpan);

        // Додаємо комірки до рядка
        const cells = [typeCell, nameCell, measureCell, ingredientsCell, recipeCell, caloriesCell];
        cells.forEach(cell => row.appendChild(cell));

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Допоміжна функція для створення звичайної комірки
function createCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

// Функція для збереження результату у файл result.html
function saveResult() {
    if (!xmlDocument) {
        alert('Спочатку створіть таблицю!');
        return;
    }

    const tableContainer = document.getElementById('tableContainer');
    if (!tableContainer.innerHTML.trim()) {
        alert('Спочатку створіть таблицю!');
        return;
    }

    // Створюємо HTML для збереження
    const resultHTML = `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Кулінарна книга - Результат</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        
        th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-weight: bold;
            text-align: center;
        }
        
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        tr:hover {
            background-color: #e3f2fd;
        }
        
        .ingredients-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        
        .ingredients-list li {
            padding: 2px 0;
            border-bottom: 1px dashed #eee;
        }
        
        .ingredients-list li:last-child {
            border-bottom: none;
        }
        
        .recipe-content {
            background: #fff3cd;
            padding: 10px;
            border-radius: 5px;
            border-left: 4px solid #ffc107;
        }
        
        .calories-badge {
            background: #28a745;
            color: white;
            padding: 4px 8px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .type-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            color: white;
        }
        
        .type-hot {
            background: #dc3545;
        }
        
        .type-salad {
            background: #28a745;
        }
        
        .type-dessert {
            background: #ffc107;
            color: #000;
        }
        
        .type-baking {
            background: #6f42c1;
        }
        
        .type-soup {
            background: #fd7e14;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Кулінарна книга - Перелік страв</h1>
        ${tableContainer.innerHTML}
    </div>
</body>
</html>`;

    // Створюємо blob для завантаження
    const blob = new Blob([resultHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Створюємо посилання для завантаження
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result.html';
    document.body.appendChild(a);
    a.click();

    // Очищуємо
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);

    alert('Файл result.html успішно збережено!');
}

// Автоматично завантажуємо XML при завантаженні сторінки
window.onload = function() {
    setTimeout(loadXML, 1000);
};
