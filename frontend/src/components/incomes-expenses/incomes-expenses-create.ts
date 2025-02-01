import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {CategoriesType} from "../../types/categories.type";

export class IncomesExpensesCreate {
    readonly openNewRoute: OpenNewRouteType;
    readonly categoryTitleValue: string | null;
    readonly categoryTypeSelect: HTMLSelectElement | null;
    readonly categoryTitleSelect: HTMLSelectElement | null;
    readonly amountInputElement: HTMLInputElement | null;
    readonly dateInputElement: HTMLInputElement | null;
    readonly commentInputElement: HTMLInputElement | null;
    private type: string | null;



    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.categoryTitleValue = UrlUtils.getUrlParam('category');

        this.categoryTypeSelect = document.getElementById('categoryTypeSelect') as HTMLSelectElement;
        if (this.categoryTitleValue) {
            this.categoryTypeSelect.value = this.categoryTitleValue;
        }
        this.categoryTitleSelect = document.getElementById('categoryTitleSelect') as HTMLSelectElement;
        this.amountInputElement = document.getElementById('amount') as HTMLInputElement;
        this.dateInputElement = document.getElementById('date') as HTMLInputElement;
        this.commentInputElement = document.getElementById('comment') as HTMLInputElement;
        this.type = null;


        const saveButton: HTMLElement | null = document.getElementById('saveButton');
        if (saveButton) {
            saveButton.addEventListener('click', this.createIncomeExpense.bind(this));
        }

        this.getCategoryType();
    }

    private async createIncomeExpense(): Promise<void> {
        if (this.amountInputElement && this.dateInputElement && this.commentInputElement && this.categoryTitleSelect) {
            const data = {
                type: this.type,
                amount: Number(this.amountInputElement.value),
                date: this.dateInputElement.value,
                comment: this.commentInputElement.value,
                category_id: Number(this.categoryTitleSelect.value)
            }
            const result: DefaultResponseType = await HttpUtils.request('/operations', 'POST', true, data);

            if (result.error) {
                alert('Заполните все поля');
            } else {
                await this.openNewRoute('/incomes-expenses')
            }
        }
    }

    private getCategoryType(): void {
        if (this.categoryTypeSelect) {
            this.type = this.categoryTypeSelect.value;
            this.categoryTypeSelect.addEventListener('change', () => {
                if (this.categoryTypeSelect && this.categoryTitleSelect) {
                    this.type = this.categoryTypeSelect.value;
                    this.categoryTitleSelect.innerHTML = '<option value="">Выберите категорию</option>';
                    this.getCategories();
                }
            });
            this.getCategories();
        }
    }

    private async getCategories(): Promise<void> {
        let result: DefaultResponseType | CategoriesType[] = await HttpUtils.request('/categories/' + this.type, 'GET', true);

        if (!(result as DefaultResponseType).error && (result as DefaultResponseType).response) {
            result = (result as DefaultResponseType).response as CategoriesType[];
            for (let i = 0; i < result.length; i++) {
                const option: HTMLOptionElement = document.createElement('option');
                option.value = result[i].id.toString();
                option.innerText = result[i].title;
                if (this.categoryTitleSelect) {
                    this.categoryTitleSelect.appendChild(option);
                }
            }
        }
    };
}