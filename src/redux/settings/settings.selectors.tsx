import {RootState}  from '../types';

export const settingsSelectors = {
    theme: (state:RootState) => state.settings.theme,
    language: (state:RootState) => state.settings.language
  }