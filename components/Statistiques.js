import React from 'react'
import {SafeAreaView, Text, StyleSheet, ScrollView, View} from 'react-native'
import {connect} from 'react-redux'
import FadeIn from '../Animations/FadeIn'
import CardView from './partials/CardView'
import {Colors, Line, LineH} from './partials/styles'
import { globalStats } from '../utils/Utils'
import { authentication } from "../firebase/firebase-config";

const {blue, pink, green, red} = Colors

class Statistiques extends React.Component{
    constructor(props){
        super(props);
        this.rabbitsSize = this.props.rabbitsList.length
        this.femaleRabbitSize = this.props.rabbitsList.filter((item)=>item.gender=='F').length
        this.maleRabbitSize = this.props.rabbitsList.length - this.props.rabbitsList.filter((item)=>item.gender=='F').length
        this.state = {
            avg_alive: 0,
            avg_deads: 0
        }
        
    }

    componentDidMount(){
        let data = globalStats(this.props.reproductionsList)
        this.setState({
            avg_alive: data.alive,
            avg_deads: data.deads
        })
    }


    render(){
        return(
            <ScrollView contentContainerStyle={styles.boxContainer}>

                    <View style={{width:'50%', padding:7}}>
                        <CardView
                            elevation={15}
                            color='#0E0E0F'
                        >
                            <View style={{
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 35,
                                    color: 'orange',
                                    fontWeight: 'bold'
                                }}>{this.props.rabbitsList.length}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Lapins</Text>
                            </View>
                        </CardView>
                    </View>
                    <View style={{width:'50%', padding:7}}>
                        <CardView
                            elevation={15}
                            color='#0E0E0F'
                        >
                            <View style={{
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 35,
                                    color: Colors.darkLight,
                                    fontWeight: 'bold'
                                }}>{this.props.reproductionsList.length}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Reproductions</Text>
                            </View>
                        </CardView>
                    </View>

                    <View style={{width:'50%', padding:7}}>
                        <CardView
                            elevation={15}
                            color='#0E0E0F'
                        >
                            <View style={{
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 35,
                                    color: Colors.blue,
                                    fontWeight: 'bold'
                                }}>{this.props.rabbitsList.length - this.props.rabbitsList.filter((item)=>item.gender=='F').length}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Mâles</Text>
                            </View>
                        </CardView>
                    </View>

                    <View style={{width:'50%', padding:7}}>
                        <CardView
                            elevation={15}
                            color='#0E0E0F'
                        >
                            <View style={{
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 35,
                                    color: Colors.pink,
                                    fontWeight: 'bold'
                                }}>{this.props.rabbitsList.filter((item)=>item.gender=='F').length}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Femelles</Text>
                            </View>
                        </CardView>
                    </View>
                    <View style={{width:'50%', padding:7}}>
                        <CardView
                            elevation={15}
                            color='#0E0E0F'
                        >
                            <View style={{
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 35,
                                    color: Colors.green,
                                    fontWeight: 'bold'
                                }}>{this.state.avg_alive}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Moy de nés vivants</Text>
                            </View>
                        </CardView>
                    </View>

                    <View style={{width:'50%', padding:7}}>
                        <CardView
                            elevation={15}
                            color='#0E0E0F'
                        >
                            <View style={{
                                flexDirection: 'column',
                                height: 100,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 35,
                                    color: Colors.red,
                                    fontWeight: 'bold'
                                }}>{this.state.avg_deads}</Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Moy de morts-nés</Text>
                            </View>
                        </CardView>
                    </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical: 5,
    },

    label: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
    },
    value: {
        fontSize: 40,
        color: 'orange',
        fontWeight: 'bold'
    },
    boxContainer: {
        width: '100%',
        flex: 1,
        //backgroundColor: 'red',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 80
       // backgroundColor: '#1D1D20'

    }
})



const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList.filter((rabbit)=>rabbit.userId===authentication.currentUser.uid),
        reproductionsList: state.reproductionManager.reproductionsList.filter((rabbit)=>rabbit.userId===authentication.currentUser.uid)
    }
}





export default connect(mapStateToProps)(Statistiques)