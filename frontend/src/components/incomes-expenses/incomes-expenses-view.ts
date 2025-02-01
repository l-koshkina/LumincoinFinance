import {CommonUtils} from "../../utils/common-utils";
import {HttpUtils} from "../../utils/http-utils";
import {OpenNewRouteType} from "../../types/openNewRoute.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {OperationsType} from "../../types/operations.type";

export class IncomesExpensesView {
    readonly openNewRoute: OpenNewRouteType;
    readonly filterButtons: NodeListOf<Element> | null;
    readonly dateFromElement: HTMLInputElement | null;
    readonly dateToElement: HTMLInputElement | null;
    private id: string | null;
    private filter: string | null;
    private query: string;
    private deleteOperationButtons:  HTMLCollectionOf<Element> | null;
    private confirmDeleteButtonElement: HTMLElement | null;


    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.dateFromElement = document.getElementById('start-interval') as HTMLInputElement;
        this.dateToElement = document.getElementById('end-interval') as HTMLInputElement;
        this.filter = 'today';
        this.query = '';
        this.getOperations(this.filter);
        this.deleteOperationButtons = null;
        this.id = null;
        this.confirmDeleteButtonElement = null;

        this.setFilter();

    }

    private setFilter(): void {
        if (this.filterButtons) {
            this.filterButtons.forEach((item: Element) => {
                item.addEventListener('click', () => {
                    if (this.filterButtons) {
                        this.filterButtons.forEach((button: Element) => {
                            button.classList.add('bg-transparent', 'text-secondary');
                        });
                        item.classList.remove('bg-transparent', 'text-secondary');
                        this.filter = item.getAttribute('data-filter-name');
                        this.getOperations(this.filter);
                    }
                });
            });
        }
    }

    private async getOperations(filter: string | null): Promise<void> {

        if (filter === 'interval') {
            if (this.dateFromElement && this.dateToElement) {
                let dateFrom: string = this.dateFromElement.value;
                let dateTo: string = this.dateToElement.value;

                this.dateFromElement.addEventListener('change', () => {
                    if (this.dateFromElement) {
                        dateFrom = this.dateFromElement.value;
                    }
                    this.setIntervalButton();
                    this.getOperations(filter);
                })
                this.dateToElement.addEventListener('change', () => {
                    if (this.dateToElement) {
                        dateTo = this.dateToElement.value;
                    }
                    this.setIntervalButton();
                    this.getOperations(filter);
                })
                this.query = `&dateFrom=${dateFrom}&dateTo=${dateTo}`;
            }

        }

        const result: DefaultResponseType = await HttpUtils.request('/operations?period=' + filter + this.query)

        if (!result.error && result.response) {
            const operations: OperationsType[] = result.response;
            this.showOperations(operations)
        }
    }

    showOperations(operations: OperationsType[]) {
        const recordsElement: HTMLElement | null = document.getElementById('records');
        if (recordsElement) {
            recordsElement.innerHTML = '';
        }

        for (let i = 0; i < operations.length; i++) {
            const trElement = document.createElement('tr');
            trElement.insertCell().innerText = (i + 1).toString();
            trElement.insertCell().innerHTML = CommonUtils.getTypeHtml(operations[i].type);
            trElement.insertCell().innerText = operations[i].category ? operations[i].category : '';
            trElement.insertCell().innerText = operations[i].amount + " $";
            trElement.insertCell().innerText = new Intl.DateTimeFormat('ru-RU').format(new Date(operations[i].date));
            trElement.insertCell().innerText = operations[i].comment;
            trElement.insertCell().innerHTML = '<a href="javascript:void(0);" class="delete-operation" data-bs-toggle="modal" data-bs-target="#modal" data-id-operation=' + operations[i].id + '>' +
                '<i class="bi bi-trash"></i></a><a href="/incomes-expenses-edit?id=' + operations[i].id + '" class="ms-1"> <i class="bi bi-pencil"></i></a>'

            if (recordsElement) {
                recordsElement.appendChild(trElement);
            }
        }

        this.deleteOperation();
    }

    private async deleteOperation(): Promise<void> {
        this.deleteOperationButtons = document.getElementsByClassName('delete-operation');

        if (this.deleteOperationButtons.length > 0) {
            Array.from(this.deleteOperationButtons).forEach((button: Element) => {
                button.addEventListener('click',  () => {
                    this.id = button.getAttribute('data-id-operation');
                    this.confirmDeleteButtonElement = document.getElementById('confirm-delete-button');
                    if (this.confirmDeleteButtonElement) {
                        this.confirmDeleteButtonElement.addEventListener('click', async () => {
                            const result: DefaultResponseType = await HttpUtils.request('/operations/' + this.id, 'DELETE')

                            if (!result.error && result.response) {
                                await this.openNewRoute('/incomes-expenses');
                            } else {
                                alert('Ошибка удаления категории');
                            }
                        })
                    }
                });
            });
        }
    }

    private setIntervalButton(): void {
        if (this.filterButtons) {
            this.filterButtons.forEach(item => {
                if (item.getAttribute('data-filter-name') === 'interval') {
                    if (this.filterButtons) {
                        this.filterButtons.forEach((button: Element) => {
                            button.classList.add('bg-transparent', 'text-secondary');
                        });
                        item.classList.remove('bg-transparent', 'text-secondary');
                    }
                }
            });
        }
    }
}