import { useState } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { ExpandMore } from '@mui/icons-material'

const AccordionWrapper = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }: { theme: any }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '&.MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(270deg)',
  },
  '&.MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  '&.MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function Accordion({
  name = '',
  children,
  expanded: expandedDefault,
}: {
  name?: string
  children: JSX.Element | JSX.Element[] | null
  expanded?: boolean
}) {
  const [expanded, setExpanded] = useState<boolean>(!!expandedDefault)
  const toggleDisplay = () => setExpanded(!expanded)

  return (
    <AccordionWrapper expanded={expanded} title={name} onChange={toggleDisplay}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </AccordionWrapper>
  )
}
