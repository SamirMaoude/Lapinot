import React, {useEffect} from "react";
import { StyleSheet, FlatList, ActivityIndicator, View, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import {StyledContainer} from './partials/styles'
import RabbitItem from "./partials/RabbitItem";
import CustomTextInput from "./partials/CustomTextInput";
import { loadBundle } from "firebase/firestore";
import SuperHeader from "./partials/SuperHeader";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import { useIsFocused } from '@react-navigation/native';
import { sorted_rabbits } from "../utils/Utils";

// TODO: Refresh after goBack
const radioButtonsData = [
    {
        id: '0',
        label: 'Mixte',
        value: 'A',
        selected: true
    },
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Mâles',
        value: 'M'
    }, 
    {
        id: '2',
        label: 'Femelles',
        value: 'F'
    }

]



class RabbitClassement extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rabbits: this.props.rabbitsList,
            isLoading: false,
            sorted_rabbits: [],
            radioButtons: radioButtonsData
            
        }
    }

    componentDidMount(){
        let list = sorted_rabbits(this.props.rabbitsList, this.props.reproductionsList)
        this.setState(
            {
                sorted_rabbits: list,
                rabbits: list
            }
        )
        
    }

    _setRabbits = (rabbits)=>{
        this.setState({
            rabbits: rabbits
        })
    }

    _displayDetailForRabbit = (rabbit) => {
        this.props.navigation.navigate('RabbitDetail', {
            rabbit: {...rabbit, dateOfbirth:rabbit.dateOfbirth.toDateString()},
        })
    }

    _deleteRabbitInStore = (id)=>{
        const action = {
            type: 'DELETE_RABBIT',
            value: {id: id}
        }

        this.props.dispatch(action)

        this.setState({
            rabbits: this.props.rabbitsList,
        })

    }

    onPressRadioButton = (radioButtonsArray) => {

        let rabbits = this.state.sorted_rabbits

        if(radioButtonsArray[1].selected){
            rabbits = rabbits.filter((rabbit)=>rabbit.gender==='M')
        }
        if(radioButtonsArray[2].selected){
            rabbits = rabbits.filter((rabbit)=>rabbit.gender==='F')
        }
        this.setState({
            radioButtons: radioButtonsArray,
            rabbits: rabbits
        });
    }
    
    
    _searchTextInputChangedtext(text){
        this.searchedText = text.toLowerCase()
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


    
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                {/* <SuperHeader navigation={this.props.navigation}/> */}
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Filtre: </Text>
                        <RadioGroup 
                            radioButtons={this.state.radioButtons}
                            layout='row'
                            onPress={this.onPressRadioButton} 
                        />
                    </View>
                </View>
                


                
                <FlatList
                    data = {this.state.rabbits}
                    extraData={this.state.rabbits}
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem = {({item}) => <RabbitItem rabbit={item} rabbitsList={this.props.rabbitsList} displayDetailForRabbit={this._displayDetailForRabbit} deleteRabbitInStore={this._deleteRabbitInStore} reproductions={this.props.reproductionsList}/>}
                    onEndReachedThreshold={1}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                {this._displayLoading()}

            </SafeAreaView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList,
        reproductionsList: state.reproductionManager.reproductionsList,
    }
}



export default connect(mapStateToProps)(RabbitClassement)







