export interface ILanguage {
    languageName:string
}

interface Languages {
    'en': ILanguage,
    'Russian': ILanguage,
    'bash': ILanguage
}

export const languages:Languages = {
    'en': {
        languageName: 'ENG'
    },
    'Russian': {
        languageName: 'РУС'
    },
    'bash': {
        languageName: 'БАШ'
    }
}