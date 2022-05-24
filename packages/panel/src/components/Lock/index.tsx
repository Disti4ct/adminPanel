import './index.scss'
import Box from '@mui/material/Box'

export default function Lock({
  children,
  enabled,
  reason,
}: {
  children: JSX.Element | JSX.Element[] | string
  enabled?: boolean
  reason?: string
}) {
  return (
    <Box>
      {reason && <p className='lockReasonWrapper'>{reason}</p>}
      <div className={`lock ${enabled ? 'disabled' : ''}`}>{children}</div>
    </Box>
  )
}
