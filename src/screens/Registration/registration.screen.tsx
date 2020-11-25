import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {Text} from 'react-native';

import {Subtitle} from './registration.styles';

import { ScreenContainer } from '../../components/common/ScreenContainer/screen-container.styles';
import SocialAuth from '../../components/SocialAuth/social-auth.component';
import Tabs from '../../components/Tabs/tabs.component';
import DisplayDictant from '../../components/DisplayDictant/display-dictant.component'
import RegistrationStudent from '../../components/RegistrationStudent/registration-student.component';
import RegistrationExpert from '../../components/RegistrationExpert/registration-expert.component';
import RegistrationOrganizer from '../../components/RegistrationOrganizer/registration-organizer.component';
import { useLanguage } from '../../components/LanguageProvider/language.provider';


const RegistrationScreen: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<'student'|'expert'|'organizer'>('student')
    const {language} = useLanguage()

    return (
        <ScreenContainer
        edges={[ 'bottom']}
        >
            <ScrollView
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{
                alignItems: 'center'
            }}
            showsVerticalScrollIndicator={false}
            >
                <SocialAuth title={language.registration.social.social} size='lg'/>
                <Subtitle>{language.registration.social.or}</Subtitle>
                <Tabs
                tabNames={[
                    language.registration.tabs.header.organizer,
                    language.registration.tabs.header.expert, 
                    language.registration.tabs.header.student
                ]}
                >
                    <RegistrationOrganizer/>
                    <RegistrationExpert/>
                    <RegistrationStudent/>
                </Tabs>
            </ScrollView>
        </ScreenContainer>
    )
}


export default RegistrationScreen;