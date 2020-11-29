import React, {Fragment, useEffect, useState} from 'react';
import { ScrollView } from 'react-native-gesture-handler';


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
import {experts as currentExp, students as currentStu} from '../../dummyList';
import Participation from '../../components/Participation/Participation/participation.component';
import { IExpert, IStudent } from '../../@types/common';
import Dictant from '../../components/Dictant/dictant.component';





const PersonalScreen: React.FC = () => {
    const {language} = useLanguage()
    const [experts, setExperts] = useState<IExpert[]>([])
    const [students, setStudents] = useState<IStudent[]>([])


    useEffect(() => {
        setExperts(currentExp)
        setStudents(currentStu)
    }, [])
    
    console.log(experts, students)


    const user = {
        firstName: 'Олег',
        middleName: 'Иванович',
        type: 'student'
    }


    const getTabNames = (type: string) => {
        switch (type) {
            case 'student':
                return [language.profile.tabs.first, language.profile.tabs.second.student]
            case 'expert':
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
            case 'expert':
                return [
                    <ExpertProfile key={1}/>,
                    <Participation
                    key={2}
                    experts={experts}
                    students={students}
                    />
            ]
            case 'organizer':
                return [
                    <OrganizerProfile key={1}/>,
                    <Participation
                    key={2}
                    experts={experts}
                    students={students}
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
            <ScrollView
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{
                alignItems: 'center'
            }}
            showsVerticalScrollIndicator={false}
            >
                <ScreenHeader>
                    <Title>{(language.profile.header as any)[user.type]}</Title>
                    <Subtitle>{language.profile.greeting} {user.firstName + ' '+ user.middleName}!</Subtitle>
                </ScreenHeader>
                <Tabs
                tabNames={getTabNames(user.type)}
                >
                    {getTabs(user.type)}
                </Tabs>
            </ScrollView>
        </ScreenContainer>
    )
}


export default PersonalScreen;