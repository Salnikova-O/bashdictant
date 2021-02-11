import React, { useState } from 'react';
// import { ScrollView } from 'react-native-gesture-handler';
import {Overlay} from 'react-native-elements';
// import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
    Subtitle,
} from './registration.styles';
import { ScreenContainer } from '../../components/common/ScreenContainer/screen-container.styles';
import SocialAuth from '../../components/SocialAuth/social-auth.component';
// import Tabs from '../../components/Tabs/tabs.component';
import RegistrationStudent from '../../components/RegistrationStudent/registration-student.component';
// import RegistrationExpert from '../../components/RegistrationExpert/registration-expert.component';
// import RegistrationOrganizer from '../../components/RegistrationOrganizer/registration-organizer.component';
import { useLanguage } from '../../components/LanguageProvider/language.provider';
import PhoneConfirmation from '../../components/PhoneConfirmation/phone-confirmation.component';
import BackgroundImage from '../../components/BackgroundImage/background-image.component';

export interface RegistrationProps {
    toggleSuccessWindow: (email?:string) => void
}




const RegistrationScreen: React.FC = () => {
    const {language} = useLanguage()
    const [showSuccessWindow, setShowSuccessWindow] = useState(false)
    // const theme = useTheme()
    const navigation = useNavigation()
    const [email, setEmail] =  useState('')
    // const [currentOpenTab, setCurrentOpenTab] = useState(1)

    const toggleSuccessWindow = (email?:string) => {
        if (email) {
            setEmail(email)
        } else {
            setEmail('')
        }
        setShowSuccessWindow(c => !c)
    }

    // const handleNavigation = () => {
    //     navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'Personal' }],
    //       });
    //     toggleSuccessWindow()
    // }

    // const changeCurrentTab = (tab: number) => {
    //     setCurrentOpenTab(tab)
    // } 


    return (
        <ScreenContainer
        edges={[ 'bottom']}
        >
            <BackgroundImage />
            <KeyboardAwareScrollView
            
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{
                alignItems: 'center'
            }}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={false}
            extraScrollHeight={100}
            >
                <SocialAuth title={language.registration.social.social} size='lg' currentTab={1}/>
                <Subtitle>{language.registration.social.or}</Subtitle>
                {/* <Tabs
                onTabChange={changeCurrentTab}
                tabNames={[
                    language.registration.tabs.header.organizer,
                    language.registration.tabs.header.expert, 
                    language.registration.tabs.header.student
                ]}
                defaultIndex={0}
                >
                    <RegistrationOrganizer toggleSuccessWindow={toggleSuccessWindow}/>
                    <RegistrationExpert toggleSuccessWindow={toggleSuccessWindow}/>
                    <RegistrationStudent toggleSuccessWindow={toggleSuccessWindow}/>
                </Tabs> */}
                <RegistrationStudent toggleSuccessWindow={toggleSuccessWindow}/>
            </KeyboardAwareScrollView>
            <Overlay
            isVisible={showSuccessWindow}
            onBackdropPress={() => toggleSuccessWindow()}
            fullScreen={false}
            overlayStyle={{
                width:'90%',
                maxWidth: 500,
                height: 300,
                borderRadius: 8
            }}
            >
                <PhoneConfirmation 
                email={email}
                toggleSuccessWindow={toggleSuccessWindow}
                />
            </Overlay>
        </ScreenContainer>
    )
}


export default RegistrationScreen;