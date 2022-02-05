import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { color } from 'react-native-reanimated';
import moment from 'moment'
import { deleteRabbit } from '../../utils/rabbit-firebase';
import { rabbitStats } from "../../utils/Utils";


import FadeIn from '../../Animations/FadeIn'
import {Colors, Line, LineH} from './styles'
import Icon from 'react-native-vector-icons/Ionicons';
import CardView from './CardView'

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
                    style={{height:300, flexDirection: 'row', padding:5, paddingHorizontal:10}}
                    onPress={()=>displayDetailForRabbit(rabbit)}
                >
                    <CardView
                        color='#FFFFF7'
                        elevation={2}
                        borderWidth={1}
                        borderColor={Colors.secondary}
                    >
                        <View style={{flex:1, flexDirection:'column', padding:8}}>
                            <View style={styles.container}>
                                <Text style={styles.label}>Code:</Text>
                                <Text style={styles.value}>{rabbit.rabbitCode}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Sexe: </Text>
                                <Text style={styles.value}>{rabbit.gender==='M'? 'Mâle': 'Femelle'}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Naissance: </Text>
                                <Text style={styles.value}>{moment(new Date(rabbit.dateOfbirth)).format('DD-MM-YYYY')}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Moy survie: </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: Colors.green,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{rabbit.avg_alive}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Moy mort-nés: </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: Colors.red,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{rabbit.avg_deads}</Text>
                            </View>
                            <View style={styles.container}>
                                <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                                <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24, color: Colors.tertiary }}>Géniteurs</Text>
                                <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                            </View>
                            
                            <View style={{flexDirection:'row', justifyContent: 'space-evenly', marginVertical:4}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: blue,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{rabbit.father}</Text>
                                <LineH style={{backgroundColor: Colors.tertiary}}/>
                                <Text style={{
                                    fontSize: 18,
                                    color: pink,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{rabbit.mother}</Text>
                            </View>
                        
                        </View>
                    </CardView>
   
              </TouchableOpacity>
           </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    container:{flexDirection:'row', justifyContent: 'space-between', marginVertical:4},

    label: {
        fontSize: 18,
        color: Colors.lightBlue,
        fontFamily: 'Robotto'
    },
    value: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        fontFamily: 'Robotto'

    }
})





export default RabbitItem