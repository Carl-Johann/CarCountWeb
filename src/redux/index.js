import {
    SET_TOKEN_INFO
} from './action-types.js'

export const setTokenInfoRedux = (tokenInfo) => {
    return {
        type: SET_TOKEN_INFO,
        tokenInfo
    }
}



