import './index.scss'
import CheckIcon from '@mui/icons-material/Check'
import { ToggleButton } from '@mui/material'

export default function Toggle({
  value,
  onChange,
  name,
  fullWidth,
}: {
  value: boolean
  onChange: () => void
  name?: string
  fullWidth?: boolean
}) {
  const extraToggleStyles = fullWidth
    ? {
        width: '100%',
      }
    : {}

  return (
    <ToggleButton
      size="small"
      value="check"
      selected={value}
      onChange={onChange}
      sx={extraToggleStyles}
    >
      <CheckIcon />
      {name && <span className="toggleName">{name}</span>}
    </ToggleButton>
  )
}
