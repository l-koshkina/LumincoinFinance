import config from "../../../config/config";

export class IncomeCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.newIncomeTitleInput = document.getElementById('new-income-title');
        this.incomeCreateButton = document.getElementById('income-create-button');
        this.incomeCreateButton.addEventListener('click', this.newIncomeCreate.bind(this));
    }

    async newIncomeCreate() {
        const response = await fetch(config.host + '/categories/income', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({title: this.newIncomeTitleInput.value})
        })

        const result = await response.json();

        if (result.error && this.newIncomeTitleInput.value === "") {
            alert('Укажите название категории')
        } else if (result.error && this.newIncomeTitleInput.value !== "") {
            alert('Категория с таким названием уже существует');
        } else {
            this.openNewRoute('/income-view');
        }
    }
}