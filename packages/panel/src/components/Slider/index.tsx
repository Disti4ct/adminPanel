import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Slider as MuiSlider } from '@mui/material'

export default function Slider({
  name,
  max,
  min,
  step,
  defaultValue,
  marks,
}: {
  name: string
  min: number
  max: number
  step?: number
  defaultValue?: number
  marks?: { value: number; label: string }[]
}) {
  return (
    <Box>
      <Typography gutterBottom>{name}</Typography>
      <MuiSlider
        min={min}
        max={max}
        step={step || 1}
        defaultValue={defaultValue || min}
        marks={marks?.length ? marks : false}
      />
    </Box>
  )
}
