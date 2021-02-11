import styled from 'styled-components/native'

import { CustomText } from '../../common/Text/text.styles'

interface InsctructionsProps {
    isShown: boolean
}

interface CloseButtonProps {
    onPress: () => void
    isOpen: boolean
}

export const InstructionsWrapper = styled.View<InsctructionsProps>`
    width: 100%;
    min-height: ${props => props.isShown ? '80px' : '0px'};
    flex-direction: row;
    border: 1px #E5E5E5 solid;
    background-color: #FBFBFB;
    max-height: ${props => props.isShown ? '200px' : '0px'};

    padding: 19px;
    align-items: center;
    justify-content: space-between;
    opacity: ${props => props.isShown ? 1 : 0};
`

export const InstructionsText = styled(CustomText)`
    width: 80%;
    color: #5A5A5A;
`

export const ButtonWrapper =styled.TouchableOpacity<CloseButtonProps>`
    height: 42px;
    width: 42px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;

    background-color: #E5E5E5;
`