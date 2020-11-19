import styled from 'styled-components/native';
import { ScreenContainer } from '../../components/common/ScreenContainer/screen-container.styles';
import { CustomText } from '../../components/common/Text/text.styles';
import { OrientationProps } from '../../components/OrientationProvider/orientation.provider';


export const Container = styled(ScreenContainer)<OrientationProps>`

`


export const FormContainer = styled.View<OrientationProps>`
width: 100%;
align-items: center;
flex-direction: ${props => props.orientation==='PORTRAIT'? 'column': 'row'};
`

export const AuthContainer = styled.View<OrientationProps>`
width: ${props => props.orientation==='PORTRAIT'? '100%': '50%'};
margin-top: ${props => props.orientation==='PORTRAIT'? '40px': '0px'};
align-items: center;
`

export const AuthTitleWrapper = styled.View`
border-bottom-width:1px;
border-bottom-color: ${props => props.theme.palette.buttons.primary};
padding-bottom: 5px; 
margin-bottom: 10px;
`

export const AuthTitle = styled(CustomText)`
font-size: 18px;
color: ${props => props.theme.palette.text.main};
`

export const Subtitle = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.grey};
margin-bottom: 15px;
`