import styled from 'styled-components/native'
import { CustomText } from '../../common/Text/text.styles'


export const InfoContainer = styled.ScrollView`
width:100%;
padding: 20px;

`


export const InfoHeader = styled(CustomText)`
font-size: 18px;
color: ${props => props.theme.palette.text.main};
margin-bottom: 24px;
`

export const InfoField = styled.View`
padding: 8px 0px;
width:100%;
justify-content: center;
border-bottom-width: 1px;
border-color: ${props => props.theme.palette.text.grey}; 
margin-bottom: 17px;
`

export const InfoText = styled(CustomText)`
color: ${props => props.theme.palette.text.main}; 
font-size: 16px;
`


export const SubTitle = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.grey};
margin-bottom: 24px;
margin-top: 24px;
`
export const IconButton = styled.TouchableOpacity`
width: 30px;
height: 30px;
justify-content: center;
align-items: center;
position: absolute;
top: 10px;
right: 10px;
z-index: 1;
`

