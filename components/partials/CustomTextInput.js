import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    Colors
} from "./styles";
import Icon from 'react-native-vector-icons/Ionicons'
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as Fontisto} from 'react-native-vector-icons/Fontisto';




const {brand, darkLight} = Colors;
const CustomTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, isId, vac, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                {!isId && !vac && <Icon name={icon} size={30} color={brand}/>}
                {isId && <MaterialCommunityIcons name={icon} size={30} color={brand}/>}
                {vac && <Fontisto name={icon} size={30} color={brand}/>}
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                            <StyledTextInput {...props}/>
                        </TouchableOpacity>}
            {isPassword && (
                <RightIcon
                    onPress={()=>setHidePassword(!hidePassword)}
                >
                    <Icon 
                        name={hidePassword?'md-eye-off':'md-eye'}
                        size={30}
                        color={darkLight}
                    />
                </RightIcon>
            )}
        </View>
    );
};

export default CustomTextInput;