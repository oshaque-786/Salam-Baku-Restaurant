// ==========================================
// Imports
// ==========================================

import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import {
  db,
  handleFirestoreError,
  OperationType,
} from "../lib/firebase";

import type { ReservationData } from "../types/reservation";

// ==========================================
// Reservation CRUD Services
// ==========================================

/**
 * Fetch latest reservations
 */
export async function fetchReservations(): Promise<
  ReservationData[]
> {
  try {
    const reservationsQuery = query(
      collection(db, "reservations"),
      orderBy("createdAt", "desc"),
      limit(100)
    );

    const snapshot = await getDocs(reservationsQuery);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<ReservationData, "id">),
    }));

  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.LIST,
      "reservations"
    );

    return [];
  }
}

// ==========================================
// Update Reservation Status
// ==========================================

export async function updateReservationStatus(
  id: string,
  status:
    | "pending"
    | "confirmed"
    | "cancelled"
) {
  try {
    const reservationRef = doc(
      db,
      "reservations",
      id
    );

    await updateDoc(reservationRef, {
      status,
    });
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.UPDATE,
      `reservations/${id}`
    );

    throw error;
  }
}

// ==========================================
// Delete Reservation
// ==========================================

export async function deleteReservation(
  id: string
) {
  try {
    await deleteDoc(
      doc(db, "reservations", id)
    );
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.DELETE,
      `reservations/${id}`
    );

    throw error;
  }
}

// ==========================================
// Create Reservation
// ==========================================

export async function createReservation(
  data: ReservationData
) {
  try {
    return await addDoc(
      collection(db, "reservations"),
      {
        ...data,
        createdAt: serverTimestamp(),
      }
    );
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.CREATE,
      "reservations"
    );

    throw error;
  }
}

// ==========================================
// Check Duplicate Reservation
// ==========================================

export async function checkDuplicateReservation(
  phoneNumber: string,
  date: string,
  time: string
) {
  try {
    const reservationQuery = query(
      collection(db, "reservations"),
      where("phoneNumber", "==", phoneNumber),
      where("date", "==", date),
      where("time", "==", time)
    );

    const snapshot = await getDocs(
      reservationQuery
    );

    return !snapshot.empty;
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.GET,
      "reservations"
    );

    throw error;
  }
}

// ==========================================
// Reservation Settings
// ==========================================

export async function fetchReservationSettings() {
  try {
    const settingsRef = doc(
      db,
      "settings",
      "config"
    );

    const settingsSnap = await getDoc(
      settingsRef
    );

    if (!settingsSnap.exists()) {
      return true;
    }

    return (
      settingsSnap.data().reservationEnabled ??
      true
    );
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.GET,
      "settings/config"
    );

    return true;
  }
}