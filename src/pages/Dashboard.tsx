import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import DashboardHeader from "./dashboard/components/DashboardHeader";

import {
  ITEMS_PER_PAGE,
  STATUS_COLORS,
  STATUS_LABELS,
  CHART_COLORS,
} from "./dashboard/constants";

import type {
  ReservationData,
  DashboardProps,
} from "./dashboard/types";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  db,
  auth,
  handleFirestoreError,
  OperationType,
} from "../lib/firebase";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

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

// ==========================================
// ANALYTICS
// ==========================================

interface MonthlyAnalytics {

  month: string;

  reservations: number;

}

interface BusyHour {

  time: string;

  reservations: number;

}

export default function AdminDashboard({
  onClose,
}: DashboardProps) {

  const { logout } = useAuth();

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

  // ==========================================
  // RESERVATION STATES
  // ==========================================

  const [reservations, setReservations] =
    useState<ReservationData[]>([]);

  const [isLoadingData, setIsLoadingData] =
    useState(false);

  const [dataError, setDataError] =
    useState("");

  // ==========================================
  // SETTINGS
  // ==========================================

  const [
    reservationEnabled,
    setReservationEnabled,
  ] = useState(true);

  const [
    isUpdatingSettings,
    setIsUpdatingSettings,
  ] = useState(false);

  // ==========================================
  // SEARCH
  // ==========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  // ==========================================
  // FILTERS
  // ==========================================

  const [statusFilter, setStatusFilter] =
    useState<
      "all" |
      "pending" |
      "confirmed" |
      "cancelled"
    >("all");

  const [dateFilter, setDateFilter] =
    useState("");

  // ==========================================
  // PAGINATION
  // ==========================================

  const [currentPage, setCurrentPage] =
    useState(1);

  // ==========================================
  // STATISTICS
  // ==========================================

  const [
    totalReservations,
    setTotalReservations,
  ] = useState(0);

  const [
    pendingReservations,
    setPendingReservations,
  ] = useState(0);

  const [
    confirmedReservations,
    setConfirmedReservations,
  ] = useState(0);

  const [
    cancelledReservations,
    setCancelledReservations,
  ] = useState(0);

  // ==========================================
  // ANALYTICS
  // ==========================================

  const [
    monthlyAnalytics,
    setMonthlyAnalytics,
  ] = useState<MonthlyAnalytics[]>([]);

  const [
    busyHours,
    setBusyHours,
  ] = useState<BusyHour[]>([]);
  // ==========================================
  // AUTH LISTENER
  // ==========================================

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

    if (!user) return;

    fetchSettings();

    fetchReservations();

  }, [user]);

  // ==========================================
  // FILTER RESERVATIONS
  // ==========================================

  const filteredReservations = useMemo(() => {

    return reservations.filter((reservation) => {

      const matchesSearch =

        reservation.fullName
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        reservation.email
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        reservation.phoneNumber
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =

        statusFilter === "all"

          ? true

          : reservation.status === statusFilter;

      const matchesDate =

        dateFilter === ""

          ? true

          : reservation.date === dateFilter;

      return (

        matchesSearch &&

        matchesStatus &&

        matchesDate

      );

    });

  }, [

    reservations,

    searchTerm,

    statusFilter,

    dateFilter,

  ]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.max(

    1,

    Math.ceil(

      filteredReservations.length /

      ITEMS_PER_PAGE

    )

  );

  const currentReservations =

    filteredReservations.slice(

      (currentPage - 1) *

      ITEMS_PER_PAGE,

      currentPage *

      ITEMS_PER_PAGE

    );

  // ==========================================
  // ANALYTICS DATA
  // ==========================================

  const reservationStatusData = [
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

  const monthlyData = [];

  const hourlyData = [];

  // ==========================================
  // RESET PAGE
  // ==========================================

  useEffect(() => {

    setCurrentPage(1);

  }, [

    searchTerm,

    statusFilter,

    dateFilter,

  ]);

  // ==========================================
  // LIVE STATISTICS
  // ==========================================

  useEffect(() => {

    setTotalReservations(

      reservations.length

    );

    setPendingReservations(

      reservations.filter(

        (r) =>

          r.status === "pending"

      ).length

    );

    setConfirmedReservations(

      reservations.filter(

        (r) =>

          r.status === "confirmed"

      ).length

    );

    setCancelledReservations(

      reservations.filter(

        (r) =>

          r.status === "cancelled"

      ).length

    );

  }, [

    reservations,

  ]);

  // ==========================================
  // ANALYTICS DATA
  // ==========================================

  useEffect(() => {

    const monthlyMap =
      new Map<string, number>();

    const hourMap =
      new Map<string, number>();

    reservations.forEach((reservation) => {

      const month =
        reservation.date?.substring(0, 7) ||
        "Unknown";

      monthlyMap.set(

        month,

        (monthlyMap.get(month) || 0) + 1

      );

      const hour =
        reservation.time?.split(":")[0] ||
        "00";

      hourMap.set(

        hour,

        (hourMap.get(hour) || 0) + 1

      );

    });

    setMonthlyAnalytics(

      Array.from(

        monthlyMap.entries()

      ).map(([month, reservations]) => ({

        month,

        reservations,

      }))

    );

    setBusyHours(

      Array.from(

        hourMap.entries()

      ).map(([time, reservations]) => ({

        time,

        reservations,

      }))

    );

  }, [

    reservations,

  ]);
  // ==========================================
  // FETCH SETTINGS
  // ==========================================

  const fetchSettings = async () => {

    try {

      const settingsRef = doc(
        db,
        "settings",
        "config"
      );

      const settingsSnap = await getDoc(
        settingsRef
      );

      if (settingsSnap.exists()) {

        setReservationEnabled(
          settingsSnap.data().reservationEnabled ?? true
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load settings."
      );

    }

  };

  // ==========================================
  // ENABLE / DISABLE RESERVATIONS
  // ==========================================

  const toggleReservationStatus = async () => {

    setIsUpdatingSettings(true);

    try {

      const newValue = !reservationEnabled;

      await setDoc(

        doc(
          db,
          "settings",
          "config"
        ),

        {
          reservationEnabled: newValue,
        },

        {
          merge: true,
        }

      );

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

  };

  // ==========================================
  // FETCH RESERVATIONS
  // ==========================================

  const fetchReservations = async () => {

    setIsLoadingData(true);

    setDataError("");

    try {

      const snapshot = await getDocs(

        collection(
          db,
          "reservations"
        )

      );

      const data = snapshot.docs.map((document) => ({

        id: document.id,

        ...document.data(),

      })) as ReservationData[];

      data.sort((a, b) => {

        const timeA =
          a.createdAt?.toMillis?.() ?? 0;

        const timeB =
          b.createdAt?.toMillis?.() ?? 0;

        return timeB - timeA;

      });

      setReservations(data);

    } catch (error: any) {

      console.error(error);

      setDataError(

        error.message ||
        "Unable to fetch reservations."

      );

      try {

        handleFirestoreError(

          error,

          OperationType.LIST,

          "reservations"

        );

      } catch { }

    } finally {

      setIsLoadingData(false);

    }

  };

  // ==========================================
  // UPDATE RESERVATION STATUS
  // ==========================================

  const updateReservationStatus = async (

    id: string,

    status: "confirmed" | "cancelled"

  ) => {

    try {

      await updateDoc(

        doc(
          db,
          "reservations",
          id
        ),

        {
          status,
        }

      );

      toast.success(
        `Reservation ${status}.`
      );

      fetchReservations();

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to update reservation."
      );

    }

  };

  // ==========================================
  // DELETE RESERVATION
  // ==========================================

  const deleteReservation = async (
    id: string
  ) => {

    const confirmed = window.confirm(

      "Delete this reservation permanently?"

    );

    if (!confirmed) return;

    try {

      await deleteDoc(

        doc(
          db,
          "reservations",
          id
        )

      );

      toast.success(
        "Reservation deleted."
      );

      fetchReservations();

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to delete reservation."
      );

    }

  };

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
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {

    try {

      await logout();

      toast.success(
        "Logged out successfully."
      );

      window.location.hash = "";

    } catch (error) {

      console.error(error);

      toast.error(
        "Logout failed."
      );

    }

  };

  // ==========================================
  // EXPORT CSV
  // ==========================================

  const exportReservationsCSV = () => {

    const headers = [

      "Name",
      "Email",
      "Phone",
      "Date",
      "Time",
      "Guests",
      "Status",

    ];

    const rows = reservations.map((r) => [

      r.fullName,

      r.email,

      r.phoneNumber,

      r.date,

      r.time,

      r.guests,

      r.status,

    ]);

    const csvContent =

      [headers, ...rows]

        .map((row) => row.join(","))

        .join("\n");

    const blob = new Blob(

      [csvContent],

      {
        type:
          "text/csv;charset=utf-8;",
      }

    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "reservations.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success(
      "CSV exported successfully."
    );

  };

  // ==========================================
  // PRINT REPORT
  // ==========================================

  const printReservations = () => {

    const printWindow =
      window.open("", "_blank");

    if (!printWindow) return;

    const tableRows = reservations
      .map(
        (r) => `
        <tr>
          <td>${r.fullName}</td>
          <td>${r.email}</td>
          <td>${r.phoneNumber}</td>
          <td>${r.date}</td>
          <td>${r.time}</td>
          <td>${r.guests}</td>
          <td>${r.status}</td>
        </tr>
      `
      )
      .join("");

    printWindow.document.write(`
      <html>
      <head>
        <title>Reservation Report</title>

        <style>

          body{
            font-family:Arial,sans-serif;
            padding:30px;
          }

          h2{
            text-align:center;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          th,td{
            border:1px solid #ccc;
            padding:10px;
            text-align:left;
          }

          th{
            background:#f3f3f3;
          }

        </style>

      </head>

      <body>

        <h2>Salam Baku Restaurant</h2>

        <h3>Reservation Report</h3>

        <table>

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            ${tableRows}

          </tbody>

        </table>

      </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

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

        <motion.div

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

        </motion.div>

      </div>

    );

  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div className="min-h-screen bg-brand-dark p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">

          <div className="flex items-center gap-4">

            <button

              onClick={onClose}

              className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white"

            >

              <ArrowLeft className="w-5 h-5" />

            </button>

            <div>

              <h1 className="text-3xl font-bold text-white">

                Reservation Dashboard

              </h1>

              <p className="text-white/60 mt-1">

                Logged in as {user.email}

              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={toggleReservationStatus}
              disabled={isUpdatingSettings}
              className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${reservationEnabled
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
                }`}
            >
              {isUpdatingSettings ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : reservationEnabled ? (
                <ToggleRight className="w-5 h-5" />
              ) : (
                <ToggleLeft className="w-5 h-5" />
              )}

              {reservationEnabled
                ? "Reservations Enabled"
                : "Reservations Disabled"}
            </button>

            <button
              onClick={fetchReservations}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
            >
              Refresh List
            </button>

            <button
              onClick={exportReservationsCSV}
              className="px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold hover:bg-white transition"
            >
              Export CSV
            </button>

            <button
              onClick={printReservations}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Print Report
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>

          </div>

          {/* ==========================================
            SEARCH + FILTERS
        ========================================== */}

          <div className="grid lg:grid-cols-3 gap-4 mb-8">

            {/* Search */}

            <input
              type="text"
              placeholder="Search by Name, Email or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-neon"
            />

            {/* Status Filter */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                  | "all"
                  | "pending"
                  | "confirmed"
                  | "cancelled"
                )
              }
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-neon"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Date Filter */}

            <input
              type="date"
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-neon"
            />

          </div>

          {/* Empty Search Result */}

          {!isLoadingData &&
            filteredReservations.length === 0 && (

              <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-8 text-center">

                <p className="text-white/60">

                  No reservations found matching your filters.

                </p>

              </div>

            )}
          {/* ==========================================
            STATISTICS CARDS
        ========================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {/* Total */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-white/60 text-sm">
                    Total Reservations
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-2">
                    {totalReservations}
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-brand-neon/20 flex items-center justify-center">

                  <ListOrdered className="w-7 h-7 text-brand-neon" />

                </div>

              </div>
            </motion.div>

            {/* Pending */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .05 }}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-yellow-300 text-sm">
                    Pending
                  </p>

                  <h2 className="text-4xl font-bold text-yellow-300 mt-2">
                    {pendingReservations}
                  </h2>

                </div>

                <Clock className="w-9 h-9 text-yellow-300" />

              </div>
            </motion.div>

            {/* Confirmed */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .10 }}
              className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-green-400 text-sm">
                    Confirmed
                  </p>

                  <h2 className="text-4xl font-bold text-green-400 mt-2">
                    {confirmedReservations}
                  </h2>

                </div>

                <CheckCircle className="w-9 h-9 text-green-400" />

              </div>
            </motion.div>

            {/* Cancelled */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .15 }}
              className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-red-400 text-sm">
                    Cancelled
                  </p>

                  <h2 className="text-4xl font-bold text-red-400 mt-2">
                    {cancelledReservations}
                  </h2>

                </div>

                <XCircle className="w-9 h-9 text-red-400" />

              </div>
            </motion.div>

          </div>
          {/* ==========================================
            ANALYTICS DASHBOARD
        ========================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

            {/* Reservation Status Pie Chart */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >

              <h2 className="text-xl font-bold text-white mb-6">

                Reservation Status

              </h2>

              <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={reservationStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      dataKey="value"
                      label
                    >

                      {reservationStatusData.map((entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />

                      ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </motion.div>
            {/* ==========================================
              MONTHLY RESERVATIONS
          ========================================== */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.10 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >

              <h2 className="text-xl font-bold text-white mb-6">

                Monthly Reservations

              </h2>

              <div className="h-80">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={monthlyData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#333"
                    />

                    <XAxis
                      dataKey="month"
                      stroke="#ffffff"
                    />

                    <YAxis
                      stroke="#ffffff"
                    />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="reservations"
                      name="Reservations"
                      fill="#00E5FF"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </motion.div>

          </div>
          {/* ==========================================
            BUSY HOURS CHART
        ========================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.20 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
          >

            <h2 className="text-xl font-bold text-white mb-6">

              Busy Reservation Hours

            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart data={hourlyData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                  />

                  <XAxis
                    dataKey="hour"
                    stroke="#ffffff"
                  />

                  <YAxis
                    stroke="#ffffff"
                  />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="reservations"
                    name="Reservations"
                    stroke="#00E5FF"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#00E5FF",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* ==========================================
            RESERVATION LIST STARTS HERE
        ========================================== */}

          {isLoadingData ? (

            <div className="p-12 flex flex-col items-center justify-center text-white/50 border border-white/10 rounded-xl bg-white/5">

              <Loader2 className="w-8 h-8 animate-spin mb-4 text-brand-neon" />

              <p>

                Loading reservations...

              </p>

            </div>

          ) : dataError ? (

            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">

              <h3 className="font-bold flex items-center gap-2 mb-2">

                <AlertCircle className="w-5 h-5" />

                Permission Denied

              </h3>

              <p>{dataError}</p>

            </div>

          ) : (

            <>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {currentReservations.map((res) => (

                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg hover:border-brand-neon/40 transition"
                  >

                    {/* Header */}

                    <div className="flex justify-between items-start mb-5">

                      <div>

                        <h3 className="text-xl font-bold text-white">

                          {res.fullName}

                        </h3>

                        <p className="text-brand-neon text-sm">

                          {res.phoneNumber}

                        </p>

                        <p className="text-white/50 text-sm">

                          {res.email}

                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                    ${res.status === "confirmed"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : res.status === "cancelled"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          }`}
                      >
                        {res.status}
                      </span>

                    </div>

                    {/* Reservation Details */}

                    <div className="space-y-3">

                      <div className="flex items-center gap-3 text-white/70">

                        <Calendar className="w-4 h-4" />

                        <span>{res.date}</span>

                      </div>

                      <div className="flex items-center gap-3 text-white/70">

                        <Clock className="w-4 h-4" />

                        <span>{res.time}</span>

                      </div>

                      <div className="flex items-center gap-3 text-white/70">

                        <Users className="w-4 h-4" />

                        <span>{res.guests} Guests</span>

                      </div>

                      {res.specialRequests && (

                        <div className="mt-3 rounded-lg bg-white/5 p-3">

                          <p className="text-xs text-white/40 mb-1">

                            Special Requests

                          </p>

                          <p className="text-white/80 text-sm">

                            {res.specialRequests}

                          </p>

                        </div>

                      )}

                    </div>

                    {/* Buttons */}

                    <div className="grid grid-cols-3 gap-2 mt-6">

                      <button
                        disabled={res.status === "confirmed"}
                        onClick={() =>
                          updateReservationStatus(
                            res.id,
                            "confirmed"
                          )
                        }
                        className="py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white text-sm font-medium transition"
                      >
                        Confirm
                      </button>

                      <button
                        disabled={res.status === "cancelled"}
                        onClick={() =>
                          updateReservationStatus(
                            res.id,
                            "cancelled"
                          )
                        }
                        className="py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 text-white text-sm font-medium transition"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() =>
                          deleteReservation(res.id)
                        }
                        className="py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
                      >
                        Delete
                      </button>

                    </div>

                  </motion.div>

                ))}

              </div>
              {/* ==========================================
              PAGINATION
          ========================================== */}

              {totalPages > 1 && (

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">

                  <div className="text-white/60 text-sm">

                    Showing page <span className="text-brand-neon font-semibold">{currentPage}</span> of{" "}
                    <span className="text-brand-neon font-semibold">{totalPages}</span>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.max(prev - 1, 1)
                        )
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (

                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition ${currentPage === page
                          ? "bg-brand-neon text-brand-dark"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                          }`}
                      >
                        {page}
                      </button>

                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>

                  </div>

                </div>

              )}

            </>

          )}

        </div>

      </div>

     </div>

    );

}