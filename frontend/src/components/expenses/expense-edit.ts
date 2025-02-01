import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";

export class ExpenseEdit {
    readonly openNewRoute: OpenNewRouteType;
    readonly id: string | null;
    readonly saveButtonElement: HTMLElement | null;
    readonly expenseTitleInputElement: HTMLInputElement | null;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.id = UrlUtils.getUrlParam('id');
        if (!this.id) {
            this.openNewRoute('/');
        }

        this.getCategoryTitle();
        this.saveButtonElement = document.getElementById('save-button');

        if (this.saveButtonElement) {
            this.saveButtonElement.addEventListener('click', this.saveChangeCategory.bind(this))
        }
        this.expenseTitleInputElement = document.getElementById('new-expense-title') as HTMLInputElement;
    }

    private async getCategoryTitle(): Promise<void> {
        const result: DefaultResponseType = await HttpUtils.request('/categories/expense/' + this.id);
        if (this.expenseTitleInputElement) {
            if (!result.error && result.response) {
                this.expenseTitleInputElement.value = result.response.title;
            } else {
                this.expenseTitleInputElement.value = '';
            }
        }
    }

    private async saveChangeCategory(): Promise<void> {
        if (this.expenseTitleInputElement) {
            const result: DefaultResponseType = await HttpUtils.request('/categories/expense/' + this.id, 'PUT', true, {
                title: this.expenseTitleInputElement.value
            });
            if (result.error) {
                alert('Введите название');
                return;
            } else {
                await this.openNewRoute('/expense-view')
            }
        }
    }
}