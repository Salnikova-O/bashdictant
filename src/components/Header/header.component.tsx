import React from 'react';
import {Menu, MenuOption, MenuTrigger, MenuOptions} from 'react-native-popup-menu'
import { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';



import {
    HeaderContainer,
    Language,
    LanguageContainer
} from './header.styles';
import LogoSVG from '../../assets/logo.svg';
import TextSVG from '../../assets/text.svg';
import { useLanguage } from '../LanguageProvider/language.provider';
import {changeLanguage} from '../../redux/settings/settings.actions';


const Header: React.FC = () => {
    const {language} = useLanguage()
    const theme = useTheme()
    const dispatch = useDispatch()

    console.log(theme)

    const customStyles = {
        triggerText: {
            fontSize: 14,
            color: theme.palette.text.main
        },
        triggerTouchable: {
            borderBottomWidth: 1,
            borderColor: theme.palette.buttons.primary
        },
        triggerWrapper: {
            borderBottomWidth: 1,
            borderColor: theme.palette.buttons.primary
        }
    }

    
    return (
        <HeaderContainer
        edges={['left', 'right', 'top']}
        >
            <LogoSVG/>
            <TextSVG/>
                <Menu>
                    <MenuTrigger 
                    text={`${language.languageName}`}
                    customStyles={customStyles}
                    />
                    <MenuOptions
                    optionsContainerStyle={{
                        padding: 10,
                        width: 100,
                        borderRadius: 5,
                        backgroundColor: theme.palette.background.main
                    }}
                    >
                        <MenuOption 
                        text='ENG' 
                        onSelect={() => dispatch(changeLanguage('en'))}/>
                        <MenuOption 
                        text='РУС' 
                        onSelect={() => dispatch(changeLanguage('Russian'))}/>
                        <MenuOption 
                        text='БАШ' 
                        onSelect={() => dispatch(changeLanguage('bash'))}/>
                    </MenuOptions>
                </Menu>

        </HeaderContainer>
    )
}


export default Header;
