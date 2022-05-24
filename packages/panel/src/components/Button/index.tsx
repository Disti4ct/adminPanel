import MuiButton from '@mui/material/Button'
import './index.scss'

export default function Button({
  children,
  onClick,
  fullWidth,
}: {
  children: JSX.Element | JSX.Element[] | string | null
  onClick: () => void
  fullWidth?: boolean
}) {
  return (
    <MuiButton
      className={`panelButton ${fullWidth ? 'fullWidth' : ''}`}
      variant="outlined"
      onClick={onClick}
    >
      {children}
    </MuiButton>
  )
}
