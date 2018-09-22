// Lib
import jwt_decode from 'jwt-decode'

// Config
import { endpoints } from './endpoints'
import { carCountApiToken, userProfile } from '../local-storage/'





export const signIn = () => {
    window.location.href = endpoints.authentication_signIn
}


export const signOut = () => {
    window.location.href = endpoints.authentication_signOut
}




// This, and the whitelist in 'VehicleAPI' should ALWAYS be in sync
export const whitelist = [
    '3a7d0873-dad2-48bd-9ea5-e9d0d3fde78a', // Blinklater
    '65c963f1-2052-42c7-9c45-745b4db83e74', // Andersen & Martini
]


// Checks if the tenant is valid
export const validTenant = (token) => {
    return (whitelist.indexOf(jwt_decode(token).tid) > -1)
}




// Check if the token is valid - then decides what to do. SignIn, SignOut or callback
export const authIfInvalid = (callback) => {
    let tokenInfo = JSON.parse(window.localStorage.getItem(carCountApiToken))
    // console.log(123, window.location.origin + paths.permissionRequired)
    if (tokenInfo) {
        // If the token is expired
        const expired = new Date(tokenInfo.expiresOn) < new Date()
        const accessToken = tokenInfo.accessToken

        if (expired) {
            // The token is expired
            signIn()

        } else if (!validTenant(accessToken)) {
            // The tenant isn't valid
            // signOut()
            callback(false, {})

        } else if (validTenant(accessToken)) {
            // If the token and tenant is valid. We can also set profile in local storage
            setProfile(accessToken)
            callback(true, tokenInfo)
        }

    } else {
        // There isn't a token. Get one
        signIn()
    }

}






const getHashValue = (key, url) => {
    return url.hash.split('&').filter(el => { if(el.match(key) !== null) return true })[0].split('=')[1]
}




export const authAndSetTokenInfo = (location, callback) => {
    const url_string = location.href
    const url = new URL(url_string)

    // If the url hash has an 'access_token'
    if (url.hash && url.hash.includes('#access_token')) {

        // Get access_token
        let accessToken = getHashValue('access_token', url)
        console.log('token', accessToken)


        // Create expiresOn 1 hour from now
        let expiresOn = new Date()
        expiresOn = new Date(expiresOn.setHours(expiresOn.getHours() +1))


        // Set tokenInfo in local storage
        let tokenInfo = { expiresOn, accessToken }
        window.localStorage.setItem(carCountApiToken, JSON.stringify(tokenInfo))

        authIfInvalid(callback)


    // '#error=invalid_resource' only occurs when a user from a wrong tenant
    } else if (url.hash && url.hash.includes('#error=invalid_resource')) {
        window.localStorage.setItem(carCountApiToken, null)
        window.localStorage.setItem(userProfile, null)

        callback(false, {})
    } else {
        authIfInvalid(callback)
    }
}




// Removes the '#access_token' from the url without reloading page. Saves us a whole page load... Nois
export const removeHash = (history, url_string) => {
    var url = new URL(url_string)

    if (url.hash && url.hash.includes('#access_token') || url.hash.includes('#error')) {
        history.replace(url.pathname, ' ')
    }
}

// Sets user profile from payload in accessToken
const setProfile = accessToken => {
    // console.log('profile', jwt_decode(accessToken))
    // console.log('email', jwt_decode(accessToken).email)
    // console.log('unique_name', jwt_decode(accessToken).unique_name)
    window.localStorage.setItem(userProfile, JSON.stringify(jwt_decode(accessToken)))
}