import {
    SET_TOKEN_INFO
} from './action-types.js'

export const setTokenInfoRedux = (accessToken) => {
    return {
        type: SET_TOKEN_INFO,
        accessToken
    }
}



