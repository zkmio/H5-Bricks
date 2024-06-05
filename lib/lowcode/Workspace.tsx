import { useTheme } from "@suid/material";
import { FaSolidBatteryHalf, FaSolidChevronLeft, FaSolidSignal, FaSolidWifi } from 'solid-icons/fa';
import { RiDesignFocusLine } from "solid-icons/ri";
import { FiMoreHorizontal } from 'solid-icons/fi';
import { onCleanup, onMount } from "solid-js";
import WorkspaceCanvas from "./WorkspaceCanvas";
import { names } from "../mgrui/lib/components/utils";

export default function Workspace() {
  const theme = useTheme();
  let screen: HTMLDivElement;

  const screenSize = [750, 1334];

  const resize = () => {
    const parent = screen.parentElement as HTMLDivElement;
    const box = parent.getBoundingClientRect();
    const boxW = box.width * 0.8;
    const boxH = box.height * 0.8;

    let w = screenSize[0], h = screenSize[1];
    if (w > boxW) {
      if (h > boxH) {
        if (w / boxW > h / boxH) {
          h /= w / boxW;
          w = boxW;
        } else {
          w /= h / boxH;
          h = boxH;
        }
      } else {
        h /= w / boxW;
        w = boxW;
      }
    } else {
      w /= h / boxH;
      h = boxH;
    }

    screen.style.width = w + "px";
    screen.style.height = h + "px";
  };


  onMount(() => {
    const parent = screen.parentElement as HTMLDivElement;

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(parent);
    onCleanup(() => {
      resizeObserver.disconnect();
    });

    resize();
  });

  return (
    <div class="shrink-1 w-full bg-zinc-300 overflow-hidden">
      <div ref={el => screen = el} class={names("relative flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl drop-shadow-xl")}
      style={{
        "background-color": theme.palette.background.paper,
      }}>
        <div class="absolute top-0 -translate-y-full text-zinc-500">
          <span>iPhone8 750x1334</span>
        </div>
        <PhoneStatusBar />
        <AppTitleBar />
        <WorkspaceCanvas />
      </div>
    </div>
  )
}

function PhoneStatusBar() {
  return (
    <div class="relative flex shrink-0 px-2 p-1 items-center">
      <div class="flex gap-1">
        <FaSolidSignal />
        <FaSolidWifi />
      </div>
      <div class="absolute w-full text-center">
        <span>9:41 AM</span>
      </div>
      <div class="flex ml-auto gap-1 items-center">
        <span class="text-sm">50%</span>
        <FaSolidBatteryHalf size={20} />
      </div>
    </div>
  )
}

function AppTitleBar() {
  return (
    <div class="flex shrink-0 items-center p-2">
      <div>
        <FaSolidChevronLeft size={20} />
      </div>
      <div class="flex ml-auto rounded-2xl border border-zinc-200 px-2 py-1 gap-2">
        <FiMoreHorizontal size={20} />
        <div class="w-[1px] bg-zinc-200"></div>
        <RiDesignFocusLine size={20} />
      </div>
    </div>
  )
}
