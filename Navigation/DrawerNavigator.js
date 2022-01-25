import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../components/Home";
import CustomDrawer from '../components/partials/CustomDrawer'


const Drawer = createDrawerNavigator();


const HomeNavigator = () => {
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#D3B8A5',
                drawerLabelStyle:{
                    color: 'black'
                }
            }}
        >
            <Drawer.Screen name="Tableau de bord" component={Home} />
        </Drawer.Navigator>
    )
    
}

export default HomeNavigator;