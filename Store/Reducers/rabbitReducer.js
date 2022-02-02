const initialState = {rabbitsList: []}

function rabbitManager(state=initialState, action){
    let nextState
    let rabbitIndex
    switch(action.type){
        case 'ADD_RABBIT':
            
            
            nextState = {
                ...state,
                rabbitsList: [action.value, ...state.rabbitsList]
            }
            
        
            return nextState || state
        case 'DELETE_RABBIT':
            rabbitIndex = state.rabbitsList.findIndex(item => item.id===action.value.id)

            if(rabbitIndex !== -1){
                nextState = {
                    ...state,
                    rabbitsList: state.rabbitsList.filter((item, index)=>index !== rabbitIndex)
                }
            }
            return nextState || state
        case 'SET_RABBIT':
            rabbitIndex = state.rabbitsList.findIndex(item => item.id===action.value.id)
            if(rabbitIndex !== -1){
                nextState = {
                    ...state,
                    rabbitsList: state.rabbitsList
                }

                nextState.rabbitsList[rabbitIndex] = action.value
            }

            return nextState || state

        default:

            return state
    }
}

export default rabbitManager