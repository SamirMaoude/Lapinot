import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { color } from 'react-native-reanimated';
import moment from 'moment'
import { deleteVaccination } from '../../utils/vaccination-firestore';
import CardView from './CardView'
import { Colors, TextLink,TextLinkContent } from './styles';

import FadeIn from '../../Animations/FadeIn'
import Icon from 'react-native-vector-icons/Ionicons';


const {pink, blue, brand} = Colors;

class VaccinationItem extends React.Component {

    promptDelete=(vaccination, deleteVaccinationInStore)=>{
        Alert.alert(
            "Suppression",
            "Voulez-vous supprimer cette vaccination?",
            [
                {
                    text: "Non",
                    style: "cancel",
                },
                {
                    text: "Oui",
                    onPress: () => deleteVaccination(vaccination.id, deleteVaccinationInStore),
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
        const {vaccination,displayDetailForVaccination, deleteVaccinationInStore} = this.props
       

       


        return (
            
                <TouchableOpacity
                    style={{flex:1,height:200, flexDirection: 'row', padding:10}}
                    onPress={()=>displayDetailForVaccination(vaccination)}
                >
                    <CardView
                        elevation={15}
                        color={Colors.tertiary}
                       
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                    
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                
                            }}>{vaccination.vacProduct}</Text>
                            <Text style={{
                                    
                                    textAlign: 'center',
                                    color: Colors.green,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                
                            }}>{vaccination.dosage} mg</Text>
                            <Text style={{
                                    
                                    textAlign: 'center',
                                    color: Colors.blue,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                
                            }}>{moment(new Date(vaccination.dateOfVac)).format('DD-MM-YYYY')}</Text>
                        </View>
                        
                        
                    </CardView>
              </TouchableOpacity>
           
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





export default VaccinationItem