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

const Drawer = createDrawerNavigator();


const HomeNavigator = () => {
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                
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
                            <Icon name="menu" size={40} color='black'/>
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
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Signup" component={Signup} />
        </Drawer.Navigator>
    )
    
}

export default HomeNavigator;