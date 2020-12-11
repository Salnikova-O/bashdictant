import {createStore, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import {rootReducer, RootState } from './rootReducer';
import {RootAction} from './types';

const middlewares = [thunk]


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
    blacklist: ['modals','redirect'],
  }
  
const persistedReducer = persistReducer<RootState, RootAction>(persistConfig, rootReducer)

export const store: Store<RootState, RootAction> = createStore(persistedReducer, applyMiddleware(...middlewares) )

export const persistor = persistStore(store)












