import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';


export const RegistrationForm = styled.View`
flex:1;
width:100%;
align-items: center;
position: relative;
`

export const CheckboxContainer = styled.View`
flex-direction: row;
width: 100%;
`

export const AgreementText = styled(CustomText)`
color: ${props =>props.theme.palette.text.main};
font-size: 14px;
align-items: flex-end;
`

export const AgreementLink = styled.TouchableOpacity`
border-bottom-width: 1px;
border-bottom-color: ${props => props.theme.palette.buttons.primary};
/* margin-left: 5px; */

`

export const LinkText = styled(AgreementText)`
color: ${props => props.theme.palette.buttons.primary};
border-bottom-width: 1px;
border-bottom-color: ${props => props.theme.palette.buttons.primary};
/* margin-left: 5px; */
`


export const AgreementContainer = styled.View`
flex-direction: row;
flex-wrap: wrap;
align-items: center;
width: 90%;
`