import styled from 'styled-components/native';
import {Animated} from 'react-native';
import { CustomText } from '../common/Text/text.styles';


export const GetCertificateOuterContainer = styled.View`
flex:1;
padding: 25px;
position: relative;
justify-content: center;
align-items: flex-start;
overflow: hidden;

`
export const GetCertificateContainer = styled(Animated.View)`
width: 200%;
flex-direction: row;
align-items: flex-start;
`

export const GetCertificateSlide = styled.View`
width: 50%;
/* background-color: red; */
height:100%;
align-items: center;
justify-content:center;
`

export const SuccessMessage = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 16px;
text-align: center;
margin-bottom: 30px;
max-width: 95%;
`

export const IconButton = styled.TouchableOpacity`
width: 20px;
height: 20px;
justify-content: center;
align-items: center;
position: absolute;
top: 0px;
right: 0px;
`