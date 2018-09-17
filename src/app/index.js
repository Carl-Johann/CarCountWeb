// Lib
import React, { Component } from 'react'

// Config
import { colors } from '../config/style'
import './index.css'

// Views
import ViewContainer from '../app/view-container'


export default class App extends Component {


    render() {
        return (
            <div style={ mainContainerStyle }>
                <ViewContainer />
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