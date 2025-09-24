/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StepProgress from "../../../components/Campaign/StepProgress";

type TemplateLite = { id: string; title: string; thumbUrl?: string };
type SegmentLite = { id: string; name: string; count: number };

type CampaignRow = {
  id: string;
  name: string;
  delivery: string;
  tag: string;
  status: "Active" | "Pending" | "Completed" | "Draft";
  createdAt: string;
  scheduledAt?: string;
};

export default function CampaignSchedule() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: {
      template?: TemplateLite;
      segment?: SegmentLite;
      rules?: any;
    };
  };

  const chosen = state?.template;
  const segment = state?.segment;

  const steps = [
    { id: 1, label: "Campaign Type" },
    { id: 2, label: "Campaign Details" },
    { id: 3, label: "Template Selection" },
    { id: 4, label: "Review & Targeting" },
    { id: 5, label: "Schedule" },
  ] as const;

  const [date, setDate] = React.useState<string>("");
  const [time, setTime] = React.useState<string>("");
  const [tz, setTz] = React.useState<string>("UTC");
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleBack = () => navigate("/campaign/review", { state: { template: chosen } });

  const handleSaveFinish = () => {
    const stored = localStorage.getItem("campaigns");
    const rows: CampaignRow[] = stored ? JSON.parse(stored) : [];

    const scheduledAt =
      date && time ? new Date(`${date}T${time}:00.000${tz === "UTC" ? "Z" : ""}`).toISOString() : new Date().toISOString();

    const row: CampaignRow = {
      id: crypto.randomUUID(),
      name: chosen?.title || "Untitled Campaign",
      delivery: "Email Marketing",
      tag: segment?.name || "Other",
      status: "Pending",
      createdAt: new Date().toISOString(),
      scheduledAt,
    };

    rows.unshift(row);
    localStorage.setItem("campaigns", JSON.stringify(rows));
    setShowSuccess(true);
  };

  return (
    <div className="mx-auto max-w-[900px] px-2 py-2 md:px-6 md:py-6">
      <div className="mb-3">
        <h1 className="text-[22px] font-semibold text-zinc-800">Schedule & Send</h1>
        <p className="text-[13px] text-zinc-500">Define when your campaign goes out to your audience</p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <StepProgress steps={steps as unknown as { id: number; label: string }[]} current={5} />
        <div className="text-xs text-zinc-500">Step 5 of {steps.length}</div>
      </div>

      {!showSuccess ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="mb-1 text-[12px] font-medium text-zinc-700">Send Date</div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-700"
                />
              </div>
              <div>
                <div className="mb-1 text-[12px] font-medium text-zinc-700">Send Time</div>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-700"
                />
              </div>
              <div>
                <div className="mb-1 text-[12px] font-medium text-zinc-700">Timezone</div>
                <select
                  value={tz}
                  onChange={(e) => setTz(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-700"
                >
                  <option value="UTC">UTC</option>
                  <option value="LOCAL">Local</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              ← Back
            </button>
            <button
              onClick={handleSaveFinish}
              className="rounded-md bg-[#0F5A62] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Save & Finish
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-emerald-600/10 text-emerald-700 grid place-items-center">
            ✓
          </div>
          <h3 className="text-lg font-semibold text-zinc-900">Campaign Created Successfully!</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Your campaign has been created and scheduled successfully. You can now view it in your campaigns list or make
            additional changes.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/campaign/all-campaign")}
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              View All Campaigns
            </button>
            <button
              onClick={() => navigate("/campaign/create-new-campaign")}
              className="rounded-md bg-[#0F5A62] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
