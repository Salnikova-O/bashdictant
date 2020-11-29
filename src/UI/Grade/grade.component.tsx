import React from 'react';
import { GradeTypes } from '../../@types/common';

import {
    GradeContainer,
    GradeText
} from './grade.styles';

interface GradeProps {
    grade: GradeTypes
    onPress?: (grade:GradeTypes) => void,
    active: boolean
}

const Grade: React.FC<GradeProps> = ({grade,onPress, active}) => {
    return (
        <GradeContainer
        grade={grade}
        onPress={onPress? () => onPress(grade): undefined}
        active={active}
        disabled={active}
        >
            <GradeText>{grade}</GradeText>
        </GradeContainer>
    )
}



export default Grade;