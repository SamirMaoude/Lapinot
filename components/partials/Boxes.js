import React from "react";
import {View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity} from "react-native"
import Box from "./Box";
import Icon from 'react-native-vector-icons/Ionicons'
import {Colors} from './styles'


class Boxes extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollView contentContainerStyle={styles.boxContainer}>
                <Box
                    title='Lapins'
                    navigation={this.props.navigation}
                    navigateTo='RabbitList'
                ></Box>
                <Box
                    title='Test de compatibilité'
                    navigation={this.props.navigation}
                    navigateTo='CompatibilityTest'
                ></Box>
                <Box
                    title='Reproduction'
                    navigation={this.props.navigation}
                    navigateTo='Reproduction'
                ></Box>
                <Box
                    title='Statistiques'
                    navigation={this.props.navigation}
                    navigateTo='Statistiques'
                ></Box>
                <Box
                    title='Classement'
                    navigation={this.props.navigation}
                    navigateTo='RabbitClassement'
                ></Box>
                <Box
                    title='Vaccinations'
                    navigation={this.props.navigation}
                    navigateTo='Vaccination'
                ></Box>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={()=>this.props.navigation.navigate('AddRabbit')}
                >
                    <Icon name="ios-add-circle-sharp" size={50} color={Colors.blue} />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    boxContainer: {
        width: '100%',
        //backgroundColor: 'red',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',

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


export default Boxes;