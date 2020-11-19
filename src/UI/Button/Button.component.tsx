import React from 'react';


import {
    ButtonContainer,
    ButtonText,
    ButtonProps
} from './Button.styles';

interface IButton {
    text: string,
    onPress: () => void
}


const Button: React.FC<IButton&ButtonProps> = ({
    bg,
    font,
    height,
    border,
    onPress,
    text,
}) => {
    return (
        <ButtonContainer
        onPress={onPress}
        bg={bg}
        font={font}
        height={height}
        border={border}
        >
            <ButtonText
            bg={bg}
            font={font}
            height={height}
            border={border}
            >
                {text}
            </ButtonText>
        </ButtonContainer>
    )
}


export default Button;