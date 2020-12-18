import React, { Fragment, useState } from 'react';
import {Formik, yupToFormErrors} from 'formik';
import * as yup from 'yup';
import {CheckBox} from 'react-native-elements'
import {TouchableOpacity, View} from 'react-native';

import Input from '../../UI/Input/Input.component';
import {
    RegistrationForm,
    Title,
    CheckboxContainer
} from './registration-organizer.styles';
import { Error } from '../common/Error/error.styles';
import Button from '../../UI/Button/Button.component';
import { useTheme } from 'styled-components';
import { useLanguage } from '../LanguageProvider/language.provider';
import { RegistrationProps } from '../../screens/Registration/registration.screen';




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
        .min(6, 'Минимум 6 символов')
        .required('Обязательное поле'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать')
        .required('Обязательное поле'),
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



const RegistrationOrganizer: React.FC<RegistrationProps> = ({toggleSuccessWindow}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const theme = useTheme()
    const {language} = useLanguage()

    const handleSubmitForm = (values: {
        email: string;
        password: string;
        confirmPassword: string;
        lastName: string;
        firstName: string;
        middleName: string;
        city: string;
    }) => {
        console.log(values)
    }


    return (
        <RegistrationForm
        >

            <Formik
            initialValues={{
                email: '', 
                password: '', 
                confirmPassword: '',
                lastName: '',
                firstName: '',
                middleName: '',
                city: '',
                phone: '',
                social: '',
                studentNumber: '',
                dictantType: '',
                secretCode: ''
            }}
            onSubmit={(values) => handleSubmitForm(values) }
            validationSchema={validationSchema}
            validateOnChange={false}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <Fragment>
                        <Input
                        onChangeText={handleChange('email')}
                        value={values.email}
                        placeholder={language.registration.tabs.organizer.email}
                        />
                        <Error>{errors.email}</Error>
                        <Input
                        onChangeText={handleChange('password')}
                        password={true}
                        value={values.password}
                        placeholder={language.registration.tabs.organizer.password}
                        />
                        <Error>{errors.password}</Error>
                        <Input
                        onChangeText={handleChange('confirmPassword')}
                        password={true}
                        value={values.confirmPassword}
                        placeholder={language.registration.tabs.organizer.confirm}
                        />
                        <Error>{errors.confirmPassword}</Error>
                        <Input
                        onChangeText={handleChange('lastName')}
                        value={values.lastName}
                        placeholder={language.registration.tabs.organizer.lastName}
                        />
                        <Error>{errors.lastName}</Error>
                        <Input
                        onChangeText={handleChange('firstName')}
                        value={values.firstName}
                        placeholder={language.registration.tabs.organizer.firstName}
                        />
                        <Error>{errors.firstName}</Error>
                        <Input
                        onChangeText={handleChange('middleName')}
                        value={values.middleName}
                        placeholder={language.registration.tabs.organizer.middleName}
                        />
                        <Error>{errors.middleName}</Error>
                        <Input
                        onChangeText={handleChange('phone')}
                        value={values.phone}
                        placeholder={language.registration.tabs.organizer.phone}
                        onlyNumbers={true}
                        />
                        <Error>{errors.phone}</Error>
                        <Input
                        onChangeText={handleChange('social')}
                        value={values.social}
                        placeholder='Ссылка на социальную сеть'
                        />
                        <Error>{errors.social}</Error>
                        <Input
                        onChangeText={handleChange('city')}
                        value={values.city}
                        placeholder={language.registration.tabs.organizer.city}
                        />
                        <Error>{errors.city}</Error>
                        <Input
                        onChangeText={handleChange('studentNumber')}
                        value={values.studentNumber}
                        placeholder={language.registration.tabs.organizer.studentNumber}
                        onlyNumbers={true}
                        />
                        <Error>{errors.studentNumber}</Error>
                        <Input
                        onChangeText={handleChange('secretCode')}
                        value={values.secretCode}
                        placeholder={language.registration.tabs.organizer.secretCode}
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


export default RegistrationOrganizer;