import {DefaultTheme} from 'styled-components';

type ThemesType = {
    'dark': DefaultTheme,
    'light': DefaultTheme
}


export const themes: ThemesType = {
    'dark': {
        palette: {
            background: {
                main: '#fff'
            },
            text: {
                main: '#000',
                primary: '#fff',
                secondary: '#0B5D83',
                grey: '#6E6E6E',
                light: '#AAAAAA',
                error: '#f44336'
            },
            buttons: {
                primary: '#4F871C',
                secondary: '#fff'
            },
            grades: {
                1:  '#DF0000',
                2: '#EC8224',
                3: '#FFD600',
                4: '#BFDE00',
                5: '#4F871C'
            }
        }
    },
    'light': {
        palette: {
            background: {
                main: '#fff'
            },
            text: {
                main: '#000',
                primary: '#fff',
                secondary: '#0B5D83',
                grey: '#6E6E6E',
                light: '#AAAAAA',
                error: '#f44336'
            },
            buttons: {
                primary: '#4F871C',
                secondary: '#fff'
            },
            grades: {
                1:  '#DF0000',
                2: '#EC8224',
                3: '#FFD600',
                4: '#BFDE00',
                5: '#4F871C'
            }
        }
    }
}