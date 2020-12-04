import React, { useEffect, useState } from 'react';
import {Overlay} from 'react-native-elements';
import { useSelector } from 'react-redux';

import { IExpert, IStudent } from '../../../@types/common';
import { userSelectors } from '../../../redux/user/user.selectors';
import { useLanguage } from '../../LanguageProvider/language.provider';
import ParticipationList from '../ParticipationList/participation-list.component';
import ParticipationPopup from '../ParticipationPopup/participation-popup.component';
import { ParticipationContainer } from './participation.styles';
import {experts , students } from '../../../dummyList';


const Participation: React.FC = () => {
    const {language} = useLanguage()
    const [popupVisible, setPopupVisible] = useState<IStudent|IExpert|undefined>()
    const currentUser = useSelector(userSelectors.currentUser)
    

    useEffect(()=> {

    }, [])

    const togglePopup = (user?: IStudent|IExpert) => {
        setPopupVisible(user? user: undefined)
    }

    return (
        <ParticipationContainer>
            <ParticipationList
            header={language.participation.student}
            users={students}
            togglePopup={togglePopup}
            />
            <ParticipationList
            header={language.participation.expert}
            users={experts}
            togglePopup={togglePopup}
            />
            <ParticipationPopup
            toggleOverlay={togglePopup}
            visible={popupVisible? true: false}
            user={popupVisible}
            />
        </ParticipationContainer>
    )   
} 

export default Participation;