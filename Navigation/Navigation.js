import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../components/Splash'
import Home from '../components/Home'
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from './DrawerNavigator'
import AddRabbit from '../components/AddRabbit'
import Login from '../components/Login'
import Signup from '../components/Signup'
import RabbitList from '../components/RabbitList'
import RabbitDetail from '../components/RabbitDetail'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...'])

const Stack = createStackNavigator()



export default function MainNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerMode: 'none',
                    headerShown: false
                }}
                initialRouteName='Splash'
            >
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeNavigator}
                />
                <Stack.Screen
                    name="AddRabbit"
                    component={AddRabbit}
                />
                <Stack.Screen
                    name="RabbitList"
                    component={RabbitList}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                />
                <Stack.Screen
                    name="RabbitDetail"
                    component={RabbitDetail}
                />
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

