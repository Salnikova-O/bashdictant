import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';


export const Container = styled.View`
width:100%;
`

export const Header = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.main};
margin: 15px 0px;
font-weight: 700;
`

export const ItemContainer = styled.View`
flex-direction: row;
padding: 14px 20px;
background-color: ${props => props.theme.palette.background.light};
justify-content: space-between;
align-items:center;
border-radius: 8px;
margin-bottom: 10px;
`

export const FileName = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.main};
width:70%;
`


export const IconButton = styled.TouchableOpacity`
width: 30px;
height: 25px;
justify-content: center;
align-items: center;

`