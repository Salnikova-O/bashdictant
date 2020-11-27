import { ILanguage } from "../../@types/common";


interface Languages {
    'en': ILanguage,
    'Russian': ILanguage,
    'bash': ILanguage | {}
}

export const languages:Languages = {
    'en': {
        languageName: 'ENG',
        navigation: {
            exit: 'Logout',
            back: 'Back'
        },
        auth: {
            authorizationHeader: 'Authorization',
            or: 'Or',
            social: 'Login with social profile',
            email: 'Email',
            password: 'Password',
            rememberMe: 'Remember me',
            enter: 'Login'
        },
        main: {
            welcome: 'Welcome to the dictantion registration page',
            registration: 'Registration',
            authorization: 'Authorization',
            loginWith: 'Or Login with'
        },
        registration: {
            social: {
                social: '',
                or: '',
            },
            tabs: {
                header: {
                    student: '',
                    organizer: '',
                    expert: ''
                },
                organizer: {
                    email: '',
                    password: '',
                    confirm: '',
                    lastName:'',
                    firstName: '',
                    middleName: '',
                    phone: '',
                    social: '',
                    city: '',
                    studentNumber: '',
                    secretCode: '',
                    online: '',
                    video: '',
                    offline: '',
                    send: 'send',
                    chooseType: ''
                },
                expert: {
                    email: '',
                    password: '',
                    confirm: '',
                    lastName:'',
                    firstName: '',
                    middleName: '',
                    city: '',
                    jobTitle: '',
                    send: 'send'
                },
                student: {
                    email: '',
                    password: '',
                    confirm: '',
                    lastName:'',
                    firstName: '',
                    middleName: '',
                    city: '',
                    send: 'send'
                }
            }
        },
        profile: {
            greeting: 'Hello,',
            header: {
                title: '',
                expert: '',
                student: '',
                organizer: ''
            },
            tabs: {
                first: 'Profile',
                second: {
                    student: '',
                    expert: '',
                    organizer: ''
                }
            },
            form: {
                extraEmail: '',
                extraPhone: '',
                newPassword: '',
                oldPassword: ''
            }
        },
        participation: {
            expert: '',
            form:{
                headerExpert: '',
                headerStudent: '',
                subheader: '',
                testFormat: {
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                }
            },
            student: '',
            pagination: {
                showed: '',
                of: '',
                page: 'Page'
            }
        },
        roles: {
            student: 'Участник',
            organizer: 'Организатор',
            expert: 'Эксперт'
        },
    },
    'Russian': {
        languageName: 'РУС',
        navigation: {
            exit: 'Выйти',
            back: 'Назад'
        },
        main: {
            welcome: `Здравствуйте! Приветствуем вас на странице регистрации диктанта`,
            registration: 'Регистрация',
            authorization: 'Авторизация',
            loginWith: 'Или войти через'
        },
        auth: {
            authorizationHeader: 'Авторизация',
            or: 'Или:',
            social: 'Авторизация через  соц.сеть:',
            email: 'Адрес электронной почты',
            password: 'Пароль',
            rememberMe: 'Запомнить меня',
            enter: 'Войти'
        },
        registration: {
            social: {
                social: 'Регистрация через соц.сеть',
                or: 'Или:',
            },
            tabs: {
                header: {
                    student: 'Участник',
                    organizer: 'Организатор',
                    expert: 'Эксперт'
                },
                organizer: {
                    email: 'Адрес электронной почты',
                    password: 'Пароль',
                    confirm: 'Подтвердить пароль',
                    lastName:'Фамилия',
                    firstName: 'Имя',
                    middleName: 'Отчество',
                    phone: 'Номер телефона',
                    social: 'Ссылка на социальную сеть',
                    city: 'Город или населенный пункт написания диктанта',
                    studentNumber: 'Ожидаемое число участников диктанта',
                    secretCode: 'Секретный код',
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                    send: 'Отправить',
                    chooseType: 'Выбор формата диктанта:'
                },
                expert: {
                    email: 'Адрес электронной почты',
                    password: 'Пароль',
                    confirm: 'Подтвердить пароль',
                    lastName:'Фамилия',
                    firstName: 'Имя',
                    middleName: 'Отчество',
                    city: 'Город или населенный пункт написания диктанта',
                    jobTitle: 'Должность, место работы',
                    send: 'Отправить'
                },
                student: {
                    email: 'Адрес электронной почты',
                    password: 'Пароль',
                    confirm: 'Подтвердить пароль',
                    lastName:'Фамилия',
                    firstName: 'Имя',
                    middleName: 'Отчество',
                    city: 'Город или населенный пункт написания диктанта',
                    send: 'Отправить'
                }
            }
        },
        profile: {
            greeting: 'Здравствуйте,',
            header: {
                title: '',
                expert: 'Личный кабинет эксперта',
                student: 'Личный кабинет участника',
                organizer: 'Личный кабинет организатора'
            },
            tabs: {
                first: 'Профиль',
                second: {
                    student: 'Мой диктант',
                    expert: 'Участники диктанта',
                    organizer: 'Зарегистрированные участники'
                }
            },
            form: {
                extraEmail: 'Дополнительный email',
                extraPhone: 'Дополнительный телефон',
                newPassword: 'Новый пароль',
                oldPassword: 'Текущий пароль'
            }
        },
        participation: {
            expert: 'Эксперты:',
            form:{
                headerExpert: 'Данные эксперта',
                headerStudent: 'Данные участника',
                subheader: 'Формат диктанта:',
                testFormat: {
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                }
            },
            student: 'Участники:',
            pagination: {
                showed: 'Показано',
                of: 'из',
                page: 'Страница'
            }
        },
        roles: {
            student: 'Участник',
            organizer: 'Организатор',
            expert: 'Эксперт'
        },
    },
    'bash': {
        languageName: 'БАШ'
    }
}