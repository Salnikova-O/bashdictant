import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { CustomText } from '../common/Text/text.styles';

export const HeaderContainer = styled(SafeAreaView)`
padding: 16px 20px;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color:${props => props.theme.palette.background.main};
min-height: 75px;
`

export const LanguageContainer = styled.TouchableOpacity`
justify-content: center;
align-items: center;
border-color: ${props => props.theme.palette.buttons.primary};
border-bottom-width: 1px;
height: 16px;
`

export const Language = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.main};

`