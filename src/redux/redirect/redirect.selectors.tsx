import {RootState}  from '../types';

export const redirectSelectors = {
    redirectRoute: (state:RootState) => state.redirect.redirectRoute,

  }