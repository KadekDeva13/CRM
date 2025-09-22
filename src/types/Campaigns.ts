export type CampaignStatus = "Active" | "Pending" | "Completed";
export type CampaignTag = "Email Marketing" | "Holiday Campaign" | "Promo" | "Other";
export type Campaign = {
  id: string;
  name: string;
  tag: CampaignTag;
  status: CampaignStatus;
  delivery: string;         
  updatedAt: string;         
  updatedBy: string;        
};

export const campaignsSeed: Campaign[] = [
  {
    id: "1",
    name: "Valentine 2025",
    tag: "Email Marketing",
    status: "Active",
    delivery: "After Checkout",
    updatedAt: "2025-09-06T20:45:00Z",
    updatedBy: "MindiMedia",
  },
  {
    id: "2",
    name: "MindiMedia Anniversary",
    tag: "Email Marketing",
    status: "Pending",
    delivery: "2 hours after checkout",
    updatedAt: "2025-09-06T20:45:00Z",
    updatedBy: "MindiMedia",
  },
  {
    id: "3",
    name: "Back to Holiday",
    tag: "Holiday Campaign",
    status: "Completed",
    delivery: "9 hours after checkout",
    updatedAt: "2025-09-06T20:45:00Z",
    updatedBy: "MindiMedia",
  },
  {
    id: "4",
    name: "Guirez Grand Opening",
    tag: "Email Marketing",
    status: "Active",
    delivery: "a week after checkout",
    updatedAt: "2025-09-06T20:45:00Z",
    updatedBy: "MindiMedia",
  },
];
