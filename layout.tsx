import React from 'react';
import { ThemeProvider } from 'styled-components';
import {useSelector} from 'react-redux';

import Navigation from './src/navigation/navigation';
import {themes} from './src/theme/theme';
import {settingsSelectors} from './src/redux/settings/settings.selectors';
import LanguageProvider from './src/components/LanguageProvider/language.provider';


const Layout: React.FC = () => {
    const theme = useSelector(settingsSelectors.theme)


    return (
        <ThemeProvider
        theme={themes[theme]}
        >
            <LanguageProvider>
                <Navigation/>
            </LanguageProvider>
        </ThemeProvider>
    )
} 


export default Layout;