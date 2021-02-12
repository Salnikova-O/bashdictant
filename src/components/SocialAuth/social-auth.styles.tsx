import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';


export const SocialAuthContainer = styled.View`
width:100%;
justify-content: center;
align-items: center;
`


export const Subtitle = styled(CustomText)<SocialButtonProps>`
font-size: ${props => props.size==='lg'? '18px': '14px'};;
color: ${props => props.theme.palette.text.grey};
margin: ${props => props.size==='lg'? '30px 0': '20px 0'};;
`


export const SocialButtons = styled.View`
width:100%;
flex-direction: row;
justify-content: center;
align-items: center;
`

interface SocialButtonProps {
    color?: string,
    size?: 'lg'
}

export const SocialButton = styled.TouchableOpacity<SocialButtonProps>`
background-color: ${props => props.color};
width: ${props => props.size==='lg'? '50px': '40px'};
height: ${props => props.size==='lg'? '50px': '40px'};
border-radius: 2px;
justify-content: center;
align-items: center;
margin: 0 14px;
`