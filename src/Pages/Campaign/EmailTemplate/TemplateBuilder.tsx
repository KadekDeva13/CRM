/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  closestCenter,
} from "@dnd-kit/core";

import BuilderToolbar from "../../../components/TemplateBuilder/BuilderToolbar";
import RightPanel from "../../../components/TemplateBuilder/RightPanel";
import Canvas from "../../../components/TemplateBuilder/Canvas";
import {
  blockDefaults,
  renderBlock,
  type TemplateBlock,
  type BlockKind,
} from "../../../components/TemplateBuilder/Blocks";

type Page = { id: string; name: string; blocks: TemplateBlock[] };

export default function TemplateBuilderPage() {
  const [viewport, setViewport] = React.useState<"desktop" | "mobile">("desktop");
  const [email, setEmail] = React.useState({
    fromName: "",
    fromEmail: "",
    replyTo: "",
    subject: "",
    previewText: "",
  });

  // ==== multi-page ====
  const [pages, setPages] = React.useState<Page[]>(() => [
    { id: uid(), name: "Page 1", blocks: [] },
  ]);
  const [activePageId, setActivePageId] = React.useState(pages[0].id);
  const activePage = React.useMemo(
    () => pages.find((p) => p.id === activePageId)!,
    [pages, activePageId]
  );

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selected = React.useMemo(
    () => activePage.blocks.find((b) => b.id === selectedId) ?? null,
    [activePage.blocks, selectedId]
  );

  // DnD
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const [overPageId, setOverPageId] = React.useState<string | null>(null);
  const [overIndex, setOverIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!activePage.blocks.some((b) => b.id === selectedId)) setSelectedId(null);
  }, [activePage.blocks, activePageId, pages, selectedId]);

  // utils
  const createBlock = (kind: BlockKind): TemplateBlock => ({
    id: uid(),
    kind,
    props: blockDefaults[kind](),
  });

  const updatePageById = (pageId: string, updater: (prev: Page) => Page) => {
    setPages((prev) => prev.map((p) => (p.id === pageId ? updater(p) : p)));
  };

  const addPageAfter = (afterId: string) => {
    setPages((prev) => {
      const idx = prev.findIndex((p) => p.id === afterId);
      const id = uid();
      const next = [...prev];
      next.splice(idx + 1, 0, { id, name: `Page ${prev.length + 1}`, blocks: [] });
      return next;
    });
    setSelectedId(null);
  };

  const deletePage = (pageId: string) => {
    setPages((prev) => {
      const next = prev.filter((p) => p.id !== pageId);
      if (next.length === 0) return prev; // cegah kosong total
      if (activePageId === pageId) {
        setActivePageId(next[0].id);
        setSelectedId(null);
      }
      return next;
    });
  };

  // klik palette → append ke active page
  const addBlockBottom = (kind: BlockKind) => {
    updatePageById(activePageId, (p) => ({ ...p, blocks: [...p.blocks, createBlock(kind)] }));
    setSelectedId(null);
  };

  // insert/move ke index tertentu di target page
  const insertAt = (
    targetPageId: string,
    payload: { type: "new"; kind: BlockKind } | { type: "move"; from: number; fromPageId: string },
    index: number
  ) => {
    setPages((prev) => {
      let arr = [...prev];
      let moving: TemplateBlock | null = null;

      if (payload.type === "move") {
        arr = arr.map((p) => {
          if (p.id !== payload.fromPageId) return p;
          const copy = { ...p, blocks: [...p.blocks] };
          [moving] = copy.blocks.splice(payload.from, 1);
          return copy;
        });
      }

      arr = arr.map((p) => {
        if (p.id !== targetPageId) return p;
        const blocks = [...p.blocks];
        if (payload.type === "new") {
          blocks.splice(index, 0, createBlock(payload.kind));
        } else if (moving) {
          const safeIndex =
            payload.fromPageId === targetPageId && payload.from < index ? index - 1 : index;
          blocks.splice(safeIndex, 0, moving);
        }
        return { ...p, blocks };
      });

      return arr;
    });

    setActivePageId(targetPageId);
  };

  const deleteSelected = React.useCallback(() => {
    if (!selected) return;
    updatePageById(activePageId, (p) => ({ ...p, blocks: p.blocks.filter((b) => b.id !== selected.id) }));
    setSelectedId(null);
  });

  // keyboard delete (kecuali sedang mengetik)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selected) return;
      const tag = (e.target as HTMLElement)?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable;
      if (isTyping) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteSelected();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteSelected, selected]);

  // DnD handlers
  const onDragOver = (e: DragOverEvent) => {
    const id = e.over?.id as string | undefined;
    if (id && id.includes("::hint-")) {
      const [pid, hint] = id.split("::");
      setOverPageId(pid);
      setOverIndex(Number(hint.replace("hint-", "")));
    } else {
      setOverPageId(null);
      setOverIndex(null);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    let targetPageId = activePageId;
    let index = 0;
    const overId = String(over.id);

    if (overId.includes("::hint-")) {
      const [pid, hint] = overId.split("::");
      targetPageId = pid;
      index = Number(hint.replace("hint-", ""));
    } else {
      targetPageId = activePageId;
      index = pages.find((p) => p.id === activePageId)?.blocks.length ?? 0;
    }

    const data = active.data.current as any;
    if (data?.type === "new" && data?.kind) insertAt(targetPageId, { type: "new", kind: data.kind }, index);
    if (data?.type === "move" && Number.isFinite(data?.from) && data?.pageId) {
      insertAt(targetPageId, { type: "move", from: data.from, fromPageId: data.pageId }, index);
    }

    setOverPageId(null);
    setOverIndex(null);
  };

  // Toolbar handlers (dummy)
  const handlePreview = () => alert("Preview");
  const handleSave = () => { console.log("Save", { pages, email }); alert("Saved!"); };
  const handleContinue = () => alert("Continue");
  const handleBack = () => { if (history.length > 1) history.back(); };

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-4">
          <BuilderToolbar
            title="Template Builder by Quirez"
            viewport={viewport}
            onViewport={setViewport}
            onPreview={handlePreview}
            onSave={handleSave}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <main className="mx-auto max-w-[1200px] px-4 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_320px]">
            {/* LEFT: semua canvas vertikal */}
            <div className="space-y-6">
              {pages.map((p, idx) => (
                <div key={p.id}>
                  <Canvas
                    pageId={p.id}
                    pageName={p.name}
                    viewport={viewport}               // ⬅️ Canvas yang atur ukuran fixed berdasar ini
                    blocks={p.blocks}
                    selectedId={activePageId === p.id ? selectedId : null}
                    setSelectedId={(id) => { setActivePageId(p.id); setSelectedId(id); }}
                    renderBlock={renderBlock}
                    overIndex={overPageId === p.id ? overIndex : null}
                    onDeletePage={deletePage}
                  />
                  {/* Tombol + Add Page Below SELALU di luar Canvas */}
                  <div className="mt-3 flex justify-center">
                    <button
                      type="button"
                      onClick={() => addPageAfter(p.id)}
                      className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      + Add Page Below
                    </button>
                  </div>

                  {idx < pages.length - 1 && <div className="my-4 border-t border-dashed border-zinc-300" />}
                </div>
              ))}
            </div>

            {/* RIGHT: palette + properties */}
            <RightPanel
              email={email}
              setEmail={setEmail}
              onAddFromPalette={(k) => addBlockBottom(k)}
              selected={selected}
              onChangeSelected={(updater) =>
                updatePageById(activePageId, (p) => ({
                  ...p,
                  blocks: p.blocks.map((b) =>
                    b.id === selected?.id ? { ...b, props: updater(b.props) } : b
                  ),
                }))
              }
              onDeleteSelected={deleteSelected}
            />
          </div>
        </main>
      </DndContext>
    </div>
  );
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}
