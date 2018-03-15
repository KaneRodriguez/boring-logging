import _ from 'lodash'

const INITIAL_COMMANDS_REDUCER_STATE = {
    commands: [], 
  }
  
const commandsReducer = (state=INITIAL_COMMANDS_REDUCER_STATE, action) => {
    switch(action.type) {
        case 'ADD_COMMANDS': {
            let newCommandsList = _.union(state.commands, action.commands)
            return {...state, commands: newCommandsList}
        }
        case 'REMOVE_COMMANDS': {
            let newCommandsList = _.difference(state.commands, action.commands)
            return {...state, commands: newCommandsList}
        }
        
        default: {
            return {...state}
        }
    }
}

export default commandsReducer