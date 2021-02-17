import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import {Alert, PixelRatio} from 'react-native';
import axios from 'axios';
import moment from 'moment';

import {API_URL} from '../../config';
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
import DictantWaitingZone from '../../components/DictantWaitingZone/dictant-waiting-zone.component';
import { Text } from 'react-native-svg';
import { View } from 'native-base';
import BackgroundImage from '../../components/BackgroundImage/background-image.component';

const MainScreen:React.FC = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const {orientation} = useOrientation()
    const {language, currentLanguage} = useLanguage()
    const {width, height} = useSafeAreaFrame()
    const [videoId, setVideoId] =  useState('')
    const [dictantStart, setDictantStart] = useState<Date|undefined>()
    const isStarted = dictantStart? moment(dictantStart).utc().isBefore(moment().utc()) :false
    const handleNavigation = (route: string) => {
        navigation.navigate(route)
    }

    const parseYoutubeURL = (url:string):string  => {
        const query = url.split('?')[1]
        const [key, value] =  query.split('=')
        if (key==='v') {
            return value
        }
        return "XTaPHuXGLvA"
    }



    useFocusEffect(
        React.useCallback(() => {
            axios.get(`${API_URL}/timedictation?level=main`)
            .then((response) => {
                setVideoId(parseYoutubeURL(response.data.url))
                setDictantStart(response.data.time)
            })
            .catch((err) => {
                Alert.alert(JSON.stringify(err.response),JSON.stringify(err) )
                console.log(err.response)
            })
        },[])
    )


    return(
        <Container
        orientation={orientation}
        edges={['left', 'right', 'bottom']}
        >
            <BackgroundImage />
            {
                orientation==='PORTRAIT'?
                <Title>{language.main.welcome}</Title>
                :null
            }
            <VideoContainer>
                <VideoInnerContainer>
                    {
                        isStarted&&videoId?
                        <YoutubePlayer
                            height={PixelRatio.roundToNearestPixel(((width>500? 500: width)-40)*9/16)}
                            play={false}
                            videoId={videoId}
                        />
                        :dictantStart?
                        <View style={{
                            height:PixelRatio.roundToNearestPixel(((width>500? 500: width)-40)*9/16),
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.08)'
                        }}>
                            <DictantWaitingZone
                            startingDate={dictantStart}
                            hideButton={true}
                            />
                        </View>
                        :null
                    }
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