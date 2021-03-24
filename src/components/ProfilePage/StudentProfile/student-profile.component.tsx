import React, { Fragment, useEffect, useRef, useState } from 'react';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import {Platform, UIManager, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

import { userSelectors } from '../../../redux/user/user.selectors';
import {changeUser, clearError} from '../../../redux/user/user.actions';
import ArrowDownSVG from '../../../assets/arrowDown.svg';

import {
    ProfileForm
} from './student.styles';

import { useTheme } from 'styled-components';
import Button from '../../../UI/Button/Button.component';
import { Error } from '../../common/Error/error.styles';
import Input from '../../../UI/Input/Input.component';
import { useLanguage } from '../../LanguageProvider/language.provider';
import { ILanguage, IStudent } from '../../../@types/common';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { redirectSelectors } from '../../../redux/redirect/redirect.selectors';
import { setRedirect } from '../../../redux/redirect/redirect.actions';



const validationSchema = (language: ILanguage) => yup.object().shape({
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
    password: yup.string(),
    newPassword: yup.string()
        .min(6, language.errors.min6),
    extraEmails: yup.array()
    .of(
        yup.string()
        .email(language.errors.email)
        )
 })


 if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }


const StudentProfile: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const theme = useTheme()
    const {language} = useLanguage()
    const currentUser = useSelector(userSelectors.currentUser) as IStudent|undefined
    const changeSuccess = useSelector(userSelectors.changeSuccess)
    const [focusLevel, setFocusLevel] = useState(false)
    const jwt = useSelector(userSelectors.jwt)
    const changeError = useSelector(userSelectors.error)
    const redirectRoute = useSelector(redirectSelectors.redirectRoute)
    const dispatch = useDispatch()
    const {width} = useSafeAreaFrame()
    const pickerRef = useRef<RNPickerSelect>(null)
    const [initialValues, setInitialValues] = useState({
        email: '', 
        password: '', 
        newPassword: '',
        lastName: '',
        firstName: '',
        middleName: '',
        city: '',
        extraEmails: [],
        level: ''
    })


    useEffect(() => {
        let timeout:NodeJS.Timeout;
        if (redirectRoute==='noLevel') {
            setFocusLevel(true)
            timeout = setTimeout(()=> {
                setFocusLevel(false)
            }, 8000)
        }
        return () => {
            if(timeout) {
                dispatch(setRedirect(undefined))
                clearTimeout(timeout)
            }
        }
    }, [redirectRoute])

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
            setInitialValues({
                email: currentUser.email,
                city: currentUser.address,
                lastName: currentUser.last_name,
                firstName: currentUser.first_name,
                middleName: currentUser.middle_name,
                extraEmails: [],
                password: '',
                newPassword: '',
                level: currentUser.level
            })
        }
    }, [currentUser])

    

    useEffect(() => {
        if (changeError) {
            setIsSubmitting(false)
            Toast.show({
                text: changeError,
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
        extraEmails: string[],
        level:string
    }) => {
        if(!isSubmitting&&jwt) {
            setIsSubmitting(true)
            dispatch(changeUser({
                ...values,
                token: jwt,
                role: 'student'
            }))
        }
    }


    return (
        <ProfileForm>

            <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmitForm(values) }
            validationSchema={validationSchema(language)}
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
                            placeholder={language.registration.tabs.student.email}
                            // edit={true}
                            disabled={true}
                            // showAdd={true}
                            // onAdd={() =>helpers.push({[`extraEmails${values.extraEmails.length}`]:''})}
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
                        // edit={true}

                        />
                        <Error>{errors.password}</Error>
                        <Input
                        onChangeText={handleChange('newPassword')}
                        password={true}
                        value={values.newPassword}
                        placeholder={language.profile.form.newPassword}
                        // edit={true}
                        />
                        <Error>{errors.newPassword}</Error>
                        <Input
                        onChangeText={handleChange('lastName')}
                        value={values.lastName}
                        placeholder={language.registration.tabs.student.lastName}
                        edit={true}
                        />
                        <Error>{errors.lastName}</Error>
                        <Input
                        onChangeText={handleChange('firstName')}
                        value={values.firstName}
                        placeholder={language.registration.tabs.student.firstName}
                        edit={true}
                        />
                        <Error>{errors.firstName}</Error>
                        <Input
                        onChangeText={handleChange('middleName')}
                        value={values.middleName}
                        placeholder={language.registration.tabs.student.middleName}
                        edit={true}
                        />
                        <Error>{errors.middleName}</Error>
                        <Input
                        onChangeText={handleChange('city')}
                        value={values.city}
                        placeholder={language.registration.tabs.student.city}
                        edit={true}
                        />
                        <Error>{errors.city}</Error>
                        <RNPickerSelect
                        ref={pickerRef}
                        onValueChange={(value) => {
                            setFieldValue('level', value)
                        }}
                        value={values.level}
                        placeholder={{label:language.registration.tabs.student.level.choose, value: null}}
                        items={[
                            { label:language.registration.tabs.student.level.start, value:'start' },
                            { label:language.registration.tabs.student.level.advanced, value:'advanced' },
                            { label:language.registration.tabs.student.level.dialect, value:'dialect' },
                        ]}
                        Icon={() => {
                           return  (
                           <Pressable onPress={() => pickerRef.current?.togglePicker()}>
                                <ArrowDownSVG />
                            </Pressable>
                        )
                        }
                        }
                        style={pickerSelectStyles(width, focusLevel)}
                        useNativeAndroidPickerStyle={false}
                        />
                        <Error>{errors.level}</Error>
                        <Button
                        bg={theme.palette.buttons.primary}
                        font={theme.palette.text.primary}
                        height='50px'
                        text={language.registration.tabs.student.save}
                        onPress={handleSubmit}
                        marginTop={10}
                        />
                    </Fragment>
                )}
            </Formik>
        </ProfileForm>
    )   
}


const pickerSelectStyles = (width:number, focus:boolean) => StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#6E6E6E',
      color: 'black',
      paddingRight: 45, 
      maxWidth: 500,
      width: '100%'
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#6E6E6E',
        color: 'black',
        paddingRight: 45, 
        maxWidth: 500,
        width: '100%'
    },
    placeholder: {
        color: focus? 'red':'#AAAAAA',
        fontSize: 16
    },
    viewContainer: {
        width:'100%',
        alignSelf: 'center',
        maxWidth: 440,
        

    },
    iconContainer: {
        height: '100%',
        justifyContent: 'center',
        paddingRight: 5
    },
    inputIOSContainer: {
        width: '100%'
    },
    inputAndroidContainer: {
        width: width-40,
        maxWidth: 440
    },

  });



export default StudentProfile;
