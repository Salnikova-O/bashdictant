export const constants = {
    OPEN_INFO: 'OPEN_INFO',
    CLOSE_INFO: 'CLOSE_INFO',
    OPEN_PROGRESS: 'OPEN_PROGRESS',
    SET_PROGRESS: 'SET_PROGRESS',
    CLOSE_PROGRESS: 'CLOSE_PROGRESS'
}


interface OpenInfoAction {
    type: typeof constants.OPEN_INFO,
    payload: string
} 

interface CloseInfoAction {
    type: typeof constants.CLOSE_INFO,
} 

interface OpenProgressAction {
    type: typeof constants.OPEN_PROGRESS,
    payload: number|null
} 

interface CloseProgressAction {
    type: typeof constants.CLOSE_PROGRESS,
} 


interface SetProgressAction {
    type: typeof constants.SET_PROGRESS,
    payload: number|null
} 


export type ModalsActionTypes = OpenInfoAction|CloseInfoAction|SetProgressAction|CloseProgressAction|OpenProgressAction


export interface ModalsState {
    infoOpen:boolean,
    infoMessage: string,
    progress: number|null,
    progressOpen: boolean
}