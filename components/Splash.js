import React, {useState} from "react";
import {View, StyleSheet, Animated, Easing, Text, SafeAreaView} from "react-native"
import LottieView from 'lottie-react-native'
import { LogBox } from 'react-native';
import { randomAnimation } from '../xlib/XLIB'
LogBox.ignoreLogs(['Warning: ...'])


class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finish: false,
            progress: new Animated.Value(0),
        }
    }

    componentDidMount() {

        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver:false
        }).start();
    }

    

    render() {
        
        return(
            <View style={styles.splashStyles}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    source={require('../assets/rabbit-white-screen.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={()=>{
                        this.props.navigation.replace('Home');
                    }}
                    progress={this.state.progress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    splashStyles: {
        flex: 1,
        backgroundColor: '#ffffff', //#b38b6d 5b8982 #D3B8A5
    },
})

export default Splash