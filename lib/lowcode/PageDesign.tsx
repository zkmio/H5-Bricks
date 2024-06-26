import { createContext, onMount } from "solid-js";
import CanvasConfiguration from "./CanvasConfiguration";
import ComponentList from "./ComponentList";
import Workspace from "./Workspace";
import Events from "./Events";
import { CustomEventRegistryImpl } from "../mgrui/lib/components/event/EventRegistry";
import { bucket, useCtx } from "../mgrui/lib/components/utils";
import Draggable from "./Draggable";

interface PageDesignContextDef extends CustomEventRegistry {
}

class PageDesignContextImpl extends CustomEventRegistryImpl implements PageDesignContextDef {

  draggingElemPositioning: HTMLDivElement;
  readonly mouseDownAt = bucket<Pos | null>(null);
  readonly mouseDownAtRelative = bucket<Pos | null>(null);

  constructor() {
    super();
    onMount(() => {
      this.on(Events.StartDraggingComponent, evt => {
        this.mouseDownAt(evt.detail.mouse);
        this.mouseDownAtRelative(evt.detail.offset);
      });
    });
  }
}

const PageDesignContext = createContext<PageDesignContextDef>();

export function usePageDesign() {
  return useCtx<PageDesignContextDef>(PageDesignContext as any);
}

export default function PageDesign() {
  const ctx = new PageDesignContextImpl();


  return (
    <PageDesignContext.Provider value={ctx}>
      <Draggable.Container class="flex relative w-full h-full">
        <ComponentList />
        <Workspace />
        <CanvasConfiguration />
      </Draggable.Container>
    </PageDesignContext.Provider>
  )
}