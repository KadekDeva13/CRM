/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StepProgress from "../../../components/Campaign/StepProgress";
import CampaignSuccessModal from "../../../components/Campaign/Modal/CampaignSuccessModal";

type ScheduleMode = "immediate" | "fixed" | "relative";

type TemplateLite = { id: string; title: string; thumbUrl?: string };
type SegmentLite = { id: string; name: string; count: number };
type LocationState = { template?: TemplateLite; segment?: SegmentLite; rules?: any };

type CampaignRow = {
  id: string;
  name: string;
  delivery: string;
  tag: string;
  status: "Active" | "Pending" | "Completed" | "Draft";
  createdAt: string;
  scheduledAt?: string | null;
};

const steps = [
  { id: 1, label: "Campaign Type" },
  { id: 2, label: "Campaign Details" },
  { id: 3, label: "Template Selection" },
  { id: 4, label: "Review & Targeting" },
  { id: 5, label: "Schedule" },
] as const;

const radioBase =
  "flex items-start gap-3 rounded-lg border p-4 transition-colors cursor-pointer";
const radioInactive = "border-zinc-200 bg-white hover:border-zinc-300";
const radioActive = "border-emerald-600 ring-1 ring-emerald-600 bg-emerald-50";

export default function CampaignSchedulePage(): React.ReactElement {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: LocationState };

  const chosen = state?.template;
  const segment = state?.segment;

  // Default ke "relative" agar preview sama seperti screenshot
  const [mode, setMode] = React.useState<ScheduleMode>("relative");

  // Fixed schedule
  const [fixedAt, setFixedAt] = React.useState<string>("");
  const [tz, setTz] = React.useState<"UTC" | "LOCAL">("UTC");

  // Relative schedule
  const [relativeDay, setRelativeDay] = React.useState<string>("");
  const [relativeTime, setRelativeTime] = React.useState<string>("10:00");

  // UX state
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleBack = () =>
    navigate("/campaign/review", { state: { template: chosen } });

  function computeScheduledIsoFromFixed(): string {
    if (!fixedAt) return new Date().toISOString();
    if (tz === "UTC") return new Date(`${fixedAt}:00Z`).toISOString();
    return new Date(fixedAt).toISOString();
  }

  const onSave = async () => {
    setError(null);

    if (mode === "fixed" && !fixedAt) {
      setError("Please choose a specific date & time.");
      return;
    }
    if (mode === "relative" && (!relativeDay || !relativeTime)) {
      setError("Please select day and time for appointment-based sending.");
      return;
    }

    setSaving(true);
    try {
      const stored = localStorage.getItem("campaigns");
      const rows: CampaignRow[] = stored ? JSON.parse(stored) : [];
      const id = crypto.randomUUID();

      let scheduledAt: string | null = null;
      if (mode === "immediate") {
        scheduledAt = new Date().toISOString();
      } else if (mode === "fixed") {
        scheduledAt = computeScheduledIsoFromFixed();
      } else {
        // relative rules disimpan terpisah
        scheduledAt = null;
        const ruleStoreRaw = localStorage.getItem("campaignRelativeRules");
        const ruleStore: Record<string, { relativeDay: string; relativeTime: string }> =
          ruleStoreRaw ? JSON.parse(ruleStoreRaw) : {};
        ruleStore[id] = { relativeDay, relativeTime };
        localStorage.setItem("campaignRelativeRules", JSON.stringify(ruleStore));
      }

      const row: CampaignRow = {
        id,
        name: chosen?.title || "Untitled Campaign",
        delivery: "Email Marketing",
        tag: segment?.name || "Other",
        status: mode === "immediate" ? "Active" : "Pending",
        createdAt: new Date().toISOString(),
        scheduledAt,
      };

      rows.unshift(row);
      localStorage.setItem("campaigns", JSON.stringify(rows));
      setShowSuccess(true);
    } catch (e: any) {
      setError(e?.message ?? "Failed to save schedule.");
    } finally {
      setSaving(false);
    }
  };

  const RadioRow = ({
    value,
    title,
    desc,
    children,
  }: {
    value: ScheduleMode;
    title: string;
    desc: string;
    children?: React.ReactNode;
  }) => {
    const active = mode === value;
    return (
      <label
        className={[
          radioBase,
          active ? radioActive : radioInactive,
          "w-full",
        ].join(" ")}
      >
        <input
          type="radio"
          name="schedule-mode"
          className="mt-1 h-4 w-4 accent-emerald-600"
          checked={active}
          onChange={() => setMode(value)}
        />
        <div className="flex-1">
          <div className="font-medium text-zinc-900">{title}</div>
          <div className="text-sm text-zinc-500">{desc}</div>
          {active && children ? <div className="mt-4">{children}</div> : null}
        </div>
      </label>
    );
  };

  return (
    <>
      <div className="mx-auto max-w-[1100px] px-6 py-6">
        {/* (Boleh di-keep; screenshot tidak menampilkan stepper, tapi flow kamu pakai stepper) */}
        <div className="mb-4 flex items-center justify-between">
          <StepProgress
            steps={steps as unknown as { id: number; label: string }[]}
            current={5}
          />
          <div className="text-xs text-zinc-500">Step 5 of {steps.length}</div>
        </div>

        {/* Frame abu-abu luar agar sama seperti screenshot */}
        <div className="rounded-2xl bg-zinc-100 p-3">
          {/* Panel putih utama */}
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-zinc-100 p-6">
              <h1 className="text-xl font-semibold text-zinc-900">
                Schedule Your Campaign
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Choose when you want your campaign to be sent to your customers.
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                When would you like to send this campaign?
              </p>
            </div>

            {/* Body */}
            <div className="space-y-3 p-6">
              {/* Immediate */}
              <RadioRow
                value="immediate"
                title="Immediate"
                desc="Send the campaign right away"
              />

              {/* Fixed date-time */}
              <RadioRow
                value="fixed"
                title="A specific time and date"
                desc="Schedule for a specific date and time"
              >
                {/* Disembunyikan di screenshot; tetap ada jika dipilih */}
                <div className="grid gap-4 sm:max-w-md sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="mb-1 block text-sm font-medium text-zinc-700">
                      Send at
                    </label>
                    <input
                      type="datetime-local"
                      value={fixedAt}
                      onChange={(e) => setFixedAt(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-700">
                      Timezone
                    </label>
                    <select
                      value={tz}
                      onChange={(e) =>
                        setTz((e.target.value as "UTC" | "LOCAL") ?? "UTC")
                      }
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300"
                    >
                      <option value="UTC">UTC</option>
                      <option value="LOCAL">Local</option>
                    </select>
                  </div>
                </div>
              </RadioRow>

              {/* Relative (sesuai screenshot: aktif & memperlihatkan box berborder dengan dua input sejajar) */}
              <RadioRow
                value="relative"
                title="Based on appointment"
                desc="Send relative to customer's appointment time"
              >
                <div className="rounded-lg border border-zinc-200 bg-white p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-zinc-700">
                        The day of check-out
                      </label>
                      <div className="relative">
                        <select
                          value={relativeDay}
                          onChange={(e) => setRelativeDay(e.target.value)}
                          className="w-full appearance-none rounded-md border border-zinc-300 bg-white px-3 py-2 pr-9 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300"
                        >
                          <option value="">Select day</option>
                          <option value="same-day">Same day as check-out</option>
                          <option value="1-day-before">1 day before check-out</option>
                          <option value="2-days-before">2 days before check-out</option>
                          <option value="1-day-after">1 day after check-out</option>
                          <option value="2-days-after">2 days after check-out</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                          ▾
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-zinc-700">
                        Send time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={relativeTime}
                          onChange={(e) => setRelativeTime(e.target.value)}
                          className="w-full rounded-md border border-zinc-300 bg-white px-10 py-2 text-sm text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300"
                        />
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-zinc-400"
                          >
                            <path
                              d="M12 8v4l3 1.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RadioRow>

              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
            </div>

            {/* Footer bar seperti screenshot */}
            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 bg-white p-4">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 active:scale-[.99]"
              >
                ← Back
              </button>
              <button
                onClick={onSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F5A62] px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110 active:scale-[.99] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save & Finish"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampaignSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onViewAll={() => navigate("/campaign/all-campaign")}
      />
    </>
  );
}
