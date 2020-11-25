import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';


export const RegistrationForm = styled.View`
flex:1;
width:100%;
align-items: center;
`

export const CheckboxContainer = styled.View`
width:100%;
padding:0;
`

export const Title = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.grey};
width: 100%;
align-content: flex-start;
margin: 20px 0px;
`