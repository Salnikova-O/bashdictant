import {RedirectActionTypes, constants} from './redirect.constants';


export const setRedirect = (route:string|undefined):RedirectActionTypes => ({
    type: constants.SET_REDIRECT,
    payload: route
}) 