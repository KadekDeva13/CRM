/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
import { prettyKind, type BlockKind, type TemplateBlock } from "./Blocks";

export function getIcon(kind: BlockKind): React.ReactNode {
  switch (kind) {
    case "columns":
      return (
        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 2.625C0.75 1.38398 1.75898 0.375 3 0.375H16.5C17.741 0.375 18.75 1.38398 18.75 2.625V13.875C18.75 15.116 17.741 16.125 16.5 16.125H3C1.75898 16.125 0.75 15.116 0.75 13.875V2.625ZM3 4.875V13.875H8.625V4.875H3ZM16.5 4.875H10.875V13.875H16.5V4.875Z" fill="#4B5563"/>
        </svg>
      );
    case "button":
      return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.375 2.625C0.375 1.38398 1.38398 0.375 2.625 0.375H13.875C15.116 0.375 16.125 1.38398 16.125 2.625V13.875C16.125 15.116 15.116 16.125 13.875 16.125H2.625C1.38398 16.125 0.375 15.116 0.375 13.875V2.625Z" fill="#4B5563"/>
        </svg>
      );
    case "divider":
      return (
        <svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0625 1.25C15.0625 1.87227 14.5598 2.375 13.9375 2.375H1.5625C0.940234 2.375 0.4375 1.87227 0.4375 1.25C0.4375 0.627734 0.940234 0.125 1.5625 0.125H13.9375C14.5598 0.125 15.0625 0.627734 15.0625 1.25Z" fill="#4B5563"/>
        </svg>
      );
    case "heading":
      return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.375 1.5C0.375 0.877734 0.877734 0.375 1.5 0.375H3.1875H4.875C5.49727 0.375 6 0.877734 6 1.5C6 2.12227 5.49727 2.625 4.875 2.625H4.3125V6.5625H12.1875V2.625H11.625C11.0027 2.625 10.5 2.12227 10.5 1.5C10.5 0.877734 11.0027 0.375 11.625 0.375H13.3125H15C15.6223 0.375 16.125 0.877734 16.125 1.5C16.125 2.12227 15.6223 2.625 15 2.625H14.4375V7.6875V13.875H15C15.6223 13.875 16.125 14.3777 16.125 15C16.125 15.6223 15.6223 16.125 15 16.125H13.3125H11.625C11.0027 16.125 10.5 15.6223 10.5 15C10.5 14.3777 11.0027 13.875 11.625 13.875H12.1875V8.8125H4.3125V13.875H4.875C5.49727 13.875 6 14.3777 6 15C6 15.6223 5.49727 16.125 4.875 16.125H3.1875H1.5C0.877734 16.125 0.375 15.6223 0.375 15C0.375 14.3777 0.877734 13.875 1.5 13.875H2.0625V7.6875V2.625H1.5C0.877734 2.625 0.375 2.12227 0.375 1.5Z" fill="#4B5563"/>
        </svg>
      );
    case "text":
      return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.80469 1.10625C9.63945 0.666797 9.21758 0.375 8.75 0.375C8.28242 0.375 7.86055 0.666797 7.69531 1.10625L2.90703 13.875H2C1.37773 13.875 0.875 14.3777 0.875 15C0.875 15.6223 1.37773 16.125 2 16.125H5.375C5.99727 16.125 6.5 15.6223 6.5 15C6.5 14.3777 5.99727 13.875 5.375 13.875H5.31172L5.94453 12.1875H11.5555L12.1883 13.875H12.125C11.5027 13.875 11 14.3777 11 15C11 15.6223 11.5027 16.125 12.125 16.125H15.5C16.1223 16.125 16.625 15.6223 16.625 15C16.625 14.3777 16.1223 13.875 15.5 13.875H14.593L9.80469 1.10625ZM10.7117 9.9375H6.78828L8.75 4.70273L10.7117 9.9375Z" fill="#4B5563"/>
        </svg>
      );
    case "image":
      return (
        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.25 2.625C0.25 1.38398 1.25898 0.375 2.5 0.375H16C17.241 0.375 18.25 1.38398 18.25 2.625V13.875C18.25 15.116 17.241 16.125 16 16.125H2.5C1.25898 16.125 0.25 15.116 0.25 13.875V2.625ZM11.6336 6.36914C11.4754 6.13711 11.2152 6 10.9375 6C10.6598 6 10.3961 6.13711 10.2414 6.36914L7.18281 10.8551L6.25117 9.69141C6.08945 9.49102 5.84688 9.375 5.59375 9.375C5.34062 9.375 5.09453 9.49102 4.93633 9.69141L2.68633 12.5039C2.48242 12.757 2.44375 13.1051 2.58438 13.3969C2.725 13.6887 3.02031 13.875 3.34375 13.875H15.1562C15.4691 13.875 15.7574 13.7027 15.9016 13.425C16.0457 13.1473 16.0281 12.8133 15.8523 12.5566L11.6336 6.36914ZM4.1875 6C4.63505 6 5.06428 5.82221 5.38074 5.50574C5.69721 5.18928 5.875 4.76005 5.875 4.3125C5.875 3.86495 5.69721 3.43572 5.38074 3.11926C5.06428 2.80279 4.63505 2.625 4.1875 2.625C3.73995 2.625 3.31072 2.80279 2.99426 3.11926C2.67779 3.43572 2.5 3.86495 2.5 4.3125C2.5 4.76005 2.67779 5.18928 2.99426 5.50574C3.31072 5.82221 3.73995 6 4.1875 6Z" fill="#4B5563"/>
        </svg>
      );
    case "video":
      return (
        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.56641 0.621168C2.04609 0.301246 1.39219 0.290699 0.861328 0.589527C0.330469 0.888356 0 1.45086 0 2.06257V14.4376C0 15.0493 0.330469 15.6118 0.861328 15.9106C1.39219 16.2094 2.04609 16.1954 2.56641 15.879L12.6914 9.69148C13.1941 9.38562 13.5 8.8407 13.5 8.25007C13.5 7.65945 13.1941 7.11804 12.6914 6.80867L2.56641 0.621168Z" fill="#4B5563"/>
        </svg>
      );
    case "social":
      return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.75 7.125C14.6133 7.125 16.125 5.61328 16.125 3.75C16.125 1.88672 14.6133 0.375 12.75 0.375C10.8867 0.375 9.375 1.88672 9.375 3.75C9.375 3.89062 9.38203 4.03125 9.39961 4.16836L6.09141 5.8207C5.48672 5.23359 4.66055 4.875 3.75 4.875C1.88672 4.875 0.375 6.38672 0.375 8.25C0.375 10.1133 1.88672 11.625 3.75 11.625C4.66055 11.625 5.48672 11.2664 6.09141 10.6793L9.39961 12.3316C9.38203 12.4688 9.375 12.6059 9.375 12.75C9.375 14.6133 10.8867 16.125 12.75 16.125C14.6133 16.125 16.125 14.6133 16.125 12.75C16.125 10.8867 14.6133 9.375 12.75 9.375C11.8395 9.375 11.0133 9.73359 10.4086 10.3207L7.10039 8.66836C7.11797 8.53125 7.125 8.39414 7.125 8.25C7.125 8.10586 7.11797 7.96875 7.10039 7.83164L10.4086 6.1793C11.0133 6.76641 11.8395 7.125 12.75 7.125Z" fill="#4B5563"/>
        </svg>
      );
    case "menu":
      return (
        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.875 1.625C0.875 1.00273 1.37773 0.5 2 0.5H15.5C16.1223 0.5 16.625 1.00273 16.625 1.625C16.625 2.24727 16.1223 2.75 15.5 2.75H2C1.37773 2.75 0.875 2.24727 0.875 1.625ZM0.875 7.25C0.875 6.62773 1.37773 6.125 2 6.125H15.5C16.1223 6.125 16.625 6.62773 16.625 7.25C16.625 7.87227 16.1223 8.375 15.5 8.375H2C1.37773 8.375 0.875 7.87227 0.875 7.25ZM16.625 12.875C16.625 13.4973 16.1223 14 15.5 14H2C1.37773 14 0.875 13.4973 0.875 12.875C0.875 12.2527 1.37773 11.75 2 11.75H15.5C16.1223 11.75 16.625 12.2527 16.625 12.875Z" fill="#4B5563"/>
        </svg>
      );
    case "html":
      return (
        <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.8085 0.292137C13.2108 0.119872 12.5886 0.467919 12.4163 1.06557L7.91631 16.8156C7.74404 17.4132 8.09209 18.0355 8.68975 18.2078C9.2874 18.38 9.90967 18.032 10.0819 17.4343L14.5819 1.68432C14.7542 1.08667 14.4062 0.464403 13.8085 0.292137ZM16.6421 4.5144C16.2026 4.95386 16.2026 5.66753 16.6421 6.10698L19.7815 9.24995L16.6386 12.3929C16.1991 12.8324 16.1991 13.546 16.6386 13.9855C17.078 14.425 17.7917 14.425 18.2312 13.9855L22.1687 10.048C22.6081 9.60854 22.6081 8.89487 22.1687 8.45542L18.2312 4.51792C17.7917 4.07847 17.078 4.07847 16.6386 4.51792L16.6421 4.5144ZM5.85967 4.5144C5.42022 4.07495 4.70654 4.07495 4.26709 4.5144L0.32959 8.4519C-0.109863 8.89136 -0.109863 9.60503 0.32959 10.0445L4.26709 13.982C4.70654 14.4214 5.42022 14.4214 5.85967 13.982C6.29912 13.5425 6.29912 12.8289 5.85967 12.3894L2.7167 9.24995L5.85967 6.10698C6.29912 5.66753 6.29912 4.95386 5.85967 4.5144Z" fill="#4B5563"/>
        </svg>
      );
    case "timer":
      return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.75 0.25C12.1369 0.25 14.4261 1.19821 16.114 2.88604C17.8018 4.57387 18.75 6.86305 18.75 9.25C18.75 11.6369 17.8018 13.9261 16.114 15.614C14.4261 17.3018 12.1369 18.25 9.75 18.25C7.36305 18.25 5.07387 17.3018 3.38604 15.614C1.69821 13.9261 0.75 11.6369 0.75 9.25C0.75 6.86305 1.69821 4.57387 3.38604 2.88604C5.07387 1.19821 7.36305 0.25 9.75 0.25ZM8.90625 4.46875V9.25C8.90625 9.53125 9.04688 9.79492 9.28242 9.95312L12.6574 12.2031C13.0441 12.4633 13.568 12.3578 13.8281 11.9676C14.0883 11.5773 13.9828 11.057 13.5926 10.7969L10.5938 8.8V4.46875C10.5938 4.00117 10.2176 3.625 9.75 3.625C9.28242 3.625 8.90625 4.00117 8.90625 4.46875Z" fill="#4B5563"/>
        </svg>
      );
  }
}

