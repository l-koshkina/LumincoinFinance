import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class ExpenseEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id = UrlUtils.getUrlParam('id');
        if (!this.id) {
            return this.openNewRoute('/');
        }

        this.getCategoryTitle();
        this.saveButtonElement = document.getElementById('save-button');
        this.saveButtonElement.addEventListener('click', this.saveChangeCategory.bind(this))
        this.expenseTitleInputElement = document.getElementById('new-expense-title')
    }

    async getCategoryTitle() {
        const result = await HttpUtils.request('/categories/expense/' + this.id);
        if (!result.error && result.response) {
            this.expenseTitleInputElement.value = result.response.title;
        } else {
            this.expenseTitleInputElement.value = '';
        }
    }

    async saveChangeCategory() {
        const data = {title: this.expenseTitleInputElement.value}
        const result = await HttpUtils.request('/categories/expense/' + this.id, 'PUT', true, {
            title: this.expenseTitleInputElement.value
        });
        if (result.error) {
            alert('Введите название');
            return;
        } else {
            this.openNewRoute('/expense-view')
        }
    }
}