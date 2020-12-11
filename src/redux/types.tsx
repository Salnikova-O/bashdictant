import { ModalsState } from './modals/modals.constants';
import { RedirectState } from './redirect/redirect.constants';
import {SettingsState, SettingsActionTypes} from './settings/settings.constants';
import {UserState} from './user/user.constants';

export interface RootState {
    settings: SettingsState,
    user: UserState,
    modals: ModalsState,
    redirect: RedirectState
}


export type RootAction = SettingsActionTypes | any