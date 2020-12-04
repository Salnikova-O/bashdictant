import {SettingsState, SettingsActionTypes} from './settings/settings.constants';
import {UserState} from './user/user.constants';

export interface RootState {
    settings: SettingsState,
    user: UserState
}


export type RootAction = SettingsActionTypes | any