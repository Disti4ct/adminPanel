import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import './App.css'
import {
  Interface,
  Tabs,
  MultiTypeSettings,
  InterfaceOption,
  Button,
  ThemeProvider,
  createTheme,
} from 'panel'

import { Storage } from 'storage'
import { useInjected } from './hooks'
import SavedSettings from './SavedSettings'
import { NETWORKS, STORAGE_DEV_KEY } from './constants'

enum Theme {
  light = 'light',
  dark = 'dark',
}

export default function App() {
  const { library, chainId } = useWeb3React()
  const {} = useInjected()

  const [mode, setMode] = React.useState<Theme>(Theme.light)

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === Theme.light ? Theme.dark : Theme.light))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  const [storage, setStorage] = useState<any | null>(null)
  const [storageSettings, setStorageSettings] = useState<any | null>(null)
  const [storageOwner, setStorageOwner] = useState('')
  const [appSettings, setAppSettings] = useState({})

  useEffect(() => {
    if (chainId) {
      const { rpc, storage } = NETWORKS[chainId as keyof typeof NETWORKS]

      setStorage(
        new Storage({
          address: storage,
          rpc,
          library,
        })
      )
    } else {
      setStorage(null)
    }
  }, [chainId, library])

  useEffect(() => {
    if (storage) {
      const fetchSettings = async () => {
        const { data, owner } = await storage.get(STORAGE_DEV_KEY)

        setStorageOwner(owner)
        setStorageSettings(data[STORAGE_DEV_KEY])
      }

      fetchSettings()
    }
  }, [storage])

  const onChange = (settings: MultiTypeSettings) => {
    setAppSettings((prevSettings) => ({
      ...prevSettings,
      ...settings,
    }))
  }

  const startSaving = useCallback(() => {
    const save = async () => {
      await storage.set({
        key: STORAGE_DEV_KEY,
        data: appSettings,
        owner: storageOwner,
      })
    }

    save()
  }, [appSettings, storageOwner, storage])

  const onSave = useCallback(
    (settings: MultiTypeSettings) => {
      setAppSettings((prevSettings) => ({
        ...prevSettings,
        ...settings,
      }))

      startSaving()
    },
    [startSaving]
  )

  const [tabs] = useState([
    {
      title: 'Settings',
      id: 0,
    },
    {
      title: 'Interface',
      id: 1,
    },
  ])

  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="appWrapper">
      <ThemeProvider theme={theme}>
        <div className="appHeader">
          <Tabs tabs={tabs} onChange={setActiveTab} />
          <Button onClick={toggleTheme}>Theme</Button>
        </div>

        {activeTab.id === tabs[0].id && (
          <SavedSettings settings={storageSettings} />
        )}

        {activeTab.id === tabs[1].id && (
          <>
            <Interface
              onChange={onChange}
              onSave={onSave}
              defaultValues={{
                projectName: 'TopSwap',
                backgroundColorDark: '#900',
                textColorLight: '#eee',
              }}
              settings={{
                [InterfaceOption.common]: true,
                [InterfaceOption.colors]: {
                  light: {
                    color: true,
                    background: false,
                  },
                  dark: {
                    color: false,
                    background: true,
                  },
                },
                [InterfaceOption.links]: {
                  navigation: false,
                  social: true,
                  menu: true,
                },
                [InterfaceOption.saveButton]: false,
              }}
            />

            <Button onClick={startSaving} fullWidth>
              Save settings
            </Button>
          </>
        )}
      </ThemeProvider>
    </div>
  )
}
