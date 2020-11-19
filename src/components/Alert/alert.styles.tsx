import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';

interface AlertProps {
    type: 'success'|'error'
}

export const AlertContainer = styled.View<AlertProps>`
background-color: ${props => props.type==='success'? '#dcedc8': '#ff7961' };
justify-content: center;
align-items: center;
padding: 15px 0px;
position: relative;
width: 100%;
border-radius: 5px;
margin-bottom: 10px;
`

export const AlertText = styled(CustomText)`
font-size: 12px;
color: #181818;
`


export const CloseIcon = styled.TouchableOpacity`
width: 40px;
height: 40px;
justify-content: center;
align-items: center;
position: absolute;
top: 20px;
right: 20px;
`