import {constants, UserState, UserActionTypes} from './user.constants';


const INITIAL_STATE:UserState = {
    currentUser: undefined,
    error: undefined,
    isLoading: false,
    jwt: undefined,
    registerSuccess: false,
    changeSuccess: false
} 

export const userReducer = (state=INITIAL_STATE, action:UserActionTypes):UserState => {
    switch (action.type) {
        case constants.LOGIN_USER_PENDING:
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        case constants.LOGIN_USER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: (action as any).payload 
            }
        case constants.LOGIN_USER_SUCCESS: 
            return {
                ...state,
                isLoading:false,
                error: undefined,
                currentUser: (action as any).payload
            }
        case constants.SAVE_JWT:
            return {
                ...state,
                jwt: (action as any).payload
            }
        case constants.REGISTER_USER_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                registerSuccess: true
            }
        case constants.REGISTER_USER_PENDING:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                registerSuccess: false
            }
        case constants.REGISTER_USER_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: (action as any).payload
            }
        case constants.LOGOUT: 
            return INITIAL_STATE
        case constants.CHANGE_USER_PENDING: 
            return {
                ...state,
                isLoading:true,
                error: undefined,
                changeSuccess: false
            }
        case constants.CHANGE_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: (action as any).payload,
                changeSuccess: false
            }
        case constants.CHANGE_USER_SUCCESS:
            return {
                ...state,
                currentUser: (action as any).payload,
                error: undefined,
                isLoading: false,
                changeSuccess: true
            }
        case constants.CLEAR_USER_ERRORS: 
            return {
                ...state,
                error: undefined,
                changeSuccess: false,
                registerSuccess: false
            }
        default:
            return state
    }
}