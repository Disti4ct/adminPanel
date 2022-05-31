export const HEX_COLOR_REGEXP = /^#([\dA-F]{3}){1,2}$/i
export const RGB_COLOR_REGEXP =
  /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
export const HSL_COLOR_REGEXP =
  /^hsl\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/

export const isValidColor = (color: string): boolean => {
  return (
    !!color &&
    typeof color === 'string' &&
    Boolean(
      color.match(HEX_COLOR_REGEXP) ||
        color.match(RGB_COLOR_REGEXP) ||
        color.match(HSL_COLOR_REGEXP)
    )
  )
}
