export type GuestStatus = "Active" | "Pending" | "Rejected";

export type Guest = {
  id: string;
  name: string;
  avatarUrl?: string;
  lastStayDate: string;   
  offering: number;       
  status: GuestStatus;
};
