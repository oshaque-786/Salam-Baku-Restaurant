import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { ArrowLeft, LogOut, Lock, Calendar, Users, Clock, Loader2, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';

interface ReservationData {
  id: string;
  fullName: string;
  phoneNumber: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  createdAt: Timestamp | null;
}

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState('');
  
  const [reservationEnabled, setReservationEnabled] = useState(true);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchReservations();
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'config');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReservationEnabled(docSnap.data().reservationEnabled ?? true);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const toggleReservationStatus = async () => {
    setIsUpdatingSettings(true);
    try {
      const newValue = !reservationEnabled;
      await setDoc(doc(db, 'settings', 'config'), { reservationEnabled: newValue }, { merge: true });
      setReservationEnabled(newValue);
    } catch (error) {
       console.error('Error updating settings:', error);
       alert('Failed to update reservation status. Check permissions.');
    } finally {
      setIsUpdatingSettings(false);
    }
  };

  const fetchReservations = async () => {
    setIsLoadingData(true);
    setDataError('');
    try {
      const snapshot = await getDocs(collection(db, 'reservations'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ReservationData[];
      
      // Sort client side to avoid missing index issues
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      
      setReservations(data);
    } catch (error: any) {
      console.error(error);
      setDataError(error.message || 'Failed to fetch reservations');
      try {
         handleFirestoreError(error, OperationType.LIST, 'reservations');
      } catch(e) {}
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
         setAuthError('Email/Password authentication must be enabled in your Firebase Console.');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
         setAuthError('Invalid credentials. Ensure you have created this staff user in Firebase Auth.');
      } else {
         setAuthError(error.message || 'Login failed');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-neon animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="absolute top-8 left-8">
           <button onClick={onClose} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
             <ArrowLeft className="w-5 h-5" /> Back to Site
           </button>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-4 text-brand-accent">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-bold text-3xl text-white">Staff Login</h2>
            <p className="text-white/60 mt-2">Access the reservation management system</p>
          </div>

          {authError && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3 mb-6 text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{authError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Staff Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@salambaku.az"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon transition-colors" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full py-4 bg-brand-neon text-brand-dark font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-4"
            >
              {isAuthenticating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div className="flex items-center gap-4">
             <button onClick={onClose} className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors" aria-label="Back">
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div>
               <h1 className="font-heading font-bold text-2xl text-white">Reservation Requests</h1>
               <p className="text-white/60 text-sm">Logged in as {user.email}</p>
             </div>
           </div>

           <div className="flex gap-4">
              <button 
                onClick={toggleReservationStatus} 
                disabled={isUpdatingSettings}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${reservationEnabled ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'}`}
              >
                {isUpdatingSettings ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : reservationEnabled ? (
                  <ToggleRight className="w-5 h-5" />
                ) : (
                  <ToggleLeft className="w-5 h-5" />
                )}
                {reservationEnabled ? 'Reservations Enabled' : 'Reservations Disabled'}
              </button>
              <button onClick={fetchReservations} className="px-4 py-2 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                Refresh List
              </button>
              <button onClick={handleLogout} className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
           </div>
        </div>

        {isLoadingData ? (
          <div className="p-12 flex flex-col items-center justify-center text-white/50 border border-white/10 rounded-xl bg-white/5">
             <Loader2 className="w-8 h-8 animate-spin mb-4 text-brand-neon" />
             <p>Loading reservations securely...</p>
          </div>
        ) : dataError ? (
          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">
            <h3 className="font-bold flex items-center gap-2 mb-2"><AlertCircle className="w-5 h-5" /> Permission Denied</h3>
            <p className="text-sm">{dataError}</p>
            <p className="text-sm mt-2">Ensure your Firestore rules allow {user.email} to read the reservations collection.</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="p-12 text-center text-white/50 bg-white/5 border border-white/10 rounded-xl">
             <p className="text-lg">No pending reservations found.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reservations.map((res) => (
              <motion.div key={res.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-brand-neon/50 transition-colors shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{res.fullName}</h3>
                    <p className="text-brand-neon text-sm">{res.phoneNumber}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold uppercase tracking-wider rounded-full border border-yellow-500/30">
                    {res.status}
                  </span>
                </div>

                <div className="space-y-3 mt-5">
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <span>{res.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Clock className="w-4 h-4 text-white/40" />
                    <span>{res.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Users className="w-4 h-4 text-white/40" />
                    <span>{res.guests} Guests</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
