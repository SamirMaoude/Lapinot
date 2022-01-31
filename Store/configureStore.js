import { createStore, combineReducers } from "redux";
import { persistCombineReducers } from 'redux-persist'
import rabbitManagement from "./Reducers/rabbitReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, {rabbitManagement,}))