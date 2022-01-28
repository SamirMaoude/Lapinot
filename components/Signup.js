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
import {randomAnimation} from '../xlib/XLIB'
import {View, ScrollView, TouchableOpacity} from 'react-native'
import {Formik} from 'formik'
import Icon from 'react-native-vector-icons/Ionicons'
import KeyboardAvoidingWrapper from "./partials/KeyboarAvoidingWrapper";

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

const {brand, darkLight, primary} = Colors;

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animationPath: randomAnimation(),
            hidePassword: true,
            show: false,
            date: new Date(),
            dob: undefined
        }
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
                                fullName: '',
                                dateOfBirth: '',
                                confirmPassword: ''
                            }}
                            onSubmit={(values)=>{
                                values = {...values, dateOfBirth: this.state.dob}
                                console.log(values);
                                
                            }}
                        > 
                            {({handleChange, handleBlur, handleSubmit, values})=>{return(
                                <StyledFormArea>
                                    <MyTextInput
                                        label="Nom complet"
                                        icon="person"
                                        placeholder="John Doe"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        value={values.fullName}
                                    />
                                    <MyTextInput
                                        label="Email"
                                        icon="mail"
                                        placeholder="john@doe.com"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    <MyTextInput
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
                                    />
                                    <MyTextInput
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
                                    <MyTextInput
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
                                    <MsgBox>...</MsgBox>
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Se connecter</ButtonText>
                                    </StyledButton>
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
                        <ExtraText>Already have an account?</ExtraText>
                        <TextLink>
                            <TextLinkContent>Login</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        )
    }
}


const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <Icon name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                            <StyledTextInput {...props}/>
                        </TouchableOpacity>}
            {isPassword && (
                <RightIcon
                    onPress={()=>setHidePassword(!hidePassword)}
                >
                    <Icon 
                        name={hidePassword?'md-eye-off':'md-eye'}
                        size={30}
                        color={darkLight}
                    />
                </RightIcon>
            )}
        </View>
    );
};

export default SignUp;