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
import {randomAnimation} from '../utils/Utils'
import {ActivityIndicator, View, Alert} from 'react-native'
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

//Reproduction
import { addReproduction } from "../utils/reproduction-firestore";

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";

const {brand, darkLight, primary, blue} = Colors;
const genderM = [{name: "Mâle", id:"M"}, {name: "Femelle", id:"F"}]
const genderF = [{name: "Femelle", id:"F"}, {name: "Mâle", id:"M"}]
const addRabbitValidationSchema = yup.object().shape({
    
    // rabbitCode: yup
    //   .string()
    //   .min(3, ({ min }) => `Le code doit contenir au moins ${min} caractères`)
    //   .required('Code obligatoire'),

    // dateOfReproduction: '',
    //                             maleId: '',
    //                             femaleId:'',
    //                             alive: '0',
    //                             deads: '0',

    
    maleId: yup
    .string()
    .required(),
    femaleId: yup
    .string()
    .required(),
   
    

        
    
  })


class AddReproduction extends React.Component{
    constructor(props){
        super(props);
        this.rabbit = {}
        femaleRabbitsList = [];
        maleRabbitsList = [];
        this.state = {
            show: false,
            date: new Date(),
            dop: undefined,
            gender: '',
            message: '',
            messageType: '',
            
            isLoading: true,

            femaleRabbitsList: [],
            maleRabbitsList: []
        }
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        this.setState({
            show: false,
            date: currentDate,
            dop: currentDate
        })
    }

    showDatePicker = () => {
        this.setState({
            show: true,
        })
    }

    _displayLoading(){
        if(this.state.isLoading){
            return (
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 100,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size='large' color="#00ff00"/>
                </View>
            )
        }

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

    _addReproductionToStore = (reproduction) => {
      
        const action = {
            type: 'ADD_REPRODUCTION',
            value: reproduction
        }

        this.props.dispatch(action)

        this.props.navigation.replace('Reproduction');

    }

    

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                {this._displayLoading()}
            
            <KeyboardAvoidingWrapper>
                <StyledContainer>
                    
                    <InnerContainer>
                        {/* <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/> */}
                        <PageTitle>Reproduction</PageTitle>
                        {this.state.show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange}
                            />
                        )}
                        <Formik
                            initialValues={{
                                dateOfReproduction: '',
                                maleId: '',
                                femaleId:'',
                                alive: '0',
                                deads: '0',
                            }}
                            onSubmit={(values, {setSubmitting})=>{
                                let reproduction = {
                                    ...values, 
                                    dateOfReproduction: this.state.dop,
                                    alive: parseInt(values.alive),
                                    deads: parseInt(values.deads)

                                }


                                addReproduction(reproduction ,this._addReproductionToStore)
                                
                            }}
                            validationSchema={addRabbitValidationSchema}
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
                                    
                                    <CustomTextInput
                                        label="Date d'accouplement"
                                        icon="calendar"
                                        placeholder="JJ - MM - AAAA"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('dateOfReproduction')}
                                        onBlur={handleBlur('dateOfReproduction')}
                                        value={this.state.dop ? moment(new Date(this.state.dop)).format('DD-MM-YYYY'): ''}
                                        isDate={true}
                                        editable={false}
                                        showDatePicker={this.showDatePicker}
                                    />
                                    
                                    <Line />
                                    <CustomPicker
                                        onValueChange={handleChange('maleId')}
                                        onBlur={handleBlur('maleId')}
                                        selectedValue={values.maleId}
                                        label="Male"
                                        isRabbit={true}
                                        data={this.state.maleRabbitsList}
                                        
                                    />
                                    <CustomPicker
                                        onValueChange={handleChange('femaleId')}
                                        onBlur={handleBlur('femaleId')}
                                        selectedValue={values.femaleId}
                                        label="Femelle"
                                        isRabbit={true}
                                        data={this.state.femaleRabbitsList}
                                        
                                    />
                                    <Line />
                                    

                                    <CustomTextInput
                                        label="Nés vivants"
                                        icon="rabbit"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('alive')}
                                        onBlur={handleBlur('alive')}
                                        value={values.alive}
                                        isId={true}
                                        
                                        keyboardType='numeric'
                                    />

                                    <CustomTextInput
                                        label="Mort-nés"
                                        icon="close"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('deads')}
                                        onBlur={handleBlur('deads')}
                                        value={values.deads}
                                        isId={true}
                                        
                                        keyboardType='numeric'
                                    />
                                    
                                    
                                    {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Ajouter</ButtonText>
                                    </StyledButton>}
                                    {isSubmitting && <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>}
                                    
                                </StyledFormArea>
                            )}}
                        </Formik>
                    </InnerContainer>
                    
                </StyledContainer>
                
            </KeyboardAvoidingWrapper>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList,

    }
}



export default connect(mapStateToProps)(AddReproduction)