import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";


class Reproduction extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList,
        coupleList: state.coupleManager.coupleList
    }
}



export default connect(mapStateToProps)(Reproduction)