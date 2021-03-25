import styled from 'styled-components/native';
import { CustomText } from '../../common/Text/text.styles';


export const FileUploadContainer = styled.View`
width:100%;
border-radius: 8px;
`

export const UploadTitle = styled(CustomText)`
font-size: 16px;
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
width:70%;
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

export const Size = styled(CustomText)`
flex:1;
text-align: right;
padding: 0px 5px;
font-size: 12px;
color: ${props => props.theme.palette.text.grey};

`

export const FileType = styled.TouchableOpacity`
width: 100%;
height: 40px;
justify-content: center;
padding: 0 10px;
`

export const TypeTitle = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 18px;
`

export const Backdrop = styled.TouchableWithoutFeedback`
flex: 1;
background-color: rgba(0,0,0, 0.6);
`

export const ModalView = styled.View`
height: 130px;
width: 100%;
padding-top: 10px;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
background-color: white;
position: absolute;
bottom: 0;
`