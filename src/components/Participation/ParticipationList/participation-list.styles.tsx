import styled from 'styled-components/native';
import { CustomText } from '../../common/Text/text.styles';


export const Header = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 18px;
margin-bottom: 25px;
align-self: flex-start;
`