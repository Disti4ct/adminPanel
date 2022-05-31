import Box from '@mui/material/Box'

export enum TextType {
  notice = 'text.secondary',
  warning = 'warning.main',
  positive = 'success.main',
  error = 'error.main',
}

const typeStyles = {
  [TextType.notice]: { bgcolor: 'primary.main', color: 'primary.contrastText' },
  [TextType.warning]: {
    bgcolor: 'warning.main',
    color: 'warning.contrastText',
  },
  [TextType.positive]: {
    bgcolor: 'success.main',
    color: 'success.contrastText',
  },
  [TextType.error]: { bgcolor: 'error.main', color: 'error.contrastText' },
}

export default function Text({
  children,
  textType,
}: {
  children: JSX.Element | JSX.Element[] | string | null
  textType?: TextType
}) {
  const textStyles = textType ? typeStyles[textType] : {}

  return (
    <Box sx={{ padding: '.4rem', borderRadius: '0.25rem', ...textStyles }}>
      {children}
    </Box>
  )
}
