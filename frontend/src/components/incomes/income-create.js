import {HttpUtils} from "../../utils/http-utils";

export class IncomeCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.newIncomeTitleInput = document.getElementById('new-income-title');
        this.incomeCreateButton = document.getElementById('income-create-button');
        this.incomeCreateButton.addEventListener('click', this.newIncomeCreate.bind(this));
    }

    async newIncomeCreate() {
        const result = await HttpUtils.request('/categories/income', 'POST', true, {
            title: this.newIncomeTitleInput.value
        });

        if (result.error && this.newIncomeTitleInput.value === "") {
            alert('Укажите название категории')
        } else if (result.error && this.newIncomeTitleInput.value !== "") {
            alert('Категория с таким названием уже существует');
        } else {
            this.openNewRoute('/income-view');
        }
    }
}