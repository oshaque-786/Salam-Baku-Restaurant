import {
  adminLogin,
  adminLogout,
  resetPassword,
  auth,
  onAuthStateChanged,
} from "../lib/firebase";

export async function loginService(
  email: string,
  password: string
) {
  return await adminLogin(email, password);
}

export async function logoutService() {
  return await adminLogout();
}

export async function resetPasswordService(
  email: string
) {
  return await resetPassword(email);
}

export function subscribeAuthState(
  callback: Parameters<typeof onAuthStateChanged>[1]
) {
  return onAuthStateChanged(auth, callback);
}