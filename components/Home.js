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
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={()=>this.props.navigation.navigate('AddRabbit')}
                >
                    <Icon name="ios-add-circle-sharp" size={50} color={Colors.secondary} />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    homeStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    floatingButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30
    }
})

export default Home;