import styled from 'styled-components/native';
import { CustomText } from '../../components/common/Text/text.styles';



export const ScreenHeader = styled.View`
width:100%;
align-items: flex-start;
margin: 15px 0px 35px 0px;
max-width: 500px;
`

export const Title = styled(CustomText)`
font-size: 18px;
color: ${props => props.theme.palette.text.main};
margin-bottom: 20px;
`

export const Subtitle = styled(CustomText)`
font-size: 16px;
color: ${props => props.theme.palette.text.grey};
`