import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../components/Splash'
import Home from '../components/Home'
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from './DrawerNavigator'
import AddRabbit from '../components/AddRabbit'

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
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

