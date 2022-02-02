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
import {ActivityIndicator, View, Text, Alert} from 'react-native'
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
            verdict: '...'
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
        Alert.alert(
            !this.state.isCompatible?"Lapins compatibles":"Lapins Incompatibles",
            !this.state.isCompatible?"Voulez-vous les ajouter aux accouplements?":"Reproduction à risque",
            !this.state.isCompatible?[
                {
                    text: "Non",
                    style: "cancel",
                    onPress: ()=>{}
                },
                {
                    text: "Oui",
                    onPress: () => {},
                },
            ]:[],
            {
            cancelable: true,
            onDismiss: () =>
                {}
            }
        );
        //
    }

    render(){
        return(
                <StyledContainer style={{backgroundColor: primaryLight,flex:1}}>
                    <InnerContainer>
                        <Formik
                            initialValues={{
                                maleRabbit: '',
                                femaleRabbit: '',
                            }}
                            onSubmit={(values, {setSubmitting})=>{
                                this.setState({
                                    isCompatible: testCompatibility(values.maleRabbit,values.femaleRabbit,this.props.rabbitsList, this.props.coupleList)
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
                                                        style={{backgroundColor: pink}}
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList,
        coupleList: state.coupleManager.coupleList
    }
}

export default connect(mapStateToProps)(CompatibilityTest)