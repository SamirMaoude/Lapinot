import React from "react";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    Colors,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './partials/styles'
import { default as MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";
import {ActivityIndicator, View, Text, Alert, StyleSheet, Image,Modal, Animated} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik'
import CustomPicker from "./partials/CustomPicker";
import CustomTextInput from './partials/CustomTextInput'
import KeyboardAvoidingWrapper from "./partials/KeyboarAvoidingWrapper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authentication } from "../firebase/firebase-config";
import * as yup from 'yup'
import LottieView from 'lottie-react-native'
import {connect} from 'react-redux'
import moment from "moment";
import { testCompatibility } from "../utils/Utils";
import { SafeAreaView } from "react-native-safe-area-context";

import { default as AntDesign } from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";



const {primaryLight, darkLight, banner, primary, pink} = Colors

const chooseRabbitsValidationSchema = yup.object().shape({
    
    // maleRabbit: yup
    //   .string()
    //   .required('Veuillez choisir un lapin mâle'),
    // femaleRabbit: yup
    //   .string()
    //   .required('Veuillez choisir un lapin femelle')
    
  })


class CompatibilityTest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
            isLoading: true,
            femaleRabbitsList: [],
            maleRabbitsList: [],
            messageType: '',
            isCompatible: false,
            verdict: '...',
            visible: false,
            scaleValue: new Animated.Value(0)
        }
        this.femaleRabbitsList = [];
        this.maleRabbitsList = [];
    }

    

    componentDidMount(){
        this.femaleRabbitsList = this.props.rabbitsList.filter((rabbit)=>rabbit.gender==='F');
        this.maleRabbitsList = this.props.rabbitsList.filter((rabbit)=>rabbit.gender==='M')

        this.setState({
            femaleRabbitsList: [{id:'', rabbitCode:''}, ...this.femaleRabbitsList],
            maleRabbitsList: [{id:'', rabbitCode:''}, ...this.maleRabbitsList],
            isLoading: false
        })
    }

    promptVerdict = (setSubmitting)=>{
        setSubmitting(false);
        this.setState({
            visible: true
        })

        Animated.spring(this.state.scaleValue,{
            toValue:1,
            duration: 300,
            useNativeDriver: true
        }).start();
        //
    }

    setVisible = (visible)=>{
        this.setState({
            visible: visible
        })
    }

    toogleModal = ()=>{
        setTimeout(()=>this.setVisible(false),200)
        Animated.spring(this.state.scaleValue,{
            toValue:0,
            duration: 300,
            useNativeDriver: true
        }).start();  
    }

    render(){
        return(
                <SafeAreaView style={{flex:1, paddingVertical:100, justifyContent: 'center'}}>

                    <Modal transparent visible={this.state.visible}>
                        <View style={styles.modalBackground}>
                            
                            <Animated.View style={[styles.modalContainer, {transform:[{scale:this.state.scaleValue}]}]}>
                                <View style={{alignItems: 'center'}}>
                                    
                                    <View style={styles.modalHeader}>
                                        <TouchableOpacity onPress={()=>this.toogleModal()}>
                                            <MaterialCommunityIcons name="window-close" size={30} color='black'/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        
                        <View style={{alignItems: 'center'}}>
                            {!this.state.isCompatible && <AntDesign
                                name="checkcircle" size={150}
                                color={Colors.green}
                                style={{marginVertical: 10}}
                            />}
                            {this.state.isCompatible && <AntDesign name="warning"
                                size={150}
                                color={Colors.warning}
                                style={{marginVertical: 10}}
                            />}
                        </View>
                        
                        <Text style={{
                            textAlign: "center",
                            marginVertical: 30,
                            fontSize:20
                        }}>{!this.state.isCompatible?"Aucun lien de parenté!":"Reproduction à risque"}</Text>
                    </Animated.View>
                    </View>
                </Modal>
                <StyledContainer>
                    <InnerContainer>
                        <Formik
                            initialValues={{
                                maleRabbit: '',
                                femaleRabbit: '',
                            }}
                            onSubmit={(values, {setSubmitting})=>{
                                this.setState({
                                    isCompatible: testCompatibility(values.maleRabbit,values.femaleRabbit,this.props.rabbitsList)
                                },()=>this.promptVerdict(setSubmitting))
                                
                            }}
                            validationSchema={chooseRabbitsValidationSchema}
                        > 
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                isSubmitting,
                                errors,
                                isValid,
                                touched
                            })=>{return(
                                <StyledFormArea>
                                   
                                    <CustomPicker
                                        onValueChange={handleChange('maleRabbit')}
                                        onBlur={handleBlur('maleRabbit')}
                                        selectedValue={values.maleRabbit}
                                        label="Male"
                                        isRabbit={true}
                                        data={this.state.maleRabbitsList}
                                        
                                    />
                                    <CustomPicker
                                        onValueChange={handleChange('femaleRabbit')}
                                        onBlur={handleBlur('femaleRabbit')}
                                        selectedValue={values.femaleRabbit}
                                        label="Femelle"
                                        isRabbit={true}
                                        data={this.state.femaleRabbitsList}
                                        
                                    />
                                    
                                    {!isSubmitting && <StyledButton
                                                        onPress={handleSubmit}
                                                        
                                    >
                                        <ButtonText>Tester</ButtonText>
                                    </StyledButton>}
                                    {isSubmitting && <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>}
                                    
                                </StyledFormArea>
                            )}}
                        </Formik>
                    </InnerContainer>
                    
                </StyledContainer>
                </SafeAreaView>
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
const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList,

    }
}

export default connect(mapStateToProps)(CompatibilityTest)