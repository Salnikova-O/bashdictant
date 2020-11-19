import React from 'react';

import {
    SocialAuthContainer,
    SocialButton,
    SocialButtons,
    Subtitle,
} from './social-auth.styles';
import OKSVG from '../../assets/ok.svg';
import VKSVG from '../../assets/vk.svg';
import FacebookSVG from '../../assets/facebook.svg';


interface SocialAuthProps {
    title: string,
    size?: 'lg' 
}

const SocialAuth: React.FC<SocialAuthProps> = ({title, size}) =>{

    const handleVKAuth = () => {

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