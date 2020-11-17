import {constants, LanguageType,ThemeType,SettingsActionTypes} from './settings.constants';




export const changeTheme = (themeName: ThemeType): SettingsActionTypes => ({
    type: constants.CHANGE_THEME,
    payload: themeName
})


export const changeLanguage = (language: LanguageType): SettingsActionTypes => ({
    type: constants.CHANGE_LANGUAGE,
    payload: language
})