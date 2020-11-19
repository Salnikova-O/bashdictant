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

const MainScreen:React.FC = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const {orientation} = useOrientation()


    const handleNavigation = (route: string) => {
        navigation.navigate(route)
    }


    console.log(orientation)

    return(
        <Container
        orientation={orientation}
        edges={['left', 'right', 'bottom']}
        >
            {
                orientation==='PORTRAIT'?
                <Title>Здравствуйте! Приветствуем вас на странице регистрации диктанта</Title>
                :null
            }
            <VideoContainer>
                <YouTube
                videoId='o-qafF8IAE0'
                play={false}
                fullscreen={false}
                style={{width: '100%', height: 300, borderRadius: 6}}
                />
            </VideoContainer>
            <ButtonsContainer orientation={orientation}>
                {
                    orientation==='LANDSCAPE'?
                    <Title>Здравствуйте! Приветствуем вас на странице регистрации диктанта</Title>
                    :null
                }
                <Button
                text='Регистрация'
                bg={theme.palette.buttons.primary}
                font={theme.palette.text.primary}
                height='40px'
                onPress={ () => handleNavigation('Registration')}
                />
                <Button
                text='Авторизация'
                bg={theme.palette.buttons.secondary}
                font={theme.palette.text.secondary}
                border={theme.palette.text.secondary}
                height='40px'
                onPress={() => handleNavigation('Auth')}
                />
                <SocialAuth
                title='Или войти через'
                />
            </ButtonsContainer>
        </Container>
    )
}


export default MainScreen;