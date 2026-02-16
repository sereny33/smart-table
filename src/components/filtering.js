import {createComparison, defaultRules} from "../lib/compare.js";

// @DONE: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @DONE: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                  // Получаем ключи из объекта
          .forEach((elementName) => {                     // Перебираем по именам
                elements[elementName].append(             // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])    // формируем массив имён, значений опций
                    .map(name => {                        // используйте name как значение и текстовое содержимое
                        // @todo: создать и вернуть тег опции
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option
                    })
            )
         })


    return (data, state, action) => {
        // @DONE: #4.2 — обработать очистку поля
        if (action && action.name === 'clear'){         // Проверяем если действием является кнопка с именем clear
            const actionParent = action.parentElement;  // Находим родителя кнопки clear
            const closestInput = actionParent.querySelector('input'); // Ищем input элемент у родителя (поисковая строка)
            if (closestInput){                          // Если находим input
                closestInput.value = '';                // Очищаем поле ввода
            }
            state[action.dataset.field] = '';           // Очищаем соответствующее поле состояния
        }

        // @DONE: #4.5 — отфильтровать данные используя компаратор
        console.log(state)
        return data.filter(row => compare(row, state)); 
    }
}