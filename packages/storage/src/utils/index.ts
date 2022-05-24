export function log({
  title,
  color,
  value,
}: {
  title: string
  value: any
  color?: string
}) {
  console.group(`%c ${title}`, `color: ${color}`)
  console.log(value)
  console.groupEnd()
}
