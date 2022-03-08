import React from "react";
import {View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import Header from './partials/Header'
import Boxes from './partials/Boxes'
import {authentication} from '../firebase/firebase-config'
import {Colors} from './partials/styles'

class Home extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){

    }

    render(){
        return(

            <SafeAreaView style={styles.homeStyle}>
                <Boxes navigation={this.props.navigation}/>
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    homeStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})

export default Home;