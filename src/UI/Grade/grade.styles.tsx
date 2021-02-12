import styled from 'styled-components/native';
import { GradeTypes } from '../../@types/common';
import { CustomText } from '../../components/common/Text/text.styles';


interface GradeStyleProps {
    grade:GradeTypes,
    active: boolean
}

interface GradeBorderProps {
    grade: GradeTypes
    active: boolean
}


export const GradeContainer = styled.TouchableOpacity<GradeStyleProps>`
/* width: 50px;
height:50px; */
width: ${props => props.active? '60px': '50px'};
height: ${props => props.active? '60px': '50px'};
border-radius: 3px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.palette.grades[props.grade]};
/* opacity: ${props => props.active? 1: 0.6}; */
`

export const GradeBorder = styled.View<GradeBorderProps>`
    height: 68px;
    width: 68px;
    color: transparent;
    justify-content: center;
    align-items: center;

    border-color: ${props => props.active ? props.theme.palette.grades[props.grade] : 'transparent'};
    border-width: 1px;
    border-radius: 3px;
`


export const GradeText = styled(CustomText)`
font-size: 18px;
color: #ffffff;
`