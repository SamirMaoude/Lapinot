import React from "react";
import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'

class KeyboardAvoidingWrapper extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex: 1}}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {this.props.children}
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default KeyboardAvoidingWrapper;