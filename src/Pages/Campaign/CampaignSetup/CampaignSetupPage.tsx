/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import StepProgress from "../../../components/Campaign/StepProgress";
import FeatureToggleCard, {
  IconAudience,
  IconClick,
  IconConversion,
  IconDrip,
  IconOpenRate,
  IconSchedule,
  IconTracking,
} from "../../../components/Campaign/FeatureToggleCard";

export default function CampaignSetupPage() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [drip, setDrip] = React.useState(false);
  const [tracking, setTracking] = React.useState(true);

  const steps = [
    { id: 1, label: "Campaign Type" },
    { id: 2, label: "Campaign Details" },
    { id: 3, label: "Template Selection" },
    { id: 4, label: "Review & Targeting" },
    { id: 5, label: "Schedule" },
  ];

  return (
    <div className="mx-auto max-w-[1100px] px-2 py-2 md:px-6 md:py-6">
      <div className="mb-3">
        <h1 className="text-[22px] font-semibold text-zinc-800">Setup Your Campaign</h1>
        <p className="text-sm text-zinc-500">
          Configure your email marketing campaign with smart automation features
        </p>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <StepProgress steps={steps} current={2} />
        <div className="text-xs text-zinc-500">Step 2 of 5</div>
      </div>

      {/* kunci warna/teks supaya tidak mewarisi style aneh */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 text-[initial] text-zinc-900 shadow-sm md:p-6">
        {/* Campaign Name */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Campaign Template Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your campaign template name"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-300"
            aria-describedby="campaign-name-help"
          />
          {/* FORCE visible (anti CSS global yg sembunyikan <p>) */}
          <p
            id="campaign-name-help"
            className="mt-2 !block text-xs leading-5 !text-zinc-500 antialiased !opacity-100 !visible"
            style={{ display: "block", visibility: "visible", opacity: 1 }}
            data-helper="campaign-name"
          >
            This name will help you identify and organize your campaign templates
          </p>
        </div>

        {/* Campaign Features */}
        <div className="mb-3 text-sm font-medium text-zinc-700">Campaign Features</div>

        <div className="grid gap-3 overflow-visible">
          <FeatureToggleCard
            active={drip}
            onChange={setDrip}
            title="Drip Campaign"
            description="Automatically send a series of emails to your contacts over time. Perfect for nurturing leads and building relationships."
            leadingIcon={<IconDrip className="h-5 w-5 text-emerald-700" />}
            meta={[
              { icon: <IconSchedule className="h-3 w-3 text-zinc-400" />, label: "Scheduled delivery" },
              { icon: <IconAudience className="h-3 w-3 text-zinc-400" />, label: "Audience segmentation" },
            ]}
          />

          <FeatureToggleCard
            active={tracking}
            onChange={setTracking}
            title="Campaign Tracking"
            description="Track opens, clicks, conversions, and other key metrics to measure your campaign's performance and optimize results."
            leadingIcon={<IconTracking className="h-5 w-5 text-emerald-700" />}
            meta={[
              { icon: <IconOpenRate className="h-3 w-3 text-zinc-400" />, label: "Open rates" },
              { icon: <IconClick className="h-3 w-3 text-zinc-400" />, label: "Click tracking" },
              { icon: <IconConversion className="h-3 w-3 text-zinc-400" />, label: "Conversion tracking" },
            ]}
          />
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between">
          <button
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
              Save as Draft
            </button>
            <button
              className="rounded-md bg-[#0F5A62] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
              onClick={() => navigate(`/campaign/template?name=${encodeURIComponent(name)}`)}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
