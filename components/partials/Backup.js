import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from './styles'

class Backup extends React.Component{
    render(){
        return(
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <View style={styles.square}></View>
                    <Text>{this.props.backup.name}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => this.props.deleteBackup(this.props.backup.id)}
                    >
                        <MaterialCommunityIcons
                            name='delete-restore'
                            color={Colors.red} 
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.restoreBackup(this.props.backup)}
                    >
                        <MaterialCommunityIcons
                            name='backup-restore'
                            color={Colors.blue} 
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },

})

export default Backup