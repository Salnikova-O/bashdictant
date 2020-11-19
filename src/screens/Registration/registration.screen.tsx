import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {Text} from 'react-native';

import {Subtitle} from './registration.styles';

import { ScreenContainer } from '../../components/common/ScreenContainer/screen-container.styles';
import SocialAuth from '../../components/SocialAuth/social-auth.component';
import Tabs from '../../components/Tabs/tabs.component';

const RegistrationScreen: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<'student'|'expert'|'organizer'>('student')


    return (
        <ScreenContainer
        edges={[ 'bottom']}
        >
            <ScrollView
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{
                alignItems: 'center'
            }}
            >
                <SocialAuth title='Регистрация через соц.сеть' size='lg'/>
                <Subtitle>Или:</Subtitle>
                <Tabs
                tabNames={['Организатор', 'Эксперт', 'Участник']}
                >
                    <Text>1</Text>
                    <Text>2</Text>
                    <Text>3</Text>
                </Tabs>
            </ScrollView>
        </ScreenContainer>
    )
}


export default RegistrationScreen;