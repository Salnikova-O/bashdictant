import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';


import { ScreenContainer } from '../../components/common/ScreenContainer/screen-container.styles';
import { useLanguage } from '../../components/LanguageProvider/language.provider';
import Tabs from '../../components/Tabs/tabs.component';
import {
    ScreenHeader,
    Subtitle,
    Title
} from './personal.styles';
import StudentProfile from '../../components/ProfilePage/StudentProfile/student-profile.component';
import ExpertProfile from '../../components/ProfilePage/ExpertProfile/expert-profile.component';
import OrganizerProfile from '../../components/ProfilePage/OrganizerProfile/organizer-profile.component';

import Participation from '../../components/Participation/Participation/participation.component';
import { IExpert, IStudent } from '../../@types/common';
import Dictant from '../../components/Dictant/dictant.component';
import { userSelectors } from '../../redux/user/user.selectors';





const PersonalScreen: React.FC = () => {
    const {language} = useLanguage()
    const currentUser = useSelector(userSelectors.currentUser)

    console.log(currentUser)

    const getTabNames = (type: string) => {
        switch (type) {
            case 'student':
                return [language.profile.tabs.first, language.profile.tabs.second.student]
            case 'teacher':
                return [language.profile.tabs.first, language.profile.tabs.second.expert]
            case 'organizer':
                return [language.profile.tabs.first, language.profile.tabs.second.organizer]
            default:
                return []
        }
    }


    const getTabs = (type: string) => {
        switch (type) {
            case 'student':
                return [
                    <StudentProfile key={1}/>,
                    <Dictant  key={2}/>
            ]
            case 'teacher':
                return [
                    <ExpertProfile key={1}/>,
                    <Participation
                    key={2}
                    />
            ]
            case 'organizer':
                return [
                    <OrganizerProfile key={1}/>,
                    <Participation
                    key={2}
                    />
            ]
            default:
                return []
        }
    }

    return (
        <ScreenContainer
        edges={[ 'bottom']}
        >
            {
                currentUser?
                <ScrollView
                style={{flex: 1, width: '100%'}}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                showsVerticalScrollIndicator={false}
                >
                    <ScreenHeader>
                        <Title>{(language.profile.header as any)[currentUser.role]}</Title>
                        <Subtitle>{language.profile.greeting} {currentUser.first_name+ ' '+ currentUser.middle_name}!</Subtitle>
                    </ScreenHeader>
                    <Tabs
                    tabNames={getTabNames(currentUser.role)}
                    >
                        {getTabs(currentUser.role)}
                    </Tabs>
                </ScrollView>
                :null
            }
        </ScreenContainer>
    )
}


export default PersonalScreen;