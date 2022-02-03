import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { color } from 'react-native-reanimated';
import moment from 'moment'
import { deleteReproduction } from '../../utils/reproduction-firestore';


import FadeIn from '../../Animations/FadeIn'
import {Colors, Line} from './styles'
import Icon from 'react-native-vector-icons/Ionicons';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons'

const {pink, blue, brand} = Colors;

class ReproductionItem extends React.Component {

    promptDelete=(reproduction, deleteReproductionInStore)=>{
        Alert.alert(
            "Suppression",
            "Voulez-vous supprimer cet accouplement?",
            [
                {
                    text: "Non",
                    style: "cancel",
                },
                {
                    text: "Oui",
                    onPress: () => deleteReproduction(reproduction.id, deleteReproductionInStore),
                },
            ],
            {
            cancelable: true,
            onDismiss: () =>
                {}
            }
        );
    }


    
    render() {
        const {reproductionsList, displayDetailForReproduction, deleteReproductionInStore} = this.props
        const male = this.props.rabbitsList.filter((rabbit)=>rabbit.id===this.props.reproduction.maleId)
        const female = this.props.rabbitsList.filter((rabbit)=>rabbit.id===this.props.reproduction.femaleId)
        const reproduction={
            ...this.props.reproduction,
            dateOfReproduction: new Date(this.props.reproduction.dateOfReproduction),
            
            maleCode: male.length>0?male[0].rabbitCode : 'Inconnu',
            femaleCode: female.length>0?female[0].rabbitCode : 'Inconnue',
        };
       


        return (
            <FadeIn>
                <TouchableOpacity
                    style={{height:250, flexDirection: 'row', padding:5}}
                    onPress={()=>displayDetailForReproduction(reproduction)}
                >
                    
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        borderLeftWidth: 7,
                        width: '100%',
                        borderLeftColor: '#9c27b0',
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.26,
                        elevation: 8,
                        backgroundColor: '#D3B8A5',
                        paddingVertical: 5,
                        paddingLeft: 5
                    }}>
                        <View style={{flexDirection:'row', alignItems:'center', paddingVertical: 5, justifyContent: 'space-between'}}>
                            <View style={styles.container,{justifyContent:'space-around', flexDirection: 'row', flex:2}}>
                                <View>
                                    <MaterialCommunityIcons name='rabbit' size={40} color={blue}/>
                                    <Text style={styles.value}>{reproduction.maleCode}</Text>
                                </View>
                                <View>
                                    <MaterialCommunityIcons name='rabbit' size={40} color={pink}/>
                                    <Text style={styles.value}>{reproduction.femaleCode}</Text>
                                </View>
                            </View>
                            
                            
                            <TouchableOpacity
                                style={{alignSelf: 'flex-end'}}
                                onPress={()=>{this.promptDelete(reproduction, deleteReproductionInStore)}}
                            >
                                <Icon name="close" size={40} color='red'/>
                            </TouchableOpacity>
                        </View>
                        <Line style={{backgroundColor:'black'}}/>
                        <View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Date d'accouplement: </Text>
                                <Text style={styles.value}>{moment(new Date(reproduction.dateOfReproduction)).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Nés vivants: </Text>
                                <Text style={styles.value}>{reproduction.alive}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Nés vivants: </Text>
                                <Text style={styles.value}>{reproduction.deads}</Text>
                            </View>
                        </View>
                  </View>

                    
              </TouchableOpacity>
           </FadeIn>
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
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'normal'
    }
})





export default ReproductionItem