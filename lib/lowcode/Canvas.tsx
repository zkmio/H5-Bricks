import { useTheme } from "@suid/material";
import { For, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import CanvasController from "./CanvasController";

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
      <For each={Array.from(x.components())}>{([id, instance]) => {
        const dynamic = createMemo(() => {
          const props = instance.props()
          return (
            <Dynamic component={instance.element} {...props} />
          )
        })
        return (
          <div class="component-positioner absolute outline outline-1 outline-zinc-500" style={{
            left: instance.box.x * 20 + x.config().paddingX + "px",
            top: instance.box.y * 20 + x.config().paddingY + "px",
            width: instance.box.w * 20 + "px",
            height: instance.box.h * 20 + "px",
          }} onClick={() => x.onSelectComponent(instance)}>
            <div class="component-wrapper relative w-full h-full">
              {dynamic()}
            </div>
          </div>
        )
      }}</For>
    </div>
  )
}