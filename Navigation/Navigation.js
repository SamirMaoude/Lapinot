import React from 'react'
import { Button, TouchableOpacity } from 'react-native'
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
import CompatibilityTest from '../components/CompatibilityTest'
import Reproduction from '../components/Reproduction'
import AddReproduction from '../components/AddReproduction'
import Icon from 'react-native-vector-icons/Ionicons'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...'])

const Stack = createStackNavigator()




export default function MainNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator
                // screenOptions={{
                //     headerMode: 'none',
                //     headerShown: false
                // }}
                
                initialRouteName='Splash'
            >
                <Stack.Screen
                    options={{ headerShown: false}}
                    name="Splash"
                    component={Splash}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeNavigator}
                    options={{ headerShown: false}}
                />
                <Stack.Screen
                    options={{ title: 'Ajouter' }}
                    name="AddRabbit"
                    component={AddRabbit}
                />
                <Stack.Screen
                    options={{ title: 'Lapins' }}
                    name="RabbitList"
                    component={RabbitList}
                />
                <Stack.Screen
                    options={{ headerShown: false}}
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    options={{ headerShown: false}}
                    name="Signup"
                    component={Signup}
                />
                <Stack.Screen
                    options={{ title: 'Détails' }}
                    name="RabbitDetail"
                    component={RabbitDetail}
                />
                <Stack.Screen
                    options={{ title: 'Test de compatibilité' }}
                    name="CompatibilityTest"
                    component={CompatibilityTest}
                />
                <Stack.Screen
                    options={{ title: 'Ajouter reproduction' }}
                    name="AddReproduction"
                    component={AddReproduction}
                />
                <Stack.Screen
                    options={({navigation})=>({ 
                        title: 'Reproduction' ,
                        headerRight: ()=>(
                            <TouchableOpacity onPress={()=>navigation.navigate('AddReproduction')}>
                                <Icon name="add" size={40} />
                            </TouchableOpacity>)
                        
                    })}
                    name="Reproduction"
                    component={Reproduction}
                />
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

