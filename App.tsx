/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */


import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {MenuProvider} from 'react-native-popup-menu'

import {store, persistor} from './src/redux/store';
import Layout from './layout';





const App = () => {


  return (
    <MenuProvider>
      <Provider
      store={store}
      >
        <PersistGate
        persistor={persistor}
        loading={null}
        >
          <Layout/>
        </PersistGate>
      </Provider>
    </MenuProvider>
    
  )
};


export default App;
