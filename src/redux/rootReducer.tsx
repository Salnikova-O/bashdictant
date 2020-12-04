import {combineReducers} from 'redux';
import {settingsReducer} from './settings/settings.reducer';
import {userReducer} from './user/user.reducer';

export const rootReducer = combineReducers({
    settings: settingsReducer,
    user: userReducer
})



export type RootState = ReturnType<typeof rootReducer>