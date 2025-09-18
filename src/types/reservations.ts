export type ReservationStatus = "Pending" | "Responded" | "Checked In" | "Cancelled";

export type Reservation = {
  id: string;          
  guest: string;       
  room: string;        
  checkIn: string;     
  checkOut: string;     
  pax: number;          
  status: ReservationStatus;
};
