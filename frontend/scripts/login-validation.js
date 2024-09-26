//ВАЛИДАЦИЯ ПОЛЕЙ ФОРМЫ АВТОРИЗАЦИИ

const emailInputElement = document.getElementById('email');
const passwordInputElement = document.getElementById('password');
const formButton = document.getElementById('process-button');
const emailErrorMessageElement = document.getElementById('email-error-message');
const passwordErrorMessageElement = document.getElementById('password-error-message');
formButton.addEventListener('click', validationForm);



function validationForm() {
    let isValid = true;
    emailInputElement.classList.remove('is-invalid');
    if (!emailInputElement.value) {
        emailInputElement.classList.add('is-invalid');
        emailErrorMessageElement.innerText = 'Укажите адрес электронной почты';
        isValid = false;
    } else if (!emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        emailInputElement.classList.add('is-invalid');
        emailErrorMessageElement.innerText = 'Укажите корректный email';
        isValid = true;
    }

    passwordInputElement.classList.remove('is-invalid');
    if (!passwordInputElement.value) {
        passwordInputElement.classList.add('is-invalid');
        passwordErrorMessageElement.innerText = 'Введите пароль';
        isValid = false;
    } else if (!passwordInputElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        passwordInputElement.classList.add('is-invalid');
        passwordErrorMessageElement.innerText = 'Пароль должен быть не менее 8 символов, содержать как минимум 1 букву в верхнем регистре и как минимум 1 цифру';
        isValid = true;
    }

    return isValid;
}





