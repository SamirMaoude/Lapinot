import { createStore, combineReducers } from "redux";
import { persistCombineReducers } from 'redux-persist'
import rabbitManager from "./Reducers/rabbitReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reproductionManager from "./Reducers/reproductionReducer"
import vaccinationManager from "./Reducers/vaccinationReducer";
const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, {rabbitManager, reproductionManager, vaccinationManager}))