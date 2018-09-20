// Lib
import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Animate from 'react-smooth'

// Config
import { textStyle } from '../../../config/style'
import { styles, cols } from './styles'
import { api } from '../../../config/endpoints'

// Local Storage
import { userProfile } from '../../../local-storage/'

// API
import { request } from '../../../api/request'



export default class StartView extends Component {


    state = {
        loading: false,

    }



    newBatchConfirmed = () => {
        // We're now loading
        this.setState({ loading: true })

        // Get profile for request
        const profile = JSON.parse(window.localStorage.getItem(userProfile))


        request(api.batches.newBatch, 'POST', { batchInit: profile.id }, resp => {
            window.location.href = '/'
        })
    }


    render() {

        const { loading } = this.state

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className={ cols.confirm } style={ styles.confirm }>
                        <h4 style={ textStyle }>Are you sure you want to create a new batch?</h4>

                        <div className='container' >
                            { loading == false && (

                                // Show post button
                                <Button
                                    disabled={ loading }
                                    onClick={ this.newBatchConfirmed }
                                    style={ styles.button }
                                    className={ cols.confirm }
                                >
                                    <h6 style={ textStyle } >Create</h6>

                                </Button>
                            ) || loading == true && (

                                // Else the button has been clicked, and should show loading icon
                                <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                                    <div className={ cols.loader } style={ styles.loadingContainer } >
                                        <div style={ styles.loader } />
                                    </div>
                                </Animate>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}