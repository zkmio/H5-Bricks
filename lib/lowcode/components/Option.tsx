import { Typography } from "@suid/material";
import { JSX } from "solid-js";
import { useGlobalConfig } from "../../mgrui/lib/components/wrapper/GlobalConfig";

export default function Option(props: {
  label: string;
  children: JSX.Element;
}) {
  const global = useGlobalConfig();
  return (
    <div class="flex items-center gap-2">
      <Typography>{global.translateInternal(props.label)}:</Typography>
      {props.children}
    </div>
  )
}