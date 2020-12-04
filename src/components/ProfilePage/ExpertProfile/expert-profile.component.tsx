import React, { Fragment, useEffect, useState } from 'react';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import { useTheme } from 'styled-components';
import {Toast} from 'native-base';

import { useLanguage } from '../../LanguageProvider/language.provider';
import {
    ProfileForm
} from './expert-profile.styles';
import Button from '../../../UI/Button/Button.component';
import { Error } from '../../common/Error/error.styles';
import Input from '../../../UI/Input/Input.component';

import { userSelectors } from '../../../redux/user/user.selectors';
import {changeUser, clearError} from '../../../redux/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { IExpert } from '../../../@types/common';


const validationSchema = yup.object().shape({
    email: yup.string()
       .email('Введите корректный email')
       .required('Введите email'),
    firstName: yup.string()
       .trim()
       .required('Обязательное поле'),
    lastName: yup.string()
       .trim()
       .required('Обязательное поле'),
    middleName: yup.string()
       .trim()
       .required('Обязательное поле'),
    city: yup.string()
       .required('Обязательное поле'),
    password: yup.string()
        .min(6, 'Минимум 6 символов'),
    newPassword: yup.string()
        .min(6, 'Минимум 6 символов'),
    jobTitle: yup.string()
        .required('Обязательное поле'),
    extraEmails: yup.array()
    .of(
        yup.string()
        .email('Введите корректный email')
        )
 })

 if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }


const ExpertProfile: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const theme = useTheme()
    const {language} = useLanguage()
    const currentUser= useSelector(userSelectors.currentUser) as IExpert|undefined 
    const changeSuccess = useSelector(userSelectors.changeSuccess)
    const jwt = useSelector(userSelectors.jwt)
    const changeError = useSelector(userSelectors.error)
    const dispatch = useDispatch()
    const [initialValues, setInitialValues] = useState({
        email: '', 
        password: '', 
        newPassword: '',
        lastName: '',
        firstName: '',
        middleName: '',
        city: '',
        jobTitle: '',
        extraEmails: []
    })

    useEffect(() => {
        if(currentUser) {
            setInitialValues({
                email: currentUser.email,
                city: currentUser.address,
                extraEmails: [],
                firstName: currentUser.first_name,
                jobTitle: currentUser.info,
                lastName: currentUser.last_name,
                middleName: currentUser.middle_name,
                newPassword: '',
                password: ''
            })
        }
    }, [currentUser])


    useEffect(() => {
        if (changeError) {
            setIsSubmitting(false)
            Toast.show({
                text: language.errors.changeFailed,
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
    }, [changeError])

    useEffect(() => {
        if(changeSuccess) {
            setIsSubmitting(false)
            Toast.show({
                text: language.messages.changeSuccess,
                buttonText: 'OK',
                duration: 2000,
                type: 'success',
                position: 'bottom',
                style: {
                    backgroundColor: '#a2cf6e',
                }
            })
            dispatch(clearError())
        }
    }, [changeSuccess])

    const handleSubmitForm = (values: {
        email: string;
        password: string;
        newPassword: string;
        lastName: string;
        firstName: string;
        middleName: string;
        city: string;
        jobTitle: string;
        extraEmails: string[]
    }) => {
        if(!isSubmitting&&jwt) {
            setIsSubmitting(true)
            dispatch(changeUser({
                ...values,
                token: jwt,
                role: 'teacher'
            }))
        }
    }


    return (
        <ProfileForm>

            <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmitForm(values) }
            validationSchema={validationSchema}
            validateOnChange={false}
            enableReinitialize={true}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <Fragment>
                        <FieldArray
                        name='extraEmails'
                        render={helpers => (
                            <Fragment>
                            <Input
                            onChangeText={handleChange('email')}
                            value={values.email}
                            placeholder={language.registration.tabs.expert.email}
                            edit={true}
                            // showAdd={true}
                            // onAdd={() =>{
                            //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                            //     helpers.push({[`extraEmails${values.extraEmails.length}`]:''})
                            // }}
                            />
                            <Error>{errors.email}</Error>
                            {
                                values.extraEmails.map((mail,index) => {
                                    console.log(values.extraEmails)
                                    return(
                                    <Fragment key={index}>

                                        <Input
                                        onChangeText={handleChange(`extraEmails.${index}`)}
                                        value={values.extraEmails[index]}
                                        placeholder={language.profile.form.extraEmail}
                                        />
                                        <Error>{errors.extraEmails?errors.extraEmails[index]: ''}</Error>
                                    </Fragment>)
                                })
                            }
                            </Fragment>
                        )}
                        />
                        <Input
                        onChangeText={handleChange('password')}
                        password={true}
                        value={values.password}
                        placeholder={language.profile.form.oldPassword}
                        edit={true}
                        />
                        <Error>{errors.password}</Error>
                        <Input
                        onChangeText={handleChange('newPassword')}
                        password={true}
                        value={values.newPassword}
                        placeholder={language.profile.form.newPassword}
                        edit={true}
                        />
                        <Error>{errors.newPassword}</Error>
                        <Input
                        onChangeText={handleChange('lastName')}
                        value={values.lastName}
                        placeholder={language.registration.tabs.expert.lastName}
                        edit={true}
                        />
                        <Error>{errors.lastName}</Error>
                        <Input
                        onChangeText={handleChange('firstName')}
                        value={values.firstName}
                        placeholder={language.registration.tabs.expert.firstName}
                        edit={true}
                        />
                        <Error>{errors.firstName}</Error>
                        <Input
                        onChangeText={handleChange('middleName')}
                        value={values.middleName}
                        placeholder={language.registration.tabs.expert.middleName}
                        edit={true}
                        />
                        <Error>{errors.middleName}</Error>
                        <Input
                        onChangeText={handleChange('city')}
                        value={values.city}
                        placeholder={language.registration.tabs.expert.city}
                        edit={true}
                        />
                        <Error>{errors.city}</Error>
                        <Input
                        onChangeText={handleChange('jobTitle')}
                        value={values.jobTitle}
                        placeholder={language.registration.tabs.expert.jobTitle}
                        edit={true}
                        />
                        <Error>{errors.jobTitle}</Error>
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
        </ProfileForm>
    )   
}


export default ExpertProfile;