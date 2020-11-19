import React from 'react';

import CloseSVG from '../../assets/close.svg';
import {
    AlertContainer,
    AlertText,
    CloseIcon
} from './alert.styles';


interface AlertProps {
    onClose: () => void,
    text: string,
    type: 'success'| 'error'
}


const Alert: React.FC<AlertProps> = ({onClose,text,type}) => {
    return (
        <AlertContainer type={type}>
            <AlertText>{text}</AlertText>
            <CloseIcon onPress={onClose}>
                <CloseSVG width={25}/>
            </CloseIcon>
        </AlertContainer>
    )
}


export default Alert;