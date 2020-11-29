import React from 'react';
import { GradeTypes } from '../../@types/common';
import Grade from '../../UI/Grade/grade.component';

import {GradePickerContainer} from './grade-picker.styles';

interface GradePickerProps {
    changeGrade: (grade: GradeTypes) => void,
    currentGrade: GradeTypes|undefined
}

const grades: GradeTypes[] = ['1','2','3','4','5']

const GradePicker:React.FC <GradePickerProps> = ({changeGrade,currentGrade}) => {
    return (
        <GradePickerContainer>
            {
                grades.map((grade, index) => {
                    return (
                        <Grade
                        key={index}
                        grade={grade}
                        active={grade===currentGrade}
                        onPress={changeGrade}
                        />
                    )
                })
            }
        </GradePickerContainer>
    )
}


export default GradePicker;