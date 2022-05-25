import { createContext, useContext } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { NetworkContextName } from '../constants'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: number
} {
  const context = useWeb3ReactCore<Web3Provider>()
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
}

export const InjectedContext = createContext(null)

export function useInjected(): any {
  const context = useContext(InjectedContext)

  if (context === undefined) {
    throw new Error(
      'useInjected hook must be used with a InjectedValue component'
    )
  }

  return context
}
