import React, { Fragment, useEffect, useRef, useState } from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet, Linking, Pressable, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Toast} from 'native-base';
import {CheckBox} from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";

import {clearError, registerUser} from '../../redux/user/user.actions';
import Input from '../../UI/Input/Input.component';
import {
    RegistrationForm, 
    CheckboxContainer,
    AgreementLink,
    AgreementText,
    LinkText,
    AgreementContainer
} from './registration-student.styles';
import { Error } from '../common/Error/error.styles';
import Button from '../../UI/Button/Button.component';
import { useTheme } from 'styled-components';
import { useLanguage } from '../LanguageProvider/language.provider';
import ArrowDownSVG from '../../assets/arrowDown.svg';
import { userSelectors } from '../../redux/user/user.selectors';
import { RegistrationProps } from '../../screens/Registration/registration.screen';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { ILanguage } from '../../@types/common';
import { TouchableOpacity } from 'react-native-gesture-handler';



const validationSchema = (language: ILanguage) => yup.object().shape({
    email: yup.string()
    .trim()
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
    .trim()
       .required(language.errors.required),
    password: yup.string()
    .trim()
        .min(6, language.errors.min6)
        .required(language.errors.required),
    confirmPassword: yup.string()
    .trim()
        .oneOf([yup.ref('password')], language.errors.passMatch)
        .required(language.errors.required),
    level: yup.string()
        .ensure()
        .trim()
        .min(1,language.errors.required)
        .required(language.errors.required),
    agree: yup.string()
        
        .required(language.errors.agreeWithRules)
 })




const RegistrationStudent: React.FC<RegistrationProps> = ({toggleSuccessWindow}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const theme = useTheme()
    const {language} = useLanguage()
    const registrationError = useSelector(userSelectors.error)
    const registrationSuccess = useSelector(userSelectors.registerSuccess)
    const dispatch = useDispatch()
    const emailRef = useRef('')
    const {width} = useSafeAreaFrame()
    const pickerRef = useRef<RNPickerSelect>(null)
    const [connected, setConnected] = useState<boolean>(true)

    const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected !== connected && state.isConnected !== null) setConnected(state.isConnected)
      });

    useEffect(() => {
        return () => unsubscribe()
    }, [])


    const handleSubmitForm = (values: {
        email: string;
        password: string;
        confirmPassword: string;
        lastName: string;
        firstName: string;
        middleName: string;
        city: string;
        level: string;
        format: string;
    }) => {
        if(connected) {
            if (!isSubmitting) {
                emailRef.current=values.email
                setIsSubmitting(true)
                dispatch(registerUser({
                    ...values,
                    role: 'student'
                }))
            }
        } else {
            Alert.alert(language.errors.noInternet)
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
            setIsSubmitting(false)
            Toast.show({
                text: registrationError,
                buttonText: 'OK',
                duration: 2000,
                type: 'warning',
                position: 'bottom',
                style: {
                    backgroundColor: '#ff7961',
                    zIndex: 10000
                }
            })
            emailRef.current=''
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
                level: '',
                format: '',
                agree: ''
            }}
            onSubmit={(values) => {
                handleSubmitForm(values)
            } }
            validationSchema={validationSchema(language)}
            validateOnChange={false}
            >
                {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <Fragment>
                        <Input
                        onChangeText={handleChange('email')}
                        value={values.email}
                        placeholder={language.registration.tabs.student.email}
                        />
                        <Error>{errors.email}</Error>
                        <Input
                        onChangeText={handleChange('password')}
                        password={true}
                        value={values.password}
                        placeholder={language.registration.tabs.student.password}
                        />
                        <Error>{errors.password}</Error>
                        <Input
                        onChangeText={handleChange('confirmPassword')}
                        password={true}
                        value={values.confirmPassword}
                        placeholder={language.registration.tabs.student.confirm}
                        />
                        <Error>{errors.confirmPassword}</Error>
                        <Input
                        onChangeText={handleChange('lastName')}
                        value={values.lastName}
                        placeholder={language.registration.tabs.student.lastName}
                        />
                        <Error>{errors.lastName}</Error>
                        <Input
                        onChangeText={handleChange('firstName')}
                        value={values.firstName}
                        placeholder={language.registration.tabs.student.firstName}
                        />
                        <Error>{errors.firstName}</Error>
                        <Input
                        onChangeText={handleChange('middleName')}
                        value={values.middleName}
                        placeholder={language.registration.tabs.student.middleName}
                        />
                        <Error>{errors.middleName}</Error>
                        <Input
                        onChangeText={handleChange('city')}
                        value={values.city}
                        placeholder={language.registration.tabs.student.city}
                        />
                        <Error>{errors.city}</Error>
                        <RNPickerSelect
                        onValueChange={(value) => {
                            setFieldValue('level', value)
                        }}
                        placeholder={{label:language.registration.tabs.student.level.choose, value: null}}
                        items={[
                            { label:language.registration.tabs.student.level.start, value:'start' },
                            { label:language.registration.tabs.student.level.advanced, value:'advanced' },
                            { label:language.registration.tabs.student.level.dialect, value:'dialect' },
                        ]}
                        value={values.level}
                        fixAndroidTouchableBug
                        Icon={() => {
                            return  (
                            <Pressable style={{
                                position: 'absolute', 
                                right: -10,
                                bottom: 0,
                                height: 40,
                                width: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                }} 
                                onPress={() => {
                                    console.log('pressed')
                                    pickerRef.current?.togglePicker()
                                }}
                                >
                                 <ArrowDownSVG />
                             </Pressable>
                         )
                         }
                        }
                        style={pickerSelectStyles(width)}
                        useNativeAndroidPickerStyle={false}
                        />
                        <Error>{errors.level}</Error>
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
                        text={language.registration.tabs.student.send}
                        onPress={handleSubmit}
                        marginTop={10}
                        />
                    </Fragment>
                )}
            </Formik>
        </RegistrationForm>
    )   
}

const pickerSelectStyles = (width:number) => StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#6E6E6E',
      color: 'black',
    //   paddingRight: 45, 
      maxWidth: 500,
      width: '100%'
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#6E6E6E',
        color: 'black',
        // paddingRight: 45, 
        maxWidth: 500,
        width: '100%',

    },
    placeholder: {
        color: '#AAAAAA',
        fontSize: 16,

    },
    viewContainer: {
        width:'100%',
        alignSelf: 'center',
        maxWidth: 440,

    },
    iconContainer: {
        height: '100%',
        justifyContent: 'center',
        paddingRight: 5,
    },
    inputIOSContainer: {
        width: '100%',

    },
    inputAndroidContainer: {
        width: width-40,
        maxWidth: 440,

    },

  });



export default RegistrationStudent;