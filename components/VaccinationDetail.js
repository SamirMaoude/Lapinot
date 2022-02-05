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

//Vaccination
import { setVaccination } from "../utils/vaccination-firestore";

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";

const {brand, darkLight, primary} = Colors;

const vaccinationValidationSchema = yup.object().shape({
    
    vacProduct: yup
      .string()
      .required('Nom obligatoire'),
    dosage: yup
        .string()
        .required('Dosage obligatoire'),
    
  })


class VaccinationDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            date: new Date(),
            dob: new Date(this.props.route.params.vaccination.dateOfVac),
            gender: '',
            message: '',
            messageType: '',
            
            isLoading: true,
        }
        this.vaccination = this.props.route.params.vaccination
        
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

    showDatePicker = () => {
        this.setState({
            show: true,
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

    _setVaccinationToStore = (vaccination) => {
      
        const action = {
            type: 'SET_VACCINATION',
            value: vaccination
        }

        this.props.dispatch(action)

        this.props.navigation.replace('Vaccination');

    }

   


    render(){
        

        return(
            <SafeAreaView style={{flex:1, paddingVertical: 100}}>
                

                <KeyboardAvoidingWrapper>
                    <StyledContainer>
                        <InnerContainer>
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
                                    dateOfVac: this.vaccination.dateOfVac,
                                    vacProduct: this.vaccination.vacProduct,
                                    dosage: this.vaccination.dosage.toString(),
                                }}
                                onSubmit={(values, {setSubmitting})=>{
                                    let vaccination = {
                                        ...values,
                                        dateOfVac: this.state.dob,
                                        dosage: parseInt(values.dosage)
                                    }

                                    setVaccination(this.vaccination.id,vaccination, setSubmitting, this._setVaccinationToStore)
                                    
                                }}
                                validationSchema={vaccinationValidationSchema}
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
                                            label="Nom du produit"
                                            icon="injection-syringe"
                                            placeholder="produit"
                                            placeholderTextColor={darkLight}
                                            onChangeText={handleChange('vacProduct')}
                                            onBlur={handleBlur('vacProduct')}
                                            value={values.vacProduct}
                                            vac={true}
                                        />
                                        {(errors.vacProduct && touched.vacProduct) &&
                                            <MsgBox type={this.state.messageType}>{errors.vacProduct}</MsgBox>
                                        }
                                        <CustomTextInput
                                            label="Date de vaccination"
                                            icon="calendar"
                                            placeholder="JJ - MM - AAAA"
                                            placeholderTextColor={darkLight}
                                            onChangeText={handleChange('dateOfVac')}
                                            onBlur={handleBlur('dateOfVac')}
                                            value={this.state.dob ? moment(new Date(this.state.dob)).format('DD-MM-YYYY'): ''}
                                            isDate={true}
                                            editable={false}
                                            showDatePicker={this.showDatePicker}
                                        />
                                        <CustomTextInput
                                            label="Dosage"
                                            placeholder="mg"
                                            placeholderTextColor={darkLight}
                                            onChangeText={handleChange('dosage')}
                                            onBlur={handleBlur('dosage')}
                                            value={values.dosage}
                                            keyboardType='numeric'
                                            
                                        />
                                        {(errors.dosage && touched.dosage) &&
                                            <MsgBox type={this.state.messageType}>{errors.dosage}</MsgBox>
                                        }
                                        {!isSubmitting && <StyledButton onPress={handleSubmit} style={{backgroundColor:Colors.blue}}>
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
        vaccinationsList: state.vaccinationManager.vaccinationsList
    }
}





export default connect(mapStateToProps)(VaccinationDetail)


