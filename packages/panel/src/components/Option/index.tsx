import './index.scss'

export default function Option({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string | null
}) {
  return <div className="option">{children}</div>
}
