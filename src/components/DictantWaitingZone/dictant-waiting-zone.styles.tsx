import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';


interface ColorProps {
    reverse: boolean|undefined
}


export const ZoneContainer = styled.View`
flex:1;
justify-content: center;
align-items: center;
width:100%;
height: 300px;
`


export const TimerTitle = styled(CustomText)<ColorProps>`
    font-size:16px;
    color: ${props => props.reverse? '#fff': props.theme.palette.text.grey};
`

export const Time = styled(CustomText)<ColorProps>`
    font-size:18px;
    color: ${props => props.reverse? '#fff':props.theme.palette.text.main};
    margin: 24px 0;
`