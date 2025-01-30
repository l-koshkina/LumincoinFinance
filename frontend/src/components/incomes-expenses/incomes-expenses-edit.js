import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class IncomesExpensesEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id =  UrlUtils.getUrlParam('id');
        if (!this.id) {
            return this.openNewRoute('/');
        }

        this.categoryTypeSelect = document.getElementById('categoryTypeSelect');
        this.categoryTitleSelect = document.getElementById('categoryTitleSelect');
        this.amountInputElement = document.getElementById('amount');
        this.dateInputElement = document.getElementById('date');
        this.commentInputElement = document.getElementById('comment');
        this.type = null;

        const saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', this.editIncomeExpense.bind(this));

        this.getOperationData();

        this.categoryTypeSelect.addEventListener('change', () => {
            this.type = this.categoryTypeSelect.value;
            this.categoryTitleSelect.innerHTML = '<option value="">Выберите категорию</option>';
            this.getCategories();
        });
    }

    async getOperationData () {
        const result = await HttpUtils.request('/operations/'+ this.id, 'GET', true)

        if (result && result.response && !result.error) {
            this.type = result.response.type;
            this.categoryTypeSelect.value = this.type;
            const response = await this.getCategories();

            for (let i = 0; i < response.response.length; i++) {
                if (response.response[i].title === result.response.category) {
                    this.categoryTitleSelect.value = response.response[i].id;
                    console.log(this.categoryTitleSelect.value)
                }
            }

            this.amountInputElement.value = result.response.amount;
            this.dateInputElement.value = result.response.date;
            this.commentInputElement.value = result.response.comment;

        }

    }

    async getCategories() {
        const result = await HttpUtils.request('/categories/' + this.type, 'GET', true)

        if (!result.error && result.response) {
            for (let i = 0; i < result.response.length; i++) {
                const option = document.createElement('option');
                option.value = result.response[i].id;
                option.innerText = result.response[i].title;
                this.categoryTitleSelect.appendChild(option);
            }
        }

        return result;
    }

    async editIncomeExpense() {
        const data = {
            type: this.categoryTypeSelect.value,
            amount: Number(this.amountInputElement.value),
            date: this.dateInputElement.value,
            comment: this.commentInputElement.value,
            category_id: Number(this.categoryTitleSelect.value)
        }

        const result = await HttpUtils.request('/operations/'+ this.id, 'PUT', true, data)

        if (result.error) {
            alert('Заполните все поля');
        } else {
            this.openNewRoute('/incomes-expenses')
        }

    }
}