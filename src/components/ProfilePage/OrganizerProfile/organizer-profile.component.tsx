import React, { Fragment, useEffect, useState } from 'react';
import {Formik, FieldArray} from 'formik';
import * as yup from 'yup';
import {CheckBox} from 'react-native-elements'
import {TouchableOpacity, View, Platform, UIManager, LayoutAnimation, Alert} from 'react-native';
import {Toast} from 'native-base';
import NetInfo from '@react-native-community/netinfo';

import { userSelectors } from '../../../redux/user/user.selectors';
import {changeUser, clearError, UserFieldTypes} from '../../../redux/user/user.actions';
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
import { ILanguage, IOrganizer } from '../../../@types/common';
import AddExpertModal from './AddExpertModal/add-expert.component';





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
        .trim()
       .required(language.errors.required),
    password: yup.string()
        .min(6, language.errors.min6),
    newPassword: yup.string()
        .min(6, language.errors.min6),
    phone: yup.string()
        .matches(/^(\s*|\d+)$/, language.errors.correctPhone)
        .required(language.errors.required),
    social: yup.string()
        .trim()
        .required(language.errors.required),
    studentCount: yup.number()
        .min(1, language.errors.min1)
        .required(language.errors.required),
    extraEmails: yup.array()
    .of(
        yup.string()
        .email(language.errors.email)
        ),
    extraPhones: yup.array()
    .of(
        yup.string()
        .matches(/^\d+$/, language.errors.correctPhone)
        .min(1, language.errors.correctPhone)
        )
 })


 if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

type FieldTypes= {
    firstName:string,
    lastName:string,
    middleName:string,
    email:string,
    password:string,
    city:string,
    studentCount:number,
    social:string,
    phone:string,
    extraPhones: string[],
    extraEmails: string[],
    newPassword: string
}

const OrganizerProfile: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const theme = useTheme()
    const {language} = useLanguage()
    const currentUser = useSelector(userSelectors.currentUser) as IOrganizer
    const changeSuccess = useSelector(userSelectors.changeSuccess)
    const jwt = useSelector(userSelectors.jwt)
    const changeError = useSelector(userSelectors.error)
    const dispatch = useDispatch()
    const [initialValues, setInitialValues] = useState<FieldTypes>({
        email: '', 
        password: '', 
        newPassword: '',
        lastName: '',
        firstName: '',
        middleName: '',
        city: '',
        phone: '',
        social: '',
        studentCount: 0,
        extraEmails: [],
        extraPhones: []
    })
    const [showAddExpert, setShowAddExpert] = useState(false)
    const [connected, setConnected] = useState<boolean>(true)

    const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected !== connected && state.isConnected !== null) setConnected(state.isConnected)
      });

    useEffect(() => {
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
            setInitialValues({
                email: currentUser.email,
                city: currentUser.address,
                lastName: currentUser.last_name,
                firstName: currentUser.first_name,
                middleName: currentUser.middle_name,
                extraEmails: currentUser.add_email,
                password: '',
                newPassword: '',
                extraPhones: currentUser.add_phone,
                phone: currentUser.phone,
                social: currentUser.soc_url,
                studentCount: currentUser.count_students
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
        phone: string,
        social: string,
        studentCount: number,
        extraEmails: string[],
        extraPhones: string[]
    }) => {
        if(connected) {
            if(!isSubmitting&&jwt) {
                setIsSubmitting(true)
                const emails = values.extraEmails.filter((email) => email.length>0)
                const phones = values.extraPhones.filter((phone) => phone.length>0)
                dispatch(changeUser({
                    ...values,
                    extraEmails: emails,
                    extraPhones: phones,
                    token: jwt,
                    role: 'organizer'
                }))
            }
        } else {
            Alert.alert(language.errors.noInternet)
        }
    }


    const toggleAddExpert = () => {
        setShowAddExpert(c => !c)
    }


    return (
        <RegistrationForm>
            <Button
            bg={theme.palette.background.main}
            font={theme.palette.buttons.primary}
            border={theme.palette.buttons.primary}
            height='50px'
            text={language.registration.tabs.organizer.addExpert}
            onPress={toggleAddExpert}
            marginTop={0}
            marginBottom={15}
            />
            <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmitForm(values as any) }
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
                            placeholder={language.registration.tabs.organizer.email}
                            // edit={true}
                            disabled={true}
                            // showAdd={true}
                            // onAdd={() =>{
                            //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                            //     helpers.push({[`extraEmails${values.extraEmails.length}`]:''})
                            // }}
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
                                    helpers.push('')
                                }}
                                />
                                <Error>{errors.phone}</Error>
                                {
                                    values.extraPhones.map((mail,index) => {
                                        return(
                                        <Fragment key={index}>
                                            {console.log(values.extraPhones[index])}
                                            <Input
                                            onChangeText={handleChange(`extraPhones.${index}`)}
                                            value={values.extraPhones[index]}
                                            placeholder={language.profile.form.extraPhone}
                                            onlyNumbers={true}
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
                        value={values.studentCount.toString()}
                        placeholder={language.registration.tabs.organizer.studentNumber}
                        onlyNumbers={true}
                        edit={true}
                        />
                        <Error>{errors.studentCount}</Error>
                        <Button
                        bg={theme.palette.buttons.primary}
                        font={theme.palette.text.primary}
                        height='50px'
                        text={language.registration.tabs.organizer.save}
                        onPress={handleSubmit}
                        marginTop={10}
                        />
                    </Fragment>
                )}
            </Formik>
            <AddExpertModal
            show={showAddExpert}
            onClose={toggleAddExpert}
            />
        </RegistrationForm>
    )   
}


