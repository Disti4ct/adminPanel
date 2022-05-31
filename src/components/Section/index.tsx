import { useState } from 'react'
import './index.scss'

export default function Section({
  children,
  name,
  openByDefault,
}: {
  children: JSX.Element | JSX.Element[] | string | null
  name?: string
  openByDefault?: boolean
}) {
  const [] = useState<boolean>(openByDefault ?? false)

  return (
    <section className="panelSection">
      {name && <h3 className="panelSectionTitle">{name}</h3>}
      {children}
    </section>
  )
}
