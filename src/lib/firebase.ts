import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import firebaseConfig from "../../firebase-applet-config.json";

import { handleFirestoreError } from "./firestoreHelpers";

// ==========================================
// FIREBASE INITIALIZATION
// ==========================================

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: false,
    ignoreUndefinedProperties: true,
  },
  firebaseConfig.firestoreDatabaseId
);

export const auth = getAuth(app);

// ==========================================
// FIRESTORE OPERATION TYPES
// ==========================================

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

// ==========================================
// FIRESTORE ERROR HANDLER
// ==========================================

export { handleFirestoreError };

// ==========================================
// AUTH HELPERS
// ==========================================

export async function adminLogin(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function adminLogout() {
  return signOut(auth);
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(
    auth,
    email
  );
}

// ==========================================
// AUTH LISTENER
// ==========================================

export { onAuthStateChanged };