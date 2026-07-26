import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  fetchSettings as fetchSettingsService,
  saveSettings as saveSettingsService,
} from "../services/settingsService";

export function useDashboardSettings() {
  const [reservationEnabled, setReservationEnabled] =
    useState(true);

  const [isUpdatingSettings, setIsUpdatingSettings] =
    useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const settings =
        await fetchSettingsService();

      setReservationEnabled(
        settings.reservationEnabled
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const toggleReservationStatus =
    useCallback(async () => {
      try {
        setIsUpdatingSettings(true);

        const newValue =
          !reservationEnabled;

        await saveSettingsService(newValue);

        setReservationEnabled(newValue);

        toast.success(
          newValue
            ? "Reservations Enabled"
            : "Reservations Disabled"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to update settings."
        );
      } finally {
        setIsUpdatingSettings(false);
      }
    }, [reservationEnabled]);

  return {
    reservationEnabled,
    isUpdatingSettings,
    toggleReservationStatus,
    refreshSettings: loadSettings,
  };
}