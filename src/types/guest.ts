export type GuestStatus = "Active" | "Pending" | "Rejected";

export type Guest = {
  id: string;
  name: string;
  avatarUrl?: string;
  lastStayDate: string;
  offering: number;
  status: GuestStatus;
};

export type GuestEmergencyContact = {
  name: string;
  relationship?: string;
  phone: string;
};

export type GuestIdentification = {
  type: string;
  number: string;
  expiryDate: string;
};

export type GuestStayStatus = "Completed" | "Upcoming" | "Cancelled";

export type GuestStayHistory = {
  id: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  bookingSource: string;
  totalSpend: number;
  status: GuestStayStatus;
};

export type GuestPreferenceSection = {
  title: string;
  items: Array<{ question: string; answer: string }>;
};

export type GuestReview = {
  id: string;
  rating: number;
  comment: string;
  stayDates: string;
  roomType: string;
  postedAt: string;
};

export type GuestReviewSummary = {
  averageRating: number;
  totalReviews: number;
  distribution: Array<{ label: string; value: number }>;
};

export type GuestDatabaseRecord = {
  id: number;
  name: string;
  phone: string;
  email: string;
  totalSpending: number;
  totalStays: number;
  totalNights: number;
  avatar: string;
  companyName?: string;
  guestCode?: string;
  lastStayDays?: number;
  loyaltyPoints?: number;
  dateOfBirth?: string;
  nationality?: string;
  address?: string;
  emergencyContact?: GuestEmergencyContact;
  preferredLanguages?: string[];
  identification?: GuestIdentification;
  stayHistory?: GuestStayHistory[];
  preferences?: GuestPreferenceSection[];
  reviewSummary?: GuestReviewSummary;
  reviews?: GuestReview[];
};

export type GuestProfile = GuestDatabaseRecord;