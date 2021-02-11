import React from 'react'

import {
    InstructionsText,
    InstructionsWrapper,
    ButtonWrapper
} from './instructions.styles'
import { useLanguage } from '../../LanguageProvider/language.provider';
import Cross from '../../../assets/times.svg'

interface InsctructionsProps {
    isShown: boolean
    close: () => void
}

const Instructions: React.FC<{isShown: boolean, close: () => void}> = ({isShown, close}) => {
    const {language} = useLanguage()

    return (
        <InstructionsWrapper
        isShown={isShown}
        >
            <InstructionsText>
                {language.dictant.instructions}
            </InstructionsText>
            <ButtonWrapper
            onPress={close}
            isOpen={isShown}
            >
                <Cross />
            </ButtonWrapper>
        </InstructionsWrapper>
    )
}

export default Instructions