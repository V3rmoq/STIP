document.addEventListener('DOMContentLoaded', function() {
    // Код для форми реєстрації
    const form = document.getElementById('registrationForm');
    let creditCardAttempts = 0;
    const MAX_ATTEMPTS = 3;

    const patterns = {
        name: /^[А-ЯІЇЄҐ][а-яіїєґ']+$/u,
        organization: /^[А-ЯІЇЄҐа-яіїєґ'0-9\s-]+$/u,
        creditCard: /^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$/,
        phone: /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        address: /^[А-ЯІЇЄҐа-яіїєґ'0-9\s.,-]+$/u
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Валідація полів форми
        if (!patterns.name.test(form.firstName.value)) {
            showError('firstNameError', 'Введіть коректне ім\'я');
            isValid = false;
        } else {
            clearError('firstNameError');
        }

        // Інші перевірки...

        if (isValid) {
            alert('Форма успішно відправлена!');
            form.reset();
        }
    });

    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    function clearError(elementId) {
        document.getElementById(elementId).textContent = '';
    }
});