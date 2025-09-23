import * as React from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  onViewAll?: () => void;
  onContinueEditing?: () => void;
};

export default function DraftSuccessModal({
  open,
  onClose,
  onViewAll,
  onContinueEditing,
}: Props) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="draft-title"
      aria-describedby="draft-desc"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        data-overlay
      />
      {/* panel */}
      <div className="relative z-10 w-[480px] max-w-[362px] rounded-2xl bg-white p-5 shadow-xl">
        {/* close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-zinc-500 hover:bg-zinc-100"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
            <path d="M5.7 5.7a1 1 0 0 1 1.4 0L10 8.59l2.9-2.9a1 1 0 1 1 1.4 1.42L11.41 10l2.9 2.9a1 1 0 1 1-1.42 1.4L10 11.41l-2.9 2.9a1 1 0 0 1-1.4-1.42L8.59 10l-2.9-2.9a1 1 0 0 1 0-1.4Z" />
          </svg>
        </button>

        {/* icon */}
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#0F5A62] text-[#FFFFFF]">
          <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
            <path d="M8.5 13.4 5.3 10.2a1 1 0 1 1 1.4-1.4l1.8 1.8 4.8-4.8a1 1 0 1 1 1.4 1.4l-5.5 5.5a1 1 0 0 1-1.7 0Z" />
          </svg>
        </div>

        {/* text */}
        <h3 id="draft-title" className="text-center text-[18px] font-semibold text-zinc-900">
          Draft Created Successfully!
        </h3>
        <p id="draft-desc" className="mt-2 text-center text-sm leading-6 text-zinc-600">
          Your campaign has been saved dan drafted. You can now view it in your
          campaigns list or make additional changes.
        </p>

        {/* actions */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={onViewAll}
            className="rounded-md bg-[#0F5A62] px-4 py-2 text-sm font-medium text-white hover:brightness-110"
          >
            View All Campaigns
          </button>
          <button
            onClick={onContinueEditing ?? onClose}
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Continue Editing
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
