import styled from 'styled-components/native';
import { CustomText } from '../../common/Text/text.styles';

export const CustomTextInput = styled.TextInput`
border: none;
border-width: 0;
width: 100%;
`

export const Text = styled(CustomText)`

`


export const InputContainer = styled.View`
width:100%;
position: relative;
align-items: flex-start;
justify-content: flex-start;
`

export const IconButton = styled.TouchableOpacity`
width: 20px;
height:20px;
align-items: center;
justify-content: center;
position: absolute;
background-color: red;
top: -10px;
right: -10px;
z-index: 1;

`