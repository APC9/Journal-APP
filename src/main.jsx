import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { JournalApp } from './JournalApp'

import { store } from './store' 
import { Provider } from 'react-redux'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JournalApp/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
