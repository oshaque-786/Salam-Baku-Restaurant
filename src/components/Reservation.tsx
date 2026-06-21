import { motion } from 'motion/react';
import { Calendar, Users, Clock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Reservation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationEnabled, setReservationEnabled] = useState(true);

  useEffect(() => {
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
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      guests: Number(formData.get('guests')),
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'reservations'), data);
      setIsSuccess(true);
      
      // WhatsApp notification logic
      const rawMessage = `*New Reservation Request*\n\n*Name:* ${data.fullName}\n*Phone:* ${data.phoneNumber}\n*Date:* ${data.date}\n*Time:* ${data.time}\n*Guests:* ${data.guests}`;
      const message = encodeURIComponent(rawMessage);
      window.open(`https://wa.me/994502021166?text=${message}`, '_blank');
      
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'reservations');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    const rawMessage = `*Cancel Reservation Request*\n\nPlease help me cancel my reservation. My details are:\n- Name: \n- Phone: `;
    const message = encodeURIComponent(rawMessage);
    window.open(`https://wa.me/994502021166?text=${message}`, '_blank');
  };

  return (
    <section id="reservation" className="py-24 bg-brand-dark relative border-y-4 border-brand-accent">
      <div className="absolute inset-0 bg-ajrak-pattern opacity-30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-extrabold text-4xl md:text-5xl mb-4"
          >
            Reserve a <span className="text-brand-accent">Table</span>
          </motion.h2>
          <p className="text-white/70">
            Join us for an unforgettable dining experience. We can comfortably accommodate up to 60 guests.
          </p>
        </div>

        {!reservationEnabled ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-md p-12 rounded-2xl border border-white/10 text-center shadow-[0_0_30px_rgba(139,28,49,0.2)]"
          >
            <AlertCircle className="w-12 h-12 text-brand-accent mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold font-heading mb-3">Online Reservations Temporarily Unavailable</h3>
            <p className="text-white/70 max-w-lg mx-auto mb-6">
              Online reservations are currently turned off. However, you can still request a table by contacting us directly via WhatsApp.
            </p>
            <button type="button" onClick={handleCancelClick} className="px-8 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-brand-accent/80 transition-all shadow-lg shadow-brand-accent/20">
               Contact via WhatsApp
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-md p-8 pt-10 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(139,28,49,0.2)]"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
              <input type="text" name="fullName" required placeholder="Oshaque Ali" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
              <input type="tel" name="phoneNumber" required placeholder="+994 50 2021166" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2"><Calendar className="w-4 h-4"/> Date</label>
              <input type="date" name="date" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> Time</label>
              <input type="time" name="time" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2"><Users className="w-4 h-4"/> Number of Guests (Max 60)</label>
              <input type="number" name="guests" required min="1" max="60" placeholder="2" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-accent text-white font-bold rounded-lg hover:bg-brand-accent/80 transition-colors shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
            ) : isSuccess ? (
              <><CheckCircle2 className="w-5 h-5 text-green-400" /> Reservation Confirmed</>
            ) : (
              'Confirm Reservation'
            )}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              Need to modify or cancel your reservation?{' '}
              <button type="button" onClick={handleCancelClick} className="text-brand-accent hover:text-white transition-colors focus:outline-none underline">
                Cancel via WhatsApp
              </button>
            </p>
          </div>
        </motion.form>
        )}
      </div>
    </section>
  );
}
