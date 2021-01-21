import React, { useEffect, useRef, useState } from 'react';
import { Overlay } from 'react-native-elements';
import { useTheme } from 'styled-components';
import Button from '../../../../UI/Button/Button.component';
import { useLanguage } from '../../../LanguageProvider/language.provider';
import * as yup from 'yup';
import axios from 'axios';



import {
    IconButton,
    SuccessMessageContainer,
    MessageContainer,
    MessageText
} from './add-expert.styles'
import WhiteTimesSVG from '../../../../assets/white-times.svg';
import TimesSVG from '../../../../assets/times.svg';
import Input from '../../../../UI/Input/Input.component';
import { Error } from '../../../common/Error/error.styles';
import { ILanguage } from '../../../../@types/common';
import { API_URL } from '../../../../config';
import { userSelectors } from '../../../../redux/user/user.selectors';
import { useSelector } from 'react-redux';
import { LayoutAnimation } from 'react-native';



interface AddExpertProps {
    onClose: () => void,
    show: boolean
}


const validationSchema = (language: ILanguage) => yup.object().shape({
    email: yup.string()
       .email(language.errors.email)
       .required(language.errors.required),
})

let timeout: NodeJS.Timeout

const AddExpertModal: React.FC<AddExpertProps> = ({onClose,show}) => {
    const {language} = useLanguage()
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmiting] = useState(false)
    const jwt = useSelector(userSelectors.jwt)
    const [message, setMessage] = useState<{text: string, color: string}|undefined>()

    useEffect(() => {
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [])


    const handleAddExpert = () => {
        setError('')
        if (!isSubmitting) {
            validationSchema(language).validate({email})
            .then((data) => {
                setEmail('')
                setIsSubmiting(true)
                axios({
                    method: 'post',
                    headers: {
                        "Content-Type": 'application/json',
                        "X-api-token": `${jwt}`
                    },
                    url: `${API_URL}/addemail`,
                    data: {
                        email: data?.email,
                    }
                })
                .then((response) => {
                    toggleMessage({text: language.messages.addExpertSuccess, color: '#a2cf6e'})
                    setIsSubmiting(false)
                })
                .catch(err => {
                    toggleMessage({text: language.errors.serverError, color: '#ff7961'})
                    setIsSubmiting(false)
                })
            })
            .catch((err) => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                setError(err.errors[0])
            })
        }
    }

    const handleEmail = (e: string) => {
        setEmail(e)
    }

    const handleClose = () => {
        setError('')
        setEmail('')
        setIsSubmiting(false)
        onClose()
    }

    const toggleMessage = (msg?: {text: string, color: string}) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        if (timeout) {
            clearTimeout(timeout)
        }
        if (!msg) {
            setMessage(undefined)
        } else {
            setMessage(msg)
            timeout = setTimeout(() => {
                toggleMessage()
            }, 4000)
        }
    }

    return (
        <Overlay
        isVisible={show}
        onBackdropPress={handleClose}
        fullScreen={false}
        overlayStyle={{
            width:'90%',
            maxWidth: 500,
            height: 300,
            borderRadius: 8
        }}
        >
        <SuccessMessageContainer>
            {
                message?
                <MessageContainer color={message.color}>
                    <MessageText>
                        {message.text}
                    </MessageText>
                    <IconButton
                    onPress={() => toggleMessage()}
                    >
                        <WhiteTimesSVG />
                    </IconButton>
                </MessageContainer>
                :null
            }
            <Input
            onChangeText={handleEmail as any}
            value={email}
            placeholder={language.registration.tabs.organizer.email}
            />
            {
                error?
                <Error>{error}</Error>
                :null
            }
            <Button
            text={language.registration.tabs.organizer.add}
            onPress={handleAddExpert}
            bg={theme.palette.buttons.primary}
            font={theme.palette.text.primary}
            height='50px'
            />
            <IconButton
            onPress={handleClose}
            >
            <TimesSVG/>
            </IconButton>

        </SuccessMessageContainer>
    </Overlay>
    )
}


export default AddExpertModal;