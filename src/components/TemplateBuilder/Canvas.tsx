import { useDroppable } from "@dnd-kit/core";
import type { TemplateBlock } from "./Blocks";

type Props = {
  viewport: "desktop" | "mobile";
  blocks: TemplateBlock[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  renderBlock: (b: TemplateBlock) => React.ReactNode;
};

export default function Canvas({ viewport, blocks, selectedId, setSelectedId, renderBlock }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas", data: { zone: "canvas" } });

  const pageWidth = viewport === "desktop" ? 560 : 380;

  return (
    <div className="p-2 md:p-4">
      {/* area abu-abu */}
      <div className="rounded-2xl bg-zinc-200/60 p-6 md:p-10">
        {/* kertas */}
        <div
          ref={setNodeRef}
          className="mx-auto rounded-[8px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
          style={{
            width: pageWidth,
            minHeight: 520,
            borderWidth: 2,
            borderStyle: "dotted",
            borderColor: isOver ? "#10B981" : "#D1D5DB",
          }}
        >
          <div className="p-8">
            {blocks.length === 0 ? (
              <div className="grid h-[420px] place-content-center text-center">
                <div>
                  <div className="mb-1 text-3xl leading-none text-zinc-500">+</div>
                  <div className="text-[14px] font-medium text-zinc-600">Drag elements here to build your template</div>
                  <div className="text-[12px] text-zinc-400">Start by dragging elements from the left panel</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {blocks.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    className={`rounded-lg border p-4 transition ${
                      selectedId === b.id ? "border-emerald-500 ring-1 ring-emerald-500" : "border-zinc-200"
                    }`}
                  >
                    {renderBlock(b)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* kartu Properties di tengah bawah */}
      <div className="mx-auto mt-10 rounded-[6px] bg-white shadow w-[560px] max-w-full">
        <div className="px-6 py-10 text-center">
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M0.75 1.88125V27.9531C0.75 28.8109 1.44609 29.5 2.29688 29.5C2.73984 29.5 3.16875 29.3102 3.46406 28.9727L9.27187 22.3281L13.357 30.5055C13.9125 31.6164 15.2625 32.0664 16.3734 31.5109C17.4844 30.9555 17.9344 29.6055 17.3789 28.4945L13.3922 20.5H21.6961C22.5539 20.5 23.25 19.8039 23.25 18.9461C23.25 18.5031 23.0602 18.0812 22.7297 17.7859L3.46406 0.664844C3.16172 0.397656 2.78203 0.25 2.38125 0.25C1.48125 0.25 0.75 0.98125 0.75 1.88125Z" fill="#6B7280"/>
          </svg>
          <div className="mt-3 text-[13px] font-medium text-zinc-600">Select an element</div>
          <div className="text-[12px] text-zinc-400">Click on any element to edit its properties</div>
        </div>
      </div>
    </div>
  );
}
