import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class IncomesExpensesCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.categoryTitleValue = UrlUtils.getUrlParam('category');

        this.categoryTypeSelect = document.getElementById('categoryTypeSelect');
        this.categoryTypeSelect.value = this.categoryTitleValue;
        this.categoryTitleSelect = document.getElementById('categoryTitleSelect');
        this.amountInputElement = document.getElementById('amount');
        this.dateInputElement = document.getElementById('date');
        this.commentInputElement = document.getElementById('comment');
        this.type = null;


        const saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', this.createIncomeExpense.bind(this));

        this.getCategoryType();
    }

    async createIncomeExpense() {
        const data = {
            type: this.type,
            amount: Number(this.amountInputElement.value),
            date: this.dateInputElement.value,
            comment: this.commentInputElement.value,
            category_id: Number(this.categoryTitleSelect.value)
        }

        const result = await HttpUtils.request('/operations', 'POST', true, data);

        if (result.error) {
            alert('Заполните все поля');
        } else {
            this.openNewRoute('/incomes-expenses')
        }

    }

    getCategoryType() {
        this.type = this.categoryTypeSelect.value;
        this.categoryTypeSelect.addEventListener('change', () => {
            this.type = this.categoryTypeSelect.value;
            this.categoryTitleSelect.innerHTML = '<option value="">Выберите категорию</option>';
            this.getCategories();
        });
        this.getCategories();
    }

    async getCategories() {
        let result = await HttpUtils.request('/categories/' + this.type, 'GET', true)

        if (!result.error && result.response) {
            result = result.response;
            for (let i = 0; i < result.length; i++) {
                const option = document.createElement('option');
                option.value = result[i].id;
                option.innerText = result[i].title;
                this.categoryTitleSelect.appendChild(option);
            }
        }

    };
}