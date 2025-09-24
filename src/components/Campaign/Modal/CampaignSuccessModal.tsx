import * as React from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  onViewAll?: () => void;
};

export default function CampaignSuccessModal({ open, onClose, onViewAll }: Props) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campaign-success-title"
      aria-describedby="campaign-success-desc"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} data-overlay />

      {/* panel */}
      <div className="relative z-10 w-[520px] max-w-[360px] rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
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
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#0F5A62] text-white">
          <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
            <path d="M8.5 13.4 5.3 10.2a1 1 0 1 1 1.4-1.4l1.8 1.8 4.8-4.8a1 1 0 1 1 1.4 1.4l-5.5 5.5a1 1 0 0 1-1.7 0Z" />
          </svg>
        </div>

        {/* texts */}
        <h3
          id="campaign-success-title"
          className="text-center text-[18px] font-semibold text-zinc-900"
        >
          Campaign Created Successfully!
        </h3>
        <p
          id="campaign-success-desc"
          className="mt-2 text-center text-sm leading-6 text-zinc-600"
        >
          Your campaign has been created and scheduled successfully. You can now view it
          in your campaigns list or make additional changes.
        </p>

        {/* action */}
        <div className="mt-5">
          <button
            onClick={onViewAll ?? onClose}
            className="block w-full rounded-lg bg-[#0F5A62] px-4 py-2.5 text-center text-sm font-semibold text-white hover:brightness-110"
          >
            View All Campaigns
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
