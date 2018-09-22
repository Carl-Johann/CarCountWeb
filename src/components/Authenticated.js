// Lib
import React, { Component } from 'react'

// Config
import { colors } from '../config/style'
import { authAndSetTokenInfo } from '../config/authentication'





export default class Authenticated extends Component {

    state = {
        allowedAccess: null
    }

    componentDidMount() {
        // This get called every time the site loads. It get and sets a token from the url if there is one
        authAndSetTokenInfo(window.location, (allowedAccess, tokenInfo) => this.setState({ allowedAccess }) )
    }





    render() {
        const { allowedAccess } = this.state
        const { children } = this.props


        return (
            <div style={ mainContainerStyle }>
            {/*
                If allowedAccess == null, signIn is still underway.
                If allowedAccess == true, the user has a valid token and tenant.
            */}
                { allowedAccess !== null && allowedAccess === true &&
                    children
                || allowedAccess === false && (
                // If the allowedAccess == false. The user does not have access to this app.
                    // !!! Wrong tenant - not in whitelist !!!
                    <h6>Your tenant is not registered. Contact your account administrator.</h6>
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