export default OrganizerProfile;










// <Input
// onChangeText={handleChange('secretCode')}
// value={values.secretCode}
// placeholder={language.registration.tabs.organizer.secretCode}
// edit={true}
// />
// <Error>{errors.secretCode}</Error>
// <CheckboxContainer>
//     <Title>{language.registration.tabs.organizer.chooseType}</Title>
//     <CheckBox
//     onPress={() => {
//         setFieldValue('dictantType', 'online')
//     }}
//     title={language.registration.tabs.organizer.online}
//     checked={values.dictantType==='online'}
//     containerStyle={{
//         backgroundColor: theme.palette.background.main,
//         borderWidth: 0,
//         justifyContent: 'flex-start',  
//     }}
//     titleProps={{
//         style: {
//             fontSize: 14,
//             color: theme.palette.text.grey,
//             marginLeft: 10
//         }
//     }}
//     uncheckedIcon={<TouchableOpacity
//         style={{
//             width: 18,
//             height: 18,
//             borderWidth: 1,
//             borderColor: theme.palette.text.main
//         }}
//         onPress={() => {
//             setFieldValue('dictantType', 'online')
//         }}
//         />}
//     checkedIcon={<TouchableOpacity
//         style={{
//             width: 18,
//             height: 18,
//             borderWidth: 1,
//             borderColor: theme.palette.text.main,
//             alignItems: 'center',
//             justifyContent: 'center'
//         }}
//         onPress={() => {
//             setFieldValue('dictantType', 'online')
//         }}
//         >
//             <View
//             style={{
//                 width:12,
//                 height: 12,
//                 backgroundColor: theme.palette.text.main
//             }}
//             />
//         </TouchableOpacity>}
//     />
//     <CheckBox
//     onPress={() => {
//         setFieldValue('dictantType', 'video')
//     }}                            
//     title={language.registration.tabs.organizer.video}
//     checked={values.dictantType==='video'}

//     containerStyle={{
//         backgroundColor: theme.palette.background.main,
//         borderWidth: 0,
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//     }}
//     titleProps={{
//         style: {
//             fontSize: 14,
//             color: theme.palette.text.grey,
//             marginLeft: 10
//         }
//     }}
//     uncheckedIcon={<TouchableOpacity
//         style={{
//             width: 18,
//             height: 18,
//             borderWidth: 1,
//             borderColor: theme.palette.text.main
//         }}
//         onPress={() => {
//             setFieldValue('dictantType', 'video')
//         }}
//         />}
//     checkedIcon={<TouchableOpacity
//         style={{
//             width: 18,
//             height: 18,
//             borderWidth: 1,
//             borderColor: theme.palette.text.main,
//             alignItems: 'center',
//             justifyContent: 'center'
//         }}
//         onPress={() => {
//             setFieldValue('dictantType', 'video')
//         }}
//         >
//             <View
//             style={{
//                 width:12,
//                 height: 12,
//                 backgroundColor: theme.palette.text.main
//             }}
//             />
//         </TouchableOpacity>}
//     />
//     <CheckBox
//     onPress={() => {
//         setFieldValue('dictantType', 'offline')
//     }}
//     title={language.registration.tabs.organizer.offline}
//     checked={values.dictantType==='offline'}
//     containerStyle={{
//         backgroundColor: theme.palette.background.main,
//         borderWidth: 0,
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
        
//         width:'100%'
//     }}
//     titleProps={{
//         style: {
//             fontSize: 14,
//             color: theme.palette.text.grey,
//             marginLeft: 10
//         }
//     }}
//     uncheckedIcon={<TouchableOpacity
//         style={{
//             width: 18,
//             height: 18,
//             borderWidth: 1,
//             borderColor: theme.palette.text.main
//         }}
//         onPress={() => {
//             setFieldValue('dictantType', 'offline')
//         }}
//         />}
//     checkedIcon={<TouchableOpacity
//         style={{
//             width: 18,
//             height: 18,
//             borderWidth: 1,
//             borderColor: theme.palette.text.main,
//             alignItems: 'center',
//             justifyContent: 'center'
//         }}
//         onPress={() => {
//             setFieldValue('dictantType', 'offline')
//         }}
//         >
//             <View
//             style={{
//                 width:12,
//                 height: 12,
//                 backgroundColor: theme.palette.text.main
//             }}
//             />
//         </TouchableOpacity>}
//     />
//     <Error>{errors.dictantType}</Error>
// </CheckboxContainer>