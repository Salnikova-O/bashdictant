import React, { useEffect, useState } from 'react';
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
    edit?: boolean,
    showAdd?: boolean,
    onAdd?: () => void,
    onlyNumbers?: boolean,
    disabled?:boolean
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
    onlyNumbers,
    disabled
}) => {
    const theme = useTheme()
    const [editable, setEditable] = useState(true)

    const toggleEdit = () => {
        setEditable(c => !c)
    }

    useEffect(() => {
        if (edit) {
            setEditable(false)
        }
    }, [])


    return (
        <InputContainer>
            <CustomInput
            onChangeText={onChangeText}
            placeholder={placeholder}
            maxLength={maxLength? maxLength: 50}
            onBlur={onBlur}
            secureTextEntry={password}
            value={value}
            editable={disabled?false:editable}
            placeholderTextColor={theme.palette.text.light}
            keyboardType={onlyNumbers? 'numeric': 'default'}
            />
            {
                showAdd&&onAdd?
                <IconButton 
                onPress={onAdd}
                style={{
                    right: 22.5
                }}
                >
                    <PlusSVG/>
                </IconButton>
                :null
            }
            {
                edit?
                <IconButton
                onPress={toggleEdit}
                style={{
                    right: 0
                }}
                >
                    <EditSVG/>
                </IconButton>
                :null
            }
        </InputContainer>
    )
}


export default Input;



