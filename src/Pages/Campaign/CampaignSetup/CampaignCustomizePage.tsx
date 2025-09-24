/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import TemplateModalsave from "../../../components/Campaign/Modal/TemplateModalSave";

type Page = { id: string; name: string; blocks: TemplateBlock[] };
type TemplateLite = { id: string; title: string; thumbUrl?: string; pages?: Page[]; email?: any };

export default function CampaignCustomizePage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { template?: TemplateLite } };

  const chosen = state?.template;

  const [previewOpen, setPreviewOpen] = React.useState(false);
  const handlePreview = () => setPreviewOpen(true);
  const handleClosePreview = () => setPreviewOpen(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [viewport, setViewport] = React.useState<"desktop" | "mobile">("desktop");
  const [email, setEmail] = React.useState(() => ({
    fromName: "",
    fromEmail: "",
    replyTo: "",
    subject: chosen?.title ?? "",
    previewText: "",
    ...(chosen?.email || {}),
  }));

  const [pages, setPages] = React.useState<Page[]>(() => {
    if (chosen?.pages && chosen.pages.length > 0) {
      return chosen.pages.map((p) => ({ ...p, blocks: p.blocks ?? [] }));
    }
    return [{ id: uid(), name: "Page 1", blocks: [] }];
  });

  const [activePageId, setActivePageId] = React.useState(pages[0].id);
  const activePage = React.useMemo(() => pages.find((p) => p.id === activePageId)!, [pages, activePageId]);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selected = React.useMemo(() => activePage.blocks.find((b) => b.id === selectedId) ?? null, [activePage.blocks, selectedId]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const [overPageId, setOverPageId] = React.useState<string | null>(null);
  const [overIndex, setOverIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!activePage.blocks.some((b) => b.id === selectedId)) setSelectedId(null);
  }, [activePage.blocks, activePageId, pages, selectedId]);

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
      if (next.length === 0) return prev;
      if (activePageId === pageId) {
        setActivePageId(next[0].id);
        setSelectedId(null);
      }
      return next;
    });
  };

  const addBlockBottom = (kind: BlockKind) => {
    updatePageById(activePageId, (p) => ({ ...p, blocks: [...p.blocks, createBlock(kind)] }));
    setSelectedId(null);
  };

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
          const safeIndex = payload.fromPageId === targetPageId && payload.from < index ? index - 1 : index;
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
  }, [activePageId, selected]);

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

  React.useEffect(() => {
    if (!chosen) return;
    const hasContent = pages.some((pg) => pg.blocks && pg.blocks.length > 0);
    if (hasContent) return;

    const initialBlocks: TemplateBlock[] = [
      {
        id: uid(),
        kind: "image" as BlockKind,
        props: {
          ...(blockDefaults.image ? blockDefaults.image() : {}),
          src: chosen.thumbUrl || "/image/welcome.png",
          alt: chosen.title,
          align: "center",
        },
      },
      {
        id: uid(),
        kind: "heading" as BlockKind,
        props: {
          ...(blockDefaults.heading ? blockDefaults.heading() : {}),
          text: chosen.title,
          align: "center",
          level: 1,
        },
      },
      {
        id: uid(),
        kind: "text" as BlockKind,
        props: {
          ...(blockDefaults.text ? blockDefaults.text() : {}),
          html: "<p>Start editing this template…</p>",
          align: "center",
        },
      },
    ];

    const hydrated = [{ id: uid(), name: "Page 1", blocks: initialBlocks }];
    setPages(hydrated);
    setActivePageId(hydrated[0].id);
    setEmail((prev: any) => ({ ...prev, subject: chosen.title }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen?.id]);

  const handleSave = () => {
    const stored = localStorage.getItem("emailTemplates");
    const templates = stored ? JSON.parse(stored) : [];

    if (chosen?.id) {
      const idx = templates.findIndex((t: any) => t.id === chosen.id);
      if (idx >= 0) {
        templates[idx] = {
          ...templates[idx],
          title: email.subject || chosen.title || "Untitled Template",
          pages,
          email,
          updatedAt: new Date().toISOString(),
        };
      } else {
        templates.push({
          id: chosen.id,
          title: email.subject || chosen.title || "Untitled Template",
          pages,
          email,
          createdAt: new Date().toISOString(),
        });
      }
    } else {
      templates.push({
        id: uid(),
        title: email.subject || "Untitled Template",
        pages,
        email,
        createdAt: new Date().toISOString(),
      });
    }

    localStorage.setItem("emailTemplates", JSON.stringify(templates));
    setOpenModal(true);
  };

  const handleContinue = () => {
    const minimal = {
      id: chosen?.id ?? uid(),
      title: email.subject || chosen?.title || "Untitled Template",
      thumbUrl: chosen?.thumbUrl,
    };
    navigate("/campaign/review", { state: { template: minimal } });
  };

  const handleBack = () => navigate("/campaign/create-template");

  return (
    <div className="min-h-screen bg-zinc-100 -mt-6">
      <header className="sticky top-0 z-[70] bg-white border-b border-zinc-200 -mx-4 lg:-mx-6">
        <div className="px-4 lg:px-6">
          <BuilderToolbar
            mode="setup"
            title={chosen?.title ?? "Customized Template"}
            viewport={viewport}
            onViewport={setViewport}
            onPreview={handlePreview}
            onSave={handleSave}
            onContinue={handleContinue}
            onBack={handleBack}
            collapsed={false}
            setCollapsed={() => {}}
            leftWidth={0}
          />
        </div>
      </header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <main className="mx-auto max-w-[1200px] px-4 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {pages.map((p, idx) => (
                <div key={p.id}>
                  <Canvas
                    pageId={p.id}
                    pageName={p.name}
                    viewport={viewport}
                    blocks={p.blocks}
                    selectedId={activePageId === p.id ? selectedId : null}
                    setSelectedId={(id) => {
                      setActivePageId(p.id);
                      setSelectedId(id);
                    }}
                    renderBlock={renderBlock}
                    overIndex={overPageId === p.id ? overIndex : null}
                    onDeletePage={deletePage}
                  />
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

            <RightPanel
              email={email}
              setEmail={setEmail}
              onAddFromPalette={(k) => addBlockBottom(k)}
              selected={selected}
              onChangeSelected={(updater) =>
                updatePageById(activePageId, (p) => ({
                  ...p,
                  blocks: p.blocks.map((b) => (b.id === selected?.id ? { ...b, props: updater(b.props) } : b)),
                }))
              }
              onDeleteSelected={deleteSelected}
            />
          </div>
        </main>
      </DndContext>

      <PreviewOverlay open={previewOpen} onClose={handleClosePreview} pages={pages} />
      <TemplateModalsave
        open={openModal}
        onClose={() => setOpenModal(false)}
        onContinueEditing={() => setOpenModal(false)}
        onViewAll={() => {
          setOpenModal(false);
          navigate("/campaign/create-template");
        }}
      />
    </div>
  );
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function PreviewOverlay({
  open,
  onClose,
  pages,
}: {
  open: boolean;
  onClose: () => void;
  pages: Page[];
}) {
  if (!open) return null;

  const MOBILE_W = 475;
  const DESKTOP_W = 946;
  const PREVIEW_H = 825;

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="absolute inset-0 flex flex-col">
        <div className="shrink-0 flex items-center justify-between bg-zinc-800 px-4 py-2 text-white">
          <div className="flex items-center gap-10">
            <span className="text-lg font-extrabold tracking-wide">MOBILE</span>
            <span className="text-lg font-extrabold tracking-wide">DESKTOP</span>
          </div>
          <button onClick={onClose} className="rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/20">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-zinc-900/60">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 md:flex-row md:items-start md:justify-center">
            <div className="flex justify-center md:justify-start">
              <div className="rounded-md bg-white shadow" style={{ width: MOBILE_W, height: PREVIEW_H }}>
                <ReadonlyPageList pages={pages} />
              </div>
            </div>
            <div className="flex justify-center md:justify-start">
              <div className="rounded-md bg-white shadow" style={{ width: DESKTOP_W, height: PREVIEW_H }}>
                <ReadonlyPageList pages={pages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadonlyPageList({ pages }: { pages: Page[] }) {
  return (
    <div className="h-full w-full overflow-auto">
      {pages.map((p) => (
        <div key={p.id} className="p-8">
         {p.blocks.length > 0 && p.blocks.map((b) => <div key={b.id}>{renderBlock(b, { readonly: true })}</div>)}
        </div>
      ))}
    </div>
  );
}
