// Lib
import React, { Component } from 'react'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'

// Config
import { authTokenIsValid, validTenant, signIn, signOut } from '../config/authentication'
import { endpoints } from '../config/endpoints'
import { colors } from '../config/style'
import { carCountApiToken, userProfile } from '../local-storage'
import './index.css'

// Redux
import { setTokenInfoRedux } from '../redux'

// Views
import ViewContainer from '../components/view-container'


class App extends Component {


    state = {
        isAuthenticated: false
    }


    getHashValue = (key, url) => {
        return url.hash.split('&').filter(el => { if(el.match(key) !== null) return true })[0].split('=')[1]
    }





    componentDidMount() {
        var url_string = window.location.href
        var url = new URL(url_string)

        // Site with token
        if (url.hash) {
            // There was hash in url - most likely an access_token
            this.setState({ isAuthenticated: true })

            // Get access_token
            let accessToken = this.getHashValue('access_token', url)

            // Create expiresOn 1 hour from now
            let expiresOn = new Date()
            expiresOn = new Date(expiresOn.setHours(expiresOn.getHours() +1))

            let tokenInfo = { expiresOn, accessToken }
            window.localStorage.setItem(carCountApiToken, JSON.stringify(tokenInfo))

            // Redux
            this.props.setTokenInfoRedux(accessToken)

            window.location.href = '/'
        }




        authTokenIsValid().then(resp => {
            if (resp.isValid) {
                console.log('valid')
                const tokenPayload = jwt_decode(resp.tokenInfo.accessToken)

                // The signin was valid, but the tenant doesn't have access to the app
                if (!validTenant(tokenPayload.tid)) {

                    // Clear everything
                    window.localStorage.setItem(carCountApiToken, JSON.stringify(null))
                    this.setState({ isAuthenticated: false })

                    // Sign Out
                    signOut()
                } else {
                    // Else, the user and it's tenant was allowed access
                    this.setState({ isAuthenticated: true })

                    const profile = {
                        id: tokenPayload.oid,
                        name: tokenPayload.name,
                        tid: tokenPayload.tid
                    }
                    // Adds the user profile to local-storage
                    window.localStorage.setItem(userProfile, JSON.stringify(profile))
                    window.localStorage.setItem(carCountApiToken, JSON.stringify(resp.tokenInfo))
                }
            } else {
                // Token wasn't valid, should signin
                console.log('not valid')
                signIn()
            }
        })

    }







    render() {

        const { isAuthenticated } = this.state
        const url = new URL(window.location.href)

        return (
            <div style={ mainContainerStyle }>

                { isAuthenticated && !url.hash && (
                    <ViewContainer />
                ) }

            </div>
        )
    }
}



const mainContainerStyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundColor: colors.mainBackgroundColor
}


const mapStateToProps = (state) => {
    return {
        tokenInfo: state.tokenInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTokenInfoRedux: accessToken => dispatch(setTokenInfoRedux(accessToken)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
