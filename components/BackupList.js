import React from 'react'
import { TextInput } from 'react-native'
import {View, ActivityIndicator, StyleSheet, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Backup from './partials/Backup'
import {connect} from 'react-redux'
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons'
import { authentication, db } from "../firebase/firebase-config"
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite"; 
import { notifyMessage } from '../utils/Utils'
import moment from "moment";

class BackupList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            backup: "",
            backupItems: [
            ]
        }

        this.backupRef = collection(db, 'backups')
    }

    _displayLoading(){
        if(this.state.isLoading){
            return (
                <View style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 100,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size='large' color="#00ff00"/>
                </View>
            )
        }

    }

    _restoreBackup = async (backup) => {
        this.setState({
            isLoading: true
        })
        const rabbitAction = {
            type: 'RESTORE_RABBIT',
            value: backup.rabbits
        }

        const reproductionAction = {
            type: 'RESTORE_REPRODUCTION',
            value: backup.reproductions
        }

        const vaccinationAction = {
            type: 'RESTORE_VACCINATION',
            value: backup.vaccinations
        }

        this.props.dispatch(vaccinationAction)
        this.props.dispatch(reproductionAction)
        this.props.dispatch(rabbitAction)

        notifyMessage(backup.name+" restorée")

        this.setState({
            isLoading: false
        })
        
    }

    _deleteBackup = async (id) => {
        const docRef = doc(db, 'backups', id);

        this.setState({
            isLoading: true
        })

        await deleteDoc(docRef).then((docRef)=>{
            this.getBackups()
            notifyMessage("Sauvegarde supprimée")
        }); 
        
    }

    componentDidMount(){
        this.getBackups()
    }

    getBackups = async () => {
        this.setState({
            isLoading: true
        })
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
            if(a.createdAt.seconds < b.createdAt.seconds) return 1
            if (a.createdAt.seconds === b.createdAt.seconds)
            {
                if(a.createdAt.nanoseconds < b.createdAt.nanoseconds)
                    return 1
                else if(a.createdAt.nanoseconds > b.createdAt.nanoseconds)
                    return -1
                
                return 0
            }
            

            return -1
        })

        this.setState({
            backup: "",
            isLoading: false,
            backupItems: backupsList
        })

    }

    handleAddBackup = async () => {
        
        if(this.state.backup.length===0 || this.state.backup.trim().length===0) return;

        
        const backup = {
            userId: authentication.currentUser.uid,
            name: this.state.backup,
            createdAt: new Date(),
            rabbits: this.props.rabbitsList,
            reproductions: this.props.reproductionsList,
            vaccinations: this.props.vaccinationsList
        }

        this.setState({isLoading: true})

        await addDoc(this.backupRef, backup, { merge: true }).then((docRef)=>{
        
            this.getBackups()
            notifyMessage("Sauvegarde effectuée")
    
        }).catch((e)=>{
            console.log(e)
        })

    }

    
    render(){
        return(
            <View style={styles.container}>
                {this._displayLoading()}
                
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
                            onSubmitEditing={() => this.handleAddBackup()}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                        onPress={() => this.handleAddBackup()}
                    >
                        
                        <MaterialIcons
                            name='save-alt'
                            color={'#000'}
                            size={60}
                        />
                    </TouchableOpacity>
                    
                </KeyboardAvoidingView>
                {!this.state.isLoading  && <View style={styles.backupsWrapper}>
                    {/* <Text style={styles.sectionTitle}>Sauvegardes</Text> */}
                    <FlatList
                        data = {this.state.backupItems}
                        extraData={this.state.backupItems}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {({item}) => <Backup
                                                    backup={item}
                                                    restoreBackup={this._restoreBackup} 
                                                    deleteBackup={this._deleteBackup}
                                                  />
                                     }
                        onEndReachedThreshold={1}
                        contentContainerStyle={{ paddingBottom: 50 }}
                    />
                </View>}
                
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