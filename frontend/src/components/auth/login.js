import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {AuthService} from "../../services/auth-service";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
        this.formButton = document.getElementById('process-button');
        this.emailErrorMessageElement = document.getElementById('email-error-message');
        this.passwordErrorMessageElement = document.getElementById('password-error-message');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');

        this.formButton.addEventListener('click', this.login.bind(this));
    }

    validateForm() {
        let isValid = true;
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

        return isValid;
    }

    async login() {
        this.commonErrorElement.style.display = 'none';

        if (this.validateForm()) {
            const result = await AuthService.login({
                email: this.emailInputElement.value,
                password: this.passwordInputElement.value,
                rememberMe: this.rememberMeElement.checked
            });

            if (result && result.tokens && result.user) {
                AuthUtils.setAuthInfo(result.tokens.accessToken, result.tokens.refreshToken, result.user);
                this.openNewRoute('/');
            } else {
                this.commonErrorElement.style.display = 'block';
            }
        }
    }
}