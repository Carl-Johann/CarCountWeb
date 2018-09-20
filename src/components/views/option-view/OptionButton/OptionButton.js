// Lib
import React, { Component } from 'react'
import { Button } from 'reactstrap'

// Config
import { textStyle } from '../../../../config/style'
import { styles, cols } from './styles'


export default class OptionButton extends Component {

    render() {

        const { text, image, method, enabled } = this.props



        return (
            <Button
                className={ cols.buttons }
                style={{ ...styles.button, ...{ opacity: enabled ? 1 : 0.5 } }}
                onClick={ () => { if (enabled) method() }}
                disabled={ !enabled }
            >

                <img src={ require('../../../images/'+image) } alt={"icon_"+image} />
                <div style={ styles.picTextPadding } />
                { enabled && (
                    <h6 style={ textStyle } >{ text }</h6>
                ) || (
                    <h6 style={ textStyle } >All batch's sites closed</h6>
                ) }
            </Button>
        )
    }
}