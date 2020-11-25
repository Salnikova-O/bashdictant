import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import ExitSVG from '../../assets/exit.svg';
import { CustomText } from '../common/Text/text.styles';
import { useLanguage } from '../LanguageProvider/language.provider';

const Logout: React.FC = () => {
    const theme = useTheme()
    const {language} = useLanguage()


    const handleLogout = () =>{

    }

    return (
        <TouchableOpacity
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
        onPress={handleLogout}
        >
            <ExitSVG/>
            <CustomText
            style={{
                fontSize: 16,
                color: theme.palette.text.grey,
                marginLeft: 10,
                paddingRight:20
            }}
            >
                {language.navigation.exit}
            </CustomText>
        </TouchableOpacity>
    ) 
}


export default Logout;