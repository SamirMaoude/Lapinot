import React from "react";
import { StyleSheet, FlatList, ActivityIndicator, View, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import {StyledContainer} from './partials/styles'
import RabbitItem from "./partials/RabbitItem";
import CustomTextInput from "./partials/CustomTextInput";
import { loadBundle } from "firebase/firestore";
import SuperHeader from "./partials/SuperHeader";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';


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



class RabbitList extends React.Component{
    constructor(props){
        super(props)
        this.searchedText =  ""
        this.state = {
            rabbits: this.props.rabbitsList,
            isLoading: false,
            maleIsSelected: false,
            femaleIsSelected: false,

            radioButtons: radioButtonsData
            
        }
        this.femaleRabbits = this.props.rabbitsList.filter((rabbit)=>rabbit.gender==='F');
        this.maleRabbits = this.props.rabbitsList.filter((rabbit)=>rabbit.gender==='M');
    }

    onPressRadioButton = (radioButtonsArray) => {

        let rabbits = this.props.rabbitsList
        if(this.searchedText.length==0){
            rabbits = rabbits
        } else{
            const result = rabbits.filter((rabbit)=> rabbit.rabbitCode.toLowerCase().includes(this.searchedText))

           
            rabbits = result
                
        }
        

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

    _searchRabbits = () =>{
        
        this.setState({isLoading: true})
        let list = this.props.rabbitsList

        if(this.state.radioButtons[1].selected){
            list = this.maleRabbits
        }
        if(this.state.radioButtons[2].selected){
            list = this.femaleRabbits
        }
        if(this.searchedText.length==0){
            this.setState({
                rabbits: list,
                isLoading: false
            })
        } else{
  
            const result = list.filter((rabbit)=> rabbit.rabbitCode.toLowerCase().includes(this.searchedText))

            this.setState({
                rabbits: result,
                isLoading: false
            })
        }
    }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                {/* <SuperHeader navigation={this.props.navigation}/> */}
                <View>
                    <CustomTextInput
                        icon='search'
                        placeholder='Rechercher avec code'
                        onChangeText={(text) => this._searchTextInputChangedtext(text)}
                        onSubmitEditing={() => this._searchRabbits()}
                    />
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
                    renderItem = {({item}) => <RabbitItem rabbit={item} rabbitsList={this.props.rabbitsList} />}
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
        rabbitsList: state.rabbitManager.rabbitsList
    }
}



export default connect(mapStateToProps)(RabbitList)







