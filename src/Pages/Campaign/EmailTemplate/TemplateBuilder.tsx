/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import BuilderToolbar from "../../../components/TemplateBuilder/BuilderToolbar";
import RightPanel from "../../../components/TemplateBuilder/RightPanel";
import Canvas from "../../../components/TemplateBuilder/Canvas";
import { blockDefaults, renderBlock, type TemplateBlock, type BlockKind } from "../../../components/TemplateBuilder/Blocks";

export default function TemplateBuilderPage() {
  const [viewport, setViewport] = React.useState<"desktop" | "mobile">("desktop");
  const [email, setEmail] = React.useState({
    fromName: "",
    fromEmail: "",
    replyTo: "",
    subject: "",
    previewText: "",
  });
  const [blocks, setBlocks] = React.useState<TemplateBlock[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const makeId = () => Math.random().toString(36).slice(2);
  const createBlock = (kind: BlockKind): TemplateBlock => ({
    id: makeId(),
    kind,
    props: blockDefaults[kind](),
  });

  const addBlock = (kind: BlockKind) => {
    const node = createBlock(kind);
    setBlocks((p) => [...p, node]);
    setSelectedId(node.id);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const kind = (active?.data?.current as any)?.kind as BlockKind | undefined;
    if (kind && over?.id === "canvas") addBlock(kind);
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* HEADER STICKY */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
        <div className="mx-auto max-w-[1200px] px-4">
          <BuilderToolbar
            title="Template Builder by Quirez"
            viewport={viewport}
            onViewport={setViewport}
            onPreview={() => {}}
            onSave={() => {}}
            onContinue={() => {}}
            onBack={() => {
              if (typeof window !== "undefined") window.history.back();
            }}
          />
        </div>
      </header>

      {/* KONTEN */}
      <main className="mx-auto max-w-[1200px] px-4 py-5">
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_320px]">
            <Canvas
              viewport={viewport}
              blocks={blocks}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              renderBlock={renderBlock}
            />
            <RightPanel
              email={email}
              setEmail={setEmail}
              onAddFromPalette={(k) => addBlock(k)} // klik masih bisa
            />
          </div>
        </DndContext>
      </main>
    </div>
  );
}
