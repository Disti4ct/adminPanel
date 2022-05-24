import React, { useEffect, useState } from 'react'
import './App.css'
import {
  Interface,
  Tabs,
  MultiTypeSettings,
  InterfaceOption,
  Button,
} from 'panel'

function App() {
  const [appSettings, setAppSettings] = useState({})

  const onChange = (settings: MultiTypeSettings) => {
    setAppSettings((prevSettings) => ({
      ...prevSettings,
      ...settings,
    }))
  }

  const startSaving = () => {
    // storage.set(appSettings)
  }

  const onSave = (settings: MultiTypeSettings) => {
    setAppSettings((prevSettings) => ({
      ...prevSettings,
      ...settings,
    }))

    startSaving()
  }

  useEffect(() => {
    console.log('settings is changed', appSettings)
  }, [appSettings])

  const [tabs] = useState([
    {
      title: 'Interface',
      id: 1,
      component: (
        <>
          <Interface
            onChange={onChange}
            onSave={onSave}
            defaultValues={{
              projectName: 'ShitSwap',
              backgroundColorDark: '#900',
              textColorLight: '#eee',
              // const default = await storage.get(...)
              // ...default
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
      ),
    },
  ])

  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="appWrapper">
      <Tabs tabs={tabs} onChange={setActiveTab} />

      {activeTab.component}
    </div>
  )
}

export default App
