document.addEventListener("DOMContentLoaded", () => {

    const penBtn = document.getElementById('pen-btn');
    const penBadge = penBtn?.querySelector('.badge');

    let state = {
        penIsOn: false
    };

    const actions = {

        reset() {
            console.log('Сброс игрового поля');
            // TODO: добавить логику сброса
        },

        erase() {
            console.log('Стереть выбранную ячейку');
            // TODO: добавить логику стирания
        },

        pen() {
            state.penIsOn = !state.penIsOn; // Обновляем CSS-классы для визуального эффекта 
            if (state.penIsOn) { 
                penBadge.classList.add('badge-on'); 
                penBadge.classList.remove('badge-off');
                penBadge.textContent = 'ON'; 
            } 
            else { 
                penBadge.classList.add('badge-off'); 
                penBadge.classList.remove('badge-on'); 
                penBadge.textContent = 'OFF'; 
            }
            console.log('Запись');
        },

        hint(button) {
            // Находим бейдж на кнопке подсказки 
            const badge = button.querySelector('.badge'); // Читаем текущее значение из бейджа 
            let count = parseInt(badge.textContent); // Если значение не число, ставим 0 
           
            if (isNaN(count)) { 
                count = 0; 
            } // Уменьшаем значение на 1, но не меньше 0 
            
            count = count - 1; 

            if (count < 0) { 
                count = 0; 
            } // Обновляем текст на бейдже 

            badge.textContent = count; // Выводим сообщение в консоль 
            console.log('Подсказка использована, осталось:', count);
        },

        number(button) {
            const value = button.dataset.value; 
            console.log('Нажата цифра:', value); 
        }
    };

    // Универсальный обработчик через делегирование
    document.addEventListener('click', (event) => {

        const button = event.target.closest('[data-action]');
        if (!button) return;

        const actionName = button.dataset.action;
        const action = actions[actionName];

        if (typeof action === 'function') {
            action(button);
        }

    });

});