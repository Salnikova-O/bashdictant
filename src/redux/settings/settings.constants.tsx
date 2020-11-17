export const constants = {
    CHANGE_THEME: 'CHANGE_THEME',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE'
}


export type ThemeType = 'dark'|'light'
export type LanguageType = 'en'| 'Russian' | 'bash'


interface ChangeThemeAction {
    type: typeof constants.CHANGE_THEME,
    payload: ThemeType
} 

interface ChangeLanguageAction {
    type: typeof constants.CHANGE_LANGUAGE,
    payload: LanguageType
} 


export type SettingsActionTypes = ChangeLanguageAction | ChangeThemeAction


export interface SettingsState {
    theme: ThemeType,
    language: LanguageType
}