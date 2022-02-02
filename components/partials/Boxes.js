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
                <Box title='Box 3'></Box>
                <Box title='Box 4'></Box>
                <Box title='Box 1'></Box>
                <Box title='Box 2'></Box>
                <Box title='Box 3'></Box>
                <Box title='Box 4'></Box>
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