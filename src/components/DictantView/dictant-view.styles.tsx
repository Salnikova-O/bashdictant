import styled from 'styled-components/native';
import Button from '../../UI/Button/Button.component';

export const Container = styled.View`
width: 100%;
margin-top: 30px;
`


export const DictantBody = styled.View`
border-width:1px;
border-radius: 8px;
border-color: #AAAAAA;
padding:24px;
position: relative;
overflow: hidden;
height: 574px;
`


export const DictantText = styled.Text`
font-size: 14px;
line-height: 17px;
color: ${props => props.theme.palette.text.main};
`
export const DictantTextContainer = styled.Text`
font-size: 14px;
line-height: 17px;
color: ${props => props.theme.palette.text.main};
position: relative;

`

export const ShadowText = styled(DictantTextContainer)`
position: absolute;
top:24px;
left:24px;
padding:1px;
opacity: 0;
z-index: -1;
`


export const MarkerContainer = styled.TouchableOpacity`

position: absolute;
z-index: 2;
right:-10px;
bottom: 0;
`


export const DC = styled.View`
width:100%;
`

export const DRow = styled.View`
height:17px;
width:100%;
flex-direction: row;
margin: 0;
padding:0;
`


export const PopoverContainer = styled.View`
width: 250px;
background-color: ${props => props.theme.palette.background.light};
justify-content: flex-start;
align-items: flex-start;
padding: 10px;
border-radius: 8px;
`

export const PrevNextButtons = styled.View`
width: 100%;
`