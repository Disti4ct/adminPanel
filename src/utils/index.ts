export const isObject = (possibleObj: any) => {
  return (
    possibleObj != null &&
    typeof possibleObj == 'object' &&
    !Array.isArray(possibleObj)
  )
}

export const isValidUrl = (value: string): boolean => {
  const match = value.match(
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/gi
  )

  return !!match?.length
}
