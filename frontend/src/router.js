import {Login} from "./components/auth/login.js";
import {Main} from "./components/main.js";
import {Signup} from "./components/auth/signup.js";
import {IncomeView} from "./components/incomes/income-view";
import {IncomeEdit} from "./components/incomes/income-edit";
import {IncomeCreate} from "./components/incomes/income-create";
import {AuthUtils} from "./utils/auth-utils";
import config from "../config/config";
import {ExpenseView} from "./components/expenses/expense-view";
import {ExpenseCreate} from "./components/expenses/expense-create";
import {ExpenseEdit} from "./components/expenses/expense-edit";
import {Logout} from "./components/auth/logout";
import {IncomesExpensesCreate} from "./components/incomes-expenses/incomes-expenses-create";
import {IncomesExpensesView} from "./components/incomes-expenses/incomes-expenses-view";
import {IncomesExpensesEdit} from "./components/incomes-expenses/incomes-expenses-edit";
import {HttpUtils} from "./utils/http-utils";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');


        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main();
                }
            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false,
                load: () => {

                }
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    new Login(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/signup',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/signup.html',
                useLayout: false,
                load: () => {
                    new Signup(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/income-view',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/incomes/income-view.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeView(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/income-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/pages/incomes/income-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCreate(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/income-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/pages/incomes/income-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeEdit(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/expense-view',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expenses/expense-view.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseView(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/expense-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/pages/expenses/expense-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseCreate(this.openNewRoute.bind(this))
                }
            },
            {
                route: '/expense-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/pages/expenses/expense-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseEdit(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/incomes-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomesExpensesView(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/incomes-expenses-create',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomesExpensesCreate(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/incomes-expenses-edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomesExpensesEdit(this.openNewRoute.bind(this));
                }
            },

        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }


        if (element) {
            e.preventDefault();

            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }

            await this.openNewRoute(url);
        }
    }

    async activateRoute() {
        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
            }

            if (newRoute.filePathTemplate) {

                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    const contentLayoutPageElement = document.getElementById('content-layout');
                    contentLayoutPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                    this.activateMenuItem(newRoute);
                    if (document.body.clientWidth <= 768) {
                        document.getElementById('offcanvasExample').classList.add('offcanvas', 'offcanvas-start');
                        document.getElementById('offcanvas-btn').classList.remove('d-none');
                        document.getElementById('offcanvas-btn-close').classList.remove('d-none');
                    }

                    //Установка баланса

                    await this.setBalance();


                    //Установка имени пользователя

                    const usernameElement = document.getElementById('username');
                    const userInfo = JSON.parse(AuthUtils.getAuthInfo(AuthUtils.userInfoKey));

                    if (userInfo && userInfo.name && userInfo.lastName) {
                        usernameElement.innerText = userInfo.name + ' ' + userInfo.lastName;
                    } else {
                        history.pushState({}, '', '/login');
                        await this.activateRoute();
                    }


                } else {
                    this.contentPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                }
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } else {
            history.pushState({}, '', '/404');
            await this.activateRoute();
        }
    }

    activateMenuItem(route) {
        document.querySelectorAll('.nav-link').forEach(item => {
            const href = item.getAttribute('href');
            if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/') || (href.startsWith('javascript:void(0)'))) {
                item.classList.add('active');
                item.classList.remove('link-dark');
            } else {
                item.classList.remove('active');
                item.classList.add('link-dark');
            }
        });

    }

    async setBalance() {
        const result = await HttpUtils.request('/balance')
        if (!result.error && result.response) {
            document.getElementById('balance-amount').innerText = result.response.balance + '$';
        }
    }

    async setNewBalance() {
        await HttpUtils.request('/balance', 'PUT',true, {
            newBalance: 1000
        })
    }
}