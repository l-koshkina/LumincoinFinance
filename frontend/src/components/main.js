import Chart from "chart.js/auto";
import {HttpUtils} from "../utils/http-utils";
import {AuthUtils} from "../utils/auth-utils";

Chart.defaults.color = '#000';

export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.dateFromElement = document.getElementById('start-interval');
        this.dateToElement = document.getElementById('end-interval');
        this.filter = 'today';
        this.query = '';

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.getOperations(this.filter);
        this.setFilter();
        this.viewDiagrams();
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
            this.getDataForDiagrams(operations);
        }
    }

    getDataForDiagrams (operations) {
        const incomesData = {
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
        const expensesData = {
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
        const incomeCategories = {};
        const expenseCategories = {};

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

    viewDiagrams(incomesData, expensesData) {
        if (window.incomesChart) {
            window.incomesChart.destroy();
        }


        window.incomesChart = new Chart(
            document.getElementById('incomes'),
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

        if (window.expensesChart) {
            window.expensesChart.destroy();
        }


        window.expensesChart = new Chart(
            document.getElementById('expenses'),
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