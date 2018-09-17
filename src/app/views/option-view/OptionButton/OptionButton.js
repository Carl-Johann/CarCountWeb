// Lib
import React, { Component } from 'react'
import { Button } from 'reactstrap'

// Config
import { textStyle } from '../../../../config/style'
import { styles, cols } from './styles'


export default class OptionButton extends Component {


    componentDidMount() {
        console.log('image', this.props.image)
    }


    render() {

        const { text, image, method } = this.props



        return (
            <Button
                className={ cols.buttons }
                style={ styles.button }
                onClick={method}
            >

                <img src={require('../../../images/'+image)} alt="icon" />
                <div style={ styles.picTextPadding } />
                <h6 style={ textStyle } >{ text }</h6>
            </Button>
        )
    }
}