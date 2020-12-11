import {combineReducers} from 'redux';
import { modalsReducer } from './modals/modals.reducer';
import { redirectReducer } from './redirect/redirect.reducer';
import {settingsReducer} from './settings/settings.reducer';
import {userReducer} from './user/user.reducer';

export const rootReducer = combineReducers({
    settings: settingsReducer,
    user: userReducer,
    modals: modalsReducer,
    redirect: redirectReducer
})



export type RootState = ReturnType<typeof rootReducer>