import React from "react";
import { View, SafeAreaView , FlatList} from "react-native";
import { connect } from "react-redux";
import ReproductionItem from "./partials/ReproductionItem";


class Reproduction extends React.Component{
    constructor(props){
        super(props)
        this.searchedText =  ""
        this.state = {
            reproductions: this.props.reproductionsList,
            isLoading: false,
            
        }
    }

    _displayDetailForReproduction = (reproduction) => {
        this.props.navigation.navigate('ReproductionDetail', {
            reproduction: {...reproduction, dateOfReproduction:reproduction.dateOfReproduction.toDateString()},
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

    _deleteReproductionInStore = (id)=>{
        const action = {
            type: 'DELETE_REPRODUCTION',
            value: {id: id}
        }

        this.props.dispatch(action)

        this.setState({
            reproductions: this.props.reproductionsList,
        })

    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                
                <FlatList
                    data = {this.props.reproductionsList}
                    extraData={this.props.reproductionsList}
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem = {({item}) => <ReproductionItem reproduction={item} reproductionsList={this.props.reproductionsList} displayDetailForReproduction={this._displayDetailForReproduction} deleteReproductionInStore={this._deleteReproductionInStore} rabbitsList={this.props.rabbitsList}/>}
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
        coupleList: state.coupleManager.coupleList,
        reproductionsList: state.reproductionManager.reproductionsList
    }
}



export default connect(mapStateToProps)(Reproduction)