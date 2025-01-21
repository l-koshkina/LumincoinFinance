import config from "../../../config/config";
import {Auth} from "../services/auth";

export class ExpenseView {
    constructor() {
        this.expenseCategoriesElement = document.getElementById('expense-categories');
        this.createNewCategoryElement = document.getElementById('create-new-category');
        this.showCategoriesExpenses().then();
        this.createNewCategoryElement.addEventListener('click', this.createNewCategory.bind(this));
    }

    async showCategoriesExpenses () {
        const response = await fetch(config.host + '/categories/expense', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': Auth.getAuthInfo(Auth.accessTokenKey)
            },
        })

        if (response.status === 401) {
            const updateTokenResult = await Auth.updateRefreshToken();
            if (updateTokenResult) {
                await this.showCategoriesExpenses();
            }
        }

        const result = await response.json();

        result.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card', 'income-category', 'pe-md-5', 'pe-0');

            const cardBodyElement = document.createElement('div');
            cardBodyElement.classList.add('card-body', 'pe-2', 'pe-md-5');

            const cardTitleElement = document.createElement('h3');
            cardTitleElement.classList.add('card-title', 'mb-2');
            cardTitleElement.innerText = item.title;
            cardBodyElement.appendChild(cardTitleElement);

            const cardBodyActionsElement = document.createElement('div');
            cardBodyActionsElement.classList.add('card-body-actions', 'd-flex', 'flex-wrap', 'gap-1');
            cardBodyActionsElement.innerHTML = "<a href=\"/expense-edit?id=" + item.id + "\" class=\"btn btn-primary\">Редактировать</a>\n" +
                "                    <button class=\"btn btn-danger\" data-bs-toggle=\"modal\" data-bs-target=\"#modal\">Удалить</button>";
            cardBodyElement.appendChild(cardBodyActionsElement);

            cardElement.appendChild(cardBodyElement);
            this.expenseCategoriesElement.insertBefore(cardElement, this.createNewCategoryElement);

        })
    }

    async createNewCategory() {
        const newCategoryTitleElement = document.getElementById('new-expense-title');
        const response = await fetch(config.host + '/categories/expense', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({title: newCategoryTitleElement.value})

        })
    }
}