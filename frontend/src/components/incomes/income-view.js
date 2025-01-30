import {HttpUtils} from "../../utils/http-utils";

export class IncomeView {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.incomeCategoriesElement = document.getElementById('income-categories');
        this.createNewCategoryElement = document.getElementById('create-new-category');
        this.showCategoriesIncomes().then();
    }

    async showCategoriesIncomes() {
        let result = await HttpUtils.request('/categories/income')

        if (!result.error && result.response) {
            result = result.response;
        } else {
            alert('Не удалось загрузить категории');
            return;
        }

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

        await this.deleteIncomeCategory();
    }

    async deleteIncomeCategory() {
        this.deleteCategoryButtons = document.getElementsByClassName('btn-delete-category');

        if (this.deleteCategoryButtons.length > 0) {
            Array.from(this.deleteCategoryButtons).forEach((button, index) => {
                button.addEventListener('click',  () => {
                    this.id = button.getAttribute('data-id-category');
                    document.getElementById('confirm-delete-button').addEventListener('click', async () => {
                        const result = await HttpUtils.request('/categories/income/' + this.id, 'DELETE');

                        if (!result.error && result.response) {
                            this.openNewRoute('/income-view');
                        } else {
                            alert('Ошибка удаления категории');
                        }
                    })
                });
            });
        }
    }
}