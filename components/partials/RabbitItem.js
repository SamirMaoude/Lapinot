import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { color } from 'react-native-reanimated';
import moment from 'moment'


import FadeIn from '../../Animations/FadeIn'
import {Colors} from './styles'

const {pink, blue, brand} = Colors;

class RabbitItem extends React.Component {
    
    render() {
        const {rabbitsList} = this.props
        const rabbit={
            ...this.props.rabbit,
            dateOfbirth: new Date(this.props.rabbit.dateOfbirth),
            father: this.props.rabbit.fatherId===''?'Inconnu':rabbitsList.filter((rabbit)=>rabbit.id===this.props.rabbit.fatherId)[0].rabbitCode,
            mother: this.props.rabbit.fatherId===''?'Inconnue':rabbitsList.filter((rabbit)=>rabbit.id===this.props.rabbit.motherId)[0].rabbitCode
        };


        return (
            <FadeIn>
                <TouchableOpacity
                    style={{height:190, flexDirection: 'row', padding:5}}
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
                        paddingVertical: 20,
                        paddingLeft: 5
                    }}>
                        <View style={styles.container}>
                            <Text style={styles.label}>Code d'identification: </Text>
                            <Text style={styles.value}>{rabbit.rabbitCode}</Text>
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
        paddingVertical: 5
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