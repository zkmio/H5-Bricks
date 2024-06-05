import { ValidComponent, createContext, onMount } from "solid-js";
import ComponentConfiguration from "./ComponentConfiguration";
import ComponentList from "./ComponentList";
import Workspace from "./Workspace";
import { v4 as uuidv4 } from 'uuid';
import PageDesignEvents from "./PageDesignEvents";
import { CustomEventRegistryImpl, createDomEventRegistry } from "../mgrui/lib/components/event/EventRegistry";
import { bucket, useCtx } from "../mgrui/lib/components/utils";

export interface PageDesignComponent {
  icon: ValidComponent
  label: string
  element: ValidComponent
  elementInitSize: {
    w: number
    h: number
  },
  attributes: ValidComponent
}

interface PageDesignContextDef extends CustomEventRegistry {
}

class PageDesignContextImpl extends CustomEventRegistryImpl implements PageDesignContextDef {

  draggingElemPositioning: HTMLDivElement;
  // readonly selected = bucket<PageDesignComponent | null>(null);
  readonly mouseDownAt = bucket<Pos | null>(null);
  readonly mouseDownAtRelative = bucket<Pos | null>(null);
  private readonly domEventRegistry = createDomEventRegistry("PageDesign", uuidv4());

  constructor() {
    super();
    onMount(() => {
      this.on(PageDesignEvents.StartDraggingComponent, evt => {
        // this.selected(evt.detail.component);
        this.mouseDownAt(evt.detail.mouse);
        this.mouseDownAtRelative(evt.detail.offset);
      });

      this.domEventRegistry.on(window, "mousemove", this.onMouseMove.bind(this));
      this.domEventRegistry.on(window, "mouseup", evt => {
        // this.selected(null);
      });
    });
  }

  onMouseMove(evt: MouseEvent) {
    // if (this.selected()) {
    //   const mouseDownAt = this.mouseDownAt() as Pos;
    //   const mouseDownAtRelative = this.mouseDownAtRelative() as Pos;
    //   this.draggingElemPositioning.style.left = (evt.clientX - mouseDownAt[0] + mouseDownAtRelative[0]) + "px";
    //   this.draggingElemPositioning.style.top = (evt.clientY - mouseDownAt[1] + mouseDownAtRelative[1]) + "px";
    // }
  }
}

const PageDesignContext = createContext<PageDesignContextDef>();

export function usePageDesign() {
  return useCtx<PageDesignContextDef>(PageDesignContext as any);
}

export default function PageDesign() {
  const ctx = new PageDesignContextImpl();


  return (
    <div class="flex relative w-full h-full">
      <PageDesignContext.Provider value={ctx}>
        <ComponentList />
        <Workspace />
        <ComponentConfiguration />
        {/* <Show when={ctx.selected()}>
          <div class="absolute" ref={el => ctx.draggingElemPositioning = el} style={{
            left: ctx.mouseDownAtRelative()?.[0] + "px",
            top: ctx.mouseDownAtRelative()?.[1] + "px",
          }}>
            <ComponentCell entry={ctx.selected()} />
          </div>
        </Show> */}
      </PageDesignContext.Provider>
    </div>
  )
}