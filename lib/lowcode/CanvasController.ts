import { onMount, onCleanup } from "solid-js";
import { usePageDesign } from "./PageDesign";
import Events from "./Events";
import { bucket, stampedBucket } from "../mgrui/lib/components/utils";

export default class CanvasController {

  readonly core = usePageDesign()
  readonly mouseIn = bucket(false);
  private idCounter = 0;
  container: HTMLDivElement;
  private grid: (Pos | undefined)[][];
  readonly config = stampedBucket({
    paddingX: 0,
    paddingY: 0
  });
  readonly components = stampedBucket(new Map<number, ComponentInstance>());

  constructor() {

    onMount(() => {
      this.core.on(Events.AddComponentToWorkspace, evt => {
        const id = this.idCounter++;
        const component = {...evt.detail.component} as ComponentInstance;
        const {w, h} = component.elementInitSize;
        const box = this.findBox(w, h);
        if (box) {
          this.grid[box[1]][box[0]] = [w, h];
          component.box = {
            x: box[0],
            y: box[1],
            w, h,
          };
          component.props = stampedBucket({})
          this.components(data => data.set(id, component));
        } else {
          console.warn("no space to place component")
        }
      });

      const resizeObserver = new ResizeObserver(this.resize.bind(this))
      resizeObserver.observe(this.container);
      onCleanup(() => {
        resizeObserver.disconnect();
      });

      this.resize();
    })
  }

  onMouseEnter() {
    this.mouseIn(true);
  }

  onMouseLeave() {
    this.mouseIn(false)
  }

  resize() {
    const box = this.container.getBoundingClientRect();
    const paddingX = (box.width % 20) / 2;
    const paddingY = (box.height % 20) / 2;
    this.grid = new Array(Math.floor(box.height / 20));
    const cols = Math.floor(box.width / 20);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(cols);
    }

    this.config(data => {
      data.paddingX = paddingX;
      data.paddingY = paddingY;
    })
  };

  hasSpaceIn(x: number, y: number, w: number, h: number) {
    for (let i = y; i < this.grid.length - h; i++) {
      const row = this.grid[i];
      for (let j = x; j < row.length - w; j++) {
        if (row[j]) {
          return false;
        }
      }
    }
    return true;
  }

  findBox(w: number, h: number): Pos | undefined {
    let x = 0, y = 0;
    for (let r = 0; r < this.grid.length - h; r++) {
      const row = this.grid[r];
      y = r;
      for (let c = 0; c < row.length - w;) {
        if (c - x == w) {
          if (this.hasSpaceIn(x, y + 1, w, h - 1)) {
            return [x, y];
          }
        }
        const used = row[c];
        if (used) {
          c += used[0];
          x = c;
        } else {
          c++;
        }
      }
    }
    return;
  }

  onSelectComponent(instance: ComponentInstance) {
    this.core.dispatch(new CustomEvent(Events.SelectComponentInstance, { detail: instance }))
  }
}