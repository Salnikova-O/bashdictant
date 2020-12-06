import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';

export const ZoneContainer = styled.View`
flex:1;
justify-content: center;
align-items: center;
width:100%;
height: 300px;
`


export const TimerTitle = styled(CustomText)`
    font-size:14px;
    color: ${props => props.theme.palette.text.grey};
`

export const Time = styled(CustomText)`
    font-size:16px;
    color: ${props => props.theme.palette.text.main};
    margin: 24px 0;
`