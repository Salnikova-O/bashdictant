import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';


export const Container = styled.ScrollView`
max-width:500px;
width: 100%;
flex:1;
padding-bottom: 30px;
`


export const GradeContainer = styled.View`
flex-direction: row;
align-items: center;
width:100%;
margin-bottom: 15px;
margin-top: 10px;
`

export const GradeText = styled(CustomText)`
font-size: 14px;
color: ${props => props.theme.palette.text.main};
margin-right: 15px;
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