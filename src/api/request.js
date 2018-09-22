// Config
import { authIfInvalid } from '../config/authentication'




export const request = (path, type, queries, callback) => {

    // Validates the token
    authIfInvalid((valid, tokenInfo) => {

        // Create the fetchString
        let fetchString = createFetchString(path, queries)

        // Initialize the request
        let request = new XMLHttpRequest()

        // Set the listener (?)
        request.onreadystatechange = e => {
            if (request.readyState !== 4) return

            if (request.status === 200) {
                // If the request was accepted return response
                let response = JSON.parse(request.responseText)
                callback(response)
            } else console.log('error', request)
        }

        // Open the req and set headers
        request.open(type, fetchString)
        setHeaders(request, tokenInfo.accessToken)

        // Make the request
        request.send()
    })
}






const setHeaders = (request, accessToken) => {

    const headers = {
        'Ocp-Apim-Trace' : true,
        'Cache-Control' : 'no-cache',
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + accessToken,
        'Ocp-Apim-Subscription-Key' : '482189e1d5b84679b4b0b27d5704079b'
    }

    // Set headers key and value in the req
    for (let key in headers) request.setRequestHeader(key, headers[key])
}





const createFetchString = (path, queries) => {
    let fetchString = path

    for (var key in queries) {
        if (queries.hasOwnProperty(key)) {
            fetchString += key + "=" + queries[key] + "&"
        }
    }

    // If there was any queries, remove the last '&'
    if (Object.keys(queries).length !== 0) fetchString = fetchString.slice(0, -1)

    return fetchString
}