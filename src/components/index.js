// Lib
import React, { Component } from 'react'

// Config
import { colors } from '../config/style'
import './index.css'
import { paths } from './view-container/ViewContainer'

// Views
import ViewContainer from '../components/view-container'
import Authenticated from './Authenticated'


export default class App extends Component {

    back = () => window.location.href = paths.index

    render() {
        return (
            <div style={ mainContainerStyle }>

                <Authenticated>

                    { window.location.pathname !== '/' && (
                        <button className='back-arrow' onClick={ this.back }>
                            <img src={ require('../config/icons/backArrow.png') } alt="arrow"/>
                        </button>
                    ) }


                    <ViewContainer />
                </Authenticated>

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

