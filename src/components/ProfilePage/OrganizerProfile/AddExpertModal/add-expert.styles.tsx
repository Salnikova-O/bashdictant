import styled from 'styled-components/native'
import { CustomText } from '../../../common/Text/text.styles'


export const SuccessMessageContainer = styled.View`
flex:1;
position: relative;
align-items: center;
justify-content: center;
padding: 30px;
`

export const SuccessMessage = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 16px;
text-align: center;
margin-bottom: 30px;
`

export const IconButton = styled.TouchableOpacity`
width: 20px;
height: 20px;
justify-content: center;
align-items: center;
position: absolute;
top: 0px;
right: 0px;
`

interface MessageTypes {
    color: string
}

export const MessageContainer = styled.View<MessageTypes>`
width: 100%;
background-color: ${props => props.color};
border-radius: 8px;
justify-content: center;
align-items: center;
padding: 8px 25px;
margin-bottom: 30px;
`

export const MessageText = styled.Text`
color: #ffffff;

`