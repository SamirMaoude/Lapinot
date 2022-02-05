import React, {useEffect} from 'react'
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native'
import{ Animated} from 'react-native';
import { default as MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";
import ScaleIn from '../../Animations/ScaleIn';


class ModalPoup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: this.props.visible,
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

    componentDidUpdate(){
        this.setState(
            {
                showModal: this.props.visible
            }
        )
    }


    toogleModal = ()=>{
        Animated.spring(this.state.scaleValue,{
            toValue:0,
            duration: 300,
            useNativeDriver: true
        }).start();
        setTimeout(()=>this.props.setVisible(false),300)
       

        
    }

    

    render() {
        return(
            <Modal transparent visible={this.state.showModal}>
                <View style={styles.modalBackground}>
                    
                    <Animated.View style={[styles.modalContainer, {transform:[{scale:this.state.scaleValue}]}]}>
                        <View style={{alignItems: 'center'}}>
                            
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={()=>this.toogleModal()}>
                                    <MaterialCommunityIcons name="window-close" size={30} color='black'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.props.children}
                    </Animated.View>
                    
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation:20
    },
    modalHeader:{
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }

})


export default ModalPoup;