export const constants = {
    SET_REDIRECT: 'SET_REDIRECT'
}


interface SetRedirectAction {
    type: typeof constants.SET_REDIRECT,
    payload: string|undefined
}


export type RedirectActionTypes = SetRedirectAction


export interface RedirectState {
    redirectRoute: string|undefined,
}