import React from "react";
import { SafeAreaView, FlatList, ActivityIndicator, View } from "react-native";
import {connect} from 'react-redux'
import VaccinationItem from "./partials/VaccinationItem";


class Vaccination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            
        }
    }

    _deleteVaccinationInStore = (id)=>{
        const action = {
            type: 'DELETE_VACCINATION',
            value: {id: id}
        }

        this.props.dispatch(action)

        this.setState({
            vaccinations: this.props.vaccinationsList,
        })

    }

    _displayDetailForVaccination = (vaccination) => {
        this.props.navigation.replace('VaccinationDetail', {
            vaccination: {...vaccination, dateOfVac:vaccination.dateOfVac.toDateString()},
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


    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                
                <FlatList
                    data = {this.props.vaccinationsList}
                    numColumns={2}
                    extraData={this.props.vaccinationsList}
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem = {({item}) => <VaccinationItem vaccination={item} displayDetailForVaccination={this._displayDetailForVaccination} deleteVaccinationInStore={this._deleteVaccinationInStore}/>}
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
        vaccinationsList: state.vaccinationManager.vaccinationsList
    }
}




export default connect(mapStateToProps)(Vaccination)


