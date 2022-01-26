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
import LottieView from 'lottie-react-native'
import {randomAnimation} from '../xlib/XLIB'
import {View, ScrollView} from 'react-native'
import {Formik} from 'formik'
import Icon from 'react-native-vector-icons/Ionicons'
import {default as Fontisto} from 'react-native-vector-icons/Fontisto'

const {brand, darkLight, primary} = Colors;

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animationPath: randomAnimation(),
            hidePassword: true
        }
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
            <ScrollView>
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
                            onSubmit={(values)=>{
                                console.log(values)
                            }}
                        > 
                            {({handleChange, handleBlur, handleSubmit, values})=>(
                                <StyledFormArea>
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
                                        label="Mot de passe"
                                        icon="md-lock-closed-outline"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={true}
                                        isPassword={true}
                                        hidePassword={this.state.hidePassword}
                                        setHidePassword={this.setHidePassword}
                                    />
                                    <MsgBox>...</MsgBox>
                                    <StyledButton onChangeText={handleSubmit}>
                                        <ButtonText>Se connecter</ButtonText>
                                    </StyledButton>
                                    <Line />
                                    <StyledButton
                                        google={true}
                                        onChangeText={handleSubmit}
                                    >
                                        <Fontisto name="google" color={primary} size={25} />
                                        <ButtonText google={true}>Google</ButtonText>
                                    </StyledButton>
                                </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
                    <ExtraView>
                        <ExtraText>Don't have an account already?</ExtraText>
                        <TextLink>
                            <TextLinkContent>Signup</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledContainer>
            </ScrollView>
        )
    }
}


const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <Icon name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
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

export default Login;