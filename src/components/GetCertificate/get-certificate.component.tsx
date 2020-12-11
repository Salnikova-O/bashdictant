import React, { Fragment, useRef, useState } from 'react';
import { Overlay } from 'react-native-elements';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import {Animated} from 'react-native';

import { setRedirect } from '../../redux/redirect/redirect.actions';
import Button from '../../UI/Button/Button.component';
import { useLanguage } from '../LanguageProvider/language.provider';

import {
    GetCertificateContainer,
    GetCertificateOuterContainer,
    GetCertificateSlide,
    IconButton,
    SuccessMessage
} from './get-certificate.styles';


const GetCertificate: React.FC = () => {
    const theme = useTheme()
    const {language} = useLanguage()
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const translate = useRef(new Animated.Value(0)).current
    const {width} = useSafeAreaFrame()
    

    const interTranslate = translate.interpolate({
        inputRange: [0,1],
        outputRange: [0, width<500?-(width*0.9-25):-((500)-25)]
    })



    const handleGetCertificate = () => {
        Animated.timing(translate,{
            useNativeDriver: true,
            duration: 300,
            toValue: 1
        }).start()
    }

    const toggleOverlay = () => {
        setShowMenu(c => !c)
    }

    const handleRedirect = () => {
        toggleOverlay()
        dispatch(setRedirect('checkPersonal'))
    }

    return (
        <Fragment>
            <Button
            bg={theme.palette.background.main}
            font={theme.palette.buttons.primary}
            height='50px'
            text={language.getCertificate}
            onPress={toggleOverlay}
            border={theme.palette.buttons.primary}
            marginBottom={25}
            />
            <Overlay
            isVisible={showMenu}
            onBackdropPress={toggleOverlay}
            fullScreen={false}
            overlayStyle={{
                width:'90%',
                maxWidth: 500,
                height: 300,
                borderRadius: 8,
                padding: 0
            }}
            animationType='fade'
            supportedOrientations={['landscape','portrait']}
            >
                <GetCertificateOuterContainer>
                        <GetCertificateContainer
                        style={{
                            transform: [{translateX:interTranslate}]
                        }}
                        >
                            <GetCertificateSlide
                            style={{marginRight: 25}}
                            >
                                <SuccessMessage>{language.certificate.mainInfo}</SuccessMessage>
                                <Button
                                text={language.certificate.check}
                                onPress={handleRedirect}
                                bg={theme.palette.background.main}
                                font={theme.palette.buttons.primary}
                                border={theme.palette.buttons.primary}
                                height='50px'
                                />
                                <Button
                                text={language.certificate.confirm}
                                onPress={handleGetCertificate}
                                bg={theme.palette.buttons.primary}
                                font={theme.palette.text.primary}
                                height='50px'
                                />
                            </GetCertificateSlide>
                            <GetCertificateSlide>
                                <SuccessMessage>{language.certificate.success}</SuccessMessage>
                                <Button
                                text={language.continue}
                                onPress={toggleOverlay}
                                bg={theme.palette.buttons.primary}
                                font={theme.palette.text.primary}
                                height='50px'
                                />
                            </GetCertificateSlide>
                        </GetCertificateContainer>
                </GetCertificateOuterContainer>
            </Overlay>
        </Fragment>
    )
} 



export default GetCertificate;