type Props = {
  email: { fromName: string; fromEmail: string; replyTo: string; subject: string; previewText: string };
  setEmail: (v: any) => void;
  onAddFromPalette: (k: BlockKind) => void;
  selected: TemplateBlock | null;
  onChangeSelected: (update: (prev: any) => any) => void;
  onDeleteSelected: () => void;
};

export default function RightPanel({ email, setEmail, onAddFromPalette, selected, onChangeSelected, onDeleteSelected }: Props) {
  return (
    <aside className="w-full md:w-[320px]">
      <div className="sticky top-4 space-y-4">
        {/* Email Settings */}
        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h4 className="mb-3 text-[14px] font-semibold text-zinc-800">Email Settings</h4>
          <div className="space-y-3">
            <Input label="From Name" placeholder="Your Company" value={email.fromName} onChange={(v) => setEmail({ ...email, fromName: v })} />
            <Input label="From Email" placeholder="hello@company.com" value={email.fromEmail} onChange={(v) => setEmail({ ...email, fromEmail: v })} />
            <Input label="Reply To Email" placeholder="support@company.com" value={email.replyTo} onChange={(v) => setEmail({ ...email, replyTo: v })} />
            <Input label="Subject" placeholder="Email Subject" value={email.subject} onChange={(v) => setEmail({ ...email, subject: v })} />
            <Input label="Preview Text" placeholder="Pre-header" value={email.previewText} onChange={(v) => setEmail({ ...email, previewText: v })} />
          </div>
        </section>

        {/* Elements Palette */}
        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h4 className="mb-2 text-[14px] font-semibold text-zinc-800">Elements</h4>
          <div className="grid grid-cols-2 gap-3">
            {(["columns","button","divider","heading","text","image","video","social","menu","html","timer"] as BlockKind[]).map((k) => (
              <PaletteItem key={k} kind={k} label={prettyKind[k]} icon={getIcon(k)} onClick={() => onAddFromPalette(k)} />
            ))}
          </div>
        </section>

        {/* Properties */}
        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-[14px] font-semibold text-zinc-800">Properties</h4>
            <button
              type="button"
              onClick={onDeleteSelected}
              className="rounded-md border border-zinc-200 px-2 py-1 text-[12px] text-zinc-600 hover:bg-zinc-50 disabled:opacity-50"
              disabled={!selected}
              title={selected ? "Delete (Del/Backspace)" : "Select an element"}
            >
              Delete
            </button>
          </div>

          {!selected ? (
            <p className="text-[12px] text-zinc-500">Pilih elemen di canvas untuk mengedit propertinya.</p>
          ) : (
            <ElementEditor selected={selected} onChangeSelected={onChangeSelected} />
          )}
        </section>
      </div>
    </aside>
  );
}

