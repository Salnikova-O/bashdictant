import styled from 'styled-components/native';
import { CustomText } from '../Text/text.styles';


export const Error = styled(CustomText)`
margin-top: 5px;
color: ${props => props.theme.palette.text.error};
font-size: 16px;
text-align: center;
`