import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';

export const InfoContainer = styled.View`
flex:1;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`


export const InfoText = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 16px;
text-align: center;
margin-bottom: 30px;
`