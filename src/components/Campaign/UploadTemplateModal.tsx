// src/components/Campaign/UploadTemplateModal.tsx
import * as React from "react";

export type UploadTemplatePayload = {
    file: File;
    name: string;
    category: string;
    description?: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (p: UploadTemplatePayload) => void;
};

export default function UploadTemplateModal({ open, onClose, onSubmit }: Props) {
    const [file, setFile] = React.useState<File | null>(null);
    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("Welcome Email");
    const [description, setDescription] = React.useState("");

    // preview
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // confirm modals
    const [confirmUploadOpen, setConfirmUploadOpen] = React.useState(false);
    const [confirmRemoveOpen, setConfirmRemoveOpen] = React.useState(false);

    React.useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        if (!name) setName(file.name.replace(/\.[^.]+$/, ""));
        return () => URL.revokeObjectURL(url);
    }, [file, name]);

    if (!open) return null;

    const doSubmit = () => {
        if (!file) return;
        onSubmit({ file, name, category, description });
        // reset
        setFile(null);
        setName("");
        setCategory("Welcome Email");
        setDescription("");
        setPreviewUrl(null);
        setConfirmUploadOpen(false);
    };

    const onPickClick = () => fileInputRef.current?.click();

    // dnd
    const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) setFile(f);
    };
    const allowDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setConfirmRemoveOpen(false);
    };

    const isImage = file?.type.startsWith("image/");
    const isPdf = file?.type === "application/pdf";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className="flex flex-col overflow-hidden bg-white shadow-xl h-[95vh] w-[75vh]"
            >
                <div className="border-b px-6 py-5">
                    <div className="flex items-start justify-between">
                        <h2 className="text-[20px] font-semibold text-[#111827]">Upload Email Template</h2>
                        <button
                            onClick={onClose}
                            className="rounded p-1 text-[#6B7280] hover:bg-zinc-100"
                            aria-label="Close"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <p className="mt-1 text-[13px] text-[#6B7280]">
                        Upload your template design as PNG, JPG, or PDF file
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    <div
                        onDragOver={allowDrop}
                        onDrop={onDrop}
                        className="rounded-[12px] border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] px-6 py-8 text-center"
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg,.pdf"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />

                        {previewUrl ? (
                            <div className="space-y-3">
                                <div className="mx-auto max-w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-white">
                                    {isImage && (
                                        <img
                                            src={previewUrl}
                                            alt={file?.name}
                                            className="mx-auto block h-[240px] w-full object-contain"
                                        />
                                    )}
                                    {isPdf && (
                                        <object data={previewUrl} type="application/pdf" className="h-[240px] w-full">
                                            <div className="flex h-[240px] w-full items-center justify-center text-sm text-[#6B7280]">
                                                PDF preview not supported. ({file?.name})
                                            </div>
                                        </object>
                                    )}
                                </div>

                                <div className="text-[13px] text-[#374151]">
                                    <span className="font-medium">{file?.name}</span>
                                    {file && (
                                        <span className="text-[#6B7280]"> • {(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={onPickClick}
                                        className="inline-flex items-center gap-2 rounded-md bg-[#0F766E] px-4 py-2 text-sm font-medium text-white hover:brightness-110"
                                    >
                                        <UploadIcon className="h-4 w-4" />
                                        Change File
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setConfirmRemoveOpen(true)}
                                        className="rounded-md border border-[#D1D5DB] px-3 py-2 text-sm text-[#374151] hover:bg-zinc-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                                        <path
                                            d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                                            stroke="#111827"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <div className="text-[15px] font-medium text-[#111827]">Drop your template file here</div>
                                <div className="text-[13px] text-[#6B7280]">Supports PNG, JPG, and PDF files</div>

                                <button
                                    type="button"
                                    onClick={onPickClick}
                                    className="inline-flex items-center gap-2 rounded-md bg-[#0F766E] px-4 py-2 text-sm font-medium text-white hover:brightness-110"
                                >
                                    <UploadIcon className="h-4 w-4" />
                                    Select File
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-[13px] font-medium text-[#374151]">Template Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter template name"
                                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[14px] text-[#111827] outline-none focus:ring-2 focus:ring-[#E5E7EB]"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-[13px] font-medium text-[#374151]">Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 pr-8 text-[14px] text-[#111827] outline-none focus:ring-2 focus:ring-[#E5E7EB]"
                                >
                                    <option>Welcome Email</option>
                                    <option>Announcement</option>
                                    <option>Follow-up</option>
                                </select>
                                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-[13px] font-medium text-[#374151]">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full resize-none rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[14px] text-[#111827] outline-none focus:ring-2 focus:ring-[#E5E7EB]"
                            />
                        </div>
                    </div>
                    <div className="rounded-lg border border-[#C7D7FE] bg-[#EEF2FF] p-4">
                        <p className="text-[13px] font-semibold text-[#1D4ED8]">File Requirements</p>
                        <ul className="mt-2 list-disc pl-5 text-[13px] text-[#1D4ED8]">
                            <li>Maximum file size: 10MB</li>
                            <li>Supported formats: PNG, JPG, PDF</li>
                            <li>Recommended resolution: 1200px width minimum</li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-[#D1D5DB] px-4 py-2 text-sm text-[#374151] hover:bg-zinc-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={!file || !name}
                        onClick={() => setConfirmUploadOpen(true)}
                        className="rounded-md bg-[#0F766E] px-4 py-2 text-sm font-medium text-white hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#D1D5DB]"
                    >
                        Upload Template
                    </button>
                </div>
            </div>

            {confirmRemoveOpen && (
                <ConfirmModal
                    title="Remove selected file?"
                    description="Your selected file will be cleared from the form."
                    confirmText="Remove"
                    confirmTone="danger"
                    onCancel={() => setConfirmRemoveOpen(false)}
                    onConfirm={removeFile}
                />
            )}

            {confirmUploadOpen && (
                <ConfirmModal
                    title="Upload this template?"
                    description="Make sure the information is correct before uploading."
                    confirmText="Upload"
                    confirmTone="primary"
                    onCancel={() => setConfirmUploadOpen(false)}
                    onConfirm={doSubmit}
                />
            )}
        </div>
    );
}

function ConfirmModal({
    title,
    description,
    confirmText,
    confirmTone = "primary",
    onCancel,
    onConfirm,
}: {
    title: string;
    description?: string;
    confirmText: string;
    confirmTone?: "primary" | "danger";
    onCancel: () => void;
    onConfirm: () => void;
}) {
    const confirmClass =
        confirmTone === "danger"
            ? "bg-red-600 hover:bg-red-700"
            : "bg-[#0F766E] hover:brightness-110";
    return (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40">
            <div className="w-[420px] rounded-xl bg-white p-5 shadow-lg">
                <h3 className="text-[16px] font-semibold text-[#111827]">{title}</h3>
                {description && <p className="mt-1 text-[13px] text-[#6B7280]">{description}</p>}
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="rounded-md border border-[#D1D5DB] px-3 py-1.5 text-sm text-[#374151] hover:bg-zinc-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium text-white ${confirmClass}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

function UploadIcon(p: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
            <path
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
