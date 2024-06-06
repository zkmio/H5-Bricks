import { useTheme } from "@suid/material";
import { For } from "solid-js";
import CanvasController from "./CanvasController";
import ComponentRender from "./ComponentRender";

export default function Canvas() {
  const theme = useTheme();
  const x = new CanvasController()

  return (
    <div class="relative w-full grow rounded-2xl"
      ref={el => x.container = el}
      onMouseEnter={x.onMouseEnter.bind(x)}
      onMouseLeave={x.onMouseLeave.bind(x)}
      style={{
        "background-color": "white",
        "background-image": `radial-gradient(
          ${theme.palette.mode === 'light' ? '#e4e4e7' : '#334155'} 2px,
          ${theme.palette.mode === 'light' ? '#fafafa' : '#27272a'} 1px)`, // zinc-50~zinc-200, slate-700~zinc-800
        "background-size": "20px 20px",
        "background-position": `${x.config().paddingX - 10}px ${x.config().paddingY - 10}px`
      }}>
      {/* <Show when={pageDesign.selected() && mouseIn()}>
        <Dynamic component={pageDesign.selected()?.element} />
      </Show> */}
      <For each={Array.from(x.components())}>{([id, instance]) => (
          <ComponentRender instance={instance}
            canvasPadding={[x.config().paddingX, x.config().paddingY]} />
        )}</For>
    </div>
  )
}