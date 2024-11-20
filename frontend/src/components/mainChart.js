import Chart from 'chart.js/auto'

Chart.defaults.color = '#000';

(async function() {
    const incomesData = {
        labels: [
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [40, 130, 20, 60, 90],
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
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100, 230, 10],
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

    new Chart(
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
    new Chart(
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
})();
