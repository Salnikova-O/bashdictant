import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'native-base';
import {UIManager, Platform, LayoutAnimation} from 'react-native';


import {API_URL} from '../../config';
import {saveJWT, loginUserSuccess} from '../../redux/user/user.actions';
import Button from '../../UI/Button/Button.component';
import Input from '../../UI/Input/Input.component';
import { useLanguage } from '../LanguageProvider/language.provider';
import {
    IconButton,
    SuccessMessage,
    SuccessMessageContainer
} from './phone-confirmation.styles';
import TimesSVG from '../../assets/times.svg';
import { userSelectors } from '../../redux/user/user.selectors';
import { Error } from '../common/Error/error.styles';
import { useNavigation } from '@react-navigation/native';

interface PhoneConfirmationProps {
    email: string,
    toggleSuccessWindow: (email?:string) => void,
    // handleNavigation: () => void
}


const PhoneConfirmation: React.FC<PhoneConfirmationProps> = ({email, toggleSuccessWindow}) => {
    const {language} = useLanguage()
    const theme = useTheme()
    const navigation = useNavigation()
    // const [code, setCode] = useState('')
    // const [isSubmitting, setIsSubmitting] = useState(false)
    // const dispatch = useDispatch()
    // const currentUser = useSelector(userSelectors.currentUser)
    // const [error, setError] = useState('')


    // const handleCodeChange = (e:string) => {
    //     setCode(e)
    // }

    // const handleSubmit = () => {
    //     if (!code) {
    //         setError(language.errors.code)
    //         LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    //     } else {
    //         if(!isSubmitting) {
    //             setError('')
    //             setIsSubmitting(true)
    //             axios({
    //                 method: 'post',
    //                 headers: {
    //                     "Content-Type": 'application/json'
    //                 },
    //                 url: `${API_URL}/register/confirm`,
    //                 data: {
    //                     email: email,
    //                     code: code,
    //                 }
    //             })
    //             .then((response) => {
    //                 const token = response.data.token
    //                 axios({
    //                     method: 'get',
    //                     headers: {
    //                         "Content-Type": 'application/json',
    //                         "X-api-token": `${token}`
    //                     },
    //                     url: `${API_URL}/cabinet`,
    //                 })
    //                 .then((response)=> {
    //                     setIsSubmitting(false)
    //                     dispatch(saveJWT(token))
    //                     dispatch(loginUserSuccess(response.data))
    //                 })
    //             })
    //             .catch((error) => {
    //                 console.log(error.response.data)
    //                 setIsSubmitting(false)
    //                 LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    //                 setError(language.errors.incorrectCode)
    //             })
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if(currentUser) {
    //         setIsSubmitting(false)
    //         setError('')
    //         Toast.show({
    //             text: language.messages.successRegister,
    //             buttonText: 'OK',
    //             duration: 2000,
    //             type: 'success',
    //             position: 'bottom',
    //             style: {
    //                 backgroundColor: '#a2cf6e',
    //             }
    //         })
    //         handleNavigation()
    //     }
    // }, [currentUser])

    const handleNavigation = () => {
        toggleSuccessWindow()
        navigation.navigate('Auth')
    }

    return (
        <SuccessMessageContainer>
            <SuccessMessage>
                {language.registration.successMessage}
            </SuccessMessage>
            {/* <Input
            onlyNumbers={true}
            onChangeText={handleCodeChange as any}
            value={code}
            placeholder={language.registration.code}
            /> */}
            {/* {
                error?
                <Error>{error}</Error>
                :null
            } */}
            <Button
            text={language.main.authorization}
            onPress={handleNavigation}
            bg={theme.palette.buttons.primary}
            font={theme.palette.text.primary}
            height='50px'
            />
            <IconButton
            onPress={() => toggleSuccessWindow(email)}
            >
            <TimesSVG/>
        </IconButton>
    </SuccessMessageContainer>
    )
}


export default PhoneConfirmation;