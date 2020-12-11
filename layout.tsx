import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Root} from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import Navigation from './src/navigation/navigation';
import {themes} from './src/theme/theme';
import {settingsSelectors} from './src/redux/settings/settings.selectors';
import LanguageProvider from './src/components/LanguageProvider/language.provider';
import Header from './src/components/Header/header.component';
import OrientationProvider from './src/components/OrientationProvider/orientation.provider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InfoModal from './src/components/InfoModal/info-modal.component';
import { modalsSelectors } from './src/redux/modals/modals.selectors';
import { closeInfoModal } from './src/redux/modals/modals.actions';
import UploadProgress from './src/components/Dictant/FileUpload/UploadProgress/upload-progress.component';
import { userSelectors } from './src/redux/user/user.selectors';

const Layout: React.FC = () => {
    const theme = useSelector(settingsSelectors.theme)
    const infoOpen = useSelector(modalsSelectors.infoOpen)
    const infoMessage = useSelector(modalsSelectors.infoMessage)
    const progress = useSelector(modalsSelectors.progress)
    const progressOpen = useSelector(modalsSelectors.progressOpen)
    const dispatch = useDispatch()
    const isLoading = useSelector(userSelectors.isLoading)

    useEffect(() => {
        SplashScreen.hide()
    },[])

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
                            <InfoModal
                            message={infoMessage}
                            open={infoOpen}
                            onClose={() => dispatch(closeInfoModal())}
                            />
                            {
                                progressOpen||isLoading ?
                                <UploadProgress
                                progress={progress}
                                />
                                :null
                            }
                        </LanguageProvider>
                    </OrientationProvider>
                </ThemeProvider>
            </SafeAreaProvider>
        </Root>
    )
} 


export default Layout;