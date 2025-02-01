import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {CategoriesType} from "../../types/categories.type";

export class IncomeView {
    readonly openNewRoute: OpenNewRouteType;
    readonly incomeCategoriesElement: HTMLElement | null;
    readonly createNewCategoryElement: HTMLElement | null;
    private deleteCategoryButtons: HTMLCollectionOf<Element> | null;
    private id: string | null;
    private confirmDeleteButtonElement: HTMLElement | null;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.incomeCategoriesElement = document.getElementById('income-categories');
        this.createNewCategoryElement = document.getElementById('create-new-category');
        this.deleteCategoryButtons = null;
        this.id = '';
        this.confirmDeleteButtonElement = null;
        this.showCategoriesIncomes().then();
    }

    private async showCategoriesIncomes(): Promise<void> {
        let result: DefaultResponseType | CategoriesType[] = await HttpUtils.request('/categories/income')

        if (!(result as DefaultResponseType).error && (result as DefaultResponseType).response) {
            result = (result as DefaultResponseType).response as CategoriesType[];
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
            if (this.incomeCategoriesElement) {
                this.incomeCategoriesElement.insertBefore(cardElement, this.createNewCategoryElement);
            }

        })

        await this.deleteIncomeCategory();
    }

    private async deleteIncomeCategory(): Promise<void> {
        this.deleteCategoryButtons = document.getElementsByClassName('btn-delete-category');

        if (this.deleteCategoryButtons.length > 0) {
            Array.from(this.deleteCategoryButtons).forEach((button, index) => {
                button.addEventListener('click', () => {
                    this.id = button.getAttribute('data-id-category');
                    this.confirmDeleteButtonElement = document.getElementById('confirm-delete-button');
                    if (this.confirmDeleteButtonElement) {
                        this.confirmDeleteButtonElement.addEventListener('click', async () => {
                            let result = await HttpUtils.request('/categories/income/' + this.id, 'DELETE')

                            if (!result.error && result.response) {
                                await this.openNewRoute('/income-view');
                            } else {
                                alert('Ошибка удаления категории');
                            }
                        })
                    }
                });
            });
        }
    }
}