import {HttpUtils} from "../../utils/http-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";

export class Signup {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.fullNameInputElement = document.getElementById('fullName');
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
        this.passwordRepeatInputElement = document.getElementById('repeat-password');
        this.formButton = document.getElementById('process-button');

        this.fullNameErrorMessageElement = document.getElementById('fullName-error-message');
        this.emailErrorMessageElement = document.getElementById('email-error-message');
        this.passwordErrorMessageElement = document.getElementById('password-error-message');
        this.passwordRepeatErrorMessageElement = document.getElementById('password-repeat-error-message');
        this.commonErrorElement = document.getElementById('common-error');

        this.formButton.addEventListener('click', this.signUp.bind(this));
    }

    validateForm() {
        let isValid = true;
        this.fullNameInputElement.classList.remove('is-invalid');
        if (!this.fullNameInputElement.value) {
            this.fullNameInputElement.classList.add('is-invalid');
            this.fullNameErrorMessageElement.innerText = 'Укажите Ваше имя';
            isValid = false;
        } else if (!this.fullNameInputElement.value.match(/^[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+$/)) {
            this.fullNameInputElement.classList.add('is-invalid');
            this.fullNameErrorMessageElement.innerText = 'Укажите полное имя';
            isValid = true;
        }


        this.emailInputElement.classList.remove('is-invalid');
        if (!this.emailInputElement.value) {
            this.emailInputElement.classList.add('is-invalid');
            this.emailErrorMessageElement.innerText = 'Укажите адрес электронной почты';
            isValid = false;
        } else if (!this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailInputElement.classList.add('is-invalid');
            this.emailErrorMessageElement.innerText = 'Укажите корректный email';
            isValid = true;
        }

        this.passwordInputElement.classList.remove('is-invalid');
        if (!this.passwordInputElement.value) {
            this.passwordInputElement.classList.add('is-invalid');
            this.passwordErrorMessageElement.innerText = 'Введите пароль';
            isValid = false;
        } else if (!this.passwordInputElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            this.passwordInputElement.classList.add('is-invalid');
            this.passwordErrorMessageElement.innerText = 'Пароль должен быть не менее 8 символов, содержать как минимум 1 букву в верхнем регистре и как минимум 1 цифру';
            isValid = true;
        }

        this.passwordRepeatInputElement.classList.remove('is-invalid');
        if (!this.passwordRepeatInputElement.value) {
            this.passwordRepeatInputElement.classList.add('is-invalid');
            this.passwordRepeatErrorMessageElement.innerText = 'Подтвердите пароль';
            isValid = false;
        } else if (this.passwordRepeatInputElement.value !== this.passwordInputElement.value) {
            this.passwordRepeatInputElement.classList.add('is-invalid');
            this.passwordRepeatErrorMessageElement.innerText = 'Пароли должны совпадать';

            isValid = false;
        }
        isValid = true;

        return isValid;
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';

        if (this.validateForm()) {
            const data = {
                name: this.fullNameInputElement.value.split(' ')[1],
                lastName: this.fullNameInputElement.value.split(' ')[0],
                email: this.emailInputElement.value,
                password: this.passwordInputElement.value,
                passwordRepeat: this.passwordRepeatInputElement.value
            }
            const response = await HttpUtils.request('/signup', 'POST', false, data);
            const result = response.response;

            if (result.error && result.validation) {
                this.commonErrorElement.style.display = 'block';
                this.commonErrorElement.innerText = 'Проверьте правильность заполненных данных';
            } else if (result.error && !result.validation) {
                this.commonErrorElement.style.display = 'block';
                this.commonErrorElement.innerText = 'Пользователь с таким e-mail уже существует';
            } else {
                const result = await AuthService.login({
                    email: this.emailInputElement.value,
                    password: this.passwordInputElement.value
                })

                if (result && result.tokens && result.user) {
                    AuthUtils.setAuthInfo(result.tokens.accessToken, result.tokens.refreshToken, result.user)
                    this.openNewRoute('/');
                } else {
                    this.commonErrorElement.style.display = 'block';
                }
            }
        }
    }
}