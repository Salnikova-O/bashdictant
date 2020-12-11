import {ModalsActionTypes,constants} from './modals.constants';




export const openInfoModal = (message:string): ModalsActionTypes => ({
    type: constants.OPEN_INFO,
    payload: message
})


export const closeInfoModal = (): ModalsActionTypes => ({
    type: constants.CLOSE_INFO,
})



export const openProgressModal = (progress:number|null): ModalsActionTypes => ({
    type: constants.OPEN_PROGRESS,
    payload: progress
})


export const closeProgressModal = (): ModalsActionTypes => ({
    type: constants.CLOSE_PROGRESS,
})


export const setProgressModal = (progress:number|null): ModalsActionTypes => ({
    type: constants.SET_PROGRESS,
    payload: progress
})