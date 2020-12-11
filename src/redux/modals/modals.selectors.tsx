import {RootState}  from '../types';

export const modalsSelectors = {
    infoOpen: (state:RootState) => state.modals.infoOpen,
    infoMessage: (state:RootState) => state.modals.infoMessage,
    progress: (state:RootState) => state.modals.progress,
    progressOpen: (state:RootState) => state.modals.progressOpen,
  }