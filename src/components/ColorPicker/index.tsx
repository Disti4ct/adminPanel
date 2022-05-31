import { useState, useEffect } from 'react'
import './index.scss'
import { isValidColor } from '../../utils/color'
import { HuePicker } from 'react-color'
import Input from '../Input'
import Checkbox from '../Checkbox'

const colorPickerStyles = {
  default: {
    picker: {
      width: '100%',
    },
  },
}

export default function ColorPicker({
  name,
  defaultColor,
  onColor,
}: {
  name: string
  defaultColor: string
  onColor: (color: string, valid: boolean) => void
}) {
  const [color, setColor] = useState(defaultColor)
  const [customColor, setCustomColor] = useState(false)

  const toggleCustomColor = () => setCustomColor((prevValue) => !prevValue)

  useEffect(() => {
    onColor(color, !color || isValidColor(color))
  }, [color, onColor])

  return (
    <div className="colorPicker">
      <div className="colorPickerHeader">
        <span>{name}</span>
        <Checkbox
          value={customColor}
          onChange={toggleCustomColor}
          name="Custom"
        />
      </div>

      {customColor ? (
        <Input label={`(rgb, hsl, hex)`} value={color} onChange={setColor} />
      ) : (
        <HuePicker
          color={color}
          onChangeComplete={(color: { hex: string }) => setColor(color.hex)}
          styles={colorPickerStyles}
        />
      )}
    </div>
  )
}
