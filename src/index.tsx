import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from 'App'
import { LocaleProvider } from 'shared'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>
)
