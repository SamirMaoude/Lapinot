import React from "react"
import { Animated, Dimensions } from "react-native"



class ScaleIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scaleValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.spring(this.state.scaleValue,{
            toValue:1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    componentWillUnmount(){

        Animated.spring(this.state.scaleValue,{
            toValue:0,
            duration: 300,
            useNativeDriver: true
        }).start();

    }

    render() {
        return (
            <Animated.View style={[this.props.styles, {transform:[{scale:this.state.scaleValue}]}]}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default ScaleIn