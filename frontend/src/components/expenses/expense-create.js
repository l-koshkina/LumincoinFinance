import {HttpUtils} from "../../utils/http-utils";

export class ExpenseCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.newExpenseTitleInput = document.getElementById('new-expense-title');
        this.expenseCreateButton = document.getElementById('expense-create-button');
        this.expenseCreateButton.addEventListener('click', this.newExpenseCreate.bind(this));
    }

    async newExpenseCreate () {
        const result = await HttpUtils.request('/categories/expense', 'POST', true, {
            title: this.newExpenseTitleInput.value
        });

        if (result.error && this.newExpenseTitleInput.value === "") {
            alert('Укажите название категории')
        } else if (result.error && this.newExpenseTitleInput.value !== "") {
            alert('Категория с таким названием уже существует');
        } else {
            this.openNewRoute('/expense-view');
        }
    }
}