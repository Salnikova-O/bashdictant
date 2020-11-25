import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {View} from 'react-native';

import {
    Container,
    FormContainer,
    AuthContainer,
    AuthTitle,
    AuthTitleWrapper,
    Subtitle
} from './auth.styles';
import { useOrientation } from '../../components/OrientationProvider/orientation.provider';
import SocialAuth from '../../components/SocialAuth/social-auth.component';
import Button from '../../UI/Button/Button.component';
import Input from '../../UI/Input/Input.component';
import {Error} from '../../components/common/Error/error.styles';
import Alert from '../../components/Alert/alert.component';
import { useLanguage } from '../../components/LanguageProvider/language.provider';


const validationSchema = yup.object().shape({
    email: yup.string()
       .email('Введите корректный email')
       .required('Введите email'),
    password: yup.string()
       .required('Введите пароль')
       .min(6, 'Пароль должен содержать минимум 6 символов')
 })



const AuthScreen: React.FC = () => {
    const {orientation} = useOrientation()
    const theme = useTheme()
    const [error, setError] = useState<{text:string,type:'success'|'error'}>({text: '', type: 'error'})
    const {language} = useLanguage()



    const closeError = () => {
        setError({text: '', type: 'error'})
    }

    const handleSignIn = ({email, password}: {email: string, password: string}) => {
        setError({text: 'Неверный логин или пароль', type: 'error'})
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
    
        >
            {
            ({handleSubmit, handleChange, values, errors, handleBlur}) => (
                <Container
                orientation={orientation}
                edges={[ 'bottom']}
                >
                    <FormContainer
                    behavior='padding'
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
            </Container>
                )
            }
        </Formik>
    )
}

export default AuthScreen;
