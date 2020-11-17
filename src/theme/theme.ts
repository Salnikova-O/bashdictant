import {DefaultTheme} from 'styled-components';

type ThemesType = {
    'dark': DefaultTheme,
    'light': DefaultTheme
}


export const themes: ThemesType = {
    'dark': {
        palette: {
            background: {
                main: '#000'
            },
            text: {
                main: '#fff'
            }
        }
    },
    'light': {
        palette: {
            background: {
                main: '#fff'
            },
            text: {
                main: '#000'
            }
        }
    }
}