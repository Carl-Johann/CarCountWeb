// Lib
import React, { Component } from 'react'
import { Input, Button } from 'reactstrap'
import Animate from 'react-smooth'
import { connect } from 'react-redux'

// Config
import { styles, cols } from './styles'
import { textStyle } from '../../../config/style'
import { api } from '../../../config/endpoints'

// API
import { request } from '../../../api/request'

// Local Storage
import { carCountbatchId, userProfile } from '../../../local-storage'




class CancelView extends Component {


    state = {
        loading: false,
        postResponse: null
    }


    cancel = () => {
        // We're now loading
        this.setState({ loading: true })

        // Get textbox value, profile, and batchId for request
        let comment = document.getElementById('cancellation_cause').value
        const profile = JSON.parse(window.localStorage.getItem(userProfile))
        const batchId = JSON.parse(window.localStorage.getItem(carCountbatchId))

        // We add the cancelInit, since there's no space for it in the db
        comment = 'CancelInit: '.concat(profile.oid, '. Comment: ', comment)


        request(api.batches.updateStatus, 'POST', { status: 'cancel', comment, batchId }, resp => {
            window.location.href = '/'
        })
    }





    render() {
        const { loading, postResponse } = this.state

        return (
            <div className='cancel-view container-fluid' style={ styles.container }>
                <div className='row'>

                    { postResponse == null && (
                        <div style={ styles.fullwidth }>

                            {/* Title text*/}
                            <h2 className={ cols.titleText } style={ styles.titleText } >Please enter reason for cancellation</h2>


                            {/* Large inputfield */}
                            <Input
                                rows={ 6 }
                                cols={ 50 }
                                type={ 'textarea' }
                                style={ styles.input }
                                id='cancellation_cause'
                                className={ cols.input }
                            />


                            {/* If the button hasn't been clicked*/}
                            <div style={ styles.fullwidth }>
                                { loading == false && (

                                    // Show post button
                                    <Button
                                        disabled={ loading }
                                        onClick={ this.cancel }
                                        style={ styles.postButton }
                                        className={ cols.postButton }
                                    >
                                        <h6 style={ textStyle } >Cancel Batch</h6>

                                    </Button>
                                ) || loading && (

                                    // Else the button has been clicked, and should show loading icon
                                    <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                                        <div className={ cols.loader } style={ styles.loaderContainer } >
                                            <div style={ styles.loader } />
                                        </div>
                                    </Animate>
                                )}
                            </div>

                        </div>
                    ) || postResponse == true && (
                        // The cancellation was successful
                        <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                            <div className='container-fluid'>
                                <h2 className={ cols.titleText } style={ styles.titleText } >Successfully Cancelled Batch</h2>
                            </div>
                        </Animate>
                    )}

                </div>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        tokenInfo: state.tokenInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CancelView)
