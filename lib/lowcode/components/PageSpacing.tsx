import { TbSpacingVertical } from 'solid-icons/tb';
import Option from './Option';
import { PageDesignComponent } from '../PageDesign';
import MSelect from '../../mgrui/lib/components/mui/MSelect';

interface PageSpacingProps {
  line?: boolean;
  lineStyle?: "solid" | "dotted";
  lineColor?: string;
  height?: number;
  pagePadding?: number;
}

function PageSpacing(props: PageSpacingProps) {
  return (
    <br class='w-full h-4' />
  )
}

function PageSpacingAttributes(props: {
  bucket: StampedBucket<PageSpacingProps>
}) {
  return (
    <>
      <Option label="pageDesign.component.pageSpacing.mode">
        <MSelect items={{
          empty: "Empty",
          line: "Line"
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