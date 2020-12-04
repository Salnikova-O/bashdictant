import React, { Fragment, useEffect, useState } from 'react';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import {CheckBox} from 'react-native-elements'
import {TouchableOpacity, View, Platform, UIManager, LayoutAnimation} from 'react-native';
import {Toast} from 'native-base';

import { userSelectors } from '../../../redux/user/user.selectors';
import {changeUser, clearError} from '../../../redux/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';

import {
    RegistrationForm,
    Title,
    CheckboxContainer
} from './organizer-profile.styles';

import { useTheme } from 'styled-components';
import { useLanguage } from '../../LanguageProvider/language.provider';
import Input from '../../../UI/Input/Input.component';
import { Error } from '../../common/Error/error.styles';
import Button from '../../../UI/Button/Button.component';





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
        .trim()
       .required('Обязательное поле'),
    password: yup.string()
        .min(6, 'Минимум 6 символов'),
    newPassword: yup.string()
        .min(6, 'Минимум 6 символов'),
    phone: yup.number()
        .required('Обязательное поле'),
    social: yup.string()
        .trim()
        .required('Обязательное поле'),
    studentNumber: yup.number()
        .min(1, 'Минимум 1 участник')
        .required('Обязательное поле'),
    dictantType: yup.string()
        .required('Обязательное поле'),
    secretCode: yup.string()
        .trim()
        .required('Обязательное поле')
 })

 if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }


