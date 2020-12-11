import styled from 'styled-components/native';
import { CustomText } from '../../common/Text/text.styles';



export const ItemContainer = styled.View`
flex-direction: row;
width: 100%;
height: 32px;
padding: 8px 0;
align-items: center;
border-bottom-width: 1px;
border-color: ${props => props.theme.palette.text.grey};
margin-bottom: 17px;
opacity:1;
`

export const IndexColumn = styled.View`
width: 10%;
`
export const NameColumn = styled.TouchableOpacity`
width: 34%;
`

export const EmailColumn = styled.TouchableOpacity`
width: 44%;
opacity:1;
`

export const IconColumn = styled.View`
width: 6%;
`
export const TableText = styled(CustomText)`
color: ${props => props.theme.palette.text.grey};
font-size: 12px;
`


export const IconButton = styled.TouchableOpacity`
height: 100%;
width: 100%;
align-items: center;
justify-content: center;
`

