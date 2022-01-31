import React, {useState} from "react";
import { Picker} from "@react-native-picker/picker";
import { View, TouchableOpacity } from "react-native";
import {
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    Colors,
    StyledPicker
} from "./styles";


const {tertiary, secondary} = Colors;
const renderItemList = (data) => {
    return data.map((item) => {
      return <Picker.Item key={item.id} label={item.name} value={item.id} />
    })
}

const rabbitItemList = (data) =>{
    return data.map((item) => {
        return <Picker.Item key={item.id} label={item.rabbitCode} value={item.id} />
      })
}

const CustomPicker = ({label, data, selectedItem, setSelectedItem, isRabbit, ...props}) =>{
    return(
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>
            <Picker {...props}
                style={{
                    backgroundColor: secondary,
                    fontSize: 16,
                    color: tertiary,
                    marginBottom: 10
                }}
            >
                <Picker.Item key='key0' label='' value='' />
                {!isRabbit && renderItemList(data)}
                {isRabbit && rabbitItemList(data)}
            </Picker>
        </View>
    );
};

export default CustomPicker;
