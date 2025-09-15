export type GuestStatus = "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";

export type Guest = {
  id: string;
  name: string;
  avatarUrl?: string;
  lastStayDate: string;   
  offering: number;       
  status: GuestStatus;
};
