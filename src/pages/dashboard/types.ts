import { Timestamp } from "firebase/firestore";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled";

export interface ReservationData {
  id: string;

  fullName: string;

  email: string;

  phoneNumber: string;

  date: string;

  time: string;

  guests: number;

  status: ReservationStatus;

  createdAt?: Timestamp;

  specialRequests?: string;
}

export interface DashboardProps {
  onClose: () => void;
}