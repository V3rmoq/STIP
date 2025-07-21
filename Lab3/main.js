document.addEventListener('DOMContentLoaded', () => {
    // Константи
    const CELL_SIZE = 10;
    const GRID_COLOR = '#bdc3c7';
    const DEAD_COLOR = '#ecf0f1';
    const ALIVE_COLOR = '#2c3e50';

    // Елементи DOM
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const clearBtn = document.getElementById('clearBtn');
    const randomBtn = document.getElementById('randomBtn');
    const speedSlider = document.getElementById('speedSlider');
    const generationDisplay = document.getElementById('generation');

    // Змінні стану
    let grid = [];
    let nextGrid = [];
    let rows = 0;
    let cols = 0;
    let generation = 0;
    let isRunning = false;
    let animationId = null;
    let speed = 5;

    // Ініціалізація гри
    function init() {
        resizeCanvas();
        createGrids();
        render();

        // Обробники подій
        canvas.addEventListener('click', handleCanvasClick);
        startBtn.addEventListener('click', startGame);
        stopBtn.addEventListener('click', stopGame);
        clearBtn.addEventListener('click', clearGrid);
        randomBtn.addEventListener('click', randomizeGrid);
        speedSlider.addEventListener('input', updateSpeed);
        window.addEventListener('resize', () => {
            resizeCanvas();
            render();
        });
    }

    // Зміна розміру canvas
    function resizeCanvas() {
        const container = canvas.parentElement;
        const size = Math.min(container.clientWidth, 600);
        canvas.width = size;
        canvas.height = size;

        // Перерахувати кількість клітин
        cols = Math.floor(canvas.width / CELL_SIZE);
        rows = Math.floor(canvas.height / CELL_SIZE);
    }

    // Створення сіток
    function createGrids() {
        grid = new Array(rows);
        nextGrid = new Array(rows);

        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(cols).fill(0);
            nextGrid[i] = new Array(cols).fill(0);
        }
    }

    // Очищення сітки
    function clearGrid() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = 0;
            }
        }
        generation = 0;
        updateGenerationDisplay();
        render();
    }

    // Випадкове заповнення сітки
    function randomizeGrid() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = Math.random() > 0.7 ? 1 : 0;
            }
        }
        generation = 0;
        updateGenerationDisplay();
        render();
    }

    // Обробник кліку на canvas
    function handleCanvasClick(event) {
        if (isRunning) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const col = Math.floor(x / CELL_SIZE);
        const row = Math.floor(y / CELL_SIZE);

        // Переключити стан клітини
        grid[row][col] = grid[row][col] ? 0 : 1;
        render();
    }

    // Початок гри
    function startGame() {
        if (isRunning) return;

        // Якщо сітка порожня, заповнити випадково
        let isEmpty = true;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === 1) {
                    isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) break;
        }

        if (isEmpty) {
            randomizeGrid();
        }

        isRunning = true;
        updateButtons();
        computeNextGeneration();
    }

    // Зупинка гри
    function stopGame() {
        isRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        updateButtons();
    }

    // Оновлення стану кнопок
    function updateButtons() {
        startBtn.disabled = isRunning;
        stopBtn.disabled = !isRunning;
    }

    // Оновлення швидкості
    function updateSpeed() {
        speed = parseInt(speedSlider.value);
    }

    // Оновлення лічильника поколінь
    function updateGenerationDisplay() {
        generationDisplay.textContent = `Покоління: ${generation}`;
    }

    // Відображення сітки
    function render() {
        // Очистити canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Намалювати сітку
        ctx.strokeStyle = GRID_COLOR;
        ctx.lineWidth = 0.5;

        for (let i = 0; i <= rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(canvas.width, i * CELL_SIZE);
            ctx.stroke();
        }

        for (let j = 0; j <= cols; j++) {
            ctx.beginPath();
            ctx.moveTo(j * CELL_SIZE, 0);
            ctx.lineTo(j * CELL_SIZE, canvas.height);
            ctx.stroke();
        }

        // Намалювати клітини
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j]) {
                    ctx.fillStyle = ALIVE_COLOR;
                    ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                } else {
                    ctx.fillStyle = DEAD_COLOR;
                    ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    }

    // Підрахунок сусідів
    function countNeighbors(row, col) {
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Пропустити поточну клітину

                const newRow = row + i;
                const newCol = col + j;

                // Перевірка меж сітки (тороїдальний простір)
                const wrappedRow = (newRow + rows) % rows;
                const wrappedCol = (newCol + cols) % cols;

                count += grid[wrappedRow][wrappedCol];
            }
        }

        return count;
    }

    // Обчислення наступного покоління
    function computeNextGeneration() {
        if (!isRunning) return;

        // Обчислити наступний стан для кожної клітини
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const neighbors = countNeighbors(i, j);
                const cell = grid[i][j];

                // Застосувати правила гри
                if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
                    nextGrid[i][j] = 0; // Померти
                } else if (cell === 0 && neighbors === 3) {
                    nextGrid[i][j] = 1; // Народитися
                } else {
                    nextGrid[i][j] = cell; // Залишитися як є
                }
            }
        }

        // Оновити сітку
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = nextGrid[i][j];
                nextGrid[i][j] = 0;
            }
        }

        generation++;
        updateGenerationDisplay();
        render();

        // Запустити наступний кадр з затримкою
        const delay = 1000 / speed;
        animationId = setTimeout(() => {
            requestAnimationFrame(computeNextGeneration);
        }, delay);
    }

    // Початок роботи
    init();
});