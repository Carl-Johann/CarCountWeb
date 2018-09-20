// Lib
import jwt_decode from 'jwt-decode'

// Config
import { authTokenIsValid, signIn, signOut, validTenant } from '../config/authentication'
import { endpoints } from '../config/endpoints'

// Local storage
import { carCountApiToken, carCountbatchId } from '../local-storage'

export const request = (path, type, queries, callback) => {

    // Auth the request.
    authTokenIsValid().then(resp => {
        if (resp.isValid) {
            const tokenPayload = jwt_decode(resp.tokenInfo.accessToken)

            // The signin was valid, but the tenant doesn't have access to the app
            if (!validTenant(tokenPayload.tid)) {
                // Clear everything
                window.localStorage.setItem(carCountApiToken, null)
                // Sign Out
                signOut()
            } else {
                // Else, the user and it's tenant was allowed access

                let fetchString = path

                for (var key in queries) {
                    if (queries.hasOwnProperty(key)) {
                        fetchString += key + "=" + queries[key] + "&"
                    }
                }

                if (Object.keys(queries).length != 0) { fetchString = fetchString.slice(0, -1) }


                var request = new XMLHttpRequest();
                request.onreadystatechange = (e) => {
                    if (request.readyState !== 4) { return }

                    if (request.status === 200) {
                        let response = JSON.parse(request.responseText)
                        callback(response)
                    } else {
                        console.log('error', request)
                        console.log('status', request.status)
                        console.warn('error req', request);
                    }
                }

                // console.log('fetchString', fetchString)
                // console.log('accessToken', resp.tokenInfo.accessToken)
                // console.log('fetchString', fetchString)

                request.open(type, fetchString)
                request.setRequestHeader('Ocp-Apim-Trace', 'true')
                request.setRequestHeader('Cache-Control', 'no-cache')
                request.setRequestHeader('Accept', 'application/json')
                request.setRequestHeader('Content-Type', 'application/json')
                request.setRequestHeader('Authorization', 'Bearer ' + resp.tokenInfo.accessToken)
                request.setRequestHeader('Ocp-Apim-Subscription-Key', '482189e1d5b84679b4b0b27d5704079b')
                request.send()

            }
        }
    })
}