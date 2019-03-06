
import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './App.css';
import App from './components/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers';
import middlewares from './middlewares';
import {BrowserRouter} from 'react-router-dom'

const store = createStore(reducers, middlewares)

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
            <App />
        </BrowserRouter>
</Provider >,
    document.getElementById('root'));
