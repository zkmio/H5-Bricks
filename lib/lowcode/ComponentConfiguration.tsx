import { Dynamic } from "solid-js/web";
import PageSpacing from "./components/PageSpacing";

export default function ComponentConfiguration() {
  return (
    <div class="shrink-0 w-[30%] p-4">
      <Dynamic component={PageSpacing.attributes} />
    </div>
  )
}