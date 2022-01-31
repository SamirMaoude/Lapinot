import React from "react";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
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
import LottieView from 'lottie-react-native'
import {randomAnimation} from '../utils/Utils'
import {ActivityIndicator} from 'react-native'
import {Formik} from 'formik'
import KeyboardAvoidingWrapper from './partials/KeyboarAvoidingWrapper'
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase/firebase-config";
import { setLanguage, getTranslation } from 'firebase-error-translator'
import * as yup from 'yup'

import CustomTextInput from './partials/CustomTextInput'

setLanguage('fr')

const {brand, darkLight, primary} = Colors;
const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Veuillez entrer un mail correct svp!")
      .required('Email obligatoire'),
    password: yup
      .string()
    //   .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Mot de passe obligatoire'),
  })

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animationPath: randomAnimation(),
            hidePassword: true,

            message: '',
            messageType: ''
        }

        
    }

    handleLogin = (email, password, setSubmitting) => {
        this.handleMessage(null)
        signInWithEmailAndPassword(authentication, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setSubmitting(false);
            this.props.navigation.replace('Home')
            
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
                        <PageLogo>
                            <LottieView
                                style={{}}
                                source={this.state.animationPath}
                                autoPlay
                                loop
                            />
                        </PageLogo>   
                        <PageTitle>Lapinot</PageTitle>
                        <SubTitle>Connexion</SubTitle>
                        <Formik
                            initialValues={{email: '', password: ''}}
                            onSubmit={(values, {setSubmitting})=>{
                                if(values.email == '' || values.password == ''){
                                    this.handleMessage('Veuillez remplir tous les champs!');
                                    setSubmitting(false);
                                } else {
                                    this.handleLogin(values.email, values.password, setSubmitting);
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
                            })=>(
                                <StyledFormArea>
                                    <CustomTextInput
                                        label="Email"
                                        icon="mail"
                                        placeholder="john@doe.com"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    {(errors.email && touched.email) &&
                                        <MsgBox type={this.state.messageType}>{errors.email}</MsgBox>
                                    }
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
                                    <MsgBox type={this.state.messageType}>{this.state.message}</MsgBox>
                                    {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Se connecter</ButtonText>
                                    </StyledButton>}
                                    {isSubmitting && <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}/>
                                    </StyledButton>}
                                        
                                    <Line />
                                    {/* <StyledButton
                                        google={true}
                                        onPress={handleSubmit}
                                    >
                                        <Fontisto name="google" color={primary} size={25} />
                                        <ButtonText google={true}>Google</ButtonText>
                                    </StyledButton> */}
                                </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
                    <ExtraView>
                        <ExtraText>Don't have an account already?</ExtraText>
                        <TextLink onPress={()=>this.props.navigation.replace('Signup')}>
                            <TextLinkContent>Signup</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        )
    }
}




export default Login;