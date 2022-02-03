import React from 'react'
import {SafeAreaView, Text, StyleSheet, ScrollView, View} from 'react-native'
import {connect} from 'react-redux'
import FadeIn from '../Animations/FadeIn'
import CardView from './partials/CardView'
import {Colors, Line, LineH} from './partials/styles'
import { globalStats } from '../utils/Utils'

const {blue, pink, green, red} = Colors

class Statistiques extends React.Component{
    constructor(props){
        super(props);
        this.rabbitsSize = this.props.rabbitsList.length
        this.femaleRabbitSize = this.props.rabbitsList.filter((item)=>item.gender=='F').length
        this.maleRabbitSize = this.rabbitsSize - this.femaleRabbitSize
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
            <ScrollView style={{flex:1, padding:10}}>
                
                <FadeIn>
                    <CardView>
                        <Text style={styles.label}>Nombre de Lapins</Text>
                        <Text style={{
                            fontSize: 40,
                            color: 'orange',
                            fontWeight: 'bold'
                        }}>{this.rabbitsSize}</Text>
                    </CardView>
                </FadeIn>

                <FadeIn>
                    <CardView>
                        <Text style={styles.label}>Nombre de Lapins Femelles</Text>
                        <Text style={{
                            fontSize: 40,
                            color: pink,
                            fontWeight: 'bold'
                        }}>{this.femaleRabbitSize}</Text>
                    </CardView>
                </FadeIn>

                <FadeIn>
                    <CardView>
                        <Text style={styles.label}>Nombre de Lapins Mâles</Text>
                        <Text style={{
                            fontSize: 40,
                            color: blue,
                            fontWeight: 'bold'
                        }}>{this.maleRabbitSize}</Text>
                    </CardView>
                </FadeIn>

                <Line />

                <FadeIn>
                    <CardView>
                        <Text style={{
                            fontSize: 30,
                            color: 'black',
                            fontWeight: 'bold',
                            textAlign: 'center'}}>
                                {this.props.reproductionsList.length} reproductions
                        </Text>

                        <View style={{flexDirection: 'row', marginVertical: 14, justifyContent:'space-around'}}>
                            <View>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textAlign: 'center'}}>Moyenne de nés vivants</Text>
                                <Text style={{
                                    fontSize: 40,
                                    color: green,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>{this.state.avg_alive}</Text>
                            </View>
                            <LineH />
                            <View>
                            <Text style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textAlign: 'center'}}>Moyenne de mort-nés</Text>
                            <Text style={{
                                    fontSize: 40,
                                    color: red,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>{this.state.avg_deads}</Text>
                            </View>
                        </View>

                    </CardView>
                </FadeIn>
                

                

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
    }
})



const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList,
        coupleList: state.coupleManager.coupleList,
        reproductionsList: state.reproductionManager.reproductionsList
    }
}





export default connect(mapStateToProps)(Statistiques)