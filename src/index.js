import React from 'react'
import ReactDOM from 'react-dom'
import App from './components'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'


// Redux
import Reducer from './redux/reducer'

ReactDOM.render(
    <BrowserRouter>
        <Provider store={ createStore(Reducer) }>
            <App/>
        </Provider>
    </BrowserRouter>

    ,document.getElementById('root')
)
registerServiceWorker()