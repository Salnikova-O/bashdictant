import React, { ReactNode, useContext } from 'react';
import {useSelector} from 'react-redux';
import { ILanguage } from '../../@types/common';

import {settingsSelectors} from '../../redux/settings/settings.selectors';
import {languages, } from './languages';

interface ContextProps {
    language: ILanguage,
    currentLanguage: 'en'|'bash'| 'Russian'
}

const LanguageContext = React.createContext<ContextProps|null>(null);


const LanguageProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const language = useSelector(settingsSelectors.language)
    // console.log(language)

    return (
        <LanguageContext.Provider
        value={{
            language: languages[language] as ILanguage,
            currentLanguage: language
        }}
        >
            {children}
        </LanguageContext.Provider>
    )
}


export const useLanguage = () => {
    const language = useContext(LanguageContext)
    if (!language) {
        throw new Error('useLanguage hook used outside LanguageProvider')
    }
    return language;
}

export default LanguageProvider;