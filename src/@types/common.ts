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
        enter: string
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
                send: string
            }
        }
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
}



interface IUser {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    middleName: string,
    city: string,
    type: 'organizer'|'expert'| 'student'
}

export interface IStudent extends IUser {
    dictantType: 'offline'|'online'|'video',
    dictantStatus: 'ready'| 'pending'| 'warning'|'notChecked'
}


export interface IExpert extends IUser {
    jobTitle: string
}

export interface IOrganizer extends IUser {
    dictantType: 'offline'|'online'|'video',
    phone: string,
    social:  string,
    studentNumber: number
}



export type DictantStatus = 'ready' | 'notChecked' | 'warning' | 'pending'