import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class IncomeEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id =  UrlUtils.getUrlParam('id');
        if (!this.id) {
            return this.openNewRoute('/');
        }

        this.getCategoryTitle();
        this.saveButtonElement = document.getElementById('save-button');
        this.saveButtonElement.addEventListener('click', this.saveChangeCategory.bind(this))
        this.incomeTitleInputElement = document.getElementById('new-income-title')
    }

    async getCategoryTitle () {
        const result = await HttpUtils.request('/categories/income/'+ this.id);

        if (!result.error && result.response) {
            this.incomeTitleInputElement.value = result.response.title;
        } else {
            this.incomeTitleInputElement.value = '';
        }
    }

    async saveChangeCategory () {
        const result = await HttpUtils.request('/categories/income/' + this.id, 'PUT', true, {
            title:this.incomeTitleInputElement.value
        });

        if (result.error) {
            alert('Введите название');
            return;
        } else {
            this.openNewRoute('/income-view')
        }
    }
}