import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
if ( typeof window !== 'undefined' && typeof document !== 'undefined' ) {
  const rootElement = document.getElementById( 'root' )
  if ( rootElement ) {
    const root = ReactDOM.createRoot( rootElement )
    root.render(
      (
        <React.StrictMode>
          <App />
        </React.StrictMode>
      ),
    )
    reportWebVitals( console.log )
  }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
