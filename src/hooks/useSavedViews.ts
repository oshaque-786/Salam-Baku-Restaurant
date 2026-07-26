import { useEffect, useState } from "react";

export interface SavedView {

  id: string;

  name: string;

  searchTerm: string;

  statusFilter: string;

  dateFilter: string;

  fromDate: string;

  toDate: string;

  filterPreset: string;

}

const STORAGE_KEY = "dashboard_saved_views";

const DEFAULT_VIEW_KEY = "dashboard_default_view";

export function useSavedViews() {

  const [savedViews, setSavedViews] =
    useState<SavedView[]>([]);

  useEffect(() => {

    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (!raw) return;

    try {

      setSavedViews(JSON.parse(raw));

    } catch {

      setSavedViews([]);

    }

  }, []);

  const persist = (views: SavedView[]) => {

    setSavedViews(views);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(views)
    );

  };

  const saveView = (view: SavedView) => {

    persist([...savedViews, view]);

  };

  const deleteView = (id: string) => {

    persist(

      savedViews.filter(v => v.id !== id)

    );

  };

const setDefaultView = (id: string) => {

  localStorage.setItem(
    DEFAULT_VIEW_KEY,
    id
  );

};

const getDefaultView = () => {

  const id =
    localStorage.getItem(DEFAULT_VIEW_KEY);

  if (!id) return null;

  return (
    savedViews.find(v => v.id === id) ?? null
  );

};

  return {
    savedViews,
    saveView,
    deleteView,
    setDefaultView,
    getDefaultView,

  };

}