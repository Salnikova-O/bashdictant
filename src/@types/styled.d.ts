import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        palette: {
            text: {
                main: string,
            },
            background: {
                main: string,
            },

        }
    }
  }