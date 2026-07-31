import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../lib/firebase";

import type {
  ActivityItem,
} from "../pages/dashboard/components/ActivityTimeline";

export function useActivityTimeline() {
  const [activities, setActivities] =
    useState<ActivityItem[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "activities"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe =
      onSnapshot(q, snapshot => {
        const items =
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as ActivityItem[];

        setActivities(items);
      });

    return unsubscribe;
  }, []);

  return activities;
}