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
                teacher: '',
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
                headerRegistered: 'Зарегистрированные участники',
                headerPinned: 'Прикрепленные участники',
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
            uploadTitle: '',
            backToStudents: 'Back to students page'
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
            connect: 'There was an error',
            chooseType: 'Нельзя отправить загруженные файлы и текст. Выберите один вариант',
            serverError: 'Произошла непредвиденная ошибка',
            fileDownload: 'При загрузке файла произошла ошибка',
            noDictantLevel: '',
            noEmailSocial: ''
        },
        messages: {
            successRegister: 'Вы успешно зарегистрированы',
            changeSuccess: 'Данные успешно изменены',
            dictantSuccess: 'Работа успешно отправлена',
            dictantCheckSuccess: 'Dictant is successfully checked',
            downloadSuccess: '',
            downloadSuccessAndroid: ''

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
        },
        upload: 'Идет загрузка файлов...',
        gradeText: {
            title: 'Ваша оценка',
            noGrade: 'Диктант проверяется'
        },
        getCertificate: 'Получить сертификат',
        comment: 'Комментарий',
        certificate: {
            mainInfo: 'Сертификат можно получить только один раз, пожалуйста проверьте, что у вас корректно заполнены личные данные',
            check:'Проверить',
            confirm: 'Подтвердить',
            success: 'Сертификат отправлен на указанный Вами email'
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
                teacher: 'Личный кабинет эксперта',
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
                headerRegistered: 'Зарегистрированные участники',
                headerPinned: 'Прикрепленные участники',
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
            uploadTitle: 'Файлы загруженные на проверку',
            backToStudents: 'Назад к списку участников'
        },
        errors: {
            noGrade: 'Необходимо проставить оценку',
            noDictant: 'Ни одна форма диктанта не обнаружена',
            fileSize: 'Общий размер файлов не должен превышать 30мб',
            email: 'Введите корректный email',
            required: 'Обязательное поле',
            code: 'Введите код',
            incorrectCode: 'Введен неверный код',
            changeFailed: 'При изменении данных произошла ошибка',
            connect: 'При подключении произошла ошибка, попробуйте позднее',
            chooseType: 'Нельзя отправить загруженные файлы и текст. Выберите один вариант',
            serverError: 'Произошла непредвиденная ошибка',
            fileDownload: 'При загрузке файла произошла ошибка',
            noDictantLevel: 'Пожалуйста укажите уровень диктанта',
            noEmailSocial: 'Нам не удалось получить email от соц. сети, возпользуйтесь другим способом регистрации'
        },
        messages: {
            successRegister: 'Вы успешно зарегистрированы',
            changeSuccess: 'Данные успешно изменены',
            dictantSuccess: 'Работа успешно отправлена',
            dictantCheckSuccess: 'Работа успешно проверена',
            downloadSuccess: 'Файл успешно загружен в:',
            downloadSuccessAndroid: 'Файл успешно загружен'

        },
        continue: 'Продолжить',
        reset: {
            passReset: 'Укажите ваш email для восстановления пароля',
            success: 'На ваш email отправлено письмо с временным паролем.'
        },
        timer: {
            connect: 'Подключиться',
            title: 'Начало диктанта через:',
            longTitle: 'Диктант начнется:'
        },
        upload: 'Идет загрузка файлов...',
        gradeText: {
            title: 'Ваша оценка',
            noGrade: 'Диктант проверяется'
        },
        getCertificate: 'Получить сертификат',
        comment: 'Комментарий',
        certificate: {
            mainInfo: 'Сертификат можно получить только один раз, пожалуйста проверьте, что у вас корректно заполнены личные данные',
            check:'Проверить',
            confirm: 'Подтвердить',
            success: 'Сертификат отправлен на указанный Вами email'
        }
    },
    'bash': {
        languageName: 'БАШ'
    }
}