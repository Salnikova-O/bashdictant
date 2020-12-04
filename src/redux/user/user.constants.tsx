import { IExpert, IOrganizer, IStudent } from "../../@types/common"

export const constants = {
    LOGIN_USER: 'LOGIN_USER',
    LOGIN_USER_PENDING: 'LOGIN_USER_PENDING',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_FAILED: 'LOGIN_USER_FAILED',

    REGISTER_USER: 'REGISTER_USER',
    REGISTER_USER_PENDING: 'REGISTER_USER_PENDING',
    REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
    REGISTER_USER_FAILED: 'REGISTER_USER_FAILED',

    LOGOUT: 'LOGOUT',
    CLEAR_USER_ERRORS: 'CLEAR_USER_ERRORS',

    CHANGE_USER_PENDING: 'CHANGE_USER_PENDING',
    CHANGE_USER_SUCCESS: 'CHANGE_USER_SUCCESS',
    CHANGE_USER_FAILED: 'CHANGE_USER_FAILED',
    SAVE_JWT: 'SAVE_JWT',
}


export type UserTypes = IStudent|IExpert|IOrganizer


interface LoginUserPendingAction {
    type: typeof constants.LOGIN_USER_PENDING,
} 

interface LoginUserSuccessAction {
    type: typeof constants.LOGIN_USER_SUCCESS,
    payload: UserTypes
} 

interface LoginUserFailedAction {
    type: typeof constants.LOGIN_USER_FAILED,
    payload: string
} 

interface RegisterUserPendingAction {
    type: typeof constants.REGISTER_USER_PENDING,
} 

interface RegisterUserSuccessAction {
    type: typeof constants.REGISTER_USER_SUCCESS,
} 

interface RegisterUserFailedAction {
    type: typeof constants.REGISTER_USER_FAILED,
    payload: string
} 

interface ClearErrorsAction {
    type: typeof constants.CLEAR_USER_ERRORS,
} 

interface LogoutAction {
    type: typeof constants.LOGOUT
}

interface SaveJWT {
    type: typeof constants.SAVE_JWT,
    payload: string
}


interface ChangeUserPendingAction {
    type: typeof constants.CHANGE_USER_PENDING,
} 

interface ChangeUserSuccessAction {
    type: typeof constants.CHANGE_USER_SUCCESS,
    payload: UserTypes
} 

interface ChangeUserFailedAction {
    type: typeof constants.CHANGE_USER_FAILED,
    payload: string
} 



export type UserActionTypes = LoginUserFailedAction|LoginUserPendingAction|LoginUserSuccessAction|RegisterUserFailedAction|RegisterUserPendingAction|RegisterUserSuccessAction|LogoutAction|ClearErrorsAction|SaveJWT|ChangeUserFailedAction|ChangeUserPendingAction|ChangeUserSuccessAction


export interface UserState {
    currentUser: IStudent|IExpert|IOrganizer|undefined,
    error: string|undefined,
    isLoading: boolean,
    registerSuccess: boolean,
    jwt: string|undefined,
    changeSuccess: boolean
}