import {constants, SettingsActionTypes, SettingsState} from './settings.constants';


const INITIAL_STATE: SettingsState = {
    theme: 'light',
    language: 'Russian'
}


export const settingsReducer = (state=INITIAL_STATE, action:SettingsActionTypes) => {
    switch (action.type) {
        case constants.CHANGE_THEME: 
            return {
                ...state,
                theme: action.payload
            }
        case constants.CHANGE_LANGUAGE: 
            return {
                ...state,
                language: action.payload
            }
        default:
            return state
    }
}


