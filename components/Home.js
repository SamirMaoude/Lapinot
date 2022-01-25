import React from "react";
import {View, StyleSheet, Text, SafeAreaView, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import Header from './partials/Header'
import Boxes from './partials/Boxes'


class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(

            <SafeAreaView style={styles.homeStyle}>
                <Header navigation={this.props.navigation}/>
                <Boxes />
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={()=>this.props.navigation.navigate('AddRabbit')}
                >
                    <Icon name="ios-add-circle-sharp" size={50} color="red" />
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