import { isValidElement } from "react"

const initialState = {coupleList: []}

function coupleManager(state=initialState, action){
    let nextState
    let rabbitIndex
    switch(action.type){
        case 'ADD_COUPLE':
            
            nextState = {
                ...state,
                coupleList: [action.value, ...state.coupleList.filter((item)=>item.male!==action.value.male && item.female!==action.value.female)]
            }

            
            return nextState || state
        
        default:

            return state
    }
}

export default coupleManager