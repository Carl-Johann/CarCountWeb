// Lib
import React, { Component } from 'react'

// Config
import { styles } from './styles'

// Components
import OptionButton from './OptionButton'


export default class OptionView extends Component {


    start = () => {
        window.location.href='/start'
    }


    cancel = () => {
        window.location.href='/cancel'
    }







    render() {

        return (
            <div className='option-view container'>
                <div className='row' style={ styles.startBatchContainer }>
                    <OptionButton
                        text={ 'Start Batch' }
                        image={ 'start.png' }
                        method={this.start}
                    />

                    <OptionButton
                        text={ 'Cancel Batch' }
                        image={ 'cancel.png' }
                        method={this.cancel}
                    />
                </div>
            </div>
        )
    }
}