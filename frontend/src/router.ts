import {Login} from "./components/auth/login";
import {Main} from "./components/main";
import {Signup} from "./components/auth/signup";
import {IncomeView} from "./components/incomes/income-view";
import {IncomeEdit} from "./components/incomes/income-edit";
import {IncomeCreate} from "./components/incomes/income-create";
import {AuthUtils} from "./utils/auth-utils";
import {ExpenseView} from "./components/expenses/expense-view";
import {ExpenseCreate} from "./components/expenses/expense-create";
import {ExpenseEdit} from "./components/expenses/expense-edit";
import {Logout} from "./components/auth/logout";
import {IncomesExpensesCreate} from "./components/incomes-expenses/incomes-expenses-create";
import {IncomesExpensesView} from "./components/incomes-expenses/incomes-expenses-view";
import {IncomesExpensesEdit} from "./components/incomes-expenses/incomes-expenses-edit";
import {HttpUtils} from "./utils/http-utils";
import {RouteType} from "./types/route.type";
import {UserInfoType} from "./types/user-info.type";
import {DefaultResponseType} from "./types/default-response.type";

export class Router {
    readonly titlePageElement: HTMLElement | null;
    readonly contentPageElement: HTMLElement | null;
    private routes: RouteType[];

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
                    new Main(this.openNewRoute.bind(this));
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

    private initEvents(): void {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    public async openNewRoute(url: string): Promise<void> {
        // const currentRoute: string = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute();
    }

    private async clickHandler(e: MouseEvent): Promise<void> {
        let element: HTMLElement | HTMLAnchorElement | null = null;
        const target: HTMLElement | HTMLAnchorElement | null = e.target as HTMLElement;

        if (target) {
            if (target.nodeName === 'A') {
                element = target as HTMLAnchorElement;
            } else if (target.parentNode) {
                const parent = target.parentNode as HTMLElement;
                if (parent.nodeName === 'A') {
                    element = parent as HTMLAnchorElement;
                }
            }
        }

        if (element) {
            e.preventDefault();

            const currentRoute: string = window.location.pathname;
            const url: string = (element as HTMLAnchorElement).href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }

            await this.openNewRoute(url);
        }
    }

    private async activateRoute(): Promise<void> {
        const urlRoute: string = window.location.pathname;
        const newRoute: RouteType | undefined = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.title) {
                if (this.titlePageElement) {
                    this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
                }
            }

            if (newRoute.filePathTemplate) {

                if (newRoute.useLayout) {
                    if (this.contentPageElement && typeof newRoute.useLayout === 'string') {
                        this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                        const contentLayoutPageElement: HTMLElement | null = document.getElementById('content-layout');
                        if (contentLayoutPageElement) {
                            contentLayoutPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                        }
                        this.activateMenuItem(newRoute);
                        if (document.body.clientWidth <= 768) {
                            const offcanvasExampleElement: HTMLElement | null = document.getElementById('offcanvasExample');
                            const offcanvasBtnElement: HTMLElement | null = document.getElementById('offcanvas-btn');
                            const offcanvasBtnCloseElement: HTMLElement | null = document.getElementById('offcanvas-btn-close');
                            if (offcanvasExampleElement && offcanvasBtnElement && offcanvasBtnCloseElement) {
                                offcanvasExampleElement.classList.add('offcanvas', 'offcanvas-start');
                                offcanvasBtnElement.classList.remove('d-none');
                                offcanvasBtnCloseElement.classList.remove('d-none');
                            }
                        }
                    }

                    //Установка баланса
                    // await this.setNewBalance();
                    await this.setBalance();


                    //Установка имени пользователя

                    const usernameElement: HTMLElement | null = document.getElementById('username');
                    const authInfo: string | null = AuthUtils.getAuthInfo(AuthUtils.userInfoKey)
                    const userInfo: UserInfoType | null = authInfo ? JSON.parse(authInfo) : null

                    if (userInfo && userInfo.name && userInfo.lastName) {
                        if (usernameElement) {
                            usernameElement.innerText = userInfo.name + ' ' + userInfo.lastName;
                        }
                    } else {
                        history.pushState({}, '', '/login');
                        await this.activateRoute();
                    }


                } else {
                    if (this.contentPageElement) {
                        this.contentPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                    }
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

    private activateMenuItem(route: RouteType): void {
        const navLinkElements: NodeListOf<Element> | null = document.querySelectorAll('.nav-link');
        if (navLinkElements) {
            navLinkElements.forEach((item: Element) => {
                const href: string | null = item.getAttribute('href');
                item.addEventListener('click', (e) => {
                    if (href == 'javascript:void(0);') {
                        item.classList.add('active');
                        item.classList.remove('link-dark');
                    }
                });

                if (href === route.route) {
                    item.classList.add('active');
                    item.classList.remove('link-dark');
                } else if (route.route === '/expense-view' || route.route === '/income-view') {
                    if (href == 'javascript:void(0);') {
                        item.classList.add('active');
                        item.classList.remove('link-dark');
                    }
                } else {
                    item.classList.remove('active');
                    item.classList.add('link-dark');
                }
            });
        }
    }


    private async setBalance(): Promise<void> {
        const result: DefaultResponseType = await HttpUtils.request('/balance')
        if (!result.error && result.response) {
            const balanceAmountElement = document.getElementById('balance-amount');
            if (balanceAmountElement) {
                balanceAmountElement.innerText = result.response.balance + '$';
            }
        }
    }

    private async setNewBalance(): Promise<void> {
        await HttpUtils.request('/balance', 'PUT', true, {
            newBalance: 0
        })
    }
}