import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {Linking} from 'react-native';
import axios from 'axios';
import {Toast} from 'native-base';


import {saveJWT, loginUserSuccess, clearError} from '../../redux/user/user.actions';
import {
    SocialAuthContainer,
    SocialButton,
    SocialButtons,
    Subtitle,
} from './social-auth.styles';
import OKSVG from '../../assets/ok.svg';
import VKSVG from '../../assets/vk.svg';
import FacebookSVG from '../../assets/facebook.svg';
import {
    OK_AUTH_URL_STUDENT,
    VK_AUTH_URL_STUDENT,
    OK_AUTH_URL_TEACHER,
    VK_AUTH_URL_TEACHER,
    OK_AUTH_URL,
    VK_AUTH_URL,
    FB_AUTH_URL,
    FB_AUTH_URL_STUDENT,
    FB_AUTH_URL_TEACHER,
    API_URL
} from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../redux/user/user.selectors';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../LanguageProvider/language.provider';
import { closeProgressModal, openProgressModal } from '../../redux/modals/modals.actions';



interface SocialAuthProps {
    title: string,
    size?: 'lg',
    currentTab?: number,
}


// WebBrowser.maybeCompleteAuthSession()



// export const VK_AUTH_URL_STUDENT = 'https://oauth.vk.com/authorize?client_id=7687118&display=page&redirect_uri=http://bashdikt.lilekov-studio.com/api/vk/callback&scope=email&response_type=code&v=5.126'

const SocialAuth: React.FC<SocialAuthProps> = ({title, size, currentTab}) =>{
    const dispatch = useDispatch()
    const loginError = useSelector(userSelectors.error)
    const currentUser = useSelector(userSelectors.currentUser)
    const navigation = useNavigation()
    const {language}= useLanguage()

    const handleSocialAuth = (event:any) => {
        if (event.url) {
            let params = event.url.split('?')
            if (params.length>1) {
                params = params[1].replace('#_=_', '').split('=')
                console.log(params)
                if (params[0]==='jwt') {
                    const jwt = params[1]
                    console.log(jwt)
                    if (jwt) {
                        dispatch(openProgressModal(null))
                        axios.interceptors.request.use(config => {
                            console.log(config)
                            return config
                        })
                        axios({
                            method: 'get',
                            headers: {
                                "Content-Type": 'application/json',
                                "X-api-token": `${jwt}`
                            },
                            url: `${API_URL}/cabinet`,
                        })
                        .then((response)=> {
                            dispatch(saveJWT(jwt))
                            dispatch(loginUserSuccess(response.data))
                        })
                        .catch((err) => {
                            dispatch(closeProgressModal())
                            console.log(err.response)
                            Toast.show({
                                text: language.errors.serverError,
                                buttonText: 'OK',
                                duration: 4000,
                                type: 'warning',
                                position: 'bottom',
                                style: {
                                    backgroundColor: '#ff7961',
                                }
                            })
                        })
                    }
                } else if (params[0]==='error') {
                    const error = decodeURIComponent(params[1])
                    console.log(error)
                    if (error==='Email не получен!') {
                        Toast.show({
                            text: language.errors.noEmailSocial,
                            buttonText: 'OK',
                            duration: 8000,
                            type: 'warning',
                            position: 'bottom',
                            style: {
                                backgroundColor: '#ff7961',
                            }
                        })
                    } else if (error === 'Пользователь не зарегистрирован') {
                        Toast.show({
                            text: language.errors.notRegistered,
                            buttonText: 'OK',
                            duration: 4000,
                            type: 'warning',
                            position: 'bottom',
                            style: {
                                backgroundColor: '#ff7961',
                            }
                        })
                    }  else {
                        Toast.show({
                            text: error,
                            buttonText: 'OK',
                            duration: 4000,
                            type: 'warning',
                            position: 'bottom',
                            style: {
                                backgroundColor: '#ff7961',
                            }
                        })
                    }
                }
            }
        }
    }


    useEffect(() => {
        // Linking.removeAllListeners('url')
        // Linking.addEventListener('url', handleSocialAuth)
        // return () => {
        //     Linking.removeAllListeners('url')
        // }
    }, [])

    useEffect(() => {
        if (currentUser) {
            dispatch(closeProgressModal())
            navigation.reset({
                index: 0,
                routes: [{ name: 'Personal' }],
              });
        }
    }, [currentUser])

    useEffect(() => {
        if (loginError) {
            console.log('err', loginError)
            dispatch(closeProgressModal())
            dispatch(clearError())
            Toast.show({
                text: loginError,
                buttonText: 'OK',
                duration: 2000,
                type: 'warning',
                position: 'bottom',
                style: {
                    backgroundColor: '#ff7961',
                }
            })
        }
    }, [loginError])

    const handleVKAuth = () => {

        WebBrowser.openAuthSessionAsync(currentTab===1?VK_AUTH_URL_STUDENT: currentTab===0? VK_AUTH_URL_TEACHER: VK_AUTH_URL, 'bashdikt://')
        .then(res => {
            
            handleSocialAuth(res)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const handleOKAuth = () =>{

        WebBrowser.openAuthSessionAsync(currentTab===1?OK_AUTH_URL_STUDENT: currentTab===0? OK_AUTH_URL_TEACHER: OK_AUTH_URL, 'bashdikt://')
        .then(res => {
            handleSocialAuth(res)
        })
        .catch(err => {
            console.log(err)
        })
    }


    const handleFacebookAuth = () => {
        WebBrowser.openAuthSessionAsync(currentTab===1?FB_AUTH_URL_STUDENT: currentTab===0? FB_AUTH_URL_TEACHER: FB_AUTH_URL, 'bashdikt://')
        .then(res => {
            console.log(res)
            handleSocialAuth(res)
        })
        .catch(err => {
            console.log('err',err)
        })
    }


    return (
        <SocialAuthContainer>
            <Subtitle
            size={size}
            >
                {title}
            </Subtitle>
            <SocialButtons >
                <SocialButton 
                color='#4C77A5' 
                size={size}
                onPress={handleVKAuth}
                >
                    <VKSVG  height={size==='lg'? 25: 18} width={size==='lg'? 25: 18}/>
                </SocialButton>
                <SocialButton 
                size={size}
                color='#4469B0'
                onPress={handleFacebookAuth}
                >
                    <FacebookSVG  height={size==='lg'? 25: 18} width={size==='lg'? 25: 18}/>
                </SocialButton>
                <SocialButton 
                size={size}
                color='#EC8224'
                onPress={handleOKAuth}
                >
                    <OKSVG height={size==='lg'? 25: 18} width={size==='lg'? 25: 18}/>
                </SocialButton>
            </SocialButtons>
        </SocialAuthContainer>
    )
}


export default SocialAuth;