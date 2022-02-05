import React from "react";
import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
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
import { randomAnimation } from '../utils/Utils'
import { ActivityIndicator } from 'react-native'
import {Formik} from 'formik'
import KeyboardAvoidingWrapper from "./partials/KeyboarAvoidingWrapper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authentication } from "../firebase/firebase-config";
import * as yup from 'yup'

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

import CustomTextInput from './partials/CustomTextInput'

const {darkLight, primary} = Colors;

const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Veuillez entrer un mail correct svp!")
      .required('Email obligatoire'),
    password: yup
      .string()
      .min(8, ({ min }) => `Le mot de passe doit contenir au moins ${min} caractères`)
      .required('Mot de passe obligatoire'),
    farmName: yup
      .string()
      .min(3, ({ min }) => `Le nom doit contenir au moins ${min} caractères`)
      .required('Nom obligatoire'),
    confirmPassword: yup
      .string()
      .min(8, ({ min }) => `Le mot de passe doit contenir au moins ${min} caractères`)
      .required('Mot de passe obligatoire'),
    
  })

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animationPath: randomAnimation(),
            hidePassword: true,
            show: false,
            date: new Date(),
            dob: undefined,
            message: '',
            messageType: ''
        }
    }


    handleSignup = (farmName, email, password, setSubmitting) => {
        this.handleMessage(null)
        createUserWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            updateProfile(user,{
                displayName: farmName
            }).then(() => {
                setSubmitting(false);
                this.props.navigation.replace('Home')
              }).catch((error) => {
                // An error occurred
                // ...
              });
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // 
            // TODO: Translate errorMessage
            this.handleMessage(errorMessage);
            setSubmitting(false);
        });      
        
    }

    handleMessage = (message, type = 'FAILED') =>{
        this.setState({
            message: message,
            messageType: type
        })
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
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

    componentDidMount(){
        this.setState({
            animationPath: randomAnimation()
        })
    }

    setHidePassword = (hidePassword) => {
        this.setState({
            hidePassword: hidePassword
        })
    }

    render(){
        return(
            <KeyboardAvoidingWrapper>
                <StyledContainer>
                    <InnerContainer>
                        {/* <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/> */}
                        <PageTitle>Lapinot</PageTitle>
                        <SubTitle>Inscription</SubTitle>
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
                                email: '',
                                password: '',
                                farmName: '',
                                // dateOfBirth: '',
                                confirmPassword: ''
                            }}
                            onSubmit={(values, {setSubmitting})=>{
                                if(values.email == '' || values.password == '' || values.farmName =='' || values.confirmPassword == ''){
                                    this.handleMessage('Veuillez remplir tous les champs!');
                                    setSubmitting(false);
                                }
                                else if(values.password !== values.confirmPassword){
                                    this.handleMessage('Les mots de passe ne correspondent pas');
                                    setSubmitting(false);
                                }
                                else {
                                    this.handleSignup(values.farmName,values.email, values.password, setSubmitting);
                                }
                                
                            }}
                            validationSchema={loginValidationSchema}
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
                                        label="Nom de l'élevage"
                                        icon="home"
                                        placeholder="Centre des Lapins"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('farmName')}
                                        onBlur={handleBlur('farmName')}
                                        value={values.farmName}
                                    />
                                    {(errors.farmName && touched.farmName) &&
                                        <MsgBox type={this.state.messageType}>{errors.farmName}</MsgBox>
                                    }
                                    <CustomTextInput
                                        label="Email"
                                        icon="mail"
                                        placeholder="contact@lapin.com"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    {(errors.email && touched.email) &&
                                        <MsgBox type={this.state.messageType}>{errors.email}</MsgBox>
                                    }
                                    {/* <CustomTextInput
                                        label="Date de naissance"
                                        icon="calendar"
                                        placeholder="JJ - MM - AAAA"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('dateOfBirth')}
                                        onBlur={handleBlur('dateOfBirth')}
                                        value={this.state.dob ? this.state.dob.toDateString(): ''}
                                        isDate={true}
                                        editable={false}
                                        showDatePicker={this.showDatePicker}
                                    /> */}
                                    <CustomTextInput
                                        label="Mot de passe"
                                        icon="md-lock-closed-outline"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={this.state.hidePassword}
                                        isPassword={true}
                                        hidePassword={this.state.hidePassword}
                                        setHidePassword={this.setHidePassword}
                                    />
                                    {(errors.password && touched.password) &&
                                        <MsgBox type={this.state.messageType}>{errors.password}</MsgBox>
                                    }
                                    <CustomTextInput
                                        label="Confirmer mot de passe"
                                        icon="md-lock-closed-outline"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        secureTextEntry={this.state.hidePassword}
                                        isPassword={true}
                                        hidePassword={this.state.hidePassword}
                                        setHidePassword={this.setHidePassword}
                                    />
                                    {(errors.confirmPassword && touched.confirmPassword) &&
                                        <MsgBox type={this.state.messageType}>{errors.confirmPassword}</MsgBox>
                                    }
                                    <MsgBox>{this.state.message}</MsgBox>
                                    {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                        <ButtonText>S'inscrire</ButtonText>
                                    </StyledButton>}
                                    {isSubmitting && <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>}
                                    {/* <Line />
                                    <StyledButton
                                        google={true}
                                        onChangeText={handleSubmit}
                                    >
                                        <Fontisto name="google" color={primary} size={25} />
                                        <ButtonText google={true}>Google</ButtonText>
                                    </StyledButton> */}
                                </StyledFormArea>
                            )}}
                        </Formik>
                    </InnerContainer>
                    <Line />
                    <ExtraView>
                        <ExtraText>Vous avez déjà un compte?</ExtraText>
                        <TextLink>
                            <TextLinkContent
                                onPress={()=>this.props.navigation.replace('Login')}
                                style={{color: Colors.blue}}
                            >
                                Se connecter
                            </TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        )
    }
}




export default SignUp;