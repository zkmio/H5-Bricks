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
  height?: number;
  pagePadding?: number;
}

function PageSpacing(props: PageSpacingProps) {
  return (
    <div class='flex items-center w-full h-full'>
      <Show when={props.line}>
        <div class={names('w-full h-[1px]')} style={{
          "background-color": props.lineColor || "black"
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
          line: global.translate('pageDesign.component.pageSpacing.mode.line')
        }} onSelectItem={mode => {
          componentProps(x => x.line = mode === "line" ? true : false)
        }} />
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