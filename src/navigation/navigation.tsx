import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack/main.stack';
import { isMountedRef, navigationRef } from './RootNavigation';



const Navigation = () => {


    return (
        <NavigationContainer
        
        ref={navigationRef} onReady={() => {
          (isMountedRef as React.MutableRefObject<boolean>).current=true
        }}
        >
          <MainStack />
        </NavigationContainer>
    )
}

export default Navigation;
