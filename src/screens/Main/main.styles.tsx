import styled from 'styled-components/native';
import { CustomText } from '../../components/common/Text/text.styles';
import { ScreenContainer } from '../../components/common/ScreenContainer/screen-container.styles';
import {OrientationProps} from '../../components/OrientationProvider/orientation.provider';



export const Container = styled(ScreenContainer)<OrientationProps>`
flex-direction: ${props => props.orientation==='PORTRAIT'? 'column': 'row-reverse'};
`


export const VideoContainer = styled.View`
flex:1;
justify-content: flex-end;
width: 100%;
`

export const Title = styled(CustomText)`
font-size: 16px;
text-align: center;
width: 100%;
max-width: 270px;
color: ${props => props.theme.palette.text.main};
`

export const ButtonsContainer = styled.View<OrientationProps>`
justify-content: ${props => props.orientation==='PORTRAIT'? 'center': 'space-between'};;
align-items: center;
width: ${props => props.orientation==='PORTRAIT'? '100%': '50%'};
padding-right: ${props => props.orientation==='PORTRAIT'? '0px': '10px'};
height: ${props => props.orientation==='PORTRAIT'? 'auto': '100%'};
`


