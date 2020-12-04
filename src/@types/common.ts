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
                chooseType: string
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
            expert: string,
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
        previousPage: string,
        nextPage: string,
        sendResult: string,
        level: {
            start: string,
            advanced: string,
            dialect: string
        },
        upload: string,
    },
    errors: {
        noGrade: string,
        noDictant: string,
        fileSize: string,
        email: string,
        required: string,
        code: string,
        incorrectCode: string,
        changeFailed: string
    },
    messages: {
        successRegister: string,
        changeSuccess: string
    },
    continue: string,
    reset: {
        passReset: string,
        success: string
    },
    
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
    dictantStatus: 'ready'| 'pending'| 'warning'|'notChecked',
    level: 'start'|'advanced'|'dialect'
}


export interface IExpert extends IUser {
    info: string
}

export interface IOrganizer extends IUser {
    dictantType: 'offline'|'online'|'video',
    phone: string,
    social:  string,
    studentNumber: number
}



export type DictantStatus = 'ready' | 'notChecked' | 'warning' | 'pending'


export type GradeTypes = '1'|'2'|'3'| '4'| '5'