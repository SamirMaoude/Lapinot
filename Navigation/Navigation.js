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
import ReproductionDetail from '../components/ReproductionDetail'
import Statistiques from '../components/Statistiques'
import RabbitClassement from '../components/RabbitClassement'
import Vaccination from '../components/Vaccination'
import AddVaccination from '../components/AddVaccination'
import VaccinationDetail from '../components/VaccinationDetail'

import { LogBox } from 'react-native';
import { Colors } from '../components/partials/styles'
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
                    options={({navigation})=>({ 
                        title: 'Lapins' ,
                        headerRight: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('AddRabbit')}>
                                <Icon name="add" size={40} color={Colors.tertiary} />
                            </TouchableOpacity>)
                        
                    })}
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
                    options={({navigation})=>({ 
                        title: 'Details' ,
                        headerLeft: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('RabbitList')}>
                                <Icon name="arrow-back" size={30} />
                            </TouchableOpacity>)
                        
                    })}
                    name="RabbitDetail"
                    component={RabbitDetail}
                />
                <Stack.Screen
                    options={{ title: 'Test de compatibilit??' }}
                    name="CompatibilityTest"
                    component={CompatibilityTest}
                />
                <Stack.Screen
                    options={{ title: 'Ajouter reproduction' }}
                    name="AddReproduction"
                    component={AddReproduction}
                />
                <Stack.Screen
                    options={{ title: 'Ajouter vaccination' }}
                    name="AddVaccination"
                    component={AddVaccination}
                />
                <Stack.Screen
                    options={({navigation})=>({ 
                        title: 'Details' ,
                        headerLeft: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('Reproduction')}>
                                <Icon name="arrow-back" size={30} />
                            </TouchableOpacity>)
                        
                    })}
                    name="ReproductionDetail"
                    component={ReproductionDetail}
                />
                <Stack.Screen
                     options={({navigation})=>({ 
                        title: 'Details' ,
                        headerLeft: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('Vaccination')}>
                                <Icon name="arrow-back" size={30} />
                            </TouchableOpacity>)
                        
                    })}
                    name="VaccinationDetail"
                    component={VaccinationDetail}
                />
                <Stack.Screen
                    options={({navigation})=>({ 
                        title: 'Reproduction' ,
                        headerRight: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('AddReproduction')}>
                                <Icon name="add" size={40} color={Colors.tertiary} />
                            </TouchableOpacity>)
                        
                    })}
                    name="Reproduction"
                    component={Reproduction}
                />
                <Stack.Screen
                    options={{ title: 'Statistiques' }}
                    name="Statistiques"
                    component={Statistiques}
                />
                <Stack.Screen
                    options={{ title: 'Classement' }}
                    name="RabbitClassement"
                    component={RabbitClassement}
                />
                <Stack.Screen
                    options={({navigation})=>({
                        title: 'Vaccinations',
                        headerRight: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('AddVaccination')}>
                                <Icon name="add" size={40} color={Colors.tertiary} />
                            </TouchableOpacity>)
                    })}
                    name="Vaccination"
                    component={Vaccination}
                />
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

