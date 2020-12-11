import {constants,RedirectActionTypes,RedirectState} from './redirect.constants';


const INITIAL_STATE:RedirectState = {
    redirectRoute: undefined
}


export const redirectReducer = (state=INITIAL_STATE, action: RedirectActionTypes):RedirectState => {
    switch (action.type) {
        case constants.SET_REDIRECT: 
            return {
                redirectRoute: action.payload
            }
        default:
            return state
    }
}


