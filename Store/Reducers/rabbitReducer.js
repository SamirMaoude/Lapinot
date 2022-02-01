const initialState = {rabbitsList: []}

function rabbitManager(state=initialState, action){
    let nextState
    switch(action.type){
        case 'ADD_RABBIT':
            
            
            nextState = {
                ...state,
                rabbitsList: [action.value, ...state.rabbitsList]
            }
            
        
            return nextState || state
        case 'DELETE_RABBIT':
            const rabbitIndex = state.rabbitsList.findIndex(item => item.id===action.value.id)

            if(rabbitIndex !== -1){
                nextState = {
                    ...state,
                    rabbitsList: state.rabbitsList.filter((item, index)=>index !== rabbitIndex)
                }
            }
            return nextState || state
        default:

            return state
    }
}

export default rabbitManager