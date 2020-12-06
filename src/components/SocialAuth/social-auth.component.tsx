import React from 'react';
// import * as WebBrowser from 'expo-web-browser';


import {
    SocialAuthContainer,
    SocialButton,
    SocialButtons,
    Subtitle,
} from './social-auth.styles';
import OKSVG from '../../assets/ok.svg';
import VKSVG from '../../assets/vk.svg';
import FacebookSVG from '../../assets/facebook.svg';
// import {OK_AUTH_URL_STUDENT,VK_AUTH_URL_STUDENT,OK_AUTH_URL_TEACHER,VK_AUTH_URL_TEACHER} from '../../config';



interface SocialAuthProps {
    title: string,
    size?: 'lg',
    currentTab: number 
}


// WebBrowser.maybeCompleteAuthSession()



// export const VK_AUTH_URL_STUDENT = 'https://oauth.vk.com/authorize?client_id=7687118&display=page&redirect_uri=http://bashdikt.lilekov-studio.com/api/vk/callback&scope=email&response_type=code&v=5.126'

const SocialAuth: React.FC<SocialAuthProps> = ({title, size, currentTab}) =>{

    const handleVKAuth = () => {
        // WebBrowser.openAuthSessionAsync(currentTab===1? VK_AUTH_URL_STUDENT: VK_AUTH_URL_TEACHER)
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        
    }

    const handleOKAuth = () =>{

    }


    const handleFacebookAuth = () => {

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