import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import {PixelRatio} from 'react-native';

import {
    ButtonsContainer,
    Title,
    Container,
    VideoContainer,
    VideoInnerContainer
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
    const {width, height} = useSafeAreaFrame()
    const videoId = "5qap5aO4i9A"

    const handleNavigation = (route: string) => {
        navigation.navigate(route)
    }


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
                <VideoInnerContainer>
                    <YoutubePlayer
                        height={PixelRatio.roundToNearestPixel(((width>500? 500: width)-40)*9/16)}
                        play={false}
                        videoId={videoId}
                    />
                </VideoInnerContainer>
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