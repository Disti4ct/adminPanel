import MuiButton from '@mui/material/Button'
import './index.scss'

export default function Button({
  children,
  onClick,
  disabled,
  fullWidth,
}: {
  children: JSX.Element | JSX.Element[] | string | null
  onClick: () => void
  disabled?: boolean
  fullWidth?: boolean
}) {
  return (
    <MuiButton
      className={`panelButton ${fullWidth ? 'fullWidth' : ''}`}
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  )
}
