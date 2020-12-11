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
align-items: flex-end;
`


export const HeaderText  = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 16px;
`


export const InfoContainer = styled.View`
flex:1;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`


export const InfoText = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 16px;
text-align: center;
margin-bottom: 30px;
`