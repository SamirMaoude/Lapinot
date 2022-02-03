import React from "react";
import { View } from "react-native";

class CarView extends React.Component{


    constructor(props){
        super(props);

    }


    render(){
        return(
            <View style={{
                flexDirection: 'column',
                width: '100%',
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                borderRadius: 10,
                shadowRadius: 6,
                shadowOpacity: 0.26,
                elevation: 8,
                backgroundColor: 'white',
                paddingVertical: 5,
                paddingLeft: 5,
                marginVertical: 5
            }}>
                {this.props.children}
          </View>

        )
    }

}

export default CarView;