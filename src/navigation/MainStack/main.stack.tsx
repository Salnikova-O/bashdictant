import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import MainScreen from '../../screens/Main/main.screen';
import AuthScreen from '../../screens/Auth/auth.screen';
import { useTheme } from 'styled-components';
import ArrowLeftSVG from '../../assets/arrowLeft.svg';
import Logout from '../../components/Logout/logout.component';
import RegistrationScreen from '../../screens/Registration/registration.screen';


export type MainStackParamList = {
    Main: {},
    Auth: {},
    Registration: {}
  };


const Stack = createStackNavigator<MainStackParamList>()


const MainStack = () => {
    const theme = useTheme()
    const [loggedIn, setLoggeIn] = useState(false)



    return (
        <Stack.Navigator 
        initialRouteName={'Main'}
        headerMode={'screen'}
        screenOptions={{
            headerBackImage: () => <ArrowLeftSVG style={{marginLeft: 20, }}/>,
            headerBackTitle: 'Назад',
            headerBackTitleStyle: {
                color: theme.palette.text.grey,
                marginLeft: 10

            },
            headerRight: () => {
                console.log(loggedIn)
                if (loggedIn) {
                    return <Logout/>
                } else {
                    return null
                }
            },
            headerTransparent: false,
            headerTitle: '',
            headerStyle: {
                shadowColor: 'transparent',
                elevation: 0,
                height:20
            },
            headerStatusBarHeight: 0
        }}
        >
            <Stack.Screen 
            name='Main' 
            component={MainScreen} 
            options={{
                header: () =>null
            }}
            />
            <Stack.Screen name='Auth' component={AuthScreen}/>
            <Stack.Screen name='Registration' component={RegistrationScreen}/>
        </Stack.Navigator>
    )
}


export default MainStack;