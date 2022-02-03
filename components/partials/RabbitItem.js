import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { color } from 'react-native-reanimated';
import moment from 'moment'
import { deleteRabbit } from '../../utils/rabbit-firebase';
import { rabbitStats } from "../../utils/Utils";


import FadeIn from '../../Animations/FadeIn'
import {Colors} from './styles'
import Icon from 'react-native-vector-icons/Ionicons';

const {pink, blue, brand} = Colors;

class RabbitItem extends React.Component {

    promptDelete=(rabbit, deleteRabbitInStore)=>{
        Alert.alert(
            "Suppression",
            "Voulez-vous supprimer ce lapin?",
            [
                {
                    text: "Non",
                    style: "cancel",
                },
                {
                    text: "Oui",
                    onPress: () => deleteRabbit(rabbit.id, deleteRabbitInStore),
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
        const {rabbitsList, displayDetailForRabbit, deleteRabbitInStore} = this.props
        const father = rabbitsList.filter((rabbit)=>rabbit.id===this.props.rabbit.fatherId)
        const mother = rabbitsList.filter((rabbit)=>rabbit.id===this.props.rabbit.motherId)
        const data = rabbitStats(this.props.rabbit.id, this.props.reproductions)
        const rabbit={
            ...this.props.rabbit,
            dateOfbirth: new Date(this.props.rabbit.dateOfbirth),
            
            father: father.length>0?father[0].rabbitCode : 'Inconnu',
            mother: mother.length>0?mother[0].rabbitCode : 'Inconnue',
            avg_alive: data.alive,
            avg_deads: data.deads,
            n: data.totalRep

        };


       


        return (
            <FadeIn>
                <TouchableOpacity
                    style={{height:250, flexDirection: 'row', padding:5}}
                    onPress={()=>displayDetailForRabbit(rabbit)}
                >
                    
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        borderLeftWidth: 7,
                        width: '100%',
                        borderLeftColor: rabbit.gender==='F'? pink :blue,
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
                            <View style={styles.container}>
                                <Text style={styles.label}>Code d'identification: </Text>
                                <Text style={styles.value}>{rabbit.rabbitCode}</Text>
                            </View>
                            
                            <TouchableOpacity
                                style={{alignSelf: 'flex-end'}}
                                onPress={()=>{this.promptDelete(rabbit, deleteRabbitInStore)}}
                            >
                                <Icon name="close" size={30} color='red'/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Date de naissance: </Text>
                            <Text style={styles.value}>{moment(new Date(rabbit.dateOfbirth)).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Sexe: </Text>
                            <Text style={styles.value}>{rabbit.gender==='M'? 'Mâle': 'Femelle'}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Père: </Text>
                            <Text style={styles.value}>{rabbit.father}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Mère: </Text>
                            <Text style={styles.value}>{rabbit.mother}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Moyenne nés vivants: </Text>
                            <Text style={styles.value}>{rabbit.avg_alive}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Moyenne mort-nés: </Text>
                            <Text style={styles.value}>{rabbit.avg_deads}</Text>
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





export default RabbitItem