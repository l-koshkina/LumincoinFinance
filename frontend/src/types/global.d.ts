import Chart from "chart.js/auto";

declare global {
    interface Window {
        incomesChart: Chart | undefined;
        expensesChart: Chart | undefined;
    }
}