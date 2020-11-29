import React from 'react';
import { ThemeProvider } from 'styled-components';
import {useSelector} from 'react-redux';
import {Root} from 'native-base';

import Navigation from './src/navigation/navigation';
import {themes} from './src/theme/theme';
import {settingsSelectors} from './src/redux/settings/settings.selectors';
import LanguageProvider from './src/components/LanguageProvider/language.provider';
import Header from './src/components/Header/header.component';
import OrientationProvider from './src/components/OrientationProvider/orientation.provider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Layout: React.FC = () => {
    const theme = useSelector(settingsSelectors.theme)


    return (
        <Root>
            <SafeAreaProvider>
                <ThemeProvider
                theme={themes[theme]}
                >
                    <OrientationProvider>
                        <LanguageProvider>
                            <Header/>
                            <Navigation/>
                        </LanguageProvider>
                    </OrientationProvider>
                </ThemeProvider>
            </SafeAreaProvider>
        </Root>
    )
} 


export default Layout;