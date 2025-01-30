import {CommonUtils} from "../../utils/common-utils";
import {HttpUtils} from "../../utils/http-utils";

export class IncomesExpensesView {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.dateFromElement = document.getElementById('start-interval');
        this.dateToElement = document.getElementById('end-interval');
        this.filter = 'today';
        this.query = '';
        this.getOperations(this.filter);

        this.setFilter();

    }

    setFilter() {
        this.filterButtons.forEach(item => {
            item.addEventListener('click', () => {
                this.filterButtons.forEach(button => {
                    button.classList.add('bg-transparent', 'text-secondary');
                });
                item.classList.remove('bg-transparent', 'text-secondary');
                this.filter = item.getAttribute('data-filter-name');
                this.getOperations(this.filter);
            });
        });
    }

    async getOperations(filter) {

        if (filter === 'interval') {
            let dateFrom = this.dateFromElement.value;
            let dateTo = this.dateToElement.value;

            this.dateFromElement.addEventListener('change', () => {
                dateFrom = this.dateFromElement.value;
                this.setIntervalButton();
                this.getOperations(filter);
            })
            this.dateToElement.addEventListener('change', () => {
                dateTo = this.dateToElement.value;
                this.setIntervalButton();
                this.getOperations(filter);
            })
            this.query = `&dateFrom=${dateFrom}&dateTo=${dateTo}`;

        }

        const result = await HttpUtils.request('/operations?period=' + filter + this.query)

        if (!result.error && result.response) {
            const operations = result.response;
            this.showOperations(operations)
        }
    }

    showOperations(operations) {
        const recordsElement = document.getElementById('records');
        recordsElement.innerHTML = '';

        for (let i = 0; i < operations.length; i++) {
            const trElement = document.createElement('tr');
            trElement.insertCell().innerText = i + 1;
            trElement.insertCell().innerHTML = CommonUtils.getTypeHtml(operations[i].type);
            trElement.insertCell().innerText = operations[i].category ? operations[i].category : '';
            trElement.insertCell().innerText = operations[i].amount + " $";
            trElement.insertCell().innerText = new Intl.DateTimeFormat('ru-RU').format(new Date(operations[i].date));
            trElement.insertCell().innerText = operations[i].comment;
            trElement.insertCell().innerHTML = '<a href="javascript:void(0);" class="delete-operation" data-bs-toggle="modal" data-bs-target="#modal" data-id-operation=' + operations[i].id + '>' +
                '<i class="bi bi-trash"></i></a><a href="/incomes-expenses-edit?id=' + operations[i].id + '" class="ms-1"> <i class="bi bi-pencil"></i></a>'

            recordsElement.appendChild(trElement);
        }

        this.deleteOperation();
    }

    async deleteOperation() {
        this.deleteOperationButtons = document.getElementsByClassName('delete-operation');

        if (this.deleteOperationButtons.length > 0) {
            Array.from(this.deleteOperationButtons).forEach((button, index) => {
                button.addEventListener('click',  () => {
                    this.id = button.getAttribute('data-id-operation');
                    document.getElementById('confirm-delete-button').addEventListener('click', async () => {
                        const result = await HttpUtils.request('/operations/' + this.id, 'DELETE')

                        if (!result.error && result.response) {
                            this.openNewRoute('/incomes-expenses');
                        } else {
                            alert('Ошибка удаления категории');
                        }
                    })
                });
            });
        }
    }

    setIntervalButton() {
        this.filterButtons.forEach(item => {
            if (item.getAttribute('data-filter-name') === 'interval') {
                this.filterButtons.forEach(button => {
                    button.classList.add('bg-transparent', 'text-secondary');
                });
                item.classList.remove('bg-transparent', 'text-secondary');
            }
        });
    }
}