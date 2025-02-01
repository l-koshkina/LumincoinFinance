import Chart from "chart.js/auto";
import {HttpUtils} from "../utils/http-utils";
import {AuthUtils} from "../utils/auth-utils";
import {OpenNewRouteType} from "../types/openNewRoute.type";
import {DefaultResponseType} from "../types/default-response.type";
import {OperationsType} from "../types/operations.type";
import {OperationsDataType} from "../types/operaions-data.type";

Chart.defaults.color = '#000';

export class Main {
    readonly openNewRoute: OpenNewRouteType;
    readonly filterButtons: NodeListOf<Element> | null;
    readonly dateFromElement: HTMLInputElement | null;
    readonly dateToElement: HTMLInputElement | null;
    private filter: string | null;
    private query: string;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.dateFromElement = document.getElementById('start-interval') as HTMLInputElement;
        this.dateToElement = document.getElementById('end-interval') as HTMLInputElement;
        this.filter = 'today';
        this.query = '';

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            this.openNewRoute('/login');
        }

        this.getOperations(this.filter);
        this.setFilter();
        // this.viewDiagrams();
    }

    private setFilter(): void {
        if (this.filterButtons) {
            this.filterButtons.forEach(item => {
                item.addEventListener('click', () => {
                    if (this.filterButtons) {
                        this.filterButtons.forEach(button => {
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

    private setIntervalButton(): void {
        if (this.filterButtons) {
            this.filterButtons.forEach(item => {
                if (item.getAttribute('data-filter-name') === 'interval') {
                    if (this.filterButtons) {
                        this.filterButtons.forEach(button => {
                            button.classList.add('bg-transparent', 'text-secondary');
                        });
                        item.classList.remove('bg-transparent', 'text-secondary');
                    }
                }
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
                        this.setIntervalButton();
                        this.getOperations(filter);
                    }
                })
                this.dateToElement.addEventListener('change', () => {
                    if (this.dateToElement) {
                        dateTo = this.dateToElement.value;
                        this.setIntervalButton();
                        this.getOperations(filter);
                    }
                })
                this.query = `&dateFrom=${dateFrom}&dateTo=${dateTo}`;

            }

        }

        const result: DefaultResponseType = await HttpUtils.request('/operations?period=' + filter + this.query)

        if (!result.error && result.response) {
            const operations: OperationsType[] = result.response;
            this.getDataForDiagrams(operations);
        }
    }

    private getDataForDiagrams (operations: OperationsType[]): void {
        const incomesData: OperationsDataType = {
            labels: [

            ],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [
                    '#DC3545',
                    '#FD7E14',
                    '#FFC107',
                    '#20C997',
                    '#0D6EFD'
                ],
                hoverOffset: 4
            }]
        };
        const expensesData: OperationsDataType = {
            labels: [

            ],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [
                    '#DC3545',
                    '#FD7E14',
                    '#FFC107',
                    '#20C997',
                    '#0D6EFD'
                ],
                hoverOffset: 4
            }]
        };
        const incomeCategories: { [category: string]: number } = {};
        const expenseCategories: { [category: string]: number } = {};

        operations.forEach(operation => {
            if (operation.type === 'income') {
                if (incomeCategories[operation.category]) {
                    incomeCategories[operation.category] += operation.amount;
                } else {
                    incomeCategories[operation.category] = operation.amount;
                }
            } else if (operation.type === 'expense') {
                if (expenseCategories[operation.category]) {
                    expenseCategories[operation.category] += operation.amount;
                } else {
                    expenseCategories[operation.category] = operation.amount;
                }
            }
        });

        incomesData.labels = Object.keys(incomeCategories);
        incomesData.datasets[0].data = Object.values(incomeCategories);

        expensesData.labels = Object.keys(expenseCategories);
        expensesData.datasets[0].data = Object.values(expenseCategories);

        this.viewDiagrams(incomesData, expensesData)
    }

    private viewDiagrams(incomesData: OperationsDataType, expensesData: OperationsDataType): void {
        if (window.incomesChart) {
            window.incomesChart.destroy();
        }

        const incomesElement: HTMLCanvasElement | null = document.getElementById('incomes') as HTMLCanvasElement;
        if (incomesElement) {
            window.incomesChart = new Chart(
                incomesElement,
                {
                    type: 'pie',
                    data: incomesData,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Доходы',
                                font: {
                                    size: 28
                                }
                            }
                        }
                    },
                }
            );
        }


        if (window.expensesChart) {
            window.expensesChart.destroy();
        }

        const expensesElement: HTMLCanvasElement | null = document.getElementById('expenses') as HTMLCanvasElement;

        if (expensesElement) {
            window.expensesChart = new Chart(
                expensesElement,
                {
                    type: 'pie',
                    data: expensesData,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Расходы',
                                font: {
                                    size: 28,
                                }
                            }
                        }
                    },
                }
            );
        }
    }
}