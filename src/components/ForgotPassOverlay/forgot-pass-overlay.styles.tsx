import styled from 'styled-components/native';
import { CustomText } from '../common/Text/text.styles';
import {Animated} from 'react-native';

export const ResetPassOuterContainer = styled.View`
flex:1;
padding: 25px;
position: relative;
justify-content: center;
align-items: flex-start;
overflow: hidden;

`
export const ResetPassContainer = styled(Animated.View)`
width: 200%;
flex-direction: row;
align-items: flex-start;
`

export const ResetPassSlide = styled.View`
width: 50%;
/* background-color: red; */
height:100%;
align-items: center;
justify-content:center;
`

export const SuccessMessage = styled(CustomText)`
color: ${props => props.theme.palette.text.main};
font-size: 18px;
text-align: center;
margin-bottom: 30px;
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