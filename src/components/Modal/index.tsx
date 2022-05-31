import Box from '@mui/material/Box'
import MuiModal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: '0.25rem',
  boxShadow: 24,
  p: 4,
}

export default function Modal({
  children,
  open = false,
  onClose,
}: {
  children: JSX.Element | JSX.Element[] | string | null
  open?: boolean
  onClose?: () => void
}) {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  )
}
