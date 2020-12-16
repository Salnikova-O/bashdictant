import { View } from 'native-base';
import React from 'react';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';


interface CheckBoxProps {
    onChange: (values:string) => void,
    value: string,
    checked: boolean,
    title: string
}


 const CustomCheckbox: React.FC<CheckBoxProps> = ({checked,onChange,title,value}) => {

    const theme = useTheme()

    return (
        <CheckBox
        onPress={() => {
            onChange(value)
        }}
        title={title}
        checked={checked}
        containerStyle={{
            backgroundColor: theme.palette.background.main,
            borderWidth: 0,
            justifyContent: 'flex-start',
            paddingVertical: 5,
            marginLeft: 0,
            paddingLeft: 0
        }}
        titleProps={{
            style: {
                fontSize: 14,
                color: theme.palette.text.main,
                marginLeft: 10
            }
        }}
        uncheckedIcon={<TouchableOpacity
            style={{
                width: 18,
                height: 18,
                borderWidth: 1,
                borderColor: theme.palette.text.main,
                borderRadius: 9
            }}
            onPress={() => {
                onChange(value)
            }}
            />}
        checkedIcon={<TouchableOpacity
            style={{
                width: 18,
                height: 18,
                borderWidth: 1,
                borderColor: theme.palette.text.main,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 9
            }}
            onPress={() => {
                onChange(value)
            }}
            >
                <View
                style={{
                    width:10,
                    height: 10,
                    backgroundColor: theme.palette.text.main,
                    borderRadius: 5
                }}
                />
            </TouchableOpacity>}
        />
    )
 } 

 export default CustomCheckbox;