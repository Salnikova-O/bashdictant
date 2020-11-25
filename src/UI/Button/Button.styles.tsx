import styled from 'styled-components/native';

export interface ButtonProps {
    bg: string,
    border?: string,
    font: string,
    height: '50px'|'40px',
    marginTop?: number
}


export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
margin-top: ${props => props.marginTop? props.marginTop + 16: 16}px;
justify-content: center;
align-items: center;
width: 100%;
max-width: 440px;
border-radius: 4px;
background-color: ${props => props.bg};
border-color: ${props => props.border? props.border: 'transparent'};
border-width: ${props => props.border? '1px': '0'};
height: ${props => props.height};
`


export const ButtonText = styled.Text<ButtonProps>`
color: ${props => props.font};
font-size: ${props => props.height==='50px'? '18px': '16px'};
`