const OrganizerProfile: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const theme = useTheme()
    const {language} = useLanguage()
    const currentUser = useSelector(userSelectors.currentUser)
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
        phone: '',
        social: '',
        studentNumber: '',
        dictantType: '',
        secretCode: '',
        extraEmails: [],
        extraPhones: []
    })


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
        phone: string,
        social: string,
        studentNumber: string,
        dictantType: string,
        secretCode: string,
        extraEmails: string[],
        extraPhones: string[]
    }) => {
        if(!isSubmitting&&jwt) {
            setIsSubmitting(true)
            dispatch(changeUser({
                ...values,
                token: jwt,
                role: 'organizer'
            }))
        }
    }


    return (
        <RegistrationForm>

            <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmitForm(values) }
            validationSchema={validationSchema}
            validateOnChange={false}
            enableReinitialize={true}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <Fragment>
                        <FieldArray
                        name='extraEmails'
                        render={helpers => (
                            <Fragment>
                            <Input
                            onChangeText={handleChange('email')}
                            value={values.email}
                            placeholder={language.registration.tabs.organizer.email}
                            edit={true}
                            showAdd={true}
                            onAdd={() =>{
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                                helpers.push({[`extraEmails${values.extraEmails.length}`]:''})
                            }}
                            />
                            <Error>{errors.email}</Error>
                            {
                                values.extraEmails.map((mail,index) => {
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
                        placeholder={language.registration.tabs.organizer.password}
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
                        placeholder={language.registration.tabs.organizer.lastName}
                        edit={true}
                        />
                        <Error>{errors.lastName}</Error>
                        <Input
                        onChangeText={handleChange('firstName')}
                        value={values.firstName}
                        placeholder={language.registration.tabs.organizer.firstName}
                        edit={true}
                        />
                        <Error>{errors.firstName}</Error>
                        <Input
                        onChangeText={handleChange('middleName')}
                        value={values.middleName}
                        placeholder={language.registration.tabs.organizer.middleName}
                        edit={true}
                        />
                        <Error>{errors.middleName}</Error>
                        <FieldArray
                        name='extraPhones'
                        render={helpers => (
                            <Fragment>
                                <Input
                                onChangeText={handleChange('phone')}
                                value={values.phone}
                                placeholder={language.registration.tabs.organizer.phone}
                                onlyNumbers={true}
                                edit={true}
                                showAdd={true}
                                onAdd={() =>{
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                                    helpers.push({[`extraPhones${values.extraEmails.length}`]:''})
                                }}
                                />
                                <Error>{errors.phone}</Error>
                                {
                                    values.extraPhones.map((mail,index) => {
                                        return(
                                        <Fragment key={index}>

                                            <Input
                                            onChangeText={handleChange(`extraPhones.${index}`)}
                                            value={values.extraPhones[index]}
                                            placeholder={language.profile.form.extraPhone}
                                            />
                                            <Error>{errors.extraPhones?errors.extraPhones[index]: ''}</Error>
                                        </Fragment>)
                                    })
                                }
                            </Fragment>
                        )}
                        />
                        <Input
                        onChangeText={handleChange('social')}
                        value={values.social}
                        placeholder='Ссылка на социальную сеть'
                        edit={true}
                        />
                        <Error>{errors.social}</Error>
                        <Input
                        onChangeText={handleChange('city')}
                        value={values.city}
                        placeholder={language.registration.tabs.organizer.city}
                        edit={true}
                        />
                        <Error>{errors.city}</Error>
                        <Input
                        onChangeText={handleChange('studentNumber')}
                        value={values.studentNumber}
                        placeholder={language.registration.tabs.organizer.studentNumber}
                        onlyNumbers={true}
                        edit={true}
                        />
                        <Error>{errors.studentNumber}</Error>
                        <Input
                        onChangeText={handleChange('secretCode')}
                        value={values.secretCode}
                        placeholder={language.registration.tabs.organizer.secretCode}
                        edit={true}
                        />
                        <Error>{errors.secretCode}</Error>
                        <CheckboxContainer>
                            <Title>{language.registration.tabs.organizer.chooseType}</Title>
                            <CheckBox
                            onPress={() => {
                                setFieldValue('dictantType', 'online')
                            }}
                            title={language.registration.tabs.organizer.online}
                            checked={values.dictantType==='online'}
                            containerStyle={{
                                backgroundColor: theme.palette.background.main,
                                borderWidth: 0,
                                justifyContent: 'flex-start',  
                            }}
                            titleProps={{
                                style: {
                                    fontSize: 14,
                                    color: theme.palette.text.grey,
                                    marginLeft: 10
                                }
                            }}
                            uncheckedIcon={<TouchableOpacity
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth: 1,
                                    borderColor: theme.palette.text.main
                                }}
                                onPress={() => {
                                    setFieldValue('dictantType', 'online')
                                }}
                                />}
                            checkedIcon={<TouchableOpacity
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth: 1,
                                    borderColor: theme.palette.text.main,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setFieldValue('dictantType', 'online')
                                }}
                                >
                                    <View
                                    style={{
                                        width:12,
                                        height: 12,
                                        backgroundColor: theme.palette.text.main
                                    }}
                                    />
                                </TouchableOpacity>}
                            />
                            <CheckBox
                            onPress={() => {
                                setFieldValue('dictantType', 'video')
                            }}                            
                            title={language.registration.tabs.organizer.video}
                            checked={values.dictantType==='video'}

                            containerStyle={{
                                backgroundColor: theme.palette.background.main,
                                borderWidth: 0,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                            }}
                            titleProps={{
                                style: {
                                    fontSize: 14,
                                    color: theme.palette.text.grey,
                                    marginLeft: 10
                                }
                            }}
                            uncheckedIcon={<TouchableOpacity
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth: 1,
                                    borderColor: theme.palette.text.main
                                }}
                                onPress={() => {
                                    setFieldValue('dictantType', 'video')
                                }}
                                />}
                            checkedIcon={<TouchableOpacity
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth: 1,
                                    borderColor: theme.palette.text.main,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setFieldValue('dictantType', 'video')
                                }}
                                >
                                    <View
                                    style={{
                                        width:12,
                                        height: 12,
                                        backgroundColor: theme.palette.text.main
                                    }}
                                    />
                                </TouchableOpacity>}
                            />
                            <CheckBox
                            onPress={() => {
                                setFieldValue('dictantType', 'offline')
                            }}
                            title={language.registration.tabs.organizer.offline}
                            checked={values.dictantType==='offline'}
                            containerStyle={{
                                backgroundColor: theme.palette.background.main,
                                borderWidth: 0,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                
                                width:'100%'
                            }}
                            titleProps={{
                                style: {
                                    fontSize: 14,
                                    color: theme.palette.text.grey,
                                    marginLeft: 10
                                }
                            }}
                            uncheckedIcon={<TouchableOpacity
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth: 1,
                                    borderColor: theme.palette.text.main
                                }}
                                onPress={() => {
                                    setFieldValue('dictantType', 'offline')
                                }}
                                />}
                            checkedIcon={<TouchableOpacity
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth: 1,
                                    borderColor: theme.palette.text.main,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setFieldValue('dictantType', 'offline')
                                }}
                                >
                                    <View
                                    style={{
                                        width:12,
                                        height: 12,
                                        backgroundColor: theme.palette.text.main
                                    }}
                                    />
                                </TouchableOpacity>}
                            />
                            <Error>{errors.dictantType}</Error>
                        </CheckboxContainer>
                        <Button
                        bg={theme.palette.buttons.primary}
                        font={theme.palette.text.primary}
                        height='50px'
                        text='Отправить'
                        onPress={handleSubmit}
                        marginTop={10}
                        />
                    </Fragment>
                )}
            </Formik>
        </RegistrationForm>
    )   
}


export default OrganizerProfile;