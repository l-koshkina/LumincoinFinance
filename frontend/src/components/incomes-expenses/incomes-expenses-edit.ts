import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";

export class IncomesExpensesEdit {
    readonly openNewRoute: OpenNewRouteType;
    readonly id: string | null;
    readonly categoryTypeSelect: HTMLSelectElement | null;
    readonly categoryTitleSelect: HTMLSelectElement | null;
    readonly amountInputElement: HTMLInputElement | null;
    readonly dateInputElement: HTMLInputElement | null;
    readonly commentInputElement: HTMLInputElement | null;
    private type: string | null;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.id = UrlUtils.getUrlParam('id');
        if (!this.id) {
            this.openNewRoute('/');
        }

        this.categoryTypeSelect = document.getElementById('categoryTypeSelect') as HTMLSelectElement;
        this.categoryTitleSelect = document.getElementById('categoryTitleSelect') as HTMLSelectElement;
        this.amountInputElement = document.getElementById('amount') as HTMLInputElement;
        this.dateInputElement = document.getElementById('date') as HTMLInputElement;
        this.commentInputElement = document.getElementById('comment') as HTMLInputElement;
        this.type = null;

        const saveButton: HTMLElement | null = document.getElementById('saveButton');
        if (saveButton) {
            saveButton.addEventListener('click', this.editIncomeExpense.bind(this));
        }

        this.getOperationData();

        if (this.categoryTypeSelect) {
            this.categoryTypeSelect.addEventListener('change', () => {
                if (this.categoryTypeSelect && this.categoryTitleSelect) {
                    this.type = this.categoryTypeSelect.value;
                    this.categoryTitleSelect.innerHTML = '<option value="">Выберите категорию</option>';
                    this.getCategories();
                }
            });
        }
    }

    private async getOperationData(): Promise<void> {
        const result = await HttpUtils.request('/operations/' + this.id, 'GET', true)

        if (result && result.response && !result.error) {
            this.type = result.response.type;
            if (this.categoryTypeSelect && this.type) {
                this.categoryTypeSelect.value = this.type;
            }
            const response = await this.getCategories();

            for (let i = 0; i < response.response.length; i++) {
                if (response.response[i].title === result.response.category && this.categoryTitleSelect) {
                    this.categoryTitleSelect.value = response.response[i].id;
                }
            }

            if (this.amountInputElement && this.dateInputElement && this.commentInputElement) {
                this.amountInputElement.value = result.response.amount;
                this.dateInputElement.value = result.response.date;
                this.commentInputElement.value = result.response.comment;
            }

        }

    }

    private async getCategories(): Promise<DefaultResponseType> {
        const result: DefaultResponseType = await HttpUtils.request('/categories/' + this.type, 'GET', true)

        if (!result.error && result.response) {
            for (let i = 0; i < result.response.length; i++) {
                const option = document.createElement('option');
                option.value = result.response[i].id;
                option.innerText = result.response[i].title;
                if (this.categoryTitleSelect) {
                    this.categoryTitleSelect.appendChild(option);
                }
            }
        }

        return result;
    }

    private async editIncomeExpense(): Promise<void> {
        if (this.categoryTypeSelect && this.amountInputElement && this.dateInputElement && this.commentInputElement && this.categoryTitleSelect) {

            const data = {
                type: this.categoryTypeSelect.value,
                amount: Number(this.amountInputElement.value),
                date: this.dateInputElement.value,
                comment: this.commentInputElement.value,
                category_id: Number(this.categoryTitleSelect.value)
            }

            const result: DefaultResponseType = await HttpUtils.request('/operations/' + this.id, 'PUT', true, data)

            if (result.error) {
                alert('Заполните все поля');
            } else {
                await this.openNewRoute('/incomes-expenses')
            }
        }
    }
}