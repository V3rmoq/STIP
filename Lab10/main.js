function createTableCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

function convertNumberToText(numberStr) {
    const num = numberStr.replace(/\D/g, '');
    if (!num) return numberStr;

    try {
        return numberToString(num).convertedInteger;
    } catch (error) {
        console.error("Помилка конвертації:", error);
        return numberStr;
    }
}

function fillTable(tableBody, xmlData, shouldConvertNumbers) {
    const dishes = xmlData.querySelectorAll("dish");

    dishes.forEach(dish => {
        const row = document.createElement("tr");

        // Основні дані
        const type = dish.querySelector("type").textContent;
        const name = dish.querySelector("name").textContent;
        const calories = dish.querySelector("calories").textContent;

        // Обробка інгредієнтів
        const ingredients = [];
        let ingredientsCount = 0;

        dish.querySelectorAll("ingredients ingredient").forEach(ingredient => {
            ingredients.push(
                `${ingredient.querySelector("name").textContent} - ${ingredient.querySelector("amount").textContent}`
            );
            ingredientsCount++;
        });

        // Додавання комірок
        row.appendChild(createTableCell(type));
        row.appendChild(createTableCell(name));

        if (shouldConvertNumbers) {
            row.appendChild(createTableCell(convertNumberToText(calories)));
            row.appendChild(createTableCell(ingredients.join(", ")));
            row.appendChild(createTableCell(convertNumberToText(ingredientsCount.toString())));
        } else {
            row.appendChild(createTableCell(calories));
            row.appendChild(createTableCell(ingredients.join(", ")));
            row.appendChild(createTableCell(ingredientsCount.toString()));
        }

        tableBody.appendChild(row);
    });
}

$(document).ready(async function() {
    try {
        const response = await fetch("cookbook.xml");
        const xmlText = await response.text();
        const xmlDoc = new DOMParser().parseFromString(xmlText, "text/xml");

        // Заповнення таблиць
        fillTable(
            document.querySelector("#originalTable tbody"),
            xmlDoc,
            false
        );

        fillTable(
            document.querySelector("#numbersTable tbody"),
            xmlDoc,
            true
        );

    } catch (error) {
        console.error("Помилка завантаження даних:", error);
        alert("Сталася помилка при завантаженні даних. Перевірте консоль для деталей.");
    }
});