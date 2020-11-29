import React from 'react';


import {
    ButtonContainer,
    ButtonText,
    ButtonProps
} from './Button.styles';

interface IButton {
    text: string,
    onPress: () => void,
    disabled?: boolean
}


const Button: React.FC<IButton&ButtonProps> = ({
    bg,
    font,
    height,
    border,
    marginTop,
    onPress,
    text,
    disabled
}) => {
    return (
        <ButtonContainer
        onPress={disabled? undefined: onPress}
        bg={bg}
        font={font}
        height={height}
        border={border}
        marginTop={marginTop}
        disabled={disabled}
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