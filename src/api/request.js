// import { authTokenIsValid, authenticate } from '../config/authentication'
// import { endpoints } from '../config/endpoints/'


// const auth = (orgTokenInfo, component, callback) => {
//     // If the token is valid - continue.
//     if (authTokenIsValid(orgTokenInfo).isValid) callback(authTokenIsValid(orgTokenInfo))
//     // else we silently get a new token.
//     else authenticate(orgTokenInfo, component, callback)
// }


// // NOTE! The component passed as 'compopnent' needs to get 'tokenInfo' from redux or authentication will fail.
// export const request = (orgTokenInfo, component, path, type, queries, callback) => {

//     // Auth the request.
//     auth(orgTokenInfo, component, tokenInfo => {
//         let fetchString = path

//         for (var key in queries) {
//             if (queries.hasOwnProperty(key)) {
//                 fetchString += key + "=" + queries[key] + "&"
//             }
//         }

//         if (Object.keys(queries).length != 0) { fetchString = fetchString.slice(0, -1) }


//         var request = new XMLHttpRequest();
//         request.onreadystatechange = (e) => {
//             if (request.readyState !== 4) { return }

//             if (request.status === 200) {
//                 let response = JSON.parse(request.responseText)
//                 callback(response)
//             } else {
//                 console.log(request)
//                 console.warn('error req', request);
//             }
//         }
//         // console.log('fetchString', fetchString)
//         request.open(type, fetchString)
//         request.setRequestHeader('Ocp-Apim-Trace', 'true')
//         request.setRequestHeader('Cache-Control', 'no-cache')
//         request.setRequestHeader('Accept', 'application/json')
//         request.setRequestHeader('Content-Type', 'application/json')
//         request.setRequestHeader('Authorization', 'Bearer ' + tokenInfo.accessToken)
//         request.setRequestHeader('Ocp-Apim-Subscription-Key', '482189e1d5b84679b4b0b27d5704079b')
//         request.send()
//     })
// }



