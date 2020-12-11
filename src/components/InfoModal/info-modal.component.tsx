import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Overlay } from 'react-native-elements';
import { useTheme } from 'styled-components';


import Button from '../../UI/Button/Button.component';
import { useLanguage } from '../LanguageProvider/language.provider';
import {InfoContainer,InfoText} from './info-modal.styles';

interface ModalProps {
    open: boolean,
    onClose: () => void,
    message: string,
    navigate?: () => void
}


const InfoModal: React.FC<ModalProps> = ({message,navigate,onClose,open}) => {
    const {language} = useLanguage()
    const theme = useTheme()
    

    return (
        <Overlay
        isVisible={open}
        onBackdropPress={onClose}
        overlayStyle={{
            backgroundColor: theme.palette.background.main,
            width: '85%',
            maxWidth: 350,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            minHeight: 200,
            padding: 30
        }}
        >
            <InfoContainer>
                <InfoText>{message}</InfoText>
                <Button
                text={language.continue}
                bg={theme.palette.buttons.primary}
                font={theme.palette.text.primary}
                height='50px'
                onPress={onClose}
                />
            </InfoContainer>
        </Overlay>
    )
}



export default InfoModal;