import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../../screens/Main/main.screen';


export type MainStackParamList = {
    Main: {}
  };


const Stack = createStackNavigator<MainStackParamList>()


const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName={'Main'}>
            <Stack.Screen name='Main' component={MainScreen}/>
        </Stack.Navigator>
    )
}


export default MainStack;