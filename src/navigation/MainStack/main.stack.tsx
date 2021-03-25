import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import MainScreen from '../../screens/Main/main.screen';
import AuthScreen from '../../screens/Auth/auth.screen';
import { useTheme } from 'styled-components';
import ArrowLeftSVG from '../../assets/arrowLeft.svg';
import Logout from '../../components/Logout/logout.component';
import RegistrationScreen from '../../screens/Registration/registration.screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import PersonalScreen from '../../screens/Personal/personal.screen';
import { useLanguage } from '../../components/LanguageProvider/language.provider';
import DictantCheck from '../../screens/DictantCheck/dictant-check.screen';
import { IStudent } from '../../@types/common';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../redux/user/user.selectors';


export type MainStackParamList = {
    Main: {},
    Auth: {},
    Registration: {},
    Personal: {},
    DictantCheck: {
        student: IStudent,
        dictantStatus: string
    }
  };


const Stack = createStackNavigator<MainStackParamList>()


const MainStack = () => {
    const theme = useTheme()
    const {language} = useLanguage()
    const currentUser = useSelector(userSelectors.currentUser)

    return (
        <Stack.Navigator 
        initialRouteName={currentUser?'Personal':'Main'}
        headerMode={'screen'}
        mode='card'
        screenOptions={(navigation) => ({
            // headerBackImage: () => <ArrowLeftSVG style={{marginLeft: 20, }}/>,
            // headerBackTitle: 'Назад',
            // headerBackTitleStyle: {
            //     color: theme.palette.text.grey,
            //     marginLeft: 10
            // },
            headerLeft: (props) => {
                return (
                    <TouchableOpacity
                    onPress={() => navigation.navigation.goBack()}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    >
                        <ArrowLeftSVG style={{marginLeft: 20, }}/>
                        <Text
                        style={{
                            color: theme.palette.text.grey,
                            marginLeft: 10,
                            fontSize: 16
                        }}
                        >{language.navigation.back}</Text>
                    </TouchableOpacity>
                )
            },
            headerRight: () => {
                console.log(currentUser)
                if (currentUser) {
                    return <Logout navigation={() =>  navigation.navigation.navigate('Main')}/>
                } else {
                    return null
                }
            },
            headerTransparent: false,
            headerTitle: '',
            headerStyle: {
                shadowColor: 'transparent',
                elevation: 0,
                height:25
            },
            headerStatusBarHeight: 0
        })}
        >
            <Stack.Screen 
            name='Main' 
            component={MainScreen} 
            options={{
                header: () =>null,
                gestureEnabled: false
            }}
            />
            <Stack.Screen name='Auth' component={AuthScreen}/>
            <Stack.Screen name='Registration' component={RegistrationScreen}/>
            <Stack.Screen name='Personal' component={PersonalScreen} options={{headerLeft: () => null}}/>
            <Stack.Screen name='DictantCheck' component={DictantCheck}/>
        </Stack.Navigator>
    )
}


export default MainStack;