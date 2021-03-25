import { ILanguage } from "../../@types/common";


interface Languages {
    'en': ILanguage,
    'Russian': ILanguage,
    'bash': ILanguage 
}

export const languages:Languages = {
    'en': {
        languageName: 'ENG',
        navigation: {
            exit: 'Logout',
            back: 'Back'
        },
        main: {
            welcome: `Welcome to the registration page!`,
            registration: 'Registration',
            authorization: 'Authorization',
            loginWith: 'Or login with'
        },
        auth: {
            authorizationHeader: 'Authorization',
            or: 'Or:',
            social: 'Social networks:',
            email: 'Email',
            password: 'Password',
            rememberMe: 'Remember me',
            enter: 'Login',
            forgotPass: 'Forgot password'
        },
        registration: {
            social: {
                social: 'Social networks:',
                or: 'Or:',
            },
            successMessage: 'We sent you a confirmation email',
            code: 'Confirmation code',
            tabs: {
                header: {
                    student: 'Participant',
                    organizer: 'Organizer',
                    expert: 'Expert'
                },
                organizer: {
                    email: 'Email',
                    password: 'Password',
                    confirm: 'Confirm password',
                    lastName:'Last name',
                    firstName: 'First name',
                    middleName: 'Middle name',
                    phone: 'Phone',
                    social: 'Social profile link',
                    city: 'City',
                    studentNumber: 'Expected number of participants',
                    secretCode: 'secret code',
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                    save: 'Save',
                    chooseType: 'Choose dictation type:',
                    addExpert: 'Add Expert',
                    add: 'Add'
                },
                expert: {
                    email: 'Email',
                    password: 'Password',
                    confirm: 'Confirm password',
                    lastName:'Last name',
                    firstName: 'First name',
                    middleName: 'Middle name',
                    city: 'City',
                    jobTitle: 'Place of work',
                    save: 'Save',
                    send: 'Send',
                },
                student: {
                    email: 'Email',
                    password: 'Password',
                    confirm: 'Confirm password',
                    lastName:'Last name',
                    firstName: 'First name',
                    middleName: 'Middle name',
                    city: 'City',
                    save: 'Save',
                    send: 'Send',
                    level: {
                        advanced: 'Advanced',
                        choose: 'Choose you level',
                        dialect: 'North-western dialect',
                        start: 'Elementary level'
                    }
                }
            }
        },
        profile: {
            greeting: 'Welcome,',
            header: {
                title: '',
                teacher: 'Expert profile',
                student: 'Participant profile',
                organizer: 'Organizer profile'
            },
            tabs: {
                first: 'Profile',
                second: {
                    student: 'My dictation',
                    expert: 'Participants',
                    organizer: 'Registered participants'
                }
            },
            form: {
                extraEmail: 'Additional email',
                extraPhone: 'additional phone',
                newPassword: 'New password',
                oldPassword: 'Current password'
            }
        },
        participation: {
            expert: 'Experts:',
            form:{
                headerExpert: 'Expert information',
                headerStudent: 'Participant information',
                headerRegistered: 'Registered participants',
                headerPinned: 'Pinned participants',
                subheader: 'Dictation type:',
                testFormat: {
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                }
            },
            student: 'Participants:',
            pagination: {
                showed: 'Shown',
                of: 'of',
                page: 'Page'
            }
        },
        roles: {
            student: 'Participant',
            organizer: 'Organizer',
            expert: 'Expert'
        },
        dictant: {
            instructions: 'The dictant can be written by typing in the text box using your device\'s keyboard or by uploading a text file',
            previousPage: 'Previous page',
            nextPage: 'Next page',
            sendResult: 'Send result',
            level: {
                advanced: 'Advanced',
                dialect: 'North-western dialect',
                start: 'Elementary level'
            },
            upload: 'Upload your work',
            uploadDocument: 'Upload document',
            uploadImage: 'Upload image',
            uploadTitle: 'Uploaded files',
            backToStudents: 'Back to the participants'
        },
        errors: {
            noGrade: 'You need to grade the work',
            noDictant: 'No dictant type chosen',
            fileSize: 'Overall file size can not exceed 30mb',
            email: 'Provide correct email',
            required: 'Required field',
            code: 'Enter code',
            incorrectCode: 'Incorrect code',
            changeFailed: 'There was an error changing info',
            connect: 'Error connecting, please try later',
            chooseType: 'Please choose one type of dictation. Either remove files or text',
            serverError: 'Unexpected error',
            fileDownload: 'There was an error uploading files',
            noDictantLevel: 'Please provide dictation level',
            noEmailSocial: "We couldn't get email from social provider, please try another one",
            chooseLang: 'Choose certificate language',
            notRegistered: 'Please register before authorization',
            agreeWithRules: 'You need to agree with our terms',
            correctPhone: 'Enter correct phone',
            min1: 'At least 1 participant',
            min6: 'At least 6 symbols',
            passMatch: 'Passwords should match'
        },
        messages: {
            successRegister: 'You are successfully registered',
            changeSuccess: 'Information changed successfully',
            dictantSuccess: 'Work has been sent',
            dictantCheckSuccess: 'Work has been successfully graded',
            downloadSuccess: 'File has been uploaded to:',
            downloadSuccessAndroid: 'File successfully uploaded',
            certSuccess: 'Certificate received',
            addExpertSuccess: 'Expert has been successfully added'

        },
        continue: 'Continue',
        reset: {
            passReset: 'Enter your email',
            success: 'Temporary password has been sent to your email'
        },
        timer: {
            connect: 'Connect',
            title: 'Dictation starts in:',
            longTitle: 'Dictation starts:'
        },
        upload: 'Uploading...',
        gradeText: {
            title: 'Your mark',
            noGrade: 'Dictation is being marked',
            teacherGrade: 'Mark'
        },
        getCertificate: 'Get your certificate',
        comment: 'Your comment',
        certificate: {
            mainInfo: 'Certificate can only be received once. Please check your information carefully.',
            check:'Check',
            confirm: 'Confirm',
            success: 'Certificate has been sent to your email',
            chooseLang: 'Choose certificate language',
            bash: 'Bashkir',
            rus: 'Russian'
        },
        policy: {
            userAgreement: 'User aggreement',
            personalData: 'Personal data policy',
            cookies: 'Cookie usage'
        },
        agree: 'Agree with'
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
            successMessage: 'Ссылка для подтверждения отправлена на указанную почту',
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
                    city: 'Город или населенный пункт',
                    studentNumber: 'Ожидаемое число участников диктанта',
                    secretCode: 'Секретный код',
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                    save: 'Сохранить',
                    chooseType: 'Выбор формата диктанта:',
                    addExpert: 'Добавить эксперта',
                    add: 'Добавить'
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
                    save: 'Сохранить',
                    send: 'Отправить',
                },
                student: {
                    email: 'Адрес электронной почты',
                    password: 'Пароль',
                    confirm: 'Подтвердить пароль',
                    lastName:'Фамилия',
                    firstName: 'Имя',
                    middleName: 'Отчество',
                    city: 'Город или населенный пункт написания диктанта',
                    save: 'Сохранить',
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
            instructions: 'Уважемый пользователь! \nУ Вас есть возможность написать работу в текстовом поле или загрузить файлом одну или более страниц.',
            previousPage: 'Предыдущая страница',
            nextPage: 'Следующая страница',
            sendResult: 'Отправить результат',
            level: {
                start: 'Начальный уровень',
                advanced: 'Продвинутый уровень',
                dialect: 'Северо-западный диалект'
            },
            upload: 'Загрузить работу',
            uploadDocument: 'Загрузить документ',
            uploadImage: 'Загрузить изображение',
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
            noEmailSocial: 'Нам не удалось получить email от соц. сети, возпользуйтесь другим способом регистрации',
            chooseLang: 'Выберите язык сертификата',
            notRegistered: 'Данный пользователь не зарегистрирован',
            agreeWithRules: 'Необходимо согласиться с правилами ',
            correctPhone: 'Введите корректный номер ',
            min1: 'Минимум 1 участник ',
            min6: 'Минимум 6 символов ',
            passMatch: 'Пароли должны совпадать '
        },
        messages: {
            successRegister: 'Вы успешно зарегистрированы',
            changeSuccess: 'Данные успешно изменены',
            dictantSuccess: 'Работа успешно отправлена',
            dictantCheckSuccess: 'Работа успешно проверена',
            downloadSuccess: 'Файл успешно загружен в:',
            downloadSuccessAndroid: 'Файл успешно загружен',
            certSuccess: 'Сертификат успешно получен',
            addExpertSuccess: 'Эксперт успешно добавлен'

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
            noGrade: 'Диктант проверяется',
            teacherGrade: 'Оценка',
        },
        getCertificate: 'Получить сертификат',
        comment: 'Комментарий',
        certificate: {
            mainInfo: 'Сертификат можно получить только один раз, пожалуйста проверьте, что у вас корректно заполнены личные данные',
            check:'Проверить',
            confirm: 'Подтвердить',
            success: 'Сертификат отправлен на указанный Вами email',
            chooseLang: 'Выберите язык сертификата',
            bash: 'Башкирский',
            rus: 'Русский'
        },
        policy: {
            userAgreement: 'Пользовательское соглашение',
            personalData: 'Политика обработки персональных данных',
            cookies: 'Использование Cookies'
        },
        agree: 'Согласен с'
    },
    'bash': {
        languageName: 'БАШ',
        navigation: {
            exit: 'Сығырға',
            back: 'Артҡа'
        },
        main: {
            welcome: `Һаумыһығыҙ! Һеҙҙе диктантҡа теркәлеү үтеү битендә сәләмләйбеҙ`,
            registration: 'Теркәү',
            authorization: 'Теркәлеү',
            loginWith: 'йәки ... аша инергә:'
        },
        auth: {
            authorizationHeader: 'Теркәлеү',
            or: 'йәки:',
            social: 'Социаль селтәр аша теркәлеү:',
            email: 'Электрон почтаның адресы',
            password: 'Пароль',
            rememberMe: 'Мине иҫтә ҡалдырырға',
            enter: 'Инергә',
            forgotPass: 'Паролде оноттом'
        },
        registration: {
            social: {
                social: 'Социаль селтәр аша теркәү',
                or: 'йәки:',
            },
            successMessage: 'Ссылка для подтверждения отправлена на указанную почту',
            code: 'Раҫлау коды',
            tabs: {
                header: {
                    student: 'Ҡатнашыусы',
                    organizer: 'Ойоштороусы',
                    expert: 'Эксперт'
                },
                organizer: {
                    email: 'Электрон почтаның адресы',
                    password: 'Пароль',
                    confirm: 'Паролде раҫларға',
                    lastName:'Фамилия',
                    firstName: 'Исем',
                    middleName: 'Атаһының исеме',
                    phone: 'Телефон номеры',
                    social: 'Социаль селтәргә һылтанма',
                    city: 'Диктант яҙыуҙың ҡалаһы йәки тораҡ урыны',
                    studentNumber: 'Диктантта ҡатнашыусыларҙың көтөлгән һаны',
                    secretCode: 'Серле код',
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                    save: 'Һаҡлау',
                    chooseType: 'Диктант форматын һайлау:',
                    addExpert: 'Добавить эксперта',
                    add: 'Добавить'
                },
                expert: {
                    email: 'Электрон почтаның адресы',
                    password: 'Пароль',
                    confirm: 'Паролде раҫларға',
                    lastName:'Фамилия',
                    firstName: 'Исем',
                    middleName: 'Атаһының исеме',
                    city: 'Диктант яҙыуҙың ҡалаһы йәки тораҡ урыны',
                    jobTitle: 'Должность, место работы',
                    save: 'Һаҡлау',
                    send: 'Ебәреү',
                },
                student: {
                    email: 'Электрон почтаның адресы',
                    password: 'Пароль',
                    confirm: 'Паролде раҫларға',
                    lastName:'Фамилия',
                    firstName: 'Исем',
                    middleName: 'Атаһының исеме',
                    city: 'Диктант яҙыуҙың ҡалаһы йәки тораҡ урыны',
                    save: 'Һаҡлау',
                    send: 'Ебәреү',
                    level: {
                        advanced: 'Юғары кимәл',
                        choose: 'Үҙеңдең кимәлеңде һайлау',
                        dialect: 'Төньяҡ-көнбайыш диалекты',
                        start: 'Башланғыс кимәл'
                    }
                }
            }
        },
        profile: {
            greeting: 'Һаумыһығыҙ,',
            header: {
                title: '',
                teacher: 'Эксперттың шәхси кабинеты',
                student: 'Ҡатнашыусының шәхси кабинетыа',
                organizer: 'Ойоштороусының шәхси кабинеты'
            },
            tabs: {
                first: 'Профиль',
                second: {
                    student: 'Минең диктант',
                    expert: 'Диктантта ҡатнашыусылар',
                    organizer: 'Теркәлеү үткән ҡатнашыусылар'
                }
            },
            form: {
                extraEmail: 'Өҫтәмә email',
                extraPhone: 'Өҫтәмә телефон',
                newPassword: 'Яңы пароль',
                oldPassword: 'Әлеге пароль'
            }
        },
        participation: {
            expert: 'Эксперттар:',
            form:{
                headerExpert: 'Эксперт мәғлүмәттәре',
                headerStudent: 'Ҡатнашыусы мәғлүмәттәре',
                headerRegistered: 'Теркәлеү үткән ҡатнашыусылар',
                headerPinned: 'Беркетелгән ҡатнашыусылар',
                subheader: 'Диктант форматы:',
                testFormat: {
                    online: `Участие онлайн. (участники пишут текст диктанта на сайте)`,
                    video: `Участники слушают диктант онлайн и пишут под диктовку видеотрансляции.`,
                    offline: `Организатор определяет диктора на месте, оффлайн участие.`,
                }
            },
            student: 'Ҡатнашыусылар:',
            pagination: {
                showed: 'Показано',
                of: 'из',
                page: 'Страница'
            }
        },
        roles: {
            student: 'Ҡатнашыусы',
            organizer: 'Ойоштороусы',
            expert: 'Эксперт'
        },
        dictant: {
            instructions: `Хөрмәтле ҡулланыусы! \nҺеҙ текст өсөн майҙансыҡҡа эште яҙа алаһығыҙ, шулай уҡ бер һәм унан күберәк биттәге мәғлүмәтте лә унда ҡуйырға мөмкин.`,
            previousPage: 'Алдағы бит',
            nextPage: 'Киләһе бит',
            sendResult: 'Һөҙөмтәне ебәрергә',
            level: {
                advanced: 'Юғары кимәл',
                dialect: 'Төньяҡ-көнбайыш диалекты',
                start: 'Башланғыс кимәл'
            },
            upload: 'Эште тейәргә',
            uploadDocument: 'Документ тейәргә',
            uploadImage: 'Һүрәттәр тейәргә',
            uploadTitle: 'Тикшереүгә ҡуйылған файлдар',
            backToStudents: 'Ҡатнашыусылар исемлегенә артҡа'
        },
        errors: {
            noGrade: 'Баһа ҡуйырға кәрәк',
            noDictant: 'Диктанттың бер формаһы ла табылманы',
            fileSize: 'Файлдарҙың дөйөм күләме 30 мб артырға тейеш түгел',
            email: 'Дөрөҫ email яҙығыҙ',
            required: 'Мотлаҡ юл',
            code: 'Кодты индерегеҙ',
            incorrectCode: 'Код дөрөҫ индерелмәгән',
            changeFailed: 'Мәғлүмәттәрҙе үҙгәрткәндә хата килеп сыҡты',
            connect: 'Бәйләнешкә ингәндә хата килеп сыҡты, һуңғараҡ эшләп ҡарағыҙ',
            chooseType: 'Ҡуйылған файлдарҙы һәм тексты ебәреп булмай. Бер вариантты һайлағыҙ',
            serverError: 'Көтөлмәгән хата килеп сыҡты',
            fileDownload: 'Файлды ҡуйғанда хата килеп сыҡты',
            noDictantLevel: 'Зинһар, диктант кимәлен һайлағыҙ',
            noEmailSocial: 'Беҙгә социаль селтәрҙән email килеп етмәне, теркәлеү үтеүҙең башҡа ысулын ҡулланығыҙ',
            chooseLang: 'өсөн телде һайлағыҙ',
            notRegistered: 'Данный пользователь не зарегистрирован',
            agreeWithRules: 'Ҡағиҙәләр менән ризалашырға кәрәк',
            correctPhone: 'Дөрөҫ номерҙы индерегеҙ',
            min1: 'Кәмендә 1 ҡатнашыусы',
            min6: 'Кәмендә 6 символ',
            passMatch: 'Паролдәр тап килергә тейеш'
        },
        messages: {
            successRegister: 'Һеҙ теркәлеүҙе уңышлы үттегеҙ',
            changeSuccess: 'Мәғлүмәттәр уңышлы һаҡланылды',
            dictantSuccess: 'Эш уңышлы ебәрелде',
            dictantCheckSuccess: 'Эш уңышлы тикшерелде.',
            downloadSuccess: 'Файл ... уңышлы ҡуйылған:',
            downloadSuccessAndroid: 'Файл уңышлы ҡуйылған',
            certSuccess: 'уңышлы алынды',
            addExpertSuccess: 'Эксперт успешно добавлен'

        },
        continue: 'Дауам итергә',
        reset: {
            passReset: 'Паролде тергеҙеү өсөн үҙегеҙҙең email адресығыҙҙы яҙығыҙ',
            success: 'Һеҙҙең email адресына ваҡытлыса пароль менән хат ебәрелде.'
        },
        timer: {
            connect: 'Бәйләнешкә инергә',
            title: '... ваҡыттан диктант башлана:',
            longTitle: 'Диктант башланасаҡ:'
        },
        upload: 'Файлдарҙы күсереү бара...',
        gradeText: {
            title: 'Һеҙҙең баһа',
            noGrade: 'Диктант тикшерелә',
            teacherGrade: 'Баһа',
        },
        getCertificate: 'Сертификат алырға',
        comment: 'Аңлатма',
        certificate: {
            mainInfo: 'Сертификатты бер тапҡыр ғына алырға мөмкин, зинһар, шәхси мәғлүмәттәрегеҙҙең дөрөҫлөгөн тикшерегеҙ',
            check:'Тикшерергә',
            confirm: 'Раҫларға',
            success: 'Сертификат күрһәтелгән email адресына ебәрелде',
            chooseLang: 'Выберите язык сертификата',
            bash: 'Башҡорт',
            rus: 'Рус'
        },
        policy: {
            userAgreement: 'Ҡулланыусы килешеүе',
            personalData: 'Шәхси мәғлүмәттәрҙе эшкәртеү политикаһы',
            cookies: 'Cookies ҡулланыу'
        },
        agree: 'менән риза',
        // chooseLang: 'Выберите язык сертификата',
        // certSuccess: 'Сертификат успешно получен'
    }
}