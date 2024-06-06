import { Dynamic } from "solid-js/web";
import { Show, onMount } from "solid-js";
import { usePageDesign } from "./PageDesign";
import Events from "./Events";
import { bucket } from "../mgrui/lib/components/utils";
import ColorPicker from "./common/ColorPicker";

export default function CanvasConfiguration() {
  const core = usePageDesign()
  const selected = bucket<ComponentInstance | null>(null)
  
  onMount(() => {
    core.on(Events.SelectComponentInstance, (evt) => {
      const instance = evt.detail
      selected(instance)
    })
  })

  return (
    <div class="shrink-0 w-[30%] p-4">
      <Show when={selected()}>
        <Dynamic component={selected()?.attributes} componentProps={selected()?.props} />
      </Show>
      <ColorPicker />
    </div>
  )
}