import React, { useMemo, useRef, useState } from 'react';
import {Overlay, OverlayProps} from 'react-native-elements';
import Input from '../../UI/Input/Input.component';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Animated} from 'react-native';

import {
    IconButton,
    ResetPassOuterContainer,
    SuccessMessage,
    ResetPassContainer,
    ResetPassSlide
} from './forgot-pass-overlay.styles';
import { useLanguage } from '../LanguageProvider/language.provider';
import { ILanguage } from '../../@types/common';
import { Error } from '../common/Error/error.styles';
import Button from '../../UI/Button/Button.component';
import { useTheme } from 'styled-components';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';


interface ForgotPassProps {
    isVisible: boolean,
    onBackdropPress: () => void
}

const ForgotPassOverlay: React.FC<ForgotPassProps> = ({isVisible,onBackdropPress}) => {
    const {language} = useLanguage()
    const [success, setSuccess] = useState(false)
    const theme = useTheme()
    const translate = useRef(new Animated.Value(0)).current
    const {width} = useSafeAreaFrame()
    const {left,right} = useSafeAreaInsets()
    const interTranslate = translate.interpolate({
        inputRange: [0,1],
        outputRange: [0, width<500?-(width*0.9-25):-((500)-25)]
    })


    const getValidation = (language:ILanguage) => {
        return  yup.object().shape({
            email: yup.string()
               .email(language.errors.email)
               .required(language.errors.required),
        })
    }


    const getValidationSchema = useMemo(() => {
        getValidation(language)
    }, [language])


    const handleSubmit = ({email}: {email:string}) => {
        Animated.timing(translate,{
            useNativeDriver: true,
            duration: 300,
            toValue: 1
        }).start()
    }

    const handleClose = () => {
        onBackdropPress()
    }


    return (
        <Overlay
        isVisible={isVisible}
        onBackdropPress={handleClose}
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
            <ResetPassOuterContainer>
                <Formik
                initialValues={{email: ''}}
                validationSchema={getValidationSchema}
                onSubmit={values => handleSubmit(values)}
                >
                {({values, handleSubmit,errors, handleChange})=> (
                    <ResetPassContainer
                    style={{
                        transform: [{translateX:interTranslate}]
                    }}
                    >
                        <ResetPassSlide
                        style={{marginRight: 25}}
                        >
                            <SuccessMessage>{language.reset.passReset}</SuccessMessage>
                                <Input
                                onChangeText={handleChange('email')}
                                value={values.email}
                                placeholder={language.auth.email}
                                />
                                <Error>{errors.email}</Error>
                                <Button
                                text={language.continue}
                                onPress={handleSubmit}
                                bg={theme.palette.buttons.primary}
                                font={theme.palette.text.primary}
                                height='50px'
                                />
                        </ResetPassSlide>
                        <ResetPassSlide>
                            <SuccessMessage>{language.reset.success}</SuccessMessage>
                            <Button
                            text={language.continue}
                            onPress={handleClose}
                            bg={theme.palette.buttons.primary}
                            font={theme.palette.text.primary}
                            height='50px'
                            />
                        </ResetPassSlide>
                    </ResetPassContainer>
                        )}
                </Formik>
            </ResetPassOuterContainer>
        </Overlay>
    )
}


export default ForgotPassOverlay;
