// Azure AD Authentication
const AAD_WEB_APP_ID = '47a4414d-df4f-483e-bd22-ffc9b1ebf0a6'
const AAD_CAR_COUNT_API_ID = 'bf7d6502-38f4-4a62-b971-5f0ab3cea206'
const AAD_WEB_APP_REPLY_URL = 'https://carcountweb.azurewebsites.net'

const authentication_signIn = 'https://login.microsoftonline.com/common/oauth2/authorize?client_id=' +AAD_WEB_APP_ID+ '&resource=' +AAD_CAR_COUNT_API_ID+ '&response_type=token&&response_mode=fragment&state=12345&scope=openid+User.ReadBasic.All&nonce=678910&redirect_uri=' + window.location.origin

export const endpoints = {
    authentication_signIn,
    authentication_signOut: ('https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + window.location.origin)
}








// Vehichles API
const vehichlesPath = 'https://am.azure-api.net/'

export const api = {
    sites : {
        status : vehichlesPath + 'sites/status?',
        updateStatus : vehichlesPath + 'sites/updateStatus?',
        close : vehichlesPath + 'sites/close?',
        getAll : vehichlesPath + 'sites?',
    },

    batches : {
        findOpen : vehichlesPath + 'batches/findOpen',
        newBatch : vehichlesPath + 'batches/newBatch?',
        updateStatus : vehichlesPath + 'batches/updateStatus?',
    },

    vehicles : {
        vehicle : vehichlesPath + 'vehicles/vehicle?', // both a GET & POST request
        abort : vehichlesPath + 'vehicles/vehicle/abort?',
    }
}