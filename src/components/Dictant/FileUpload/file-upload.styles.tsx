import styled from 'styled-components/native';
import { CustomText } from '../../common/Text/text.styles';


export const FileUploadContainer = styled.View`
width:100%;
border-radius: 8px;
`

export const UploadTitle = styled(CustomText)`
font-size: 14px;
margin: 20px 0px 10px 0px;
text-align: center;
align-self: center;
color: ${props => props.theme.palette.text.grey};
`


export const ItemContainer = styled.View`
flex-direction: row;
padding: 14px 20px;
background-color: ${props => props.theme.palette.background.light};
justify-content: space-between;
align-items:center;
`

export const FileName = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.main};
`


export const IconButton = styled.TouchableOpacity`
width: 18px;
height: 18px;
justify-content: center;
align-items: center;
border-width:1.5px;
border-color: ${props => props.theme.palette.text.main};
border-radius: 9px;
`