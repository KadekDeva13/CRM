import type { Campaign } from "../types/email";

export const emailStats = {
  totalSubscribers: 18568,
  avgOpenRate: 28.9,
  ctr: 5,
  revenue: 491,
  deltas: {
    subscribers: "+0.35%",
    open: "+0.25%",
    ctr: "+0.05%",
    revenue: "+0.25%",
  },
};

export const campaigns: Campaign[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `cmp-${i + 1}`,
  title: "Summer Vacation Deals 2025",
  template: "Summer Vacation",
  recipients: 8547,
  scheduledAt: "2025-01-20T10:00:00Z",
  lastActivity: "2 hours ago",
  sent: 8567,
  opened: 2568,
  openRate: 30,
  clicked: 512,
  clickRate: 6,
  estRevenue: 12288,
  status: "Active",
  tags: ["Promotional"],
}));
