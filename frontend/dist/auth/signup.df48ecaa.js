const fullNameInputElement = document.getElementById("fullName");
const emailInputElement = document.getElementById("email");
const passwordInputElement = document.getElementById("password");
const passwordRepeatInputElement = document.getElementById("repeat-password");
const formButton = document.getElementById("process-button");
const fullNameErrorMessageElement = document.getElementById("fullName-error-message");
const emailErrorMessageElement = document.getElementById("email-error-message");
const passwordErrorMessageElement = document.getElementById("password-error-message");
const passwordRepeatErrorMessageElement = document.getElementById("password-repeat-error-message");
formButton.addEventListener("click", validationForm);
//ВАЛИДАЦИЯ ПОЛЕЙ ФОРМЫ РЕГИСТРАЦИИ
function validationForm() {
    let isValid = true;
    fullNameInputElement.classList.remove("is-invalid");
    if (!fullNameInputElement.value) {
        fullNameInputElement.classList.add("is-invalid");
        fullNameErrorMessageElement.innerText = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0412\u0430\u0448\u0435 \u0438\u043C\u044F";
        isValid = false;
    } else if (!fullNameInputElement.value.match(/^[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+$/)) {
        fullNameInputElement.classList.add("is-invalid");
        fullNameErrorMessageElement.innerText = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u043E\u043B\u043D\u043E\u0435 \u0438\u043C\u044F";
        isValid = true;
    }
    emailInputElement.classList.remove("is-invalid");
    if (!emailInputElement.value) {
        emailInputElement.classList.add("is-invalid");
        emailErrorMessageElement.innerText = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B";
        isValid = false;
    } else if (!emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        emailInputElement.classList.add("is-invalid");
        emailErrorMessageElement.innerText = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email";
        isValid = true;
    }
    passwordInputElement.classList.remove("is-invalid");
    if (!passwordInputElement.value) {
        passwordInputElement.classList.add("is-invalid");
        passwordErrorMessageElement.innerText = "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C";
        isValid = false;
    } else if (!passwordInputElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        passwordInputElement.classList.add("is-invalid");
        passwordErrorMessageElement.innerText = "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C 1 \u0431\u0443\u043A\u0432\u0443 \u0432 \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0435 \u0438 \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C 1 \u0446\u0438\u0444\u0440\u0443";
        isValid = true;
    }
    passwordRepeatInputElement.classList.remove("is-invalid");
    if (!passwordRepeatInputElement.value) {
        passwordRepeatInputElement.classList.add("is-invalid");
        passwordRepeatErrorMessageElement.innerText = "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C";
        isValid = false;
    } else if (passwordInputElement.value !== passwordRepeatInputElement.value) {
        passwordRepeatInputElement.classList.add("is-invalid");
        passwordRepeatErrorMessageElement.innerText = "\u041F\u0430\u0440\u043E\u043B\u0438 \u0434\u043E\u043B\u0436\u043D\u044B \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0442\u044C";
        isValid = false;
    }
    isValid = true;
    return isValid;
}

//# sourceMappingURL=signup.df48ecaa.js.map
