import { Timestamp } from "firebase/firestore";

export interface ReservationData {
  id: string;

  fullName: string;

  email: string;

  phoneNumber: string;

  date: string;

  time: string;

  guests: number;

  status: "pending" | "confirmed" | "cancelled";

  createdAt?: Timestamp;

  specialRequests?: string;
}

export interface DashboardProps {
  onClose: () => void;
}