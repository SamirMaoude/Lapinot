import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../components/Home";
import Login from "../components/Login"
import Signup from "../components/Signup"
import CustomDrawer from '../components/partials/CustomDrawer'


const Drawer = createDrawerNavigator();


const HomeNavigator = () => {
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#D3B8A5',
                drawerInactiveTintColor: '#D3B8A5',
                drawerActiveTintColor: 'white'
            }}
        >
            <Drawer.Screen name="Tableau de bord" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Signup" component={Signup} />
        </Drawer.Navigator>
    )
    
}

export default HomeNavigator;