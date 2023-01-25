import React from 'react'
import ReactDOM from 'react-dom/client'
import Playground from './Playground'
import './output.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Playground />
  </React.StrictMode>,
)
