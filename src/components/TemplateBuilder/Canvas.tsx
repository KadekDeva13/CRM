// src/components/TemplateBuilder/Canvas.tsx
import * as React from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import type { TemplateBlock } from "./Blocks";

type CanvasProps = {
  pageId: string;
  pageName?: string;
  viewport: "desktop" | "mobile";
  blocks: TemplateBlock[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  renderBlock: (b: TemplateBlock) => React.ReactNode;
  overIndex: number | null;
  onDeletePage?: (pageId: string) => void;
};

export default function Canvas({
  pageId,
  pageName,
  viewport,
  blocks,
  selectedId,
  setSelectedId,
  renderBlock,
  overIndex,
  onDeletePage,
}: CanvasProps) {
  // fixed size sesuai request
  const pageWidth = viewport === "desktop" ? 672 : 588;
  const pageHeight = viewport === "desktop" ? 384 : 776;

  const { setNodeRef: setEmptyRef } = useDroppable({ id: `${pageId}::empty` });

  return (
    <div className="p-2 md:p-4">
      <div className="rounded-2xl bg-zinc-200/60 p-6 md:p-10">
        <div
          className="mx-auto overflow-hidden rounded-[8px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
          style={{ width: pageWidth, height: pageHeight, border: "2px dotted #D1D5DB" }}
        >
          {/* Header opsional (pakai ternary agar parser aman) */}
          {(pageName || onDeletePage) ? (
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2">
              <div className="truncate text-[13px] font-semibold text-zinc-700">
                {pageName ?? "Untitled Page"}
              </div>
              {onDeletePage ? (
                <button
                  type="button"
                  onClick={() => onDeletePage(pageId)}
                  className="rounded-md px-2 py-1 text-[12px] text-red-600 hover:bg-red-50"
                  title="Delete this page"
                >
                  Delete
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Konten: scroll di dalam canvas */}
          <div className="h-[calc(100%-40px)] overflow-auto p-8">
            {blocks.length === 0 ? (
              <div className="grid h-full place-content-center text-center">
                <div className="mb-2 text-[14px] font-medium text-zinc-600">
                  Drag elemen dari kanan ke sini
                </div>
                <div ref={setEmptyRef} className="h-10 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                <DroppableHint id={`${pageId}::hint-0`} active={overIndex === 0} />
                {blocks.map((b, i) => (
                  <React.Fragment key={b.id}>
                    <DraggableBlock
                      pageId={pageId}
                      b={b}
                      selected={selectedId === b.id}
                      onClick={() => setSelectedId(b.id)}
                      renderBlock={renderBlock}
                      index={i}
                    />
                    <DroppableHint id={`${pageId}::hint-${i + 1}`} active={overIndex === i + 1} />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DroppableHint({ id, active }: { id: string; active: boolean }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef}>
      <div
        className={`my-2 h-2 rounded transition-colors ${
          active ? "bg-emerald-400/70" : "bg-transparent"
        }`}
        style={{ outline: active ? "2px solid #34d399" : "none" }}
      />
    </div>
  );
}

function DraggableBlock({
  pageId,
  b,
  selected,
  onClick,
  renderBlock,
  index,
}: {
  pageId: string;
  b: TemplateBlock;
  selected: boolean;
  onClick: () => void;
  renderBlock: (b: TemplateBlock) => React.ReactNode;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-${b.id}`,
    data: { type: "move", from: index, pageId },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`cursor-grab rounded-lg border p-4 transition active:cursor-grabbing ${
        selected ? "border-emerald-500 ring-1 ring-emerald-500" : "border-zinc-200"
      } ${isDragging ? "opacity-60" : ""}`}
    >
      {renderBlock(b)}
    </div>
  );
}
