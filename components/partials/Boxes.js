import React from "react";
import {View, StyleSheet, Text, SafeAreaView, ScrollView} from "react-native"
import Box from "./Box";


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

    }
})

export default Boxes;