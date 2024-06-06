import { JSX } from "solid-js/jsx-runtime"
import { usePageDesign } from "./PageDesign"
import Events from "./Events"
import { Show, batch, createContext } from "solid-js";
import { bucket, useCtx } from "../mgrui/lib/components/utils";
import ComponentRender from "./ComponentRender";
import { createDomEventRegistry } from "../mgrui/lib/components/event/EventRegistry";

interface IDraggableContext {
  selectedComponent: NullableBucket<ComponentInstance>
}

const DraggableContext = createContext<IDraggableContext>()

export function useDraggable() {
  return useCtx<IDraggableContext>(DraggableContext as any)
}

export function Container(props: JSX.HTMLAttributes<HTMLDivElement>) {
  let container: HTMLDivElement

  const core = usePageDesign()
  const domEventRegistry = createDomEventRegistry()

  const selectedComponent = bucket<ComponentInstance, null>()
  const mousePosition = bucket<Pos, null>()
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
    <div {...props}>
      <DraggableContext.Provider value={{ selectedComponent }}>
        {props.children}
        <div id="drag-layer" class="absolute w-full h-full pointer-events-none"
          ref={el => container = el}>
          <Show when={dragging()}>
            <div class="relative" style={{
              left: mousePosition()?.[0] + "px",
              top: mousePosition()?.[1] + "px"
            }}>
              <div class="-translate-y-full">{selectedComponent()?.label}</div>
              <ComponentRender instance={selectedComponent.get()} />
            </div>
          </Show>
        </div>
      </DraggableContext.Provider>
    </div>
  )
}

export function Area(props: {
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

export default ({
  Container,
  Area
})