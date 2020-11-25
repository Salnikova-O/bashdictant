import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import YouTube from 'react-native-youtube';

import {
    ButtonsContainer,
    Title,
    Container,
    VideoContainer
} from './main.styles';

import Button from '../../UI/Button/Button.component';
import { useOrientation } from '../../components/OrientationProvider/orientation.provider';
import SocialAuth from '../../components/SocialAuth/social-auth.component';
import { useLanguage } from '../../components/LanguageProvider/language.provider';

const MainScreen:React.FC = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const {orientation} = useOrientation()
    const {language, currentLanguage} = useLanguage()

    const handleNavigation = (route: string) => {
        navigation.navigate(route)
    }


    console.log(language, currentLanguage)

    return(
        <Container
        orientation={orientation}
        edges={['left', 'right', 'bottom']}
        >
            {
                orientation==='PORTRAIT'?
                <Title>{language.main.welcome}</Title>
                :null
            }
            <VideoContainer>
                <YouTube
                videoId='o-qafF8IAE0'
                play={false}
                fullscreen={false}
                style={{width: '100%', height: 300, borderRadius: 6}}
                // apiKey=''
                />
            </VideoContainer>
            <ButtonsContainer orientation={orientation}>
                {
                    orientation==='LANDSCAPE'?
                    <Title>{language.main.welcome}</Title>
                    :null
                }
                <Button
                text={language.main.registration}
                bg={theme.palette.buttons.primary}
                font={theme.palette.text.primary}
                height='40px'
                onPress={ () => handleNavigation('Registration')}
                />
                <Button
                text={language.main.authorization}
                bg={theme.palette.buttons.secondary}
                font={theme.palette.text.secondary}
                border={theme.palette.text.secondary}
                height='40px'
                onPress={() => handleNavigation('Auth')}
                />
                <SocialAuth
                title={language.main.loginWith}
                />
            </ButtonsContainer>
        </Container>
    )
}


export default MainScreen;