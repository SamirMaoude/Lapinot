const initialState = {reproductionsList: []}

function reproductionManager(state=initialState, action){
    let nextState
    let reproductionIndex
    switch(action.type){
        case 'ADD_REPRODUCTION':
            
            
            nextState = {
                ...state,
                reproductionsList: [action.value, ...state.reproductionsList]
            }
            
        
            return nextState || state
        case 'DELETE_REPRODUCTION':
            reproductionIndex = state.reproductionsList.findIndex(item => item.id===action.value.id)

            if(reproductionIndex !== -1){
                nextState = {
                    ...state,
                    reproductionsList: state.reproductionsList.filter((item, index)=>index !== reproductionIndex)
                }
            }
            return nextState || state
        case 'SET_REPRODUCTION':
            reproductionIndex = state.reproductionsList.findIndex(item => item.id===action.value.id)
            if(reproductionIndex !== -1){
                nextState = {
                    ...state,
                    reproductionsList: state.reproductionsList
                }

                nextState.reproductionsList[reproductionIndex] = action.value
            }

            return nextState || state

        default:

            return state
    }
}

export default reproductionManager