function ElementEditor({ selected, onChangeSelected }: { selected: TemplateBlock; onChangeSelected: (updater: (prev: any) => any) => void }) {
  switch (selected.kind) {
    case "heading":
      return (
        <div className="space-y-3">
          <Input label="Text" value={selected.props.text} onChange={(v) => onChangeSelected((p) => ({ ...p, text: v }))} />
          <NumberInput label="Size" value={Number(selected.props.size ?? 24)} min={10} max={64} onChange={(v) => onChangeSelected((p) => ({ ...p, size: v }))} />
          <Select label="Align" value={selected.props.align ?? "left"} onChange={(v) => onChangeSelected((p) => ({ ...p, align: v }))} options={[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]} />
        </div>
      );
    case "text":
      return (
        <div className="space-y-3">
          <Textarea label="Content" value={selected.props.text} onChange={(v) => onChangeSelected((p) => ({ ...p, text: v }))} />
          <Select label="Align" value={selected.props.align ?? "left"} onChange={(v) => onChangeSelected((p) => ({ ...p, align: v }))} options={[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]} />
        </div>
      );
    case "image":
      return (
        <div className="space-y-3">
          <Input label="Source URL" value={selected.props.src} onChange={(v) => onChangeSelected((p) => ({ ...p, src: v }))} />
          <Input label="Alt" value={selected.props.alt} onChange={(v) => onChangeSelected((p) => ({ ...p, alt: v }))} />
          <NumberInput label="Width" value={Number(selected.props.width ?? 600)} min={100} max={800} onChange={(v) => onChangeSelected((p) => ({ ...p, width: v }))} />
        </div>
      );
    case "button":
      return (
        <div className="space-y-3">
          <Input label="Label" value={selected.props.label} onChange={(v) => onChangeSelected((p) => ({ ...p, label: v }))} />
          <Input label="Href" value={selected.props.href} onChange={(v) => onChangeSelected((p) => ({ ...p, href: v }))} />
        </div>
      );
    case "divider":
      return (
        <div className="space-y-3">
          <NumberInput label="Thickness" value={Number(selected.props.thickness ?? 1)} min={1} max={12} onChange={(v) => onChangeSelected((p) => ({ ...p, thickness: v }))} />
          <ColorInput label="Color" value={selected.props.color ?? "#E5E7EB"} onChange={(v) => onChangeSelected((p) => ({ ...p, color: v }))} />
        </div>
      );
    case "columns":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {(["2x1","3x1","2x2","3x3","4x4","5x5","6x6"] as const).map((p) => {
              const [c, r] = p.split("x").map(Number);
              return (
                <button key={p} type="button" onClick={() => onChangeSelected((prev) => ({ ...prev, cols: c, rows: r }))} className="rounded border border-zinc-200 px-2 py-1 text-[12px] text-zinc-700 hover:bg-zinc-50">
                  {p}
                </button>
              );
            })}
          </div>
          <NumberInput label="# Columns" value={Number(selected.props.cols ?? 2)} min={1} max={6} onChange={(v) => onChangeSelected((p) => ({ ...p, cols: clamp(v) }))} />
          <NumberInput label="# Rows" value={Number(selected.props.rows ?? 1)} min={1} max={6} onChange={(v) => onChangeSelected((p) => ({ ...p, rows: clamp(v) }))} />
          <NumberInput label="Gap (px)" value={Number(selected.props.gap ?? 16)} min={0} max={48} onChange={(v) => onChangeSelected((p) => ({ ...p, gap: clampGap(v) }))} />
        </div>
      );
    case "html":
      return <Textarea label="HTML" value={selected.props.html} onChange={(v) => onChangeSelected((p) => ({ ...p, html: v }))} />;
    default:
      return <p className="text-[12px] text-zinc-500">Belum ada editor untuk jenis "{prettyKind[selected.kind]}".</p>;
  }
}

