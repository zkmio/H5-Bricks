import { onMount } from "solid-js"
import { bucket } from "../../mgrui/lib/components/utils"

export default function ColorPicker() {
  let container: HTMLDivElement
  let panelCanvasRef: HTMLCanvasElement
  let barCanvasRef: HTMLCanvasElement

  const isLightColor = bucket(false)
  const selected = bucket<string>("rgb(0,0,0)")
  const cursor = bucket<Pos>([0, 0])

  const onClick = (evt: MouseEvent) => {
    const ctx = panelCanvasRef.getContext('2d')
    if (!ctx) {
      return
    }

    let { clientX: x, clientY: y } = evt
    x -= panelCanvasRef.getBoundingClientRect().left
    y -= panelCanvasRef.getBoundingClientRect().top

    const pixel = ctx.getImageData(x, y, 1, 1).data
    const rgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`
    selected(rgb)
    cursor([x, y])
    isLightColor(x < 100 && y < 100)
  }

  onMount(() => {
    const ctx = panelCanvasRef.getContext('2d', { willReadFrequently: true })
    if (!ctx) {
      return
    }

    // create horizontal gradient
    var color = '#0000ff'
    const gradientH = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradientH.addColorStop(0, '#fff');
    gradientH.addColorStop(1, color);
    ctx.fillStyle = gradientH;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // create vertical gradient
    const gradientV = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
    gradientV.addColorStop(0, 'rgba(0,0,0,0)')
    gradientV.addColorStop(1, '#000')
    ctx.fillStyle = gradientV
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const barCtx = barCanvasRef.getContext('2d', { willReadFrequently: true })
    if (!barCtx) {
      return
    }
    
    barCtx.canvas.height = container.getBoundingClientRect().height

    const barGradient = barCtx.createLinearGradient(0, 0, 0, barCtx.canvas.height)
    barGradient.addColorStop(0, 'violet')
    barGradient.addColorStop(0.17, 'blue')
    barGradient.addColorStop(0.33, 'cyan')
    barGradient.addColorStop(0.5, 'green')
    barGradient.addColorStop(0.67, 'yellow')
    barGradient.addColorStop(0.83, 'orange')
    barGradient.addColorStop(1, 'red')
    barCtx.fillStyle = barGradient
    barCtx.fillRect(0, 0, barCtx.canvas.width, barCtx.canvas.height)
  })

  return (
    <div ref={el => container = el} class="box-border flex gap-2 p-2">
      <div class="relative flex flex-col gap-2">
        <canvas width={300} height={300}
          ref={el => panelCanvasRef = el}
          onClick={onClick} />
        <div class="w-full h-full text-center p-1" style={{
          color: isLightColor() ? "black" : "white",
          "background-color": selected()
        }}>
          <span>{selected()}</span>
        </div>
        <div class="absolute w-2 h-2 rounded-xl outline outline-[2px] outline-white border-zinc-500 border-[1px]
          -translate-x-1/2 -translate-y-1/2" style={{
          left: cursor()[0] + 'px',
          top: cursor()[1] + 'px'
        }}></div>
      </div>

      <div class="relative">
        <canvas ref={el => barCanvasRef = el} width={16} height={300} />
      </div>
    </div>
  )
}