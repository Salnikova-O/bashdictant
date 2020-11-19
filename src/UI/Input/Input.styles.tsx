import styled from 'styled-components/native';


export const CustomInput = styled.TextInput`
width: 100%;
border-width: 0px;
border-bottom-width:1px;
border-bottom-color: ${props => props.theme.palette.text.grey};
color: ${props => props.theme.palette.text.main};
padding: 8px 45px 8px 0px;
background-color: transparent;
`

export const InputContainer = styled.View`
flex-direction: row;
width: 100%;
max-width: 350px;
position: relative;
margin: 8px 0px;
`

export const IconButton = styled.TouchableOpacity`
height:100%;
width: 22.5px;
justify-content: center;
align-items: center;
`

