import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";

export class ExpenseCreate {
    readonly openNewRoute: OpenNewRouteType;
    readonly newExpenseTitleInput: HTMLInputElement | null;
    readonly expenseCreateButton: HTMLElement | null;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.newExpenseTitleInput = document.getElementById('new-expense-title') as HTMLInputElement;
        this.expenseCreateButton = document.getElementById('expense-create-button');
        if (this.expenseCreateButton) {
            this.expenseCreateButton.addEventListener('click', this.newExpenseCreate.bind(this));
        }
    }

    private async newExpenseCreate (): Promise<void> {
        if (this.newExpenseTitleInput) {
            const result: DefaultResponseType = await HttpUtils.request('/categories/expense', 'POST', true, {
                title: this.newExpenseTitleInput.value
            });
            if (result.error && this.newExpenseTitleInput.value === "") {
                alert('Укажите название категории')
            } else if (result.error && this.newExpenseTitleInput.value !== "") {
                alert('Категория с таким названием уже существует');
            } else {
                await this.openNewRoute('/expense-view');
            }
        }


    }
}