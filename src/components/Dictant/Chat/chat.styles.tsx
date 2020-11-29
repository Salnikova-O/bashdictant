import styled from 'styled-components/native';
import { CustomText } from '../../common/Text/text.styles';



export const ChatContainer = styled.ScrollView`

`


export const Message = styled.View`
flex-direction: row;
margin: 2px;
`


export const Time = styled(CustomText)`
color: ${props => props.theme.palette.text.grey};
font-size: 14px;
margin-right: 5px;
`


export const MessageText = styled(CustomText)`
color: ${props => props.theme.palette.text.grey};
font-size: 14px;
width: 80%;
`


export const ChatOuterContainer = styled.View`
width: 100%;
height: 100px;
padding: 8px 12px;
border-radius: 8px;
background-color: ${props => props.theme.palette.background.light};
`