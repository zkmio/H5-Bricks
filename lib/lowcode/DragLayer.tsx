import { JSX } from "solid-js/jsx-runtime"
import { usePageDesign } from "./PageDesign"
import Events from "./Events"
import { Show, batch } from "solid-js";
import { bucket } from "../mgrui/lib/components/utils";
import ComponentRender from "./ComponentRender";

export default function DragLayer() {
  let container: HTMLDivElement

  const core = usePageDesign()
  const selectedComponent = bucket<ComponentInstance>(null)
  const mousePosition = bucket<Pos>(null)

  core.on(Events.StartDraggingComponent, evt => {
    const { component, mousePosition: [x, y] } = evt.detail
    if (component.label === selectedComponent()?.label) {
      return
    }
    
    const {w, h} = component.elementInitSize
    const instance = {...evt.detail.component} as ComponentInstance;
    instance.box = { x: 0, y: 0, w, h }

    const boundingRect = container.getBoundingClientRect()

    batch(() => {
      mousePosition([x - boundingRect.left, y - boundingRect.top])
      selectedComponent(instance)
    })
  });
  
  return (
    <div id="drag-layer" class="absolute w-full h-full pointer-events-none"
      ref={el => container = el}>
      <Show when={selectedComponent()}>
        <div class="relative" style={{
          left: mousePosition()[0] + "px",
          top: mousePosition()[1] + "px"
        }}>
          <ComponentRender instance={selectedComponent()} />
        </div>
      </Show>
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