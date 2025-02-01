import {HttpUtils} from "../../utils/http-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {LoginResponseType} from "../../types/login-response.type";

export class Signup {
    readonly openNewRoute: OpenNewRouteType;
    readonly fullNameInputElement: HTMLInputElement | null;
    readonly fullNameErrorMessageElement: HTMLElement | null;
    readonly emailInputElement: HTMLInputElement | null;
    readonly emailErrorMessageElement: HTMLElement | null;
    readonly passwordInputElement: HTMLInputElement | null;
    readonly passwordErrorMessageElement: HTMLElement | null;
    readonly passwordRepeatInputElement: HTMLInputElement | null;
    readonly passwordRepeatErrorMessageElement: HTMLElement | null;
    readonly commonErrorElement: HTMLElement | null;

    readonly formButton: HTMLElement | null;


    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.fullNameInputElement = document.getElementById('fullName') as HTMLInputElement;
        this.emailInputElement = document.getElementById('email') as HTMLInputElement;
        this.passwordInputElement = document.getElementById('password') as HTMLInputElement;
        this.passwordRepeatInputElement = document.getElementById('repeat-password') as HTMLInputElement;
        this.formButton = document.getElementById('process-button');

        this.fullNameErrorMessageElement = document.getElementById('fullName-error-message');
        this.emailErrorMessageElement = document.getElementById('email-error-message');
        this.passwordErrorMessageElement = document.getElementById('password-error-message');
        this.passwordRepeatErrorMessageElement = document.getElementById('password-repeat-error-message');
        this.commonErrorElement = document.getElementById('common-error');

        if (this.formButton) {
            this.formButton.addEventListener('click', this.signUp.bind(this));
        }
    }

    private validateForm(): boolean {
        let isValid: boolean = true;
        if (this.fullNameInputElement && this.fullNameErrorMessageElement) {
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
        }

        if(this.emailInputElement && this.emailErrorMessageElement) {
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
        }

        if(this.passwordInputElement && this.passwordErrorMessageElement) {
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
        }

        if (this.passwordRepeatInputElement && this.passwordRepeatErrorMessageElement && this.passwordInputElement) {
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
        }

        return isValid;
    }

    private async signUp(): Promise<void> {
        if(this.commonErrorElement) {
            this.commonErrorElement.style.display = 'none';
        }

        if (this.validateForm() && this.fullNameInputElement && this.emailInputElement
            && this.passwordInputElement && this.passwordRepeatInputElement) {
            const data = {
                name: this.fullNameInputElement.value.split(' ')[1],
                lastName: this.fullNameInputElement.value.split(' ')[0],
                email: this.emailInputElement.value,
                password: this.passwordInputElement.value,
                passwordRepeat: this.passwordRepeatInputElement.value
            }
            let result: DefaultResponseType  = await HttpUtils.request('/signup', 'POST', false, data);
            result = result.response;
            if(this.commonErrorElement) {
                if (result.error && result.validation) {

                    this.commonErrorElement.style.display = 'block';
                    this.commonErrorElement.innerText = 'Проверьте правильность заполненных данных';
                } else if (result.error && !result.validation) {
                    this.commonErrorElement.style.display = 'block';
                    this.commonErrorElement.innerText = 'Пользователь с таким e-mail уже существует';
                } else {
                    const result: LoginResponseType = await AuthService.login({
                        email: this.emailInputElement.value,
                        password: this.passwordInputElement.value
                    })

                    if (result && result.tokens && result.user) {
                        AuthUtils.setAuthInfo(result.tokens.accessToken, result.tokens.refreshToken, result.user)
                        await this.openNewRoute('/');
                    } else {
                        this.commonErrorElement.style.display = 'block';
                    }
                }
            }
        }
    }
}