import { LazyMotion, domAnimation, m } from "motion/react";
import type { ReservationData } from "../types/reservation";
import type { DashboardProps } from "./dashboard/types";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useReservations } from "../hooks/useReservations";
import { useDashboardAnalytics } from "../hooks/useDashboardAnalytics";
import { usePagination } from "../hooks/usePagination";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useDashboardSettings } from "../hooks/useDashboardSettings";
import { useDashboardUI } from "../hooks/useDashboardUI";
import { useSelection } from "../hooks/useSelection";
import { useBulkReservationActions } from "../hooks/useBulkReservationActions";
import { useTableSorting } from "../hooks/useTableSorting";
import { exportReservationsCSV } from "../utils/exportReservationsCSV";
import { printReservations } from "../utils/printReservations";
import ViewModeToggle from "./dashboard/components/ViewModeToggle";
import DeleteReservationDialog from "./dashboard/components/DeleteReservationDialog";
import ReservationDetailsModal from "./dashboard/components/ReservationDetailsModal";
import { AnimatePresence } from "motion/react";
import { useContextMenu } from "../hooks/useContextMenu";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useActiveRow } from "../hooks/useActiveRow";
import { useFilterPresets } from "../hooks/useFilterPresets";
import FilterPresets from "./dashboard/components/FilterPresets";
import CommandPalette, { type CommandItem } from "./dashboard/components/CommandPalette";
import { useRecentCommands } from "../hooks/useRecentCommands";

import {
  useSavedViews,
  type SavedView,
} from "../hooks/useSavedViews";

import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  useCallback,
  memo,
} from "react";

import {
  ITEMS_PER_PAGE,
  STATUS_COLORS,
  STATUS_LABELS,
  CHART_COLORS,
} from "./dashboard/constants";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  db,
  auth,
} from "../lib/firebase";

import {
  ArrowLeft,
  LogOut,
  Lock,
  Calendar,
  Users,
  Clock,
  Loader2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  XCircle,
  ListOrdered,
  LayoutGrid,
  Table2,
  RefreshCw,
  Clock3,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
} from "recharts";

const DashboardHeader = lazy(() =>
  import("./dashboard/components/DashboardHeader")
);

const DashboardStats = lazy(() =>
  import("./dashboard/components/DashboardStats")
);

const DashboardCharts = lazy(() =>
  import("./dashboard/components/DashboardCharts")
);

const DashboardActions = lazy(() =>
  import("./dashboard/components/DashboardActions")
);

const ReservationFilters = lazy(() =>
  import("./dashboard/components/ReservationFilters")
);

const QuickDateFilters = lazy(() =>
  import("./dashboard/components/QuickDateFilters")
);

const ReservationCards = lazy(() =>
  import("./dashboard/components/ReservationCards")
);

const ReservationTable = lazy(() =>
  import("./dashboard/components/ReservationTable")
);

const DashboardPagination = lazy(() =>
  import("./dashboard/components/DashboardPagination")
);

const BulkActionBar = lazy(() =>
  import("./dashboard/components/BulkActionBar")
);

const BulkSelectionToolbar = lazy(() =>
  import("./dashboard/components/BulkSelectionToolbar")
);

const ReservationTableSkeleton = lazy(() =>
  import("./dashboard/components/ReservationTableSkeleton")
);

const ReservationContextMenu = lazy(() =>
  import("./dashboard/components/ReservationContextMenu")
);

const ActiveFilterChips = lazy(() =>
  import("./dashboard/components/ActiveFilterChips")
);

const SavedViews = lazy(() =>
  import("./dashboard/components/SavedViews")
);

// ==========================================
// ANALYTICS
// ==========================================


