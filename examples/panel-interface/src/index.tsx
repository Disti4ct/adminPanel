import React from 'react'
import ReactDOM from 'react-dom'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import './index.css'
import InjectedProvider from './InjectedProvider'
import App from './App'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <InjectedProvider>
        <App />
      </InjectedProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
