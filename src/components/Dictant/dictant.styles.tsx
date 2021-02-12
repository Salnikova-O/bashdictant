import styled from 'styled-components/native';
import { ScreenContainer } from '../common/ScreenContainer/screen-container.styles';
import { CustomText } from '../common/Text/text.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';



export const Container = styled(ScreenContainer)`
width:100%;
padding: 0;
flex:1;
background-color: transparent;

`

export const InnerContainer = styled.View`
max-width:500px;
width: 100%;
`


export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
width:100%;
`


export const HeaderLeft = styled.View`

`

export const HeaderRight = styled.View`
align-items: flex-end;
`


export const HeaderText  = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 16px;
`

export const VideoContainer = styled.View`
width:100%;
border-radius: 10px;
overflow: hidden;

margin: 24px 0px 12px 0px;
`
export const DictantInputContainer = styled.TouchableOpacity`
padding: 8px 12px;
border-radius: 8px;
background-color: ${props => props.theme.palette.background.light};
height: 80px;
margin-top: 10px;
border-width: 1px;
border-color: #e5e5e5;
`

export const DictantInput = styled.TextInput`
border-width: 0;
width:100%;
color: ${props => props.theme.palette.text.grey};
font-size: 16px;
padding:0;
`
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