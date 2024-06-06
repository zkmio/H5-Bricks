import { createMemo, splitProps } from "solid-js"
import { JSX } from "solid-js/jsx-runtime"
import { Dynamic } from "solid-js/web"

export default function ComponentRender(props: {
  instance: ComponentInstance
  canvasPadding?: [number, number]
} & JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ["instance", "canvasPadding"])
  const dynamic = createMemo(() => {
    if (props.instance.props) {
      const componentProps = props.instance.props()
      return (
        <Dynamic component={props.instance.element} {...componentProps} />
      )
    } else {
      return (
        <Dynamic component={props.instance.element} />
      )
    }
  })

  return (
    <div class="component-positioner absolute outline outline-1 outline-zinc-500" style={{
      left: local.instance.box.x * 20 + (local.canvasPadding ? local.canvasPadding[0] : 0) + "px",
      top: local.instance.box.y * 20 + (local.canvasPadding ? local.canvasPadding[1] : 0) + "px",
      width: local.instance.box.w * 20 + "px",
      height: local.instance.box.h * 20 + "px",
    }} {...others}>
      <div class="component-wrapper relative w-full h-full">
        {dynamic()}
      </div>
    </div>
  )
}