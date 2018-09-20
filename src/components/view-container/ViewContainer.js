// Lib
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Animate from 'react-smooth'

// Config
import { styles } from './styles'
import { authTokenIsValid } from '../../config/authentication'
import { api } from '../../config/endpoints'

// Local storage
import { carCountApiToken, carCountbatchId } from '../../local-storage'

// Views
import OptionView from '../views/option-view/'
import CancelView from '../views/cancel-view'
import StartView from '../views/start-view'

// API
import { request } from '../../api/request'


export default class ViewContainer extends Component {

    state = {
        batchId: null
    }

    componentDidMount() {
        // Gets batchId and sets it in state
        this.setState({ batchId: JSON.parse(window.localStorage.getItem(carCountbatchId)) })

        // Should only requst batch's sites on index
        if (window.location.pathname == '/') {
            // If token is valid, request batch's sites, then get and set bid if there is one, else set -1
            authTokenIsValid().then(resp => {
                request(api.batches.findOpen, 'GET', {}, resp => {

                    // There are sites left
                    if (resp.body.length > 0) {
                        window.localStorage.setItem(carCountbatchId, resp.body[0].BATCH_ID)
                        this.setState({ batchId: resp.body[0].BATCH_ID })
                    } else {
                        // -1 is the 'no-sites-available'
                        window.localStorage.setItem(carCountbatchId, -1)
                        this.setState({ batchId: -1 })
                    }
                })
            })
        }
    }




    render() {
        const { batchId } = this.state


        return (
            <Switch>
                <Route exact path = "/" render={() => (
                    <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                        <div>
                            <OptionView
                                batchId={ batchId }
                            />
                            </div>
                    </Animate>
                )} />



                { batchId != null && (
                // If 'batchId' is null, it hasn't been set to either -1 or an actual bid
                    <div>
                        <Route exact path = "/start" render={() => {
                            if (batchId < 0) {
                                // If there aren't any sites in the batch.
                                return (
                                    <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                                        <div><StartView /></div>
                                    </Animate>
                                )
                            } else {
                                // There is a batchId, aka, there's open sites in the batch
                                window.location.href = '/'
                                return null
                            }
                        }} />


                        <Route exact path = "/cancel" render={() => {
                            if (batchId > 0) {
                                // There is a batchId, aka, there's open sites in the batch
                                return (
                                    <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                                        <div><CancelView /></div>
                                    </Animate>
                                )
                            } else {
                                // If there aren't any sites in the batch
                                window.location.href = '/'
                                return null
                            }
                        }} />
                    </div>
                )}

            </Switch>
        )
    }
}