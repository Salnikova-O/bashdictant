import React, { Fragment, useEffect, useRef, useState } from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {Toast} from 'native-base';
import {CheckBox} from 'react-native-elements';
import {Linking} from 'react-native';

import {clearError, registerUser} from '../../redux/user/user.actions';
import Input from '../../UI/Input/Input.component';
import {
    RegistrationForm,
    AgreementContainer,
    AgreementLink,
    AgreementText,
    CheckboxContainer,
    LinkText
} from './registration-expert.styles';
import { Error } from '../common/Error/error.styles';
import Button from '../../UI/Button/Button.component';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../LanguageProvider/language.provider';
import { RegistrationProps } from '../../screens/Registration/registration.screen';
import { userSelectors } from '../../redux/user/user.selectors';
import { ILanguage } from '../../@types/common';

const validationSchema = (language: ILanguage) =>  yup.object().shape({
    email: yup.string()
       .email(language.errors.email)
       .required(language.errors.required),
    firstName: yup.string()
       .trim()
       .required(language.errors.required),
    lastName: yup.string()
       .trim()
       .required(language.errors.required),
    middleName: yup.string()
       .trim()
       .required(language.errors.required),
    city: yup.string()
       .required(language.errors.required),
    password: yup.string()
        .min(6, language.errors.min6)
        .required(language.errors.required),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], language.errors.passMatch)
        .required(language.errors.required),
    jobTitle: yup.string()
        .required(language.errors.required),
    agree: yup.string()
    .required(language.errors.agreeWithRules)
 })



const RegistrationExpert: React.FC<RegistrationProps> = ({toggleSuccessWindow}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const theme = useTheme()
    const navigation = useNavigation()
    const {language} = useLanguage()
    const dispatch = useDispatch()
    const registrationSuccess = useSelector(userSelectors.registerSuccess)
    const registrationError = useSelector(userSelectors.error)
    const emailRef = useRef('')

    const handleSubmitForm = (values: {
        email: string;
        password: string;
        confirmPassword: string;
        lastName: string;
        firstName: string;
        middleName: string;
        city: string;
        jobTitle: string
    }) => {
        if(!isSubmitting) {
            emailRef.current=values.email
            setIsSubmitting(true)
            dispatch(registerUser({
                ...values,
                role: 'teacher'
            }))
        }
    }

    useEffect(()=> {
        if(registrationSuccess) {
            setIsSubmitting(false)
            toggleSuccessWindow(emailRef.current)
            emailRef.current=''
            dispatch(clearError())
        }
    }, [registrationSuccess])

    useEffect(() => {
        if (registrationError) {
            emailRef.current=''
            setIsSubmitting(false)
            Toast.show({
                text: registrationError,
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
    }, [registrationError])


    const handleLinking = (type: 'user'|'data'|'cookie') => {
        let url: string;
        if (type==='user') {
            url = 'https://lk.bashdiktant.ru/politics/user_agreement.html'
        } else if (type==='data') {
            url ='https://lk.bashdiktant.ru/politics/policy_the_processing_of_presonal_data.html'
        } else  {
            url ='https://lk.bashdiktant.ru/politics/policy_use_cookie_file.html'
        }
        Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url)
            }
        })
        .catch(err => {
            console.log(err)
        })
    } 

    return (
        <RegistrationForm>

            <Formik
            initialValues={{
                email: '', 
                password: '', 
                confirmPassword: '',
                lastName: '',
                firstName: '',
                middleName: '',
                city: '',
                jobTitle: '',
                agree: ''
            }}
            onSubmit={(values) => handleSubmitForm(values) }
            validationSchema={validationSchema(language)}
            validateOnChange={false}
            
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <Fragment>
                        <Input
                        onChangeText={handleChange('email')}
                        value={values.email}
                        placeholder={language.registration.tabs.expert.email}
                        />
                        <Error>{errors.email}</Error>
                        <Input
                        onChangeText={handleChange('password')}
                        password={true}
                        value={values.password}
                        placeholder={language.registration.tabs.expert.password}
                        />
                        <Error>{errors.password}</Error>
                        <Input
                        onChangeText={handleChange('confirmPassword')}
                        password={true}
                        value={values.confirmPassword}
                        placeholder={language.registration.tabs.expert.confirm}
                        />
                        <Error>{errors.confirmPassword}</Error>
                        <Input
                        onChangeText={handleChange('lastName')}
                        value={values.lastName}
                        placeholder={language.registration.tabs.expert.lastName}
                        />
                        <Error>{errors.lastName}</Error>
                        <Input
                        onChangeText={handleChange('firstName')}
                        value={values.firstName}
                        placeholder={language.registration.tabs.expert.firstName}
                        />
                        <Error>{errors.firstName}</Error>
                        <Input
                        onChangeText={handleChange('middleName')}
                        value={values.middleName}
                        placeholder={language.registration.tabs.expert.middleName}
                        />
                        <Error>{errors.middleName}</Error>
                        <Input
                        onChangeText={handleChange('city')}
                        value={values.city}
                        placeholder={language.registration.tabs.expert.city}
                        />
                        <Error>{errors.city}</Error>
                        <Input
                        onChangeText={handleChange('jobTitle')}
                        value={values.jobTitle}
                        placeholder={language.registration.tabs.expert.jobTitle}
                        />
                        <Error>{errors.jobTitle}</Error>
                        <CheckboxContainer>
                            <CheckBox
                            checked={values.agree==='agree'}
                            onPress={() => {
                                setFieldValue('agree',values.agree? '': 'agree')
                            }}
                            containerStyle={{
                                margin: 0,
                                padding: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            checkedColor={theme.palette.buttons.primary}
                            uncheckedColor={theme.palette.buttons.primary}
                            />
                            <AgreementContainer>
                                <AgreementText>
                                    {language.agree}:{'  '}
                                </AgreementText>

                                <LinkText onPress={() => handleLinking('user')}>{language.policy.userAgreement}, </LinkText>


                                <LinkText onPress={() => handleLinking('data')}>{language.policy.personalData}, </LinkText>
                            

                                <LinkText onPress={() => handleLinking('cookie')}>{language.policy.cookies}</LinkText>

                            </AgreementContainer>
                        </CheckboxContainer>
                        <Error>{errors.agree}</Error>
                        <Button
                        bg={theme.palette.buttons.primary}
                        font={theme.palette.text.primary}
                        height='50px'
                        text={language.registration.tabs.expert.send}
                        onPress={handleSubmit}
                        marginTop={10}
                        />
                    </Fragment>
                )}
            </Formik>
        </RegistrationForm>
    )   
}


export default RegistrationExpert;