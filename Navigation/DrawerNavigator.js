import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../components/Home";
import Login from "../components/Login"
import Signup from "../components/Signup"
import CustomDrawer from '../components/partials/CustomDrawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, TouchableOpacity } from 'react-native'
import { Colors } from "../components/partials/styles";
import LottieView from 'lottie-react-native'
import {randomAnimation} from '../utils/Utils'
import RabbitList from '../components/RabbitList'
import Reproduction from '../components/Reproduction'
import CompatibilityTest from '../components/CompatibilityTest'
import Vaccination from '../components/Vaccination'
import RabbitClassement from '../components/RabbitClassement'
import Statistiques from '../components/Statistiques'
import BackupList from "../components/BackupList";
import { Line } from "../components/partials/styles";

const Drawer = createDrawerNavigator();


const HomeNavigator = () => {
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                drawerInactiveTintColor: Colors.tertiary
            }}
        >
            <Drawer.Screen
                name="Tableau de bord"
                component={Home}
                options={({navigation})=>({ 
                    title: 'Tableau de bord' ,
                    headerShadowVisible: true,
                    headerStyle:{backgroundColor:Colors.secondary},
                    headerTintColor: Colors.tertiary,
                    headerLeft: ()=>(
                        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                            <Icon name="menu" size={30} color='black'/>
                        </TouchableOpacity>),
                    headerRight: ()=>(
                        <LottieView
                            style={{}}
                            ref={animation => {
                                this.animation = animation;
                            }}
                            source={randomAnimation()}
                            autoPlay
                            loop
                        />)
                })}
            />
            <Drawer.Screen name="Test de compatibilité" component={CompatibilityTest} />
            <Drawer.Screen options={({navigation})=>({
                        title: 'Lapins',
                        headerLeft: ()=>(
                        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                            <Icon name="menu" size={30} color='black'/>
                        </TouchableOpacity>),
                        headerRight: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('AddRabbit')}>
                                <Icon name="add" size={30} color={Colors.tertiary} />
                            </TouchableOpacity>)
                    })} name="Lapins" component={RabbitList} />
            <Drawer.Screen options={({navigation})=>({
                        title: 'Reproductions',
                        headerLeft: ()=>(
                        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                            <Icon name="menu" size={30} color='black'/>
                        </TouchableOpacity>),
                        headerRight: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('AddReproduction')}>
                                <Icon name="add" size={30} color={Colors.tertiary} />
                            </TouchableOpacity>)
                    })} name="Reproductions" component={Reproduction} />
            <Drawer.Screen options={({navigation})=>({
                        title: 'Vaccinations',
                        headerLeft: ()=>(
                        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                            <Icon name="menu" size={30} color='black'/>
                        </TouchableOpacity>),
                        headerRight: ()=>(
                            <TouchableOpacity onPress={()=>navigation.replace('AddVaccination')}>
                                <Icon name="add" size={30} color={Colors.tertiary} />
                            </TouchableOpacity>)
                    })} name="Vaccinations" component={Vaccination} />
            <Drawer.Screen name="Classement" component={RabbitClassement} />
            <Drawer.Screen name="Statistiques" component={Statistiques} />
            <Drawer.Screen name="Sauvegardes" component={BackupList} />
        </Drawer.Navigator>
    )
    
}

export default HomeNavigator;