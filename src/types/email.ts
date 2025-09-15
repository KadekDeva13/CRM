export type CampaignStatus = "Active" | "Draft" | "Scheduled" | "Paused";
export type CampaignTag = "Promotional" | "Transactional" | "Newsletter";

export interface Campaign {
  id: string;
  title: string;
  template: string;
  recipients: number;
  scheduledAt?: string; 
  lastActivity?: string; 
  sent: number;
  opened: number;     
  openRate: number;   
  clicked: number;    
  clickRate: number;  
  estRevenue: number; 
  status: CampaignStatus;
  tags: CampaignTag[];
}
