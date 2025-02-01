import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";

export class IncomeEdit {
    readonly openNewRoute: OpenNewRouteType;
    readonly id: string | null;
    readonly saveButtonElement: HTMLElement | null;
    readonly incomeTitleInputElement: HTMLInputElement | null

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.id =  UrlUtils.getUrlParam('id');
        if (!this.id) {
            this.openNewRoute('/');
        }

        this.getCategoryTitle();
        this.saveButtonElement = document.getElementById('save-button');
        if (this.saveButtonElement) {
            this.saveButtonElement.addEventListener('click', this.saveChangeCategory.bind(this))
        }
        this.incomeTitleInputElement = document.getElementById('new-income-title') as HTMLInputElement;
    }

    private async getCategoryTitle(): Promise<void> {

        const result: DefaultResponseType = await HttpUtils.request('/categories/income/'+ this.id);
        if (this.incomeTitleInputElement) {
            if (!result.error && result.response) {
                this.incomeTitleInputElement.value = result.response.title;
            } else {
                this.incomeTitleInputElement.value = '';
            }
        }
    }

    private async saveChangeCategory(): Promise<void> {
        if (this.incomeTitleInputElement) {
            const result = await HttpUtils.request('/categories/income/' + this.id, 'PUT', true, {
                title: this.incomeTitleInputElement.value
            });

            if (result.error) {
                alert('Введите название');
                return;
            } else {
                await this.openNewRoute('/income-view')
            }
        }
    }
}