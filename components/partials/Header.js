import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground} from 'react-native'
import LottieView from 'lottie-react-native'
import {randomAnimation} from '../../xlib/XLIB'
import Icon from 'react-native-vector-icons/Ionicons';



class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            animationPath: require('../../assets/splash.json')
        }
    }


    componentDidMount(){

        this.setState({
            animationPath: randomAnimation()
        })
    }

    render(){
        return(
            <View style={styles.header}>
                <View style={{flex:2, flexDirection:'row',alignContent:'center'}}>
                    <TouchableOpacity
                        style={{}}
                        onPress={() =>this.props.navigation.openDrawer()}
                    >
                        <Icon name="menu" size={40} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title_text}>Lapinot</Text>
                </View>
                <View  style={styles.anim}>
                    <LottieView
                        style={{}}
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={this.state.animationPath}
                        autoPlay
                        loop
                    />
                </View>              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        backgroundColor: '#b38b6d',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation:10,
        paddingHorizontal: 5,
        // flexWrap: 'wrap'
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

export default Header;