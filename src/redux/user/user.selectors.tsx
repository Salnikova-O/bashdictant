import {RootState} from '../types';


export const userSelectors = {
    currentUser: (state:RootState) => state.user.currentUser,
    error: (state:RootState) => state.user.error,
    isLoading: (state:RootState) => state.user.isLoading,
    registerSuccess: (state:RootState) => state.user.registerSuccess,
    jwt: (state:RootState) => state.user.jwt,
    changeSuccess: (state:RootState) => state.user.changeSuccess,
}

