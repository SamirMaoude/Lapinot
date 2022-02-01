import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground} from 'react-native'
import LottieView from 'lottie-react-native'
import {randomAnimation} from '../../utils/Utils'
import Icon from 'react-native-vector-icons/Ionicons';
import {PageTitle, Colors} from './styles'
import { color } from 'react-native-reanimated';


const {primary, brand} = Colors
class SuperHeader extends React.Component {
    constructor(props){
        super(props);
       
    }


    componentDidMount(){

       
    }

    render(){
        return(
            <View style={styles.header}>
                <View style={{flex:2, flexDirection:'row',alignContent:'center'}}>
                    <TouchableOpacity
                        style={{justifyContent:'center'}}
                        onPress={() =>this.props.navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={40} color='white' />
                    </TouchableOpacity>
                    <PageTitle style={{color:'white'}}>Lapins</PageTitle>
                </View>
                <TouchableOpacity
                            style={{justifyContent:'center', justifyContent: 'center'}}
                            onPress={() =>{}}
                        >
                            <Icon name="add" size={40} color='white' />
                </TouchableOpacity>        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#b38b6d',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation:10,
        padding: 5,
        flexWrap: 'wrap'
    },
    anim:{
        flex:1,
        height:'100%'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign:'center',
        flexWrap: 'wrap',
        color: 'white'
    },
})

export default SuperHeader;