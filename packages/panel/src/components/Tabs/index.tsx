import { useEffect, useState } from 'react'
import { Tabs as MuiTabs, Tab } from '@mui/material'

export interface Tab {
  title: string
  id: number
  component: JSX.Element
}

export default function Tabs({
  tabs,
  onChange,
}: {
  tabs: Tab[]
  onChange: (tab: Tab) => void
}) {
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => onChange(tabs[value]), [value])

  return (
    <div>
      <MuiTabs value={value} onChange={handleChange} centered>
        {tabs.length > 1
          ? tabs.map(({ title }, index) => <Tab label={title} key={index} />)
          : !!tabs.length && <Tab label={tabs[0].title} disabled />}
      </MuiTabs>
    </div>
  )
}
