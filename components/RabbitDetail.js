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

//Rabbit
import { addRabbit, setRabbit } from "../utils/rabbit-firebase";

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";

const {brand, darkLight, primary, blue} = Colors;
const genderM = [{name: "Mâle", id:"M"}, {name: "Femelle", id:"F"}]
const genderF = [{name: "Femelle", id:"F"}, {name: "Mâle", id:"M"}]
const addRabbitValidationSchema = yup.object().shape({
    
    rabbitCode: yup
      .string()
      .min(3, ({ min }) => `Le code doit contenir au moins ${min} caractères`)
      .required('Code obligatoire'),
    
  })
class RabbitDetail extends React.Component{
    constructor(props){
        super(props);
        this.rabbit = this.props.route.params.rabbit
        femaleRabbitsList = [];
        maleRabbitsList = [];
        this.state = {
            show: false,
            date: new Date(),
            dob: new Date(this.rabbit.dateOfbirth),
            gender: '',
            message: '',
            messageType: '',
            
            isLoading: true,

            femaleRabbitsList: [],
            maleRabbitsList: []
        }
        
        
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
        this.femaleRabbitsList = this.props.rabbitsList.filter((rabbit)=>rabbit.gender==='F' && rabbit.id!==this.rabbit.id);
        this.maleRabbitsList = this.props.rabbitsList.filter((rabbit)=>rabbit.gender==='M' && rabbit.id!==this.rabbit.id)
        
        if(this.rabbit.fatherId==='' || this.rabbit.father=='Inconnu'){
            this.maleRabbitsList=[{id:'', rabbitCode:''}, ...this.maleRabbitsList]
        }
        else{
            const fatherIndex = this.maleRabbitsList.findIndex(item=>item.id===this.rabbit.fatherId)
            this.maleRabbitsList = [
                {...this.maleRabbitsList[fatherIndex]},
                ...this.maleRabbitsList.filter((item, index)=>index!==fatherIndex)
            ]
        }

        if(this.rabbit.motherId==='' || this.rabbit.mother=='Inconnue'){
            this.femaleRabbitsList=[{id:'', rabbitCode:''}, ...this.femaleRabbitsList]
        }
        else{
            const motherIndex = this.femaleRabbitsList.findIndex(item=>item.id===this.rabbit.motherId)
            this.femaleRabbitsList = [
                {...this.femaleRabbitsList[motherIndex]},
                ...this.femaleRabbitsList.filter((item, index)=>index!==motherIndex)
            ]
        }

        this.setState({
            maleRabbitsList: this.maleRabbitsList,
            femaleRabbitsList: this.femaleRabbitsList,
            isLoading: false
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

    _setRabbitInStore = (rabbit) => {
      
        const action = {
            type: 'SET_RABBIT',
            value: rabbit
        }

        this.props.dispatch(action)
        this.props.navigation.goBack()

    }

    _addCoupleToStore = (couple) =>{
        const action = {
            type: 'ADD_COUPLE',
            value: couple
        }

        this.props.dispatch(action)
    }

    
        

    


    render(){
        
        return(
            <SafeAreaView style={{flex:1}}>
                {this._displayLoading()}
            
            <KeyboardAvoidingWrapper>
                <StyledContainer>
                    
                    <InnerContainer>
                        {/* <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/> */}
                        <PageTitle>{this.rabbit.rabbitCode}</PageTitle>
                        <SubTitle>Détails</SubTitle>
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
                                rabbitCode: this.rabbit.rabbitCode,
                                dateOfBirth: this.rabbit.dateOfbirth,
                                gender: this.rabbit.gender,
                                fatherId: '',
                                motherId:''
                            }}
                            onSubmit={(values, {setSubmitting})=>{
                                values = {...values, dateOfBirth: this.state.dob}
                                
                                
                                Alert.alert(
                                    "Mise à jour",
                                    "Voulez-vous continuer la mise à jour?",
                                    [
                                        {
                                            text: "Non",
                                            style: "cancel",
                                            onPress: ()=>setSubmitting(false)
                                        },
                                        {
                                            text: "Oui",
                                            onPress: () => setRabbit(this.rabbit.id,values.rabbitCode, this.state.dob, values.gender, values.fatherId, values.motherId, setSubmitting, this._setRabbitInStore, this._addCoupleToStore),
                                        },
                                    ],
                                    {
                                    cancelable: true,
                                    onDismiss: () =>
                                        setSubmitting(false)
                                    }
                                );
                                //
                                
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
                                        value={this.state.dob ? moment(new Date(this.state.dob)).format('DD/MM/YYYY'): ''}
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
                                        data={this.rabbit.gender==='M'? genderM : genderF}
                                    />
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
                                    <Line />
                                    <CustomTextInput
                                        label="Nombre de reproduction"
                                        icon="reproduction"
                                        placeholder="X-007"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('rabbitCode')}
                                        onBlur={handleBlur('rabbitCode')}
                                        value='0 reproduction'
                                        isId={true}
                                        editable={false}
                                    />

                                    <CustomTextInput
                                        label="Moy nés vivants"
                                        icon="rabbit"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('rabbitCode')}
                                        onBlur={handleBlur('rabbitCode')}
                                        value='0 lapins'
                                        isId={true}
                                        editable={false}
                                    />

                                    <CustomTextInput
                                        label="Moy mort=nés"
                                        icon="close"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('rabbitCode')}
                                        onBlur={handleBlur('rabbitCode')}
                                        value='0 lapins'
                                        isId={true}
                                        editable={false}
                                    />
                                    
                                    
                                    {!isSubmitting && <StyledButton onPress={handleSubmit} style={{backgroundColor: blue}}>
                                        <ButtonText>Mettre à jour</ButtonText>
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
        coupleList: state.coupleManager.coupleList
    }
}



export default connect(mapStateToProps)(RabbitDetail)
