import { JSX } from "solid-js/jsx-runtime"
import { usePageDesign } from "./PageDesign"
import Events from "./Events"
import { Show, batch } from "solid-js";
import { bucket } from "../mgrui/lib/components/utils";
import ComponentRender from "./ComponentRender";
import { createDomEventRegistry } from "../mgrui/lib/components/event/EventRegistry";

export default function DragLayer() {
  let container: HTMLDivElement

  const core = usePageDesign()
  const domEventRegistry = createDomEventRegistry()

  const selectedComponent = bucket<ComponentInstance>(null)
  const mousePosition = bucket<Pos>(null)
  const dragging = bucket(false)

  core.on(Events.StartDraggingComponent, evt => {
    const { component, mousePosition: [x, y] } = evt.detail
    const boundingRect = container.getBoundingClientRect()

    if (component.label === selectedComponent()?.label) {
      mousePosition([x - boundingRect.left, y - boundingRect.top])
      return
    }

    const {w, h} = component.elementInitSize
    const instance = {...evt.detail.component} as ComponentInstance;
    instance.box = { x: 0, y: 0, w, h }

    domEventRegistry.on(window, "mousemove", (evt: MouseEvent) => {
      if (selectedComponent()) {
        batch(() => {
          dragging(true)
          const boundingRect = container.getBoundingClientRect()
          mousePosition([evt.clientX - boundingRect.left, evt.clientY - boundingRect.top])
        })
      }
    })

    batch(() => {
      selectedComponent(instance)
      mousePosition([x - boundingRect.left, y - boundingRect.top])
    })
  })
  
  return (
    <div id="drag-layer" class="absolute w-full h-full pointer-events-none"
      ref={el => container = el}>
      <Show when={dragging()}>
        <div class="relative" style={{
          left: mousePosition()[0] + "px",
          top: mousePosition()[1] + "px"
        }}>
          <div class="-translate-y-full">{selectedComponent().label}</div>
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