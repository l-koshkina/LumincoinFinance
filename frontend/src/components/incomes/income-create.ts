import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";

export class IncomeCreate {
    readonly openNewRoute: OpenNewRouteType;
    readonly newIncomeTitleInput: HTMLInputElement | null;
    readonly incomeCreateButton: HTMLElement | null;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.newIncomeTitleInput = document.getElementById('new-income-title') as HTMLInputElement;
        this.incomeCreateButton = document.getElementById('income-create-button');
        if (this.incomeCreateButton) {
            this.incomeCreateButton.addEventListener('click', this.newIncomeCreate.bind(this));
        }
    }

    private async newIncomeCreate(): Promise<void> {
        if (this.newIncomeTitleInput) {
            const result = await HttpUtils.request('/categories/income', 'POST', true, {
                title: this.newIncomeTitleInput.value
            });

            if (result.error && this.newIncomeTitleInput.value === "") {
                alert('Укажите название категории')
            } else if (result.error && this.newIncomeTitleInput.value !== "") {
                alert('Категория с таким названием уже существует');
            } else {
                await this.openNewRoute('/income-view');
            }
        }
    }
}