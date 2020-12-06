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
            enter: 'Login',
            forgotPass: 'Забыл(а) пароль'
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
                    send: 'send',
                    level: {
                        advanced: 'Продвинутый уровень',
                        choose: 'Выберите свой  уровень',
                        dialect: 'Северо-западный диалект',
                        start: 'Начальный уровень'
                    }
                }
            },
            successMessage: 'Please enter the code sent to the registered email',
            code: 'Confirmation code'

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
        dictant: {
            previousPage: 'Previous page',
            nextPage: 'Next page',
            sendResult: 'Send result',
            level: {
                start: '',
                advanced: '',
                dialect: ''
            },
            upload: 'Upload',
            uploadTitle: ''
        },
        errors: {
            noGrade: 'Grade is required',
            noDictant: 'Ни одна форма диктанта не обнаружена',
            fileSize: '',
            email: 'Provide correct email',
            required: 'This field is required',
            code: 'Plese enter the code',
            incorrectCode: 'Invalid code',
            changeFailed: 'При изменении данных произошла ошибка',
            connect: 'There was an error'
        },
        messages: {
            successRegister: 'Вы успешно зарегистрированы',
            changeSuccess: 'Данные успешно изменены'

        },
        continue: 'Continue',
        reset: {
            passReset: 'Укажите ваш email для восстановления пароля',
            success: 'На ваш email отправлено письмо с ссылкой для восстановления доступа.'
        },
        timer: {
            connect: 'Connect',
            title: 'Dictation starts in:',
            longTitle: ''
        }
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
            enter: 'Войти',
            forgotPass: 'Забыл(а) пароль'
        },
        registration: {
            social: {
                social: 'Регистрация через соц.сеть',
                or: 'Или:',
            },
            successMessage: 'Ввведите код подтверждения отправленный на указанный email',
            code: 'Код подтверждения',
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
                    send: 'Отправить',
                    level: {
                        advanced: 'Продвинутый уровень',
                        choose: 'Выберите свой  уровень',
                        dialect: 'Северо-западный диалект',
                        start: 'Начальный уровень'
                    }
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
        dictant: {
            previousPage: 'Предыдущая страница',
            nextPage: 'Следующая страница',
            sendResult: 'Отправить результат',
            level: {
                start: 'Начальный уровень',
                advanced: 'Продвинутый уровень',
                dialect: 'Северо-западный диалект'
            },
            upload: 'Загрузить работу',
            uploadTitle: 'Файлы загруженные на проверку'
        },
        errors: {
            noGrade: 'Необходимо проставить оценку',
            noDictant: 'Ни одна форма диктанта не обнаружена',
            fileSize: 'Общий размер файлов не должен превышать 10мб',
            email: 'Введите корректный email',
            required: 'Обязательное поле',
            code: 'Введите код',
            incorrectCode: 'Введен неверный код',
            changeFailed: 'При изменении данных произошла ошибка',
            connect: 'При подключении произошла ошибка, попробуйте позднее'
        },
        messages: {
            successRegister: 'Вы успешно зарегистрированы',
            changeSuccess: 'Данные успешно изменены'

        },
        continue: 'Продолжить',
        reset: {
            passReset: 'Укажите ваш email для восстановления пароля',
            success: 'На ваш email отправлено письмо с ссылкой для восстановления доступа.'
        },
        timer: {
            connect: 'Подключиться',
            title: 'Начало диктанта через:',
            longTitle: 'Диктант начнется:'
        }
    },
    'bash': {
        languageName: 'БАШ'
    }
}