export default function AdminDashboard({
  onClose,
}: DashboardProps) {

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  // ==========================================
  // AUTH STATES
  // ==========================================

  const [user, setUser] =
    useState<User | null>(null);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isAuthenticating, setIsAuthenticating] =
    useState(false);

  const [authError, setAuthError] =
    useState("");

  const [authChecked, setAuthChecked] =
    useState(false);

  const [commandPaletteOpen, setCommandPaletteOpen] =
    useState(false);

  const [commandQuery, setCommandQuery] =
    useState("");

  const [selectedCommandIndex, setSelectedCommandIndex] =
    useState(0);

  const {

  searchTerm,
  setSearchTerm,

  statusFilter,
  setStatusFilter,

  dateFilter,
  setDateFilter,

  fromDate,
  setFromDate,

  toDate,
  setToDate,

  viewMode,
  setViewMode,

  filterPreset,
  setFilterPreset,

  selectedReservation,
  setSelectedReservation,

  showReservationModal,
  setShowReservationModal,
} = useDashboardUI();

   const {
    reservations,
    isLoadingData,
    dataError,
    refreshReservations,
    changeReservationStatus,
    removeReservation,
  } = useReservations();

  const {
    monthlyAnalytics,
    busyHours,
  } = useDashboardAnalytics(
    reservations
  );

  const {
    totalReservations,
    pendingReservations,
    confirmedReservations,
    cancelledReservations,
  } = useDashboardStats(reservations);

  const {
    reservationEnabled,
    isUpdatingSettings,
    toggleReservationStatus,
  } = useDashboardSettings();

  const {
    selectedIds,
    isSelected,
    toggleSelection,
    clearSelection,
    selectAll,
  } = useSelection();

  const {
    bulkConfirm,
    bulkCancel,
    bulkDelete,
  } = useBulkReservationActions();

  const {
    sortKey,
    direction,
    toggleSort,
    sortData,
  } = useTableSorting<ReservationData>();

  const {
    menu,
    openMenu,
    closeMenu,
  } = useContextMenu();

  const {
    savedViews,
    saveView,
    deleteView,
    setDefaultView,
    getDefaultView
  } = useSavedViews();

  const loadView = (view: SavedView) => {

    setSearchTerm(view.searchTerm);

    setStatusFilter(
      view.statusFilter as
        | "all"
        | "pending"
        | "confirmed"
        | "cancelled"
    );

    setDateFilter(view.dateFilter);

    setFromDate(view.fromDate);

    setToDate(view.toDate);

    setFilterPreset(
      view.filterPreset as
        | "all"
        | "today"
        | "pending"
        | "confirmed"
        | "cancelled"
        | "weekend"
        | "large"
    );

  };

  const saveCurrentView = () => {

    const name = prompt("Saved View Name");

    if (!name) return;

    saveView({

      id: crypto.randomUUID(),

      name,

      searchTerm,

      statusFilter,

      dateFilter,

      fromDate,

      toDate,

      filterPreset,

    });

  };

  const commands: CommandItem[] = [
    {
      id: "refresh",
      title: "Refresh Reservations",
      description: "Reload reservation data",
      group: "Dashboard",
      icon: <RefreshCw size={16} />,
      action: () => {
        addRecent("refresh");
        refreshReservations();
      },
      },

    {
      id: "today",
      title: "Today's Reservations",
      description: "Show today's reservations",
      group: "Reservations",
      icon: <Calendar size={16} />,
      action: () => {
        addRecent("today");
        // existing action
      },
    },

    {
      id: "logout",
      title: "Logout",
      description: "Sign out of dashboard",
      group: "Account",
      icon: <LogOut size={16} />,
      action: () => {
        addRecent("logout");
        handleLogout();
      },
    },

    {
      id: "pending",
      title: "Pending Reservations",
      description: "Show only pending reservations",
      group: "Reservations",
      icon: <Clock3 size={16} />,
      action: () => {
        addRecent("pending");
        setStatusFilter("pending");
      },
    },

    {
      id: "cancelled",
      title: "Cancelled Reservations",
      description: "Show cancelled reservations",
      group: "Reservations",
      icon: <XCircle size={16} />,
      action: () => {
        addRecent("cancelled");
        setStatusFilter("cancelled");
      },
    },
    
    {
      id: "confirmed",
      title: "Show Confirmed Reservations",
      description: "Show confirmed reservations",
      action: () => setStatusFilter("confirmed"),
    },

    {
      id: "cards",
      title: "Switch to Card View",
      description: "Switch to card layout",
      action: () => setViewMode("cards"),
    },

    {
      id: "table",
      title: "Switch to Table View",
      description: "Switch to table layout",
      action: () => setViewMode("table"),
    },
    {
      id: "logout",
      title: "Logout",
      description: "Sign out of dashboard",
    action: handleLogout,
    },
  ];

  useEffect(() => {
    const view =
      getDefaultView();
    if (view) {
      loadView(view);
    }
  }, [savedViews]);

  useEffect(() => {

    const handler = (event: KeyboardEvent) => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        setCommandPaletteOpen(true);

        setCommandQuery("");

        setSelectedCommandIndex(0);

      }

      if (
      event.key === "Escape"
      ) {

        setCommandPaletteOpen(false);

      }

    };

    window.addEventListener(
      "keydown",
      handler
    );

    return () =>

      window.removeEventListener(
        "keydown",
        handler
      );

  }, []);

  const {
    recent,
    addRecent,
  } = useRecentCommands();

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setAuthChecked(true);

        }
      );

    return () => unsubscribe();

  }, []);

  // ==========================================
  // LOAD INITIAL DATA
  // ==========================================

  useEffect(() => {
    if (user) {
      refreshReservations();
    }
  }, [user, refreshReservations]);

  // ==========================================
  // FILTER RESERVATIONS
  // ==========================================

  const filteredReservations = useMemo(() => {

    return reservations.filter((reservation) => {

      const matchesSearch =

        reservation.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

        ||

        reservation.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

        ||

        reservation.phoneNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =

        statusFilter === "all"
          ? true
          : reservation.status === statusFilter;

      const matchesDate =

        dateFilter === ""
          ? true
          : reservation.date === dateFilter;

      const reservationDate = new Date(reservation.date);
      const matchesRange =
        (!fromDate ||
          reservationDate >= new Date(fromDate))
        &&
        (!toDate ||
          reservationDate <= new Date(toDate));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate &&
        matchesRange

      );

    });

  }, [
    reservations,
    searchTerm,
    statusFilter,
    dateFilter,
  ]);

  const presetReservations = useFilterPresets(
    filteredReservations,
    filterPreset
  );

  const dashboardStats = useMemo(() => {
    return {
      total: filteredReservations.length,
      pending: filteredReservations.filter(
        (r) => r.status === "pending"
      ).length,
      confirmed: filteredReservations.filter(
        (r) => r.status === "confirmed"
      ).length,
      cancelled: filteredReservations.filter(
        (r) => r.status === "cancelled"
      ).length,
    };
  }, [filteredReservations]);

  const {
    currentPage,
    totalPages,
    paginatedData: currentReservations,
    setCurrentPage,
    nextPage,
    previousPage,
  } = usePagination({
    data: presetReservations,
    itemsPerPage: ITEMS_PER_PAGE,
  });

      useKeyboardShortcuts({

        selectedIds,

        reservations: currentReservations,

        selectAll,

        clearSelection,

        onDelete: async () => {

          if (

            !window.confirm(

              "Delete selected reservations?"

            )

          ) return;

          await bulkDelete(selectedIds);

          await refreshReservations();

          clearSelection();

        },

        onOpen: () => {

          if (selectedIds.length !== 1) return;

          const reservation = currentReservations.find(

            r => r.id === selectedIds[0]

          );

          if (!reservation) return;

          setSelectedReservation(reservation);

          setShowReservationModal(true);

        },

        onCopy: () => {

         navigator.clipboard.writeText(

            selectedIds.join(",")

          );

        },

      });

      const {
        activeIndex,
        setActiveIndex,
        moveUp,
        moveDown,
      } = useActiveRow();

  // ==========================================
  // ANALYTICS DATA
  // ==========================================

  const reservationStatusData = useMemo(() => {
    return [
      {
        name: "Pending",
        value: pendingReservations,
      },
      {
        name: "Confirmed",
        value: confirmedReservations,
      },
      {
        name: "Cancelled",
        value: cancelledReservations,
      },
   ];
  }, [
    pendingReservations,
    confirmedReservations,
    cancelledReservations,
  ]);

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setIsAuthenticating(true);

    setAuthError("");

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success("Login successful.");

    } catch (error: any) {

      console.error(error);

      if (
        error.code ===
        "auth/invalid-credential"
      ) {

        setAuthError(
          "Invalid email or password."
        );

      } else if (
        error.code ===
        "auth/operation-not-allowed"
      ) {

        setAuthError(
          "Email/Password authentication is disabled."
        );

      } else {

        setAuthError(
          error.message ||
          "Login failed."
        );

      }

    } finally {

      setIsAuthenticating(false);

    }

  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (!authChecked) {

    return (

      <div className="min-h-screen bg-brand-dark flex items-center justify-center">

        <Loader2 className="w-8 h-8 text-brand-neon animate-spin" />

      </div>

    );

  }

  // ==========================================
  // LOGIN SCREEN
  // ==========================================

  if (!user) {

    return (

      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">

        <div className="absolute top-8 left-8">

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >

            <ArrowLeft className="w-5 h-5" />

            Back to Website

          </button>

        </div>

        <m.div

        onClick={closeMenu}

          initial={{ opacity: 0, scale: 0.95 }}

          animate={{ opacity: 1, scale: 1 }}

          className="w-full max-w-md bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl"

        >

          <div className="text-center mb-8">

            <div className="w-16 h-16 mx-auto rounded-full bg-brand-neon/20 flex items-center justify-center mb-4">

              <Lock className="w-8 h-8 text-brand-neon" />

            </div>

            <h2 className="text-3xl font-bold text-white">

              Staff Login

            </h2>

            <p className="text-white/60 mt-2">

              Reservation Management Dashboard

            </p>

          </div>

          {authError && (

            <div className="mb-5 p-4 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 flex gap-3">

              <AlertCircle className="w-5 h-5 shrink-0" />

              <span>{authError}</span>

            </div>

          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label className="block text-white/80 text-sm mb-2">

                Email

              </label>

              <input

                type="email"

                required

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-neon outline-none"

              />

            </div>

            <div>

              <label className="block text-white/80 text-sm mb-2">

                Password

              </label>

              <input

                type="password"

                required

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-neon outline-none"

              />

            </div>

            <button

              type="submit"

              disabled={isAuthenticating}

              className="w-full py-4 rounded-lg bg-brand-neon text-brand-dark font-bold hover:bg-white transition-colors flex justify-center items-center gap-2"

            >

              {isAuthenticating ? (

                <Loader2 className="w-5 h-5 animate-spin" />

              ) : (

                "Sign In"

              )}

            </button>

          </form>

        </m.div>

      </div>

    );

  }

  // ==========================================
  // DASHBOARD
  // ==========================================

return (

  <Suspense
    fallback={
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="flex items-center gap-3 text-brand-neon">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xl font-semibold">
            Loading Dashboard...
          </span>
        </div>
      </div>
    }
  >

    <LazyMotion features={domAnimation}>

      <div className="min-h-screen bg-brand-dark p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        <DashboardHeader
          userEmail={user?.email ?? ""}
          reservationEnabled={reservationEnabled}
          isUpdatingSettings={isUpdatingSettings}
          onClose={onClose}
          onLogout={handleLogout}
          onToggleReservation={toggleReservationStatus}
          onRefresh={refreshReservations}
          onPrint={() =>
            printReservations(filteredReservations)
          }
          onExportCSV={() =>
            exportReservationsCSV(filteredReservations)
          }
        />

        <BulkSelectionToolbar
          count={selectedIds.length}
          onConfirm={() => bulkConfirm(selectedIds)}
          onCancel={() => bulkCancel(selectedIds)}
          onDelete={() => bulkDelete(selectedIds)}
          onClear={clearSelection}
        />

        <DashboardActions
          reservationEnabled={reservationEnabled}
          isUpdatingSettings={isUpdatingSettings}
          toggleReservationStatus={toggleReservationStatus}
          fetchReservations={refreshReservations}
          handleLogout={handleLogout}
          exportReservationsCSV={() =>
            exportReservationsCSV(filteredReservations)
          }
          printReservations={() =>
            printReservations(filteredReservations)
          }
        />

        <ViewModeToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <ReservationFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />

        <QuickDateFilters
          setFromDate={setFromDate}
          setToDate={setToDate}
          onSaveView={saveCurrentView}
        />

        <SavedViews
          savedViews={savedViews}
          onLoad={loadView}
          onDelete={deleteView}
          onDefault={setDefaultView}
        />

        <ActiveFilterChips
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          dateFilter={dateFilter}
          fromDate={fromDate}
          toDate={toDate}
          filterPreset={filterPreset}
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
          setDateFilter={setDateFilter}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setFilterPreset={setFilterPreset}
        />

        <FilterPresets
          filterPreset={filterPreset}
          setFilterPreset={setFilterPreset}
        />

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <BulkActionBar
              selectedCount={selectedIds.length}

              onConfirm={async () => {
                await bulkConfirm(selectedIds);
                await refreshReservations();
                clearSelection();
              }}

              onCancel={async () => {
                await bulkCancel(selectedIds);
                await refreshReservations();
                clearSelection();
              }}

              onDelete={async () => {
                if (
                  !window.confirm(
                    "Delete selected reservations?"
                  )
                ) return;

                await bulkDelete(selectedIds);
                await refreshReservations();
                clearSelection();
              }}

              onClear={clearSelection}
            />
          )}
        </AnimatePresence>

        <ReservationContextMenu

        visible={menu.visible}

        x={menu.x}

        y={menu.y}

        reservation={menu.reservation}

        onView={()=>{
  
        if(menu.reservation){

          setSelectedReservation(
            menu.reservation
          );

          setShowReservationModal(true);

          }

          closeMenu();

        }}

        onConfirm={async()=>{

          if(menu.reservation){

            await changeReservationStatus(

              menu.reservation.id,

              "confirmed"

            );

          }

          closeMenu();

        }}

        onCancel={async()=>{

          if(menu.reservation){

            await changeReservationStatus(

              menu.reservation.id,

              "cancelled"

            );

          }

          closeMenu();

        }}

        onDelete={async()=>{

          if(menu.reservation){

            await removeReservation(

              menu.reservation.id

            );

          }

          closeMenu();

        }}

        onCopyPhone={()=>{

          navigator.clipboard.writeText(

            menu.reservation?.phoneNumber??

            ""

          );

          closeMenu();

        }}

        onCopyEmail={()=>{

          navigator.clipboard.writeText(

            menu.reservation?.email??

            ""

          );

          closeMenu();

        }}

        />

        <DashboardStats
          totalReservations={dashboardStats.total}
          pendingReservations={dashboardStats.pending}
          confirmedReservations={dashboardStats.confirmed}
          cancelledReservations={dashboardStats.cancelled}
        />

        <DashboardCharts
          reservationStatusData={reservationStatusData}
          monthlyData={monthlyAnalytics}
          hourlyData={busyHours}
        />

        {viewMode === "cards" ? (
          <ReservationCards
            isLoadingData={isLoadingData}
            dataError={dataError}
            currentReservations={currentReservations}
            updateReservationStatus={changeReservationStatus}
            deleteReservation={removeReservation}
            onView={(reservation) => {
              setSelectedReservation(reservation);
              setShowReservationModal(true);
            }}
          />
        ) : (
          <>
            isLoadingData ? (
              <ReservationTableSkeleton />
            ) : (
              <ReservationTable
              reservations={currentReservations}

              onConfirm={(id) =>
                changeReservationStatus(id, "confirmed")
              }

              onCancel={(id) =>
                changeReservationStatus(id, "cancelled")
              }

              onDelete={removeReservation}

              onView={(reservation) => {
                setSelectedReservation(reservation);
                setShowReservationModal(true);
              }}

              selectedIds={selectedIds}
              isSelected={isSelected}
              toggleSelection={toggleSelection}
              selectAll={selectAll}

              activeIndex={activeIndex}

              setActiveIndex={setActiveIndex}

              sortKey={sortKey}
              direction={direction}
              toggleSort={toggleSort}

              onRowContextMenu={openMenu}
            />
           )

            <DashboardPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

      </div>

    </div>

            <ReservationDetailsModal
              open={showReservationModal}
              reservation={selectedReservation}
              onClose={() => {
                setShowReservationModal(false);
                setSelectedReservation(null);
              }}
            />

   </LazyMotion>

            <CommandPalette
              open={commandPaletteOpen}
              query={commandQuery}
              setQuery={setCommandQuery}
              commands={commands}
              recent={recent}
              selectedIndex={selectedCommandIndex}
              setSelectedIndex={setSelectedCommandIndex}
              onClose={() => {
                setCommandPaletteOpen(false);
                setCommandQuery("");
                setSelectedCommandIndex(0);
              }}
            />

  </Suspense>

 );

}