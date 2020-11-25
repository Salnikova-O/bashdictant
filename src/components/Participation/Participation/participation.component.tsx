import React, { useState } from 'react';
import {Overlay} from 'react-native-elements';

import { IExpert, IStudent } from '../../../@types/common';
import { useLanguage } from '../../LanguageProvider/language.provider';
import ParticipationList from '../ParticipationList/participation-list.component';
import ParticipationPopup from '../ParticipationPopup/participation-popup.component';
import { ParticipationContainer } from './participation.styles';


interface ParticipationProps {
    experts: IExpert[],
    students: IStudent[] 
}

const Participation: React.FC<ParticipationProps> = ({experts, students}) => {
    const {language} = useLanguage()
    const [popupVisible, setPopupVisible] = useState<IStudent|IExpert|undefined>()
    
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