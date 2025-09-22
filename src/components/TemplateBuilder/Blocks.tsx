/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

export type BlockKind =
  | "columns"
  | "button"
  | "divider"
  | "heading"
  | "text"
  | "image"
  | "video"
  | "social"
  | "menu"
  | "html"
  | "timer";

export type TemplateBlock = {
  id: string;
  kind: BlockKind;
  props: any;
};

export const prettyKind: Record<BlockKind, string> = {
  columns: "Columns",
  button: "Button",
  divider: "Divider",
  heading: "Heading",
  text: "Text",
  image: "Image",
  video: "Video",
  social: "Social",
  menu: "Menu",
  html: "</> HTML",
  timer: "Timer",
};

export const blockDefaults: Record<BlockKind, () => any> = {
  columns: () => ({ rows: 1, cols: 2, gap: 16 }),
  button: () => ({ label: "Click me", href: "#" }),
  divider: () => ({ thickness: 1, color: "#E5E7EB" }),
  heading: () => ({ text: "Title", size: 24, align: "left" }),
  text: () => ({ text: "Lorem ipsum dolor sit amet", align: "left" as const }),
  image: () => ({ src: "https://placehold.co/600x200", alt: "image", width: 600 }),
  video: () => ({ url: "https://example.com/video.mp4" }),
  social: () => ({ links: [] }),
  menu: () => ({ items: ["Home", "About"] }),
  html: () => ({ html: "<b>Hello</b>" }),
  timer: () => ({ until: "2025-12-31" }),
};

export function renderBlock(b: TemplateBlock) {
  switch (b.kind) {
    case "heading":
      return (
        <h2 style={{ fontSize: b.props.size ?? 24, textAlign: b.props.align ?? "left" }} className="font-semibold">
          {b.props.text}
        </h2>
      );
    case "text":
      return (
        <p style={{ textAlign: b.props.align ?? "left" }} className="text-sm leading-6 text-zinc-700">
          {b.props.text}
        </p>
      );
    case "image":
      return <img src={b.props.src} alt={b.props.alt} style={{ width: b.props.width || 600 }} className="block" />;
    case "button":
      return (
        <a href={b.props.href} className="inline-block rounded bg-emerald-600 px-4 py-2 text-white text-sm">
          {b.props.label}
        </a>
      );
    case "divider":
      return <hr style={{ height: b.props.thickness ?? 1, backgroundColor: b.props.color ?? "#E5E7EB" }} className="border-0" />;
    case "columns": {
      const rows = clamp(b.props.rows ?? 1, 1, 6);
      const cols = clamp(b.props.cols ?? 2, 1, 6);
      const gap = clamp(b.props.gap ?? 16, 0, 48);
      return (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(40px,auto))`,
            gap,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => (
            <div key={i} className="rounded border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500">
              Cell {Math.floor(i / cols) + 1},{(i % cols) + 1}
            </div>
          ))}
        </div>
      );
    }
    default:
      return (
        <div className="rounded border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
          {prettyKind[b.kind]} (placeholder)
        </div>
      );
  }
}

function clamp(v: number, min: number, max: number) {
  v = Number.isFinite(v) ? Math.round(v) : min;
  return Math.max(min, Math.min(max, v));
}
