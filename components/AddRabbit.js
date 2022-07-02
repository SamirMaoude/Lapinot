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
import {ActivityIndicator, View} from 'react-native'
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

//Rabbit
import { addRabbit, getRabbits, getFemaleRabbits, getMaleRabbits } from "../utils/rabbit-firebase";

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
import { notifyMessage } from "../utils/Utils";

const {brand, darkLight, primary} = Colors;

const addRabbitValidationSchema = yup.object().shape({
    
    rabbitCode: yup
      .string()
      .min(3, ({ min }) => `Le code doit contenir au moins ${min} caractères`)
      .required('Code obligatoire'),
    gender: yup
      .string()
      .required('Veuillez choisir un sexe')
    
  })

 

class AddRabbit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            date: new Date(),
            dob: null,
            gender: '',
            message: '',
            messageType: '',
            
            isLoading: true,
            femaleRabbitsList: [],
            maleRabbitsList: []
        }
        this.femaleRabbitsList = [];
        this.maleRabbitsList = [];
        
    }

    setLoading = (loading) => {
        this.setState({
            loading: loading
        })
    }

    setFemaleRabbitsList = (femaleRabbitsList)=>{
        this.setState({
            femaleRabbitsList: femaleRabbitsList,
        })
    }

    setMaleRabbitsList = (maleRabbitsList)=>{
        this.setState({
            maleRabbitsList: maleRabbitsList
        })
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


    

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        this.setState({
            show: false,
            date: currentDate,
            dob: currentDate
        })
    }

    showDatePicker = () => {
        this.setState({
            show: true,
        })
    }

    _addRabbitToStore = (rabbit) => {
      
        const action = {
            type: 'ADD_RABBIT',
            value: rabbit
        }

        this.props.dispatch(action)

        notifyMessage('Lapin ajouté avec succès');

        this.props.navigation.replace('RabbitList');

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

    _addRabbit = (rabbitCode, dateOfbirth, gender, fatherId, motherId, setSubmitting, _addRabbitToStore)=>{

        let existing_rabbit = this.props.rabbitsList.filter((item)=>item.rabbitCode.toLowerCase()==rabbitCode.toLowerCase())
        if(existing_rabbit.length>0){
            notifyMessage('Code utilisé');
            setSubmitting(false);
            return;
        }

        addRabbit(rabbitCode, dateOfbirth, gender, fatherId, motherId, setSubmitting, _addRabbitToStore);
        
        
    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                {this._displayLoading()}
            
            <KeyboardAvoidingWrapper>
                <StyledContainer>
                    <InnerContainer>
                        {/* <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/> */}
                        <PageTitle>Lapin</PageTitle>
                        {this.state.show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={this.onChange}
                                maximumDate={new Date()}
                            />
                        )}
                        <Formik
                            initialValues={{
                                rabbitCode: '',
                                dateOfBirth: '',
                                gender:'',
                                fatherId: '',
                                motherId:''
                            }}
                            onSubmit={(values, {setSubmitting})=>{
                                values = {...values, dateOfBirth: this.state.dob}
                                this._addRabbit(values.rabbitCode, this.state.dob, values.gender, values.fatherId, values.motherId, setSubmitting, this._addRabbitToStore)
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
                                        label="Code d'identification"
                                        icon="identifier"
                                        placeholder="X-007"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('rabbitCode')}
                                        onBlur={handleBlur('rabbitCode')}
                                        value={values.rabbitCode}
                                        isId={true}
                                    />
                                    {(errors.rabbitCode && touched.rabbitCode) &&
                                        <MsgBox type={this.state.messageType}>{errors.rabbitCode}</MsgBox>
                                    }
                                    <CustomTextInput
                                        label="Date de naissance"
                                        icon="calendar"
                                        placeholder="JJ - MM - AAAA"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('dateOfBirth')}
                                        onBlur={handleBlur('dateOfBirth')}
                                        value={this.state.dob ? moment(new Date(this.state.dob)).format('DD-MM-YYYY'): ''}
                                        isDate={true}
                                        editable={false}
                                        showDatePicker={this.showDatePicker}
                                    />
                                    <CustomPicker
                                        onValueChange={handleChange('gender')}
                                        onBlur={handleBlur('gender')}
                                        selectedValue={values.gender}
                                        // onValueChange={(itemValue, itemIndex) =>
                                        //     this.setState({
                                        //         gender: itemValue
                                        //     })
                                        // }
                                        label="Sexe"
                                        data={[{name: "", id:""},{name: "Mâle", id:"M"},{name: "Femelle", id:"F"}]}
                                    />
                                    {(errors.gender && touched.gender) &&
                                        <MsgBox type={this.state.messageType}>{errors.gender}</MsgBox>
                                    }
                                    <Line />
                                    <CustomPicker
                                        onValueChange={handleChange('fatherId')}
                                        onBlur={handleBlur('fatherId')}
                                        selectedValue={values.fatherId}
                                        label="Père"
                                        isRabbit={true}
                                        data={this.state.maleRabbitsList}
                                        
                                    />
                                    <CustomPicker
                                        onValueChange={handleChange('motherId')}
                                        onBlur={handleBlur('motherId')}
                                        selectedValue={values.motherId}
                                        label="Mère"
                                        isRabbit={true}
                                        data={this.state.femaleRabbitsList}
                                        
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
        rabbitsList: state.rabbitManager.rabbitsList.filter((rabbit)=>rabbit.userId===authentication.currentUser.uid),
    }
}

export default connect(mapStateToProps)(AddRabbit)