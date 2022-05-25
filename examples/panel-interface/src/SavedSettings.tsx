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
        style={{ width: 200 }}
        value={settings ? JSON.stringify(settings) : 'No settings'}
      />
    </section>
  )
}
