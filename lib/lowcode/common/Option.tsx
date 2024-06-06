import { Typography } from "@suid/material";
import { JSX } from "solid-js";
import T from "../../mgrui/lib/components/T";

export default function Option(props: {
  label: string;
  children: JSX.Element;
}) {
  return (
    <div class="flex items-center gap-2">
      <Typography><T>{props.label}</T>:</Typography>
      {props.children}
    </div>
  )
}