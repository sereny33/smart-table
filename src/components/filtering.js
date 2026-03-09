export function initFiltering(elements, indexes) {
    const updateIndexes = (elements, indexes) => {
        // заполнить выпадающие списки опциями
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

    }

    const applyFiltering = (query, state, action) => {
        // обработать очистку поля
        if (action && action.name === 'clear') {         // Проверяем если действием является кнопка с именем clear
            const actionParent = action.parentElement;  // Находим родителя кнопки clear
            const closestInput = actionParent.querySelector('input'); // Ищем input элемент у родителя (поисковая строка)
            if (closestInput) {                          // Если находим input
                closestInput.value = '';                // Очищаем поле ввода
            }
            state[action.dataset.field] = '';           // Очищаем соответствующее поле состояния
        }

        // отфильтровать данные, используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }

}