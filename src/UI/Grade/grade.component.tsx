import React from 'react';
import { GradeTypes } from '../../@types/common';

import {
    GradeContainer,
    GradeText,
    GradeBorder
} from './grade.styles';

interface GradeProps {
    grade: GradeTypes
    onPress?: (grade:GradeTypes) => void,
    active: boolean
}

interface GradeBorderProps {
    grade: GradeTypes
    active: boolean
}

const Grade: React.FC<GradeProps> = ({grade,onPress, active}) => {
    return (
        <GradeBorder
        grade={grade}
        active={active}
        >
            <GradeContainer
            grade={grade}
            onPress={onPress? () => onPress(grade): undefined}
            active={active}
            disabled={active}
            >
                <GradeText>{grade}</GradeText>
            </GradeContainer>
        </GradeBorder>
    )
}



export default Grade;