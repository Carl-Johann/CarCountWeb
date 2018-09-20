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

        const { batchId } = this.props

        return (
            <div className='option-view container'>
                <div className='row' style={ styles.startBatchContainer }>
                    <OptionButton
                        enabled={ batchId < 0 }
                        method={ this.start }
                        image={ 'start.png' }
                        text={ 'Start Batch' }
                    />

                    <OptionButton
                        enabled={ batchId > 0 }
                        method={ this.cancel }
                        image={ 'cancel.png' }
                        text={ 'Cancel Batch' }
                    />
                </div>
            </div>
        )
    }
}