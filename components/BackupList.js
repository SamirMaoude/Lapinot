import React from 'react'
import { TextInput } from 'react-native'
import {View, StyleSheet, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Backup from './partials/Backup'
import {connect} from 'react-redux'
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons'
import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 

class BackupList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            backup: "",
            backupItems: [
            ]
        }

        this.backupRef = collection(db, 'backups')
    }

    componentDidMount(){
        this.getBackups()
    }

    getBackups = async () => {
        const backupsSnapshot = await getDocs(this.backupRef);
        let backupsList = []
        for(let doc of backupsSnapshot.docs){
            let backup = {
                id: doc.id,
                ...doc.data()
            }

            backupsList.push(backup)
        }

        backupsList.sort((a, b) => {
            var d1 = new Date(a.createdAt), d2 = new Date(b.createdAt)

            return d1 < d2
        })

        this.setState({
            backupItems: backupsList
        })

    }

    handleAddBackup = async () => {
        
        if(this.state.backup.length===0 || this.state.backup.trim().length===0) return;

        
        const backup = {
            userId: authentication.currentUser.uid,
            name: this.state.backup,
            createdAt: Date.now().toString(),
            rabbits: this.props.rabbitsList,
            reproductions: this.props.reproductionsList,
            vaccinations: this.props.vaccinationsList
        }

        await addDoc(this.backupRef, backup, { merge: true }).then((docRef)=>{
        
            this.getBackups()
    
        }).catch((e)=>{
              console.log(e)
        })

    }

    
    render(){
        return(
            <View style={styles.container}>
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
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E8EAED'
    },

    backupsWrapper: {
        paddingHorizontal: 10,
        paddingTop: 30
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
        top: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    addText: {},
})

const mapStateToProps = (state) => {
    return {
        rabbitsList: state.rabbitManager.rabbitsList,
        reproductionsList: state.reproductionManager.reproductionsList,
        vaccinationsList: state.vaccinationManager.vaccinationsList
    }
}

export default connect(mapStateToProps)(BackupList)