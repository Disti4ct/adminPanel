import { TextField } from '@mui/material'
import './index.scss'

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  errorMessage,
}: {
  value: string
  onChange: (value: any) => void
  label?: string
  placeholder?: string
  error?: boolean
  errorMessage?: string
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      placeholder={placeholder || ''}
      fullWidth
      error={error}
      helperText={errorMessage || false}
    />
  )
}
