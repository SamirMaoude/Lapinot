import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { color } from 'react-native-reanimated';
import moment from 'moment'
import { deleteReproduction } from '../../utils/reproduction-firestore';
import CardView from './CardView';

import FadeIn from '../../Animations/FadeIn'
import {Colors, LineH} from './styles'
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
                    style={{height:225, flexDirection: 'row', padding:5}}
                    onPress={()=>displayDetailForReproduction(reproduction)}
                >
                    <CardView
                        color='#FFFFF7'
                        elevation={2}
                        borderWidth={1}
                        borderColor={Colors.secondary}
                    >
                        <View style={{flex:1, flexDirection:'column', padding:8}}>
                            
                            <View style={styles.container}>
                                <Text style={styles.label}>Nés vivants: </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: Colors.green,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{reproduction.alive}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Mort-nés: </Text>
                                <Text style={{
                                    fontSize: 18,
                                    color: Colors.red,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{reproduction.deads}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Date d'accouplement: </Text>
                                <Text style={styles.value}>{moment(new Date(reproduction.dateOfReproduction)).format('DD-MM-YYYY')}</Text>
                            </View>
                            <View style={styles.container}>
                                <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                                <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24, color: Colors.tertiary }}>Reproducteurs</Text>
                                <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-evenly', marginVertical:4}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: blue,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{reproduction.maleCode}</Text>
                                <LineH style={{backgroundColor: Colors.tertiary}}/>
                                <Text style={{
                                    fontSize: 18,
                                    color: pink,
                                    fontWeight: '600',
                                    fontFamily: 'Robotto'}}>{reproduction.femaleCode}</Text>
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





export default ReproductionItem