
import { Dynamic } from "solid-js/web";
import PageSpacing from "./component/PageSpacing";
import { usePageDesign } from "./PageDesign";
import { Typography } from "@suid/material";
import Events from "./Events";

export default function ComponentList() {
  return (
    <div class="grid grid-cols-2 shrink-0 w-[300px] p-4 gap-4">
      <ComponentCell entry={PageSpacing} />
    </div>
  )
}

export function ComponentCell(props: {
  entry: PageDesignComponent;
}) {
  const core = usePageDesign();
  return (
    <div class="relative flex flex-col items-center justify-center aspect-square hover:bg-sky-200 active:bg-sky-100 rounded-md transition-all"
      onClick={() => {
        core.dispatch(new CustomEvent(Events.AddComponentToWorkspace, { detail: { component: props.entry }}));
      }}>
      <Dynamic component={props.entry.icon} size={30} />
      <Typography sx={{ p: 1 }}>{props.entry.label}</Typography>
    </div>
  )
}