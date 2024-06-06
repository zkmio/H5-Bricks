import { ValidComponent } from "solid-js"

export { }

declare global {

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
  
  interface ComponentInstance extends PageDesignComponent {
    box: {
      x: number;
      y: number;
      w: number;
      h: number;
    },
    props?: StampedBucket<any>
  }
}