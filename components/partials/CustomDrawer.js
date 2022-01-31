import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import {View, Text} from "react-native";
import { authentication } from "../../firebase/firebase-config";
import { Line, TextLinkContent, TextLink } from "./styles";
import { signOut } from "firebase/auth";


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
                    {authentication.currentUser.displayName}
                </Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList
                    {...props}
                />
            </DrawerContentScrollView>

            <Line />

            <TextLink onPress = {() => {signOut(authentication)}}>
                <TextLinkContent>Déconnexion</TextLinkContent>
            </TextLink>

        </View>
        
    )
}

export default CustomDrawer;