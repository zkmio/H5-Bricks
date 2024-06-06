import { JSX } from "solid-js/jsx-runtime"
import { usePageDesign } from "./PageDesign"
import Events from "./Events"
import { Show } from "solid-js";
import { bucket } from "../mgrui/lib/components/utils";
import ComponentRender from "./ComponentRender";

export default function DragLayer() {
  const core = usePageDesign()

  const selectedComponent = bucket<ComponentInstance>(null)

  core.on(Events.StartDraggingComponent, evt => {
    const component = evt.detail.component
    const {w, h} = component.elementInitSize
    const instance = {...evt.detail.component} as ComponentInstance;
    instance.box = {
      x: 0,
      y: 0,
      w, h,
    }
    selectedComponent(instance)
  });
  
  return (
    <div id="drag-layer" class="absolute w-full h-full pointer-events-none">
      <div class="relative">
        <Show when={selectedComponent()}>
          <ComponentRender instance={selectedComponent()} />
        </Show>
      </div>
    </div>
  )
}

export function DragArea(props: {
  children: JSX.Element
}) {
  const onMouseEnter = () => {

  }

  const onMouseLeave = () => {

  }

  return (
    <div class="relative w-full h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {props.children}
    </div>
  )
}