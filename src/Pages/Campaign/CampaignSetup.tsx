import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CampaignSetupPage() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const type = sp.get("type") ?? "announcement";

  const [name, setName] = React.useState("");
  const [drip, setDrip] = React.useState(false);
  const [tracking, setTracking] = React.useState(true);

  const continueNext = () => {
    // normally save to store/api; for now route to template selection
    navigate("/campaign/email-template");
  };

  return (
    <div className="mx-auto max-w-[960px] p-6">
      <div className="mb-5 flex items-center gap-4 text-sm text-zinc-600">
        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-white">1</span> Campaign Type
        <span className="text-zinc-400">—</span>
        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-white">2</span> Campaign Details
        <span className="text-zinc-400">— 3 Template Selection — 4 Review & Targeting — 5 Schedule</span>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <label className="mb-2 block text-sm font-medium text-zinc-800">Campaign Template Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your campaign template name"
          className="mb-6 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />

        <div className="space-y-4">
          <FeatureRow
            title="Drip Campaign"
            desc="Automatically send a series of emails to your contacts over time. Perfect for nurturing leads and building relationships."
            chips={["Scheduled delivery", "Audience segmentation"]}
            checked={drip}
            onChange={setDrip}
          />
          <FeatureRow
            title="Campaign Tracking"
            desc="Track opens, clicks, conversions, and other key metrics to measure your campaign’s performance and optimize results."
            chips={["Open rates", "Click tracking", "Conversion tracking"]}
            checked={tracking}
            onChange={setTracking}
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={() => navigate("/campaign/create-new-campaign")} className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
            ← Back
          </button>

          <div className="flex gap-2">
            <button className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
              Save as Draft
            </button>
            <button
              onClick={continueNext}
              className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:brightness-110"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-zinc-500">Selected type: <span className="font-medium text-zinc-700">{type}</span></div>
    </div>
  );
}

function FeatureRow({
  title,
  desc,
  chips,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  chips: string[];
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-zinc-200 p-4">
      <div>
        <div className="text-sm font-semibold text-zinc-800">{title}</div>
        <p className="mt-1 text-sm text-zinc-600">{desc}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
              {c}
            </span>
          ))}
        </div>
      </div>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="block h-6 w-11 rounded-full bg-zinc-300 peer-checked:bg-emerald-600 relative">
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
        </span>
      </label>
    </div>
  );
}
