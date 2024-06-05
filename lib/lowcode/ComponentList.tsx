
import { Dynamic } from "solid-js/web";
import PageSpacing from "./components/PageSpacing";
import { PageDesignComponent, usePageDesign } from "./PageDesign";
import { Typography } from "@suid/material";
import PageDesignEvents from "./PageDesignEvents";

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
  const pageDesign = usePageDesign();
  return (
    <div class="relative flex flex-col items-center justify-center aspect-square hover:bg-sky-200 active:bg-sky-100 rounded-md transition-all"
      onClick={() => {
        pageDesign.dispatch(new CustomEvent(PageDesignEvents.AddComponentToWorkspace, { detail: { component: props.entry }}));
      }}>
      <Dynamic component={props.entry.icon} size={30} />
      <Typography sx={{ p: 1 }}>{props.entry.label}</Typography>
    </div>
  )
}