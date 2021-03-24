import React, { Fragment, useRef, useState } from 'react';
import { CheckBox, Overlay } from 'react-native-elements';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import {Animated, View} from 'react-native';
import axios from 'axios';
import {Toast} from 'native-base';

import {API_URL} from '../../config';
import { setRedirect } from '../../redux/redirect/redirect.actions';
import Button from '../../UI/Button/Button.component';
import { useLanguage } from '../LanguageProvider/language.provider';



import {
    GetCertificateContainer,
    GetCertificateOuterContainer,
    GetCertificateSlide,
    IconButton,
    SuccessMessage,
    CheckboxContainer,
    Header
} from './get-certificate.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomCheckbox from '../Checkbox/checkbox.component';
import { userSelectors } from '../../redux/user/user.selectors';
import { Error } from '../common/Error/error.styles';
import { closeProgressModal, openProgressModal } from '../../redux/modals/modals.actions';
import Fallback from '../common/Fallback/fallback.component';

interface GetCertificateProps {
    received?:boolean,
    setReceived: () => void
}


const GetCertificate: React.FC<GetCertificateProps> = ({received, setReceived}) => {
    const theme = useTheme()
    const {language} = useLanguage()
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const translate = useRef(new Animated.Value(0)).current
    const {width} = useSafeAreaFrame()
    const [certLang, setCertLang] = useState<string|undefined>()
    const [isSubmiting, setIsSubmiting] = useState(false)
    const jwt = useSelector(userSelectors.jwt)
    const [error, setError] = useState('')
    const [modalHeight, setModalHeight] = useState<number>(() => received ? 200 : 450)


    const interTranslate = translate.interpolate({
        inputRange: [0,1],
        outputRange: [0, width<500?-(width*0.9-25):-((500)-25)]
    })

    


    const handleGetCertificate = () => {
        if (!isSubmiting&&certLang) {
            setIsSubmiting(true)
            dispatch(openProgressModal(null))
            axios.get(`${API_URL}/cabinet/student/info/certificate?lang=${certLang}`,{
                headers: {
                    "X-api-token": `${jwt}`
                }
            })
            .then((res) =>{
                Animated.timing(translate,{
                    useNativeDriver: true,
                    duration: 300,
                    toValue: 1
                }).start(() => {
                    setReceived()
                })
                dispatch(closeProgressModal())
                setIsSubmiting(false)
            })
            .catch(() => {
                setError(language.errors.serverError)
                dispatch(closeProgressModal())
                setIsSubmiting(false)
            })
        } else {
            if (!certLang) {
                setError(language.errors.chooseLang)
            }
        }
    }

    const toggleOverlay = () => {
        setShowMenu(c => !c)
    }

    const handleRedirect = () => {
        toggleOverlay()
        dispatch(setRedirect('checkPersonal'))
    }


    const handleLanguageChange = (lang:string) => {
        setError('')
        setCertLang(lang)
    }



    return (
        <Fragment>
            <Button
            bg={theme.palette.background.main}
            font={theme.palette.buttons.primary}
            height='50px'
            text={language.getCertificate}
            onPress={toggleOverlay}
            border={theme.palette.buttons.primary}
            marginBottom={25}
            />
            <Overlay
            isVisible={showMenu}
            onBackdropPress={toggleOverlay}
            fullScreen={false}
            overlayStyle={{
                width:'90%',
                maxWidth: 500,
                height: modalHeight,
                borderRadius: 8,
                padding: 0
            }}
            animationType='fade'
            supportedOrientations={['landscape','portrait']}
            >
                <GetCertificateOuterContainer>
                        {
                            received?
                            <Fragment>
                                <SuccessMessage>{language.certificate.success}</SuccessMessage>
                                <Button
                                text={language.continue}
                                onPress={toggleOverlay}
                                bg={theme.palette.buttons.primary}
                                font={theme.palette.text.primary}
                                height='50px'
                                />
                            </Fragment>
                            :
                            <GetCertificateContainer
                            style={{
                                transform: [{translateX:interTranslate}]
                            }}
                            >
                                <GetCertificateSlide
                                style={{marginRight: 25}}
                                >
                                    <SuccessMessage>{language.certificate.mainInfo}</SuccessMessage>
                                    <CheckboxContainer>
                                        <Header>{language.certificate.chooseLang}:</Header>
                                        <CustomCheckbox
                                        value='bash'
                                        checked={certLang==='bash'}
                                        onChange={handleLanguageChange}
                                        title={language.certificate.bash}
                                        />
                                        <CustomCheckbox
                                        value='rus'
                                        checked={certLang==='rus'}
                                        onChange={handleLanguageChange}
                                        title={language.certificate.rus}
                                        />
                                    </CheckboxContainer>
                                    {
                                        error&&!certLang?
                                        <Error>{error}</Error>
                                        :null
                                    }
                                    <Button
                                    text={language.certificate.check}
                                    onPress={handleRedirect}
                                    bg={theme.palette.background.main}
                                    font={theme.palette.buttons.primary}
                                    border={theme.palette.buttons.primary}
                                    height='50px'
                                    />
                                    <Button
                                    text={language.certificate.confirm}
                                    onPress={handleGetCertificate}
                                    bg={theme.palette.buttons.primary}
                                    font={theme.palette.text.primary}
                                    height='50px'
                                    />
                                </GetCertificateSlide>
                                <GetCertificateSlide>
                                    <SuccessMessage>{language.certificate.success}</SuccessMessage>
                                    <Button
                                    text={language.continue}
                                    onPress={toggleOverlay}
                                    bg={theme.palette.buttons.primary}
                                    font={theme.palette.text.primary}
                                    height='50px'
                                    />
                                </GetCertificateSlide>
                            </GetCertificateContainer>
                        }
                </GetCertificateOuterContainer>
            </Overlay>
        </Fragment>
    )
} 



export default GetCertificate;