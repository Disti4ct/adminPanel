import { Link as MuiLink } from '@mui/material'

export default function Link({
  children,
  href,
}: {
  children: JSX.Element | JSX.Element[] | string | null
  href: string
}) {
  return (
    <MuiLink href={href} target="_blank" rel="noopener">
      {children}
    </MuiLink>
  )
}
