import { TbSpacingVertical } from 'solid-icons/tb';
import Option from './Option';
import MSelect from '../../mgrui/lib/components/mui/MSelect';
import { useGlobalConfig } from '../../mgrui/lib/components/wrapper/GlobalConfig';
import { Show } from 'solid-js';
import { names } from '../../mgrui/lib/components/utils';

interface PageSpacingProps {
  line?: boolean;
  lineStyle?: "solid" | "dotted";
  lineColor?: string;
}

function PageSpacing(props: PageSpacingProps) {
  return (
    <div class='flex items-center w-full h-full'>
      <Show when={props.line}>
        <div class={names('border-box w-full h-[1px]')} style={{
          "border-top-width": "1px",
          "border-style": props.lineStyle === "solid" ? "solid" : "dotted",
          "border-color": props.lineColor || "black"
        }}></div>
      </Show>
    </div>
  )
}

function PageSpacingAttributes(props: {
  componentProps: StampedBucket<PageSpacingProps>
}) {
  const global = useGlobalConfig()
  const { componentProps } = props
  return (
    <>
      <Option label="pageDesign.component.pageSpacing.mode.label">
        <MSelect items={{
          empty: global.translate('pageDesign.component.pageSpacing.mode.empty'),
          line: global.translate('pageDesign.component.pageSpacing.mode.line'),
          dotted: global.translate('pageDesign.component.pageSpacing.mode.dotted'),
        }} onSelectItem={mode => {
          componentProps(x => {
            switch (mode) {
              case 'empty':
                x.line = false
                break
              case 'line':
                x.line = true
                x.lineStyle = "solid"
                break
              case 'dotted':
                x.line = true
                x.lineStyle = "dotted"
                break
            }
          })
        }} />
      </Option>
      <Option label='pageDesign.component.pageSpacing.lineColor'>
        1
      </Option>
    </>
  )
}

export default ({
  icon: TbSpacingVertical,
  label: "Page Spacing",
  element: PageSpacing,
  elementInitSize: {
    w: 4,
    h: 1
  },
  attributes: PageSpacingAttributes,
} as PageDesignComponent)