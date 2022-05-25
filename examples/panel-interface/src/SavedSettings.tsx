import { Mui } from 'panel'

export default function SavedSettings({
  settings = undefined,
}: {
  settings?: { [k: string]: any } | undefined
}) {
  return (
    <section>
      <h2>Saved settings</h2>

      <Mui.TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        style={{ width: 600, fontSize: '1.2rem' }}
        value={
          settings ? JSON.stringify(settings, undefined, 4) : 'No settings'
        }
      />
    </section>
  )
}
