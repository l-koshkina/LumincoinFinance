import config from "../../../config/config";
import {UrlUtils} from "../../../utils/url-utils";

export class ExpenseEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id =  UrlUtils.getUrlParam('id');
        if (!this.id) {
            return this.openNewRoute('/');
        }

        this.getCategoryTitle.bind(this)
        this.saveButtonElement = document.getElementById('save-button');
        this.saveButtonElement.addEventListener('click', this.saveChangeCategory.bind(this))
        this.incomeTitleInputElement = document.getElementById('new-expense-title')


    }


    async getCategoryTitle () {
        const response = await fetch(config.host + '/categories/expense/'+ this.id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('accessToken')
            }
        })

        console.log(response.title)

        this.incomeTitleInputElement.value = response.title;
    }


    async saveChangeCategory () {
        const response = await fetch(config.host + '/categories/expense/' + this.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({title:this.incomeTitleInputElement.value})
        })

        if (response && response.status === 400) {
            alert('Введите название');
            return;
        } else {
            this.openNewRoute('/expense-view')
        }
    }
}