function PaletteItem({ kind, label, icon, onClick }: { kind: BlockKind; label: string; icon: React.ReactNode; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `palette-${kind}`, data: { type: "new", kind } });
  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      type="button"
      onClick={onClick}
      className={`flex h-[64px] w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-300 bg-white text-[12px] font-medium text-zinc-600 hover:bg-zinc-50 cursor-grab active:cursor-grabbing ${isDragging ? "opacity-60" : ""}`}
    >
      <span className="text-zinc-500">{icon}</span>
      {label}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: any; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[12px] text-zinc-600">{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-300" />
    </label>
  );
}
function Textarea({ label, value, onChange, placeholder }: { label: string; value: any; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[12px] text-zinc-600">{label}</span>
      <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-300" rows={4} />
    </label>
  );
}
function NumberInput({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <label className="block">
      <span className="text-[12px] text-zinc-600">{label}</span>
      <input type="number" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300" />
    </label>
  );
}
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[12px] text-zinc-600">{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-zinc-300 bg-white" />
    </label>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <label className="block">
      <span className="text-[12px] text-zinc-600">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
function clamp(n: number) { const v = Math.round(Number(n || 1)); return Math.max(1, Math.min(6, v)); }
function clampGap(n: number) { const v = Math.round(Number(n || 0)); return Math.max(0, Math.min(48, v)); }
