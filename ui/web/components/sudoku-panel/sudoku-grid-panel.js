/* ============================= */
/* НАЧАЛЬНЫЙ МАССИВ SUDOKU */
/* null = пустая ячейка */
/* ============================= */
const initialGrid = Array.from({length: 9}, () => Array(9).fill(null));

/* ============================= */
/* DOM ЭЛЕМЕНТЫ И ПЕРЕМЕННЫЕ */
/* ============================= */
const sudokuGrid = document.getElementById('sudokuGrid');
let selectedCell = null; // текущая выбранная ячейка

/* ============================= */
/* СОЗДАНИЕ СЕТКИ SUDOKU */
/* ============================= */

/**
 * Создаёт сетку 9x9.
 * @param {function} cellClickCallback - функция, которая вызывается при клике на ячейку
 */
function createGrid(cellClickCallback) {
    sudokuGrid.innerHTML = ''; // очищаем сетку

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Добавляем толстые границы для блоков 3x3
            if(c % 3 === 2) cell.classList.add('border-right');
            if(r % 3 === 2) cell.classList.add('border-bottom');
            if(c % 3 === 0) cell.classList.add('border-left');
            if(r % 3 === 0) cell.classList.add('border-top');

            // Если значение из начального массива, делаем его фиксированным
            if(initialGrid[r][c] !== null) {
                cell.textContent = initialGrid[r][c];
                cell.classList.add('fixed');
            }

            // Назначаем делегат клика
            cell.addEventListener('click', () => {
                if(selectedCell) selectedCell.classList.remove('selected');
                selectedCell = cell;
                cell.classList.add('selected');

                if(cellClickCallback) cellClickCallback(r, c, cell);
            });

            sudokuGrid.appendChild(cell);
        }
    }
}

/* ============================= */
/* ТОЧЕЧНОЕ УПРАВЛЕНИЕ ЯЧЕЙКАМИ */
/* ============================= */

/**
 * Устанавливает значение в конкретную ячейку
 * @param {number} row - номер строки (0-8)
 * @param {number} col - номер столбца (0-8)
 * @param {string|number} value - значение для ячейки
 */
function setCellValue(row, col, value) {
    const cell = sudokuGrid.children[row * 9 + col];
    if(cell && !cell.classList.contains('fixed')) {
        cell.textContent = value;
        cell.classList.remove('error');
    }
}

/**
 * Очищает конкретную ячейку
 * @param {number} row - номер строки (0-8)
 * @param {number} col - номер столбца (0-8)
 */
function clearCellValue(row, col) {
    const cell = sudokuGrid.children[row * 9 + col];
    if(cell && !cell.classList.contains('fixed')) {
        cell.textContent = '';
        cell.classList.remove('error');
    }
}

/* ============================= */
/* МАССОВЫЕ ОПЕРАЦИИ */
/* ============================= */

/**
 * Заполнение всех фиксированных ячеек значениями из массива 9x9
 */
function fillFixedGrid(gridValues) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cell = sudokuGrid.children[r * 9 + c];
            if(cell.classList.contains('fixed')) {
                cell.textContent = gridValues[r][c] ?? '';
                cell.classList.remove('error');
            }
        }
    }
}

/**
 * Заполнение всех изменяемых ячеек значениями из массива 9x9
 */
function fillEditableGrid(gridValues) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const cell = sudokuGrid.children[r * 9 + c];
            if(!cell.classList.contains('fixed')) {
                cell.textContent = gridValues[r][c] ?? '';
                cell.classList.remove('error');
            }
        }
    }
}

/**
 * Очистка всех изменяемых ячеек
 */
function clearEditableGrid() {
    document.querySelectorAll('.cell:not(.fixed)').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('error');
    });
}

/* ============================= */
/* ТОЧЕЧНОЕ ВЫДЕЛЕНИЕ ОШИБКИ */
/* ============================= */
function markErrorCell(row, col) {
    const cell = sudokuGrid.children[row * 9 + col];
    if(cell && !cell.classList.contains('fixed')) {
        cell.classList.add('error');
    }
}

/* ============================= */
/* ИНИЦИАЛИЗАЦИЯ СЕТКИ */
/* ============================= */
createGrid((r, c, cell) => {
    // Пример делегата клика: вывод координат и значения
    console.log(`Выбрана ячейка: row=${r}, col=${c}, value=${cell.textContent}`);
});