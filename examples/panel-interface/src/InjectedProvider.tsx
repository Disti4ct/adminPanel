import { useState, useEffect, useCallback, useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { InjectedContext } from './hooks'
import { injected } from './constants'

export default function InjectedProvider({ children }: any) {
  const { activate, account, active, deactivate } = useWeb3ReactCore()
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(false) // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(true)

  // Init loading
  useEffect(() => {
    connect().then(() => setIsLoading(false))
  })

  // Check when the app is connected or disconnected to the wallet
  const handleIsActive = useCallback(() => {
    setIsActive(active)
  }, [active])

  useEffect(() => {
    handleIsActive()
  }, [handleIsActive])

  const connect = useCallback(async () => {
    setShouldDisable(true)

    try {
      if (!isActive) {
        await activate(injected).then(() => {
          setIsActive(true)
          setShouldDisable(false)
        })
      }
    } catch (error) {
      console.error('Error on connecting: ', error)
    }
  }, [activate, isActive])

  const disconnect = useCallback(async () => {
    try {
      if (active) {
        await deactivate()
      }
    } catch (error) {
      console.error('Error on disconnect: ', error)
    }
  }, [deactivate, active])

  const value = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
      shouldDisable,
    }),
    [isActive, isLoading, shouldDisable, account, connect, disconnect]
  )

  return (
    // @ts-ignore
    <InjectedContext.Provider value={value}>
      {children}
    </InjectedContext.Provider>
  )
}
