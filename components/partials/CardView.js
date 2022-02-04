import React from "react";
import { View } from "react-native";
import { Colors } from "./styles";

class CarView extends React.Component{


    constructor(props){
        super(props);

    }


    render(){
        return(
            <View style={{
                flexDirection: 'column',
                width: this.props.width || '100%',
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                borderRadius: 10,
                shadowRadius: 6,
                shadowOpacity: 0.2,
                elevation: this.props.elevation || 8,
                backgroundColor: this.props.color || '#F0F8FF',
                paddingVertical: 5,
                paddingLeft: 5,
                marginVertical: 5,
            }}>
                {this.props.children}
          </View>

        )
    }

}

export default CarView;