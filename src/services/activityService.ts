import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export type ActivityType =
  | "created"
  | "confirmed"
  | "cancelled"
  | "deleted";

export async function addActivity(
  type: ActivityType,
  title: string,
  description: string
) {
  await addDoc(
    collection(db, "activities"),
    {
      type,
      title,
      description,
      createdAt: serverTimestamp(),
    }
  );
}