import jwt_decode from 'jwt-decode'
import { endpoints } from './endpoints'
import { carCountApiToken, carCountbatchId } from '../local-storage/index'


export async function authTokenIsValid() {
    let token = window.localStorage.getItem(carCountApiToken)
    token = JSON.parse(token)

    if (token) {
        const expired = new Date(token.expiresOn) < new Date()

        if (token && !expired) {
            return { isValid: !expired, tokenInfo: token }
        } else {
            return { isValid: false, tokenInfo: {} }
        }
    } else {
        return { isValid: false, tokenInfo: {} }
    }
}



export const signIn = () => {
        window.location.href = endpoints.authentication_signIn
    }


export const signOut = () => {
        window.location.href = endpoints.authentication_signOut
    }


export const whitelist = [
    '3a7d0873-dad2-48bd-9ea5-e9d0d3fde78a', // Blinklater
    '',
]


export const validTenant = (tid) => {
    return (whitelist.indexOf(tid) > -1)
}