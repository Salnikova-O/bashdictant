import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Toast} from 'native-base';

import {
    Container,
    FormContainer,
    AuthContainer,
    AuthTitle,
    AuthTitleWrapper,
    Subtitle,
    ForgotPasswordContainer,
    ForgotPasswordText
} from './auth.styles';
import { useOrientation } from '../../components/OrientationProvider/orientation.provider';
import SocialAuth from '../../components/SocialAuth/social-auth.component';
import Button from '../../UI/Button/Button.component';
import Input from '../../UI/Input/Input.component';
import {Error} from '../../components/common/Error/error.styles';
import Alert from '../../components/Alert/alert.component';
import { useLanguage } from '../../components/LanguageProvider/language.provider';
import {loginUser, clearError} from '../../redux/user/user.actions';
import { userSelectors } from '../../redux/user/user.selectors';
import { useNavigation } from '@react-navigation/native';
import ForgotPassOverlay from '../../components/ForgotPassOverlay/forgot-password-overlay.component';



const validationSchema = yup.object().shape({
    email: yup.string()
       .trim()
       .email('Введите корректный email')
       .required('Введите email'),
    password: yup.string()
        .trim()
       .required('Введите пароль')
       .min(4, 'Пароль должен содержать минимум 4 символа')
 })




const AuthScreen: React.FC = () => {
    const {orientation} = useOrientation()
    const [showResetpassword, setShowResetPassword] = useState(false)
    const theme = useTheme()
    const [error, setError] = useState<{text:string,type:'success'|'error'}>({text: '', type: 'error'})
    const {language} = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const currentUser = useSelector(userSelectors.currentUser)
    const loginError = useSelector(userSelectors.error)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const closeError = () => {
        setError({text: '', type: 'error'})
    }

    const handleSignIn = ({email, password}: {email: string, password: string}) => {
        if(!isSubmitting) {
            setIsSubmitting(true)
            dispatch(loginUser({
                email, password
            }))
        }
    }

    useEffect(() => {
        if (currentUser) {
            setIsSubmitting(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Personal' }],
              });
        }
    }, [currentUser])

    useEffect(() => {
        if (loginError) {
            setIsSubmitting(false)
            Toast.show({
                text: loginError,
                buttonText: 'OK',
                duration: 2000,
                type: 'warning',
                position: 'bottom',
                style: {
                    backgroundColor: '#ff7961',
                }
            })
            dispatch(clearError())
        }
    }, [loginError])


    const toggleResetPassword = () => {
        setShowResetPassword(c => !c)
    }

    return (
        <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        onSubmit={values => handleSignIn(values)}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        >
            {
            ({handleSubmit, handleChange, values, errors, handleBlur}) => (
                <Container
                orientation={orientation}
                edges={[ 'bottom', 'left','right']}
                >
                    <FormContainer
                    orientation={orientation}
                    >

                        <View
                        style={{
                            width: orientation==='PORTRAIT'? '100%': '50%'
                        }}
                        >
                            {
                            error.text.length>0?
                            <Alert
                            onClose={closeError}
                            text={error.text}
                            type={error.type}
                            />
                            :null
                        }
                            <SocialAuth
                            title={language.auth.social}
                            size='lg'

                            />
                        </View>
                        <AuthContainer
                        orientation={orientation}
                        >
                            {
                                orientation==='PORTRAIT'?
                                <Subtitle>{language.auth.or}</Subtitle>
                                : null
                            }
                            <AuthTitleWrapper>
                                <AuthTitle>
                                    {language.auth.authorizationHeader}
                                </AuthTitle>
                            </AuthTitleWrapper>
                            <Input
                            onChangeText={handleChange('email')}
                            value={values.email}
                            placeholder={language.auth.email}
                            onBlur={handleBlur('email')}
                            />
                            <Error>{errors.email}</Error>
                            <Input
                            onChangeText={handleChange('password')}
                            value={values.password}
                            placeholder={language.auth.password}
                            onBlur={handleBlur('password')}
                            password={true}
                            />
                            <Error>{errors.password}</Error>
                        </AuthContainer>
                    </FormContainer>

                    <Button
                    text={language.auth.enter}
                    bg={theme.palette.buttons.primary}
                    font={theme.palette.text.primary}
                    height='50px'
                    onPress={handleSubmit}
                    />
                    <ForgotPasswordContainer
                    onPress={toggleResetPassword}
                    >
                        <ForgotPasswordText>{language.auth.forgotPass}</ForgotPasswordText>
                    </ForgotPasswordContainer>
                    <ForgotPassOverlay
                    isVisible={showResetpassword}
                    onBackdropPress={toggleResetPassword}

                    />
            </Container>
                )
            }
        </Formik>
    )
}

export default AuthScreen;
