import React from 'react';
import { DictantStatus, IExpert, IOrganizer, IStudent } from '../../../@types/common';

import {
    EmailColumn,
    IconColumn,
    IndexColumn,
    ItemContainer,
    NameColumn,
    TableText,
    IconButton
} from './participation-item.styles';
import InfoSVG from '../../../assets/info-new.svg';
import NotCheckedSVG from '../../../assets/notchecked-new.svg';
import PendingSVG from '../../../assets/pending-new.svg';
import ReadySVG from '../../../assets/ready-new.svg';
import WarningSVG from '../../../assets/warning-new.svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../redux/user/user.selectors';



interface ItemProps  {
    user: IStudent|IExpert,
    index: number,
    togglePopup: (user?: IStudent | IExpert | undefined) => void,
    pinned?: boolean
}


const ParticipationItem: React.FC<ItemProps> = ({user, index, togglePopup, pinned}) => {
    const navigation = useNavigation()
    const currentUser = useSelector(userSelectors.currentUser)


    const getStatusIcon = (status: DictantStatus) => {
        switch (status) {
            case 'Проверен':
                return <ReadySVG width={20} height={20}/>
            case 'Не написан': 
                return <NotCheckedSVG width={20} height={20}/>
            case 'Проверяется':
                return <PendingSVG width={20} height={20}/>
            case 'Отклонен': 
                return <WarningSVG width={20} height={20}/>
            default: 
                return <NotCheckedSVG width={20} height={20}/>
        }
    }
    

    const openInfo = () => {
        togglePopup(user)
    }
    
    const openDictant = () => {
        
        if ((user as IStudent).status&&((user as IStudent).status==='Проверяется'||(user as IStudent).status==='Проверен'||(user as IStudent).status==='Отклонен')&&currentUser?.role==='teacher'&&pinned) {
            navigation.navigate('DictantCheck', {student: JSON.stringify(user)})
        }
    }


    return (
        <ItemContainer>
            <IndexColumn>
                <TableText>{index}</TableText>
            </IndexColumn>
            <NameColumn onPress={openDictant} activeOpacity={pinned?0.6:1}>
                <TableText>
                    {user.last_name + ' '+ user.first_name.slice(0,1) + '.' + user.middle_name.slice(0,1)+ '.' }
                </TableText>
            </NameColumn>
            <EmailColumn onPress={openDictant} activeOpacity={pinned?0.6:1}>
                <TableText>
                    {user.email}
                </TableText>
            </EmailColumn>
            <IconColumn>
                {
                    user.role==='student'? 
                    <IconButton onPress={openInfo}>
                            <InfoSVG width={20} height={20}/>
                    </IconButton>
                    :null
                }
            </IconColumn>
            <IconColumn>
                    {
                        user.role==='student'?
                        <IconButton onPress={openDictant} activeOpacity={pinned?0.6:1}>
                            {getStatusIcon((user as IStudent).status)}
                        </IconButton>
                        : 
                        <IconButton onPress={openInfo}>
                            <InfoSVG width={20} height={20}/>
                        </IconButton>
                    }
            </IconColumn>
        </ItemContainer>
    )
}


export default ParticipationItem;