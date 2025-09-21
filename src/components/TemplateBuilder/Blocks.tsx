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
  props: Record<string, any>;
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
  columns: () => ({ columns: 2 }),
  button: () => ({ label: "Click me", href: "#" }),
  divider: () => ({ thickness: 1, color: "#E5E7EB" }),
  heading: () => ({ text: "Title", size: 20 }),
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
      return <h2 style={{ fontSize: b.props.size ?? 20 }} className="font-semibold">{b.props.text}</h2>;
    case "text":
      return <p className={`text-sm leading-6 text-zinc-700 text-${b.props.align}`}>{b.props.text}</p>;
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
    case "columns":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">Column 1</div>
          <div className="rounded border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">Column 2</div>
        </div>
      );
    default:
      return <div className="rounded border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">{prettyKind[b.kind]} (placeholder)</div>;
  }
}
