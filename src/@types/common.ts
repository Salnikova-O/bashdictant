export interface ILanguage {
    languageName:string,
    navigation: {
        exit: string,
        back: string
    }
    main: {
        welcome: string,
        registration: string,
        authorization: string,
        loginWith: string
    },
    auth: {
        social: string,
        or: string,
        authorizationHeader: string,
        email: string,
        password: string,
        rememberMe: string,
        enter: string,
        forgotPass: string
    },
    registration: {
        social: {
            social: string,
            or: string,
        },
        tabs: {
            header: {
                student: string,
                organizer: string,
                expert: string
            },
            organizer: {
                email: string,
                password: string,
                confirm: string,
                lastName:string,
                firstName: string,
                middleName: string,
                phone: string,
                social: string,
                city: string,
                studentNumber: string,
                secretCode: string,
                online: string,
                video: string,
                offline: string,
                send: string,
                chooseType: string,
                addExpert: string,
                add: string,
            },
            expert: {
                email: string,
                password: string,
                confirm: string,
                lastName:string,
                firstName: string,
                middleName: string,
                city: string,
                jobTitle: string,
                send: string
            },
            student: {
                email: string,
                password: string,
                confirm: string,
                lastName:string,
                firstName: string,
                middleName: string,
                city: string,
                send: string,
                level: {
                    choose: string,
                    start: string,
                    advanced: string,
                    dialect: string
                }
            }
        },
        successMessage: string,
        code: string
    },
    profile: {
        header: {
            title: string,
            student: string,
            teacher: string,
            organizer: string
        },
        greeting: string,
        tabs: {
            first: string,
            second: {
                student: string,
                expert:string,
                organizer: string
            }
        },
        form: {
            oldPassword: string,
            newPassword: string,
            extraEmail: string,
            extraPhone: string,
        }
    },
    participation: {
        expert: string,
        student: string,
        form: {
            headerExpert: string,
            headerStudent: string,
            headerRegistered:string,
            headerPinned:string,
            subheader: string
            testFormat: {
                    online: string
                    video: string
                    offline: string
            }
        },
        pagination: {
            showed: string,
            of: string,
            page: string
        }
    },
    roles: {
        student: string,
        organizer: string
        expert: string
    },
    dictant: {
        instructions: string,
        previousPage: string,
        nextPage: string,
        sendResult: string,
        level: {
            start: string,
            advanced: string,
            dialect: string
        },
        upload: string,
        uploadTitle:string,
        backToStudents:string
    },
    errors: {
        noGrade: string,
        noDictant: string,
        fileSize: string,
        email: string,
        required: string,
        code: string,
        incorrectCode: string,
        changeFailed: string,
        connect: string,
        chooseType: string,
        serverError: string,
        fileDownload: string,
        noDictantLevel:string,
        noEmailSocial: string,
        chooseLang:string,
        notRegistered: string,
        passMatch: string,
        agreeWithRules: string,
        min6:string,
        min1:string,
        correctPhone: string
    },
    messages: {
        successRegister: string,
        changeSuccess: string,
        dictantSuccess:  string,
        dictantCheckSuccess: string,
        downloadSuccess: string,
        downloadSuccessAndroid: string,
        certSuccess: string,
        addExpertSuccess: string
    },
    continue: string,
    reset: {
        passReset: string,
        success: string
    },
    timer: {
        title: string,
        connect: string,
        longTitle: string
    },
    upload: string,
    gradeText: {
        title:string,
        noGrade: string
    },
    getCertificate: string,
    comment: string,
    certificate: {
        mainInfo: string,
        check:string,
        confirm: string,
        success: string,
        chooseLang: string,
        bash: string,
        rus: string
    },
    policy: {
        userAgreement: string,
        personalData: string,
        cookies: string
    },
    agree: string
}



interface IUser {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    middle_name: string,
    address: string,
    role: 'organizer'|'teacher'| 'student'
}

export interface IStudent extends IUser {
    format_dictation: 'offline'|'online'|'video',
    status: DictantStatus
    level: 'start'|'advanced'|'dialect'
}


export interface IExpert extends IUser {
    info: string
}

export interface IOrganizer extends IUser {
    phone: string,
    add_phone: string[],
    add_email:string[],
    soc_url:  string,
    count_students: number,
}



export type DictantStatus = 'Проверен'| 'Проверяется'| 'Отклонен'|'Не написан'


export type GradeTypes = 1|2|3| 4| 5