import styled from 'styled-components/native';
import { CustomText } from '../../common/Text/text.styles';


export const PaginationContainer = styled.View`
width: 100%;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 40px;
`

export const PagesContainer = styled.View`
flex-direction: row;
justify-content: flex-end;
align-items: center;
width: 100px;
`

interface ActivePageProps {
    active: boolean
}

export const PageText = styled(CustomText)<ActivePageProps>`
color: ${props => props.active? props.theme.palette.text.main: props.theme.palette.text.grey};
font-size: 14px;
`

export const Page = styled.TouchableOpacity<ActivePageProps>`
padding: 2px 2px;
border-bottom-width: 1px;
border-color: ${props => props.active? props.theme.palette.buttons.primary: 'transparent'};
`
export const Legend = styled(CustomText)`
font-size: 14px;
color: ${props => props.theme.palette.text.grey};
`
