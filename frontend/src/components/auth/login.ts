import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {LoginResponseType} from "../../types/login-response.type";

export class Login {
    readonly openNewRoute: OpenNewRouteType;
    readonly emailInputElement: HTMLInputElement | null;
    readonly passwordInputElement: HTMLInputElement | null;
    readonly formButton: HTMLElement | null;
    readonly emailErrorMessageElement: HTMLElement | null;
    readonly passwordErrorMessageElement: HTMLElement | null;
    private rememberMeElement: HTMLInputElement | null;
    private commonErrorElement: HTMLElement | null;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.emailInputElement = document.getElementById('email') as HTMLInputElement;
        this.passwordInputElement = document.getElementById('password') as HTMLInputElement;
        this.formButton = document.getElementById('process-button');
        this.emailErrorMessageElement = document.getElementById('email-error-message');
        this.passwordErrorMessageElement = document.getElementById('password-error-message');
        this.rememberMeElement = document.getElementById('remember-me') as HTMLInputElement;
        this.commonErrorElement = document.getElementById('common-error');

        if (this.formButton) {
            this.formButton.addEventListener('click', this.login.bind(this));
        }
    }

    private validateForm(): boolean {
        let isValid: boolean = true;
        if (this.emailInputElement && this.emailErrorMessageElement) {
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

        if (this.passwordInputElement && this.passwordErrorMessageElement) {
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

        return isValid;
    }

    private async login(): Promise<void> {
        if (this.commonErrorElement) {
            this.commonErrorElement.style.display = 'none';
        }

        if (this.validateForm() && this.emailInputElement && this.passwordInputElement && this.rememberMeElement) {
            const result: LoginResponseType = await AuthService.login({
                email: this.emailInputElement.value,
                password: this.passwordInputElement.value,
                rememberMe: this.rememberMeElement.checked
            });

            if (result && result.tokens && result.user) {
                AuthUtils.setAuthInfo(result.tokens.accessToken, result.tokens.refreshToken, result.user);
                await this.openNewRoute('/');
            } else if (this.commonErrorElement) {
                this.commonErrorElement.style.display = 'block';
            }
        }
    }
}