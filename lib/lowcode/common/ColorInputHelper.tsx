import { Button, Divider, Paper } from "@suid/material"
import { bucket } from "../../mgrui/lib/components/utils"
import ColorPicker from "./ColorPicker"
import T from "../../mgrui/lib/components/T"

export default function ColorInputHelper(props: {
  onSelect(selected: string): void
}) {
  const selected = bucket("")
  return (
    <Paper class="flex flex-col gap-2 p-2">
      <ColorPicker onChange={selected} />
      <Divider />
      <div class="ml-auto">
        <Button onClick={() => props.onSelect(selected())}>
          <T>actions.confirm</T>
        </Button>
      </div>
    </Paper>
  )
}