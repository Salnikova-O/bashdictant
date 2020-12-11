import {ModalsState,ModalsActionTypes,constants} from './modals.constants';


const INITIAL_STATE: ModalsState = {
    infoMessage: '',
    infoOpen: false,
    progress: null,
    progressOpen: false,
}


export const modalsReducer = (state=INITIAL_STATE, action:ModalsActionTypes):ModalsState => {
    switch (action.type) {
        case constants.OPEN_INFO: 
            return {
                ...state,
                infoMessage: (action as any).payload,
                infoOpen: true
            }
        case constants.CLOSE_INFO: 
            return {
                ...state,
                ...INITIAL_STATE
            }
        case constants.CLOSE_PROGRESS: 
            return {
                ...INITIAL_STATE
            }
        case constants.OPEN_PROGRESS: 
            return {
                ...INITIAL_STATE,
                progress: (action as any).payload,
                progressOpen: true
            }
        case constants.SET_PROGRESS: 
            return {
                ...state,
                progress: (action as any).payload,
            }
        default:
            return state
    }
}


