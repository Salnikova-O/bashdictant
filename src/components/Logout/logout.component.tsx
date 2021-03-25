import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';

import ExitSVG from '../../assets/exit.svg';
import { CustomText } from '../common/Text/text.styles';
import { useLanguage } from '../LanguageProvider/language.provider';
import {logout} from '../../redux/user/user.actions';

interface LogoutProps {
    navigation: () => void
}

const Logout: React.FC<LogoutProps> = ({navigation}) => {
    const theme = useTheme()
    const {language} = useLanguage()
    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logout())
        navigation()
    }

    return (
        <TouchableOpacity
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 5
        }}
        onPress={handleLogout}
        >
            <ExitSVG/>
            <CustomText
            style={{
                fontSize: 16,
                color: theme.palette.text.grey,
                marginLeft: 10,
                paddingRight:20,
            }}
            >
                {language.navigation.exit}
            </CustomText>
        </TouchableOpacity>
    ) 
}


export default Logout;