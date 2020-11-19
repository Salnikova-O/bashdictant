import styled from 'styled-components/native'
import { CustomText } from '../common/Text/text.styles'

interface OptionProps {
    active?: boolean
}

export const OptionsContainer = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
margin-bottom: 16px;
padding: 0 10px;
`


export const OptionWrapper = styled.TouchableOpacity<OptionProps>`
padding: 4px 0;
/* border-bottom-width: ${props => props.active? '1px': '0px'};
border-bottom-color: ${props => props.theme.palette.buttons.primary}; */
`

export const OptionText = styled(CustomText)<OptionProps>`
font-size: 16px;
color: ${props => props.active? props.theme.palette.text.main: props.theme.palette.text.grey};
`


export const TabsContainer = styled.View`
width:100%;
`