import styled from 'styled-components/native';
import { GradeTypes } from '../../@types/common';
import { CustomText } from '../../components/common/Text/text.styles';


interface GradeStyleProps {
    grade:GradeTypes,
    active: boolean
}


export const GradeContainer = styled.TouchableOpacity<GradeStyleProps>`
width: 50px;
height:50px;
border-radius: 3px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.palette.grades[props.grade]};
opacity: ${props => props.active? 1: 0.6};
`


export const GradeText = styled(CustomText)`
font-size: 16px;
color: #ffffff;
`