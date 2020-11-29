import 'styled-components';
import { GradeTypes } from './common';

declare module 'styled-components' {
    export interface DefaultTheme {
        palette: {
            text: {
                main: string,
                primary: string,
                secondary:string,
                grey: string,
                light:string,
                error: string
            },
            background: {
                main: string,
                light: string
            },
            buttons: {
                primary: string,
                secondary: string
            },
            grades: {
                '1': string,
                '2': string,
                '3': string,
                '4': string,
                '5': string,
            }

        }
    }
  }