$(document).ready(function() {
    // Завдання 5.1 - Приховування зображення при кліку
    $('#hideableImage').click(function() {
        $(this).fadeOut(500);
    });

    // Завдання 5.2 - Анімація блоку
    $('#animateButton').click(function() {
        const $block = $('#animatedBlock');

        // Скидаємо всі попередні анімації та повертаємо до початкового стану
        $block.stop(true, true).css({
            'marginTop': '0',
            'width': '200px',
            'height': '100px',
            'fontSize': '16px',
            'white-space': 'normal'
        });

        const originalWidth = $block.width();
        const originalHeight = $block.height();
        const originalFontSize = parseInt($block.css('font-size'));

        // Початок анімації
        $block.css('white-space', 'nowrap');

        $block
            .animate({
                marginTop: '200px',
                width: originalWidth * 0.7,
                height: originalHeight * 0.7,
                fontSize: originalFontSize * 0.8
            }, {
                duration: 1000,
                progress: function() {
                    // Динамічно регулюємо розмір шрифту, щоб текст поміщався
                    const currentWidth = $(this).width();
                    const textWidth = $(this).find('span').width() || $(this).width();
                    if (textWidth > currentWidth) {
                        const newFontSize = parseInt($(this).css('font-size')) * 0.95;
                        $(this).css('font-size', newFontSize + 'px');
                    }
                }
            })
            .animate({
                marginTop: '0',
                width: originalWidth * 1.3,
                height: originalHeight * 1.3,
                fontSize: originalFontSize * 1.3
            }, {
                duration: 1000,
                complete: function() {
                    $block.css('white-space', 'normal');
                }
            });
    });

    // Завдання 5.3 - Приклад 1: Контрольне слово
    $('#showWordCheckbox').change(function() {
        $('#secretWordGroup').toggle($(this).is(':checked'));
    });

    // Завдання 5.3 - Приклад 2: Вибір піци
    $('input[name="pizza"]').change(function() {
        if ($(this).val() === 'custom') {
            $('#customPizzaGroup').slideDown();
        } else {
            $('#customPizzaGroup').slideUp();
        }
    });
});
