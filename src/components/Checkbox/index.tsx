import MuiCheckbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

export default function Checkbox({
  value,
  onChange,
  name,
}: {
  value: boolean
  onChange: () => void
  name: string
}) {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={<MuiCheckbox checked={value} onChange={onChange} />}
          label={name}
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  )
}
