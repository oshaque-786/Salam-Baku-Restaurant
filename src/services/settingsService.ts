import {
  db,
  handleFirestoreError,
  OperationType,
} from "../lib/firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const SETTINGS_PATH = "settings/config";

export async function fetchSettings() {
  try {

    const settingsRef = doc(
      db,
      "settings",
      "config"
    );

    const snapshot = await getDoc(
      settingsRef
    );

    if (!snapshot.exists()) {
      return {
        reservationEnabled: true,
      };
    }

    return {
      reservationEnabled:
        snapshot.data().reservationEnabled ??
        true,
    };

  } catch (error) {

    handleFirestoreError(
      error,
      OperationType.GET,
      SETTINGS_PATH
    );

    throw error;

  }

}

export async function saveSettings(
  reservationEnabled: boolean
) {

  try {

    await setDoc(

      doc(
        db,
        "settings",
        "config"
      ),

      {
        reservationEnabled,
      },

      {
        merge: true,
      }

    );

  } catch (error) {

    handleFirestoreError(
      error,
      OperationType.UPDATE,
      SETTINGS_PATH
    );

    throw error;

  }

}