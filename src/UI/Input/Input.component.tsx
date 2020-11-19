import React from 'react';
import { useTheme } from 'styled-components';

import {
    CustomInput,
    IconButton,
    InputContainer
} from './Input.styles';
import PlusSVG from '../../assets/plus.svg';
import EditSVG from '../../assets/edit.svg';


interface InputProps {
    onChangeText: (e: string | React.ChangeEvent<any>) => void,
    value: string,
    placeholder?: string,
    password?: boolean,
    onBlur?: (e: any) => void,
    maxLength?: number,
    showEdit?: boolean,
    toggleEdit?: () => void,
    edit?: boolean,
    showAdd?: boolean,
    onAdd?: () => void
}


const Input:React.FC<InputProps> = ({
    onChangeText,
    placeholder,
    password,
    value,
    maxLength,
    onBlur,
    edit,
    onAdd,
    showAdd,
    showEdit,
    toggleEdit
}) => {
    const theme = useTheme()

    return (
        <InputContainer>
            <CustomInput
            onChangeText={onChangeText}
            placeholder={placeholder}
            maxLength={maxLength? maxLength: 50}
            onBlur={onBlur}
            secureTextEntry={password}
            value={value}
            editable={edit}
            placeholderTextColor={theme.palette.text.light}
            />
            {
                showAdd&&onAdd?
                <IconButton onPress={onAdd}>
                    <PlusSVG/>
                </IconButton>
                :null
            }
            {
                showEdit&&toggleEdit?
                <IconButton
                onPress={toggleEdit}
                >
                    <EditSVG/>
                </IconButton>
                :null
            }
        </InputContainer>
    )
}


export default Input;



