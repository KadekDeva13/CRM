import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StepProgress from "../../../components/Campaign/StepProgress";
import DraftSuccessModal from "../../../components/Campaign/Modal/DraftSuccessModal";

type TemplateLite = { id: string; title: string; thumbUrl?: string };

type Segment = {
    id: string;
    name: string;
    desc: string;
    count: number;
};

export default function CampaignReviewPage() {
    const navigate = useNavigate();
    const { state } = useLocation() as { state?: { template?: TemplateLite } };
    const [showDraftModal, setShowDraftModal] = React.useState(false);
    const chosen = state?.template;

    const steps = [
        { id: 1, label: "Campaign Type" },
        { id: 2, label: "Campaign Details" },
        { id: 3, label: "Template Selection" },
        { id: 4, label: "Review & Targeting" },
        { id: 5, label: "Schedule" },
    ] as const;

    const segments: Segment[] = [{ id: "premium", name: "Premium Customers", desc: "High-value customers with purchase history > $500", count: 2847 }, { id: "vip", name: "VIP Members", desc: "Loyalty program members with tier status", count: 892 }, { id: "new1", name: "New Subscribers", desc: "Recently subscribed users in the last 30 days", count: 1234 }, { id: "new2", name: "New Subscribers", desc: "Recently subscribed users in the last 30 days", count: 1234 }, { id: "new3", name: "New Subscribers", desc: "Recently subscribed users in the last 30 days", count: 1234 }, { id: "inactive1", name: "Inactive Users", desc: "Users with no activity in the last 90 days", count: 5621 }, { id: "inactive2", name: "Inactive Users", desc: "Users with no activity in the last 90 days", count: 5621 }, { id: "inactive3", name: "Inactive Users", desc: "Users with no activity in the last 90 days", count: 5621 },];
    const [selectedSeg, setSelectedSeg] = React.useState(segments[0].id);
    const selected = segments.find(s => s.id === selectedSeg)!;

    const [skipUnsub, setSkipUnsub] = React.useState(false);
    const [skipBounced, setSkipBounced] = React.useState(true);
    const [skipSpam, setSkipSpam] = React.useState(false);
    const [skipPurchased7, setSkipPurchased7] = React.useState(false);
    const [skipReceivedRecently, setSkipReceivedRecently] = React.useState(false);
    const [createLiveSuppression, setCreateLiveSuppression] = React.useState(false);
    const [suppressionInterval, setSuppressionInterval] = React.useState("");

    const handleBack = () => navigate("/campaign/create-template");
    const handleDraft = () => setShowDraftModal(true);
    const handleContinue = () =>
        navigate("/campaign/schedule", { state: { template: chosen, segment: selected } });

    return (
        <div className="mx-auto max-w-[1100px] px-2 py-2 md:px-6 md:py-6">
            {/* Title + Stepper */}
            <div className="mb-3">
                <h1 className="text-[22px] font-semibold text-zinc-800">Setup Your Campaign</h1>
                <p className="text-[13px] text-zinc-500">
                    Configure your email marketing campaign with smart automation features
                </p>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <StepProgress steps={steps as unknown as { id: number; label: string }[]} current={4} />
                <div className="text-xs text-zinc-500">Step 4 of {steps.length}</div>
            </div>

            {/* ===== Campaign Review */}
            {/* ===== Campaign Review (match screenshot) */}
            <section className="mb-4 rounded-2xl border border-zinc-200 bg-white p-4 md:p-6 shadow-sm">
                <h3 className="text-[18px] font-semibold text-zinc-900">Campaign Review</h3>

                <div className="mt-4 grid gap-6 lg:grid-cols-2">
                    {/* DESKTOP */}
                    <div>
                        <div className="mb-2 text-sm font-medium text-zinc-700">Desktop Preview</div>

                        {/* 1x dashed frame, big light gray canvas */}
                        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 pt-4 pb-8">
                            {/* white card on top area */}
                            <div className="mx-auto w-full rounded-lg border border-zinc-200 bg-white px-6 py-6 md:px-8 md:py-8 text-center shadow-sm">
                                <h4 className="text-[22px] md:text-[24px] font-semibold text-zinc-900">
                                    {chosen?.title ?? "Summer Sale Campaign"}
                                </h4>
                                <p className="mt-2 text-sm text-zinc-600">Get up to 50% off on selected items</p>
                                <div className="mt-5 flex justify-center">
                                    <button className="rounded-md bg-[#0F5A62] px-5 py-2 text-sm font-semibold text-white hover:brightness-110">
                                        Shop Now
                                    </button>
                                </div>
                            </div>

                            {/* empty gray area below – height like screenshot */}
                            <div className="mt-6 h-[360px]" />
                        </div>
                    </div>

                    {/* MOBILE */}
                    <div>
                        <div className="mb-2 text-sm font-medium text-zinc-700">Mobile Preview</div>

                        {/* 1x dashed frame, fixed column width */}
                        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 pt-4 pb-8">
                            {/* narrow white card */}
                            <div className="mx-auto w-full max-w-[420px] rounded-lg border border-zinc-200 bg-white px-5 py-6 text-center shadow-sm">
                                <h5 className="text-[18px] font-semibold text-zinc-900">
                                    {(chosen?.title?.split(' ')[0] ?? 'Summer')} Sale
                                </h5>
                                <p className="mt-2 text-xs text-zinc-600">Up to 50% off</p>
                                <button className="mx-auto mt-4 w-full max-w-[320px] rounded-md bg-[#0F5A62] px-4 py-2 text-sm font-semibold text-white hover:brightness-110">
                                    Shop Now
                                </button>
                            </div>

                            {/* empty gray area below */}
                            <div className="mt-6 h-[360px]" />
                        </div>
                    </div>
                </div>
            </section>


            {/* ===== Grid bawah: Segments + Right Panel */}
            <div className="grid gap-4 md:grid-cols-[1fr_340px]">
                {/* Segments */}
                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-[15px] font-medium text-zinc-800">Select Target Segment</div>
                    <div className="grid gap-3 md:grid-cols-2">
                        {segments.map((s, i) => {
                            const active = selectedSeg === s.id;
                            return (
                                <button
                                    key={s.id + i}
                                    type="button"
                                    onClick={() => setSelectedSeg(s.id)}
                                    className={[
                                        "rounded-xl border p-4 text-left transition",
                                        active ? "border-emerald-700 ring-2 ring-emerald-200" : "border-zinc-200 hover:border-zinc-300",
                                    ].join(" ")}
                                >
                                    <div className="mb-1 flex items-center justify-between">
                                        <div className="text-[13px] font-semibold text-zinc-800">{s.name}</div>
                                        <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-emerald-700" : "bg-zinc-300"}`} />
                                    </div>
                                    <div className="text-[12px] text-zinc-500">{s.desc}</div>
                                    <div className="mt-2 text-[12px] text-zinc-600">👥 {s.count.toLocaleString()} contacts</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    {/* Additional Options */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 text-[15px] font-medium text-zinc-800">Additional Options</div>
                        <div className="mb-2 text-[12px] font-medium text-zinc-700">Skip individuals who have…</div>
                        <div className="space-y-2 text-[13px] text-zinc-700">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={skipUnsub} onChange={e => setSkipUnsub(e.target.checked)} />
                                Unsubscribed from emails
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={skipBounced} onChange={e => setSkipBounced(e.target.checked)} />
                                Bounced in last campaign
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={skipSpam} onChange={e => setSkipSpam(e.target.checked)} />
                                Marked as spam
                            </label>
                        </div>

                        <div className="mt-4 mb-2 text-[12px] font-medium text-zinc-700">Skip individuals who have…</div>
                        <div className="space-y-2 text-[13px] text-zinc-700">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={skipPurchased7} onChange={e => setSkipPurchased7(e.target.checked)} />
                                Purchased in last 7 days
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={skipReceivedRecently} onChange={e => setSkipReceivedRecently(e.target.checked)} />
                                Received campaign recently
                            </label>
                        </div>

                        <div className="mt-4 space-y-3">
                            <label className="flex items-center gap-2 text-[13px]">
                                <input type="checkbox" checked={createLiveSuppression} onChange={e => setCreateLiveSuppression(e.target.checked)} />
                                Create temporary (Live) suppression list
                            </label>
                            <div>
                                <div className="mb-1 text-[12px] font-medium text-zinc-700">Suppression Interval</div>
                                <select
                                    value={suppressionInterval}
                                    onChange={e => setSuppressionInterval(e.target.value)}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-[13px] text-zinc-700"
                                >
                                    <option value="">Select interval...</option>
                                    <option value="7d">Last 7 days</option>
                                    <option value="14d">Last 14 days</option>
                                    <option value="30d">Last 30 days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 text-[15px] font-medium text-zinc-800">Campaign Summary</div>
                        <div className="space-y-2 text-[13px]">
                            <SummaryRow label="Campaign Type" value="Email Marketing" />
                            <SummaryRow label="Template" value={chosen?.title ?? "Summer Sale"} />
                            <SummaryRow label="Target Segment" value={selected.name} />
                            <SummaryRow label="Total Recipients" value={selected.count.toLocaleString()} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer actions */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                    ← Back to Template
                </button>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDraft}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={handleContinue}
                        className="rounded-md bg-[#0F5A62] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                    >
                        Continue to Schedule →
                    </button>
                </div>
            </div>

            <DraftSuccessModal
                open={showDraftModal}
                onClose={() => setShowDraftModal(false)}
                onViewAll={() => navigate("/campaign/all-campaign")}
                onContinueEditing={() => setShowDraftModal(false)}
            />
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="text-zinc-500">{label}</div>
            <div className="font-medium text-zinc-800">{value}</div>
        </div>
    );
}
