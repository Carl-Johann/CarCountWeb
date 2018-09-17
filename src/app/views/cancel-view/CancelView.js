// Lib
import React, { Component } from 'react'
import { Input, Button } from 'reactstrap'
import Animate from 'react-smooth'

// Config
import { styles, cols } from './styles'
import { textStyle } from '../../../config/style'


export default class CancelView extends Component {


    state = {
        loading: false
    }


    cancel = () => {
        this.setState({ loading: true })
    }





    render() {

        const { loading } = this.state

        return (
            <div className='cancel-view container-fluid' style={ styles.container }>
                <div className='row'>

                    <Input
                        type={'textarea'}
                        className={ cols.input }
                        style={ styles.input }
                        cols={ 50 }
                        rows={ 6 }
                    />


                    {/*<Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>*/}

                    { loading == false && (
                        <Button
                            className={ cols.postButton }
                            style={ styles.postButton }
                            onClick={this.cancel}
                        >
                            <h6 style={ textStyle } >Cancel Batch</h6>

                        </Button>
                    ) || loading && (
                        <Animate to={'1'} from={'0'} attributeName="opacity" duration={750}>
                            <div className={ cols.loader } style={ styles.loaderContainer } >
                                <div style={ styles.loader } />
                            </div>
                        </Animate>
                    )}
                    {/*</Animate>*/}


                </div>

            </div>
        )
    }
}