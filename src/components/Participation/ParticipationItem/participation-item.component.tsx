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
import InfoSVG from '../../../assets/info.svg';
import NotCheckedSVG from '../../../assets/notchecked.svg';
import PendingSVG from '../../../assets/pending.svg';
import ReadySVG from '../../../assets/ready.svg';
import WarningSVg from '../../../assets/warning.svg';




interface ItemProps  {
    user: IStudent|IExpert,
    index: number,
    togglePopup: (user?: IStudent | IExpert | undefined) => void
}


const ParticipationItem: React.FC<ItemProps> = ({user, index, togglePopup}) => {
    
    const getStatusIcon = (status: DictantStatus) => {
        switch (status) {
            case 'ready':
                return <ReadySVG width={20} height={20}/>
            case 'notChecked': 
                return <NotCheckedSVG width={20} height={20}/>
            case 'pending':
                return <PendingSVG width={20} height={20}/>
            case 'warning': 
                return <WarningSVg width={20} height={20}/>
            default: 
                return <ReadySVG width={20} height={20}/>
        }
    }
    

    const openInfo = () => {
        togglePopup(user)
    }
    
    const openDictant = () => {

    }


    return (
        <ItemContainer>
            <IndexColumn>
                <TableText>{index}</TableText>
            </IndexColumn>
            <NameColumn>
                <TableText>
                    {user.lastName + ' '+ user.firstName.slice(0,1) + '.' + user.middleName.slice(0,1)+ '.' }
                </TableText>
            </NameColumn>
            <EmailColumn>
                <TableText>
                    {user.email}
                </TableText>
            </EmailColumn>
            <IconColumn>
                {
                    user.type==='student'? 
                    <IconButton onPress={openInfo}>
                            <InfoSVG width={20} height={20}/>
                    </IconButton>
                    :null
                }
            </IconColumn>
            <IconColumn>
                    {
                        user.type==='student'?
                        <IconButton onPress={openDictant}>
                            {getStatusIcon((user as IStudent).dictantStatus)}
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