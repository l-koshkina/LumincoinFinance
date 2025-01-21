import config from "../../../config/config";

export class ExpenseCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.newExpenseTitleInput = document.getElementById('new-expense-title');
        this.expenseCreateButton = document.getElementById('expense-create-button');
        this.expenseCreateButton.addEventListener('click', this.newExpenseCreate.bind(this));
    }

    async newExpenseCreate () {
        const response = await fetch(config.host + '/categories/expense', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({title: this.newExpenseTitleInput.value})
        })

        const result = await response.json();


        if (result.error && this.newExpenseTitleInput.value === "") {
            alert('Укажите название категории')
        } else if (result.error && this.newExpenseTitleInput.value !== "") {
            alert('Категория с таким названием уже существует');
        } else {
            this.openNewRoute('/expense-view');
        }
    }
}