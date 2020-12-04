import axios from 'axios';
import {API_URL} from '../../config';
import {constants, UserActionTypes, UserState, UserTypes} from './user.constants';
import {Action, ActionCreator} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

export interface UserFieldTypes {
    firstName?:string,
    lastName?:string,
    middleName?:string,
    email?:string,
    password?:string,
    confirmPassword?:string,
    city?:string,
    role?:string,
    level?:string,
    format?:string,
    jobTitle?:string,
    studentCount?:string,
    social?:string,
    phone?:string,
    extraPhones?: string[],
    extraEmails?: string[],
    newPassword?: string
}

export const registerUserPending = ():UserActionTypes => ({
    type: constants.REGISTER_USER_PENDING
})

export const registerUserSuccess = ():UserActionTypes => ({
    type: constants.REGISTER_USER_SUCCESS,
})

export const registerUserError = (error:string):UserActionTypes => ({
    type: constants.REGISTER_USER_FAILED,
    payload: error
})





export const registerUser = ({
    firstName,
    lastName,
    middleName,
    email,
    password,
    confirmPassword,
    city,
    role,
    level,
    format,
    jobTitle
}:UserFieldTypes) => {
    return (dispatch:ThunkDispatch<UserState, void, Action>) => {
        dispatch(registerUserPending())
        // axios.interceptors.request.use(config => {
        //     console.log(config)
        //     return config
        // })
        
        axios({
            method: 'post',
            headers: {
                "Content-Type": 'application/json'
            },
            url: `${API_URL}/register?role=${role}`,
            data: {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                email: email,
                pass: password,
                repeat_pass: confirmPassword,
                address: city,
                role: role,
                level: level,
                format_dictation: format,
                info: jobTitle
            }
        })
        .then((response) => {
            console.log(response)
            dispatch(registerUserSuccess())
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch(registerUserError(error.response?.data&&error.response.data.error? error.response.data.error:'Произошла непредвиденная ошибка' ))
        })
}
}


export const loginUserPending = ():UserActionTypes => ({
    type: constants.LOGIN_USER_PENDING
})

export const loginUserSuccess = (user: UserTypes):UserActionTypes => ({
    type: constants.LOGIN_USER_SUCCESS,
    payload: user
})

export const loginUserError = (error:string):UserActionTypes => ({
    type: constants.LOGIN_USER_FAILED,
    payload: error
})

export const saveJWT = (jwt:string):UserActionTypes => ({
    type: constants.SAVE_JWT,
    payload:jwt
})


export const loginUser = ({
    email,
    password
}: UserFieldTypes) => {
    return (dispatch:ThunkDispatch<UserState, void, Action>) => {
        dispatch(loginUserPending())
        axios({
            method: 'post',
            headers: {
                "Content-Type": 'application/json'
            },
            url: `${API_URL}/authorization`,
            data: {
                email: email,
                pass: password,
            }
        })
        .then((response) => {
            const token = response.data.token
            axios({
                method: 'get',
                headers: {
                    "Content-Type": 'application/json',
                    "X-api-token": `${token}`
                },
                url: `${API_URL}/cabinet`,
            })
            .then((response)=> {
                dispatch(saveJWT(token))
                dispatch(loginUserSuccess(response.data))
            })
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch(loginUserError(error.response?.data&&error.response.data.error? error.response.data.error:'Произошла непредвиденная ошибка' ))
        })
    }
}


export const changeUserPending = ():UserActionTypes => ({
    type: constants.CHANGE_USER_PENDING
})

export const changeUserSuccess = (user: UserTypes):UserActionTypes => ({
    type: constants.CHANGE_USER_SUCCESS,
    payload: user
})

export const changeUserError = (error:string):UserActionTypes => ({
    type: constants.CHANGE_USER_FAILED,
    payload: error
})



export const changeUser = ({
    city,
    email,
    extraEmails,
    extraPhones,
    firstName,
    format,
    jobTitle,
    lastName,
    level,
    middleName,
    password,
    phone,
    role,
    social,
    studentCount,
    token,
    newPassword
}: UserFieldTypes&{token:string}) => {
    return (dispatch:ThunkDispatch<UserState, void, Action>) => {
        dispatch(changeUserPending())
        axios({
            method: 'put',
            headers: {
                "Content-Type": 'application/json',
                "X-api-token": `${token}`
            },
            url: `${API_URL}/cabinet`,
            data: {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                email: email,
                pass: newPassword,
                old_pass: password,
                address: city,
                role: role,
                level: level,
                format_dictation: format,
                info: jobTitle,
                soc_url: social,
                count_students: studentCount,
                phone: phone,
                add_phone: extraPhones,
                add_email: extraEmails
            }
        })
        .then((response) => {
            dispatch(changeUserSuccess(response.data))
        })
        .catch((error) => {
            try {
                dispatch(changeUserError(error.response.data.error))
            } catch {
                // dispatch(changeUserError('Произошла непредвиденная ошибка' ))
            }
        })
    }
}


export const clearError = ():UserActionTypes =>  ({
    type: constants.CLEAR_USER_ERRORS
})


export const logout = ():UserActionTypes => ({
    type:constants.LOGOUT
})