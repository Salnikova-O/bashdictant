import styled from 'styled-components/native';
import { ScreenContainer } from '../../components/common/ScreenContainer/screen-container.styles';
import { CustomText } from '../../components/common/Text/text.styles';


export const Container = styled(ScreenContainer)`
width:100%;


`

export const InnerContainer = styled.ScrollView`
width:100%;
max-width:500px;
`


export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
width:100%;
`


export const HeaderLeft = styled.View`

`

export const HeaderRight = styled.View`

`


export const HeaderText  = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 16px;
`