const initialState = {vaccinationsList: []}

function vaccinationManager(state=initialState, action){
    let nextState
    let vaccinationIndex
    switch(action.type){
        case 'ADD_VACCINATION':
            
            
            nextState = {
                ...state,
                vaccinationsList: [action.value, ...state.vaccinationsList]
            }
            
        
            return nextState || state

        case 'RESTORE_VACCINATION':
            nextState = {
                ...state,
                vaccinationsList: action.value
            }
            
        
            return nextState || state
        case 'DELETE_VACCINATION':
            vaccinationIndex = state.vaccinationsList.findIndex(item => item.id===action.value.id)

            if(vaccinationIndex !== -1){
                nextState = {
                    ...state,
                    vaccinationsList: state.vaccinationsList.filter((item, index)=>index !== vaccinationIndex)
                }
            }
            return nextState || state
        case 'SET_VACCINATION':
            vaccinationIndex = state.vaccinationsList.findIndex(item => item.id===action.value.id)
            if(vaccinationIndex !== -1){
                nextState = {
                    ...state,
                    vaccinationsList: state.vaccinationsList
                }

                nextState.vaccinationsList[vaccinationIndex] = action.value
            }

            return nextState || state

        default:

            return state
    }
}

export default vaccinationManager