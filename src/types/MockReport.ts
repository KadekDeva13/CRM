import { type CampaignReport } from "./Report";

export const mockReports: CampaignReport[] = [
  {
    id: "r1",
    name: "Summer Beach Getaway 2024",
    channel: "Email",
    date: "2024-03-15",
    sent: 12450,
    bookings: 287,
    revenue: 145680,
    opens: 8921,
    openRate: 0.717,
    clicks: 1789,
    ctr: 0.201,
    unsubscribes: 23,
  },
  {
    id: "r2",
    name: "Welcome New Guests",
    channel: "Email",
    date: "2024-03-10",
    sent: 12450,
    bookings: 287,
    revenue: 89340,
    opens: 4234,
    openRate: 0.747,
    clicks: 892,
    ctr: 0.211,
    unsubscribes: 23
  },
  {
    id: "r4",
    name: "VIP Member Exclusive Offer",
    channel: "SMS",
    date: "2024-03-08",
    sent: 2341,
    bookings: 89,
    revenue: 67890,
    opens:2198,
    openRate: 0.939,
    clicks: 467,
    ctr: 0.199,
    unsubscribes: 23
  },
  {
    id: "r5",
    name: "Last Minute Weekend Deals",
    channel: "Email",
    date: "2024-03-05",
    sent: 9876,
    bookings: 198,
    revenue: 112450,
    opens: 6789,
    openRate: 0.687,
    clicks: 1234,
    ctr: 0.125,
    unsubscribes: 23
  }
];
