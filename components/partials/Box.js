import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native"
import {Colors} from './styles'


class Box extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const title = this.props.title;
        return(
            <TouchableOpacity
                style={styles.box}
                onPress={()=>this.props.navigation.navigate(this.props.navigateTo)}
            >
                <View style={styles.inner}>
                    <Text style={styles.title_text}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    box: {
        width: '50%',
        height: 200,
        padding: 5,
        elevation: 10
        
    },
    inner: {
        flex: 1,
        backgroundColor: Colors.tertiary,//'#D3B8A5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign:'center',
        flexWrap: 'wrap',
        color: 'white'
    },
})

export default Box;