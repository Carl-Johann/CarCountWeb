import {
    SET_TOKEN_INFO
} from './action-types.js'

let initialState = {
    tokenInfo: null
}

function Reducer(state = initialState, action) {

    switch (action.type) {

        case SET_TOKEN_INFO : {
            const { tokenInfo } = action

            return {
                ...state,
                    tokenInfo
            }
        }

        default:
            return state
    }
}


export default Reducer