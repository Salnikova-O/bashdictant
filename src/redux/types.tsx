import {SettingsState, SettingsActionTypes} from './settings/settings.constants';


export interface RootState {
    settings: SettingsState
}


export type RootAction = SettingsActionTypes | any