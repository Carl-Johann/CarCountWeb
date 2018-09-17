// Lib
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Animate from 'react-smooth'

// Config
import { styles } from './styles'

// Views
import OptionView from '../views/option-view/'
import CancelView from '../views/cancel-view'


export default class ViewContainer extends Component {

    render() {
        return (
            <Switch>
                <Route exact path = "/" render={() => (
                    <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                        <OptionView/>
                    </Animate>
                )}/>





                <Route exact path = "/start" render={() => (
                    <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                        <div>
                            start
                        </div>
                    </Animate>
                )}/>


                <Route exact path = "/cancel" render={() => (
                    <Animate to={'1'} from={'0'} attributeName="opacity" duration={3000}>
                        <CancelView />
                    </Animate>
                )}/>

            </Switch>
        )
    }
}