import type { Reservation } from "./reservations";

export const reservationStats = {
  total: 145,
  checkedIn: 42,
  pending: 18,
  todayCheckIns: 24,
};

export const reservationsSeed: Reservation[] = [
  { id: "RSV-001", guest: "John Smith",  room: "Deluxe Suite 204",    checkIn: "2024-01-15", checkOut: "2024-01-18", pax: 2, status: "Pending" },
  { id: "RSV-002", guest: "MindiMedia",  room: "Executive Suite 204", checkIn: "2024-01-13", checkOut: "2024-01-13", pax: 4, status: "Responded" },
  { id: "RSV-003", guest: "Prabowo Subianto", room: "Deluxe Suite 204", checkIn: "2024-01-19", checkOut: "2024-01-21", pax: 2, status: "Pending" },
];
