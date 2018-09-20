import {
    SET_TOKEN_INFO
} from './action-types.js'

let initialState = {
    tokenInfo: null
}

function Reducer(state = initialState, action) {

    switch (action.type) {

        case SET_TOKEN_INFO : {
            const { accessToken } = action

            let expiresOn = new Date()
            expiresOn = new Date(expiresOn.setHours(expiresOn.getHours() +1))

            const tokenInfo = {
                accessToken,
                expiresOn,
            }

            console.log('tokenInfo', tokenInfo)

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