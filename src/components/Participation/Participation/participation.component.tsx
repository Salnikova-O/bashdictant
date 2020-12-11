import React, { Fragment, useEffect, useState } from 'react';
import {Overlay} from 'react-native-elements';
import { useSelector } from 'react-redux';


import { IExpert, IStudent } from '../../../@types/common';
import { userSelectors } from '../../../redux/user/user.selectors';
import { useLanguage } from '../../LanguageProvider/language.provider';
import ParticipationList from '../ParticipationList/participation-list.component';
import ParticipationPopup from '../ParticipationPopup/participation-popup.component';
import { ParticipationContainer } from './participation.styles';



const Participation: React.FC = () => {
    const {language} = useLanguage()
    const [popupVisible, setPopupVisible] = useState<IStudent|IExpert|undefined>()
    const currentUser = useSelector(userSelectors.currentUser)

    



    const getTabName = (role:string|undefined, tabNumber: number) => {
        if (role==='teacher') {
            if (tabNumber===1) {
                return language.participation.form.headerRegistered
            } else {
                return language.participation.form.headerPinned
            }
        } else if (role==='organizer') {
            if (tabNumber===1) {
                return language.participation.student
            } else {
                return language.participation.expert
            }
        } else {
            return ''
        }
    }


    const togglePopup = (user?: IStudent|IExpert) => {
        setPopupVisible(user? user: undefined)
    }

    return (
        <ParticipationContainer>

                <Fragment>
                    <ParticipationList
                    header={getTabName(currentUser?.role, 1)}
                    togglePopup={togglePopup}
                    tabIndex={0}
                    />
                    <ParticipationList
                    header={getTabName(currentUser?.role, 2)}
                    togglePopup={togglePopup}
                    tabIndex={1}
                    />
                    <ParticipationPopup
                    toggleOverlay={togglePopup}
                    visible={popupVisible? true: false}
                    user={popupVisible}
                    />
                </Fragment>
        </ParticipationContainer>
    )   
} 

export default Participation;