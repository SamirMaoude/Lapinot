import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import {View, Text} from "react-native";


const CustomDrawer = (props) => {
    return(
        <View style={{flex: 1}}>
            <View>
                <Text style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        textAlign:'center',
                        flexWrap: 'wrap',
                        color: 'black'
                    }}
                >
                    Lapinot
                </Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList
                    {...props}
                />
            </DrawerContentScrollView>
        </View>
        
    )
}

export default CustomDrawer;