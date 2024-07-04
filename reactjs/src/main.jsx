import "../polyfills"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { XMTPProvider } from "@xmtp/react-sdk"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <XMTPProvider>
      <App />
    </XMTPProvider>
  </React.StrictMode>,
)
