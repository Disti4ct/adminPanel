export const isObject = (possibleObj: any) => {
  return (
    possibleObj != null &&
    typeof possibleObj == 'object' &&
    !Array.isArray(possibleObj)
  )
}
