import config from "../../../config/config";
import {Auth} from "../services/auth";

export class IncomeView {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.incomeCategoriesElement = document.getElementById('income-categories');
        this.createNewCategoryElement = document.getElementById('create-new-category');
        this.showCategoriesIncomes().then();
        this.createNewCategoryElement.addEventListener('click', this.createNewCategory.bind(this));
    }

    async showCategoriesIncomes() {
        const response = await fetch(config.host + '/categories/income', {
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
                await this.showCategoriesIncomes();
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
            cardBodyActionsElement.innerHTML = "<a href=\"/income-edit?id=" + item.id + "\" class=\"btn btn-primary\">Редактировать</a>\n" +
                "<button class=\"btn btn-danger btn-delete-category\" data-id-category=" + item.id + " data-bs-toggle=\"modal\" data-bs-target=\"#modal\">Удалить</button>";
            cardBodyElement.appendChild(cardBodyActionsElement);

            cardElement.appendChild(cardBodyElement);
            this.incomeCategoriesElement.insertBefore(cardElement, this.createNewCategoryElement);

        })

        this.deleteIncomeCategory();
    }

    async deleteIncomeCategory() {
        this.deleteCategoryButtons = document.getElementsByClassName('btn-delete-category');

        if (this.deleteCategoryButtons.length > 0) {
            Array.from(this.deleteCategoryButtons).forEach((button, index) => {
                button.addEventListener('click',  () => {
                    this.id = button.getAttribute('data-id-category');
                    document.getElementById('confirm-delete-button').addEventListener('click', async () => {
                        const response = await fetch(config.host + '/categories/income/' + this.id, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json',
                                'x-auth-token': localStorage.getItem('accessToken')
                            },
                        });

                        const result = await response.json();

                        if (result.error === false) {
                            this.openNewRoute('/income-view');
                        } else {
                            console.error('Ошибка удаления категории:', result.error);
                        }
                    })
                });
            });
        }
    }


    async createNewCategory() {
        const newCategoryTitleElement = document.getElementById('new-income-title');
        await fetch(config.host + '/categories/income/', {
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