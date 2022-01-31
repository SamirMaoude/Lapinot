import React from "react";
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import {StyledContainer} from './partials/styles'

class RabbitList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <StyledContainer>
                <FlatList
                    data = {this.props.rabbitsList}
                    extraData={this.props.rabbitsList}
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem = {({item}) => <RabbitItem film={item} displayDetailForRabbit={this._displayDetailForRabbit}/>}
                    onEndReachedThreshold={1}
                    onEndReached={() => {
                      if (this.props.page < this.props.totalPages) {
                        // On appelle la méthode loadRabbit du component Search pour charger plus de films
                        this.props.loadRabbits()
                      }
                    }}
                />
            </StyledContainer>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        rabbitsList: state.toogleFavorite.rabbitsList
    }
}



export default connect(mapStateToProps)(RabbitList)







