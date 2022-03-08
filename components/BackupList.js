import React from 'react'
import { TextInput } from 'react-native'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard} from 'react-native'
import Backup from './partials/Backup'
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons'


class BackupList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            backup: null,
            backupItems: [
                {id: 'a', name: 'Sauvegarde 1'},
                {id: 'b', name: 'Sauvegarde 2'}
        
            ]
        }
    }
    handleAddBackup = () => {
        this.setState({
            backupItems: [...this.state.backupItems, {name:this.state.backup, id:this.state.backup}],
            backup: null,
        })
    }

    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.backupsWrapper}>
                    {/* <Text style={styles.sectionTitle}>Sauvegardes</Text> */}
                    <FlatList
                        data = {this.state.backupItems}
                        extraData={this.state.backupItems}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {({item}) => <Backup text={item.name} />}
                        onEndReachedThreshold={1}
                        contentContainerStyle={styles.items}
                    />
                </View>

                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.writeTaskWrapper}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <TextInput 
                            style={styles.input}
                            placeholder={'Nom de la sauvegarde'}
                            value={this.state.backup}
                            onChangeText={text => this.setState({backup: text})}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => this.handleAddBackup()}>
                        
                        <MaterialIcons
                            name='save-alt'
                            color={'#000'}
                            size={60}
                        />
                    </TouchableOpacity>
                    
                </KeyboardAvoidingView>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED'
    },

    backupsWrapper: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    addText: {},
})

export default BackupList