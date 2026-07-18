/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from "react";

// ---------- Normal Components ----------
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { useAuth } from "./context/AuthContext";
const ContactLocation = lazy(() => import("./components/ContactLocation"));

// ---------- Lazy Loaded Components ----------
const Features = lazy(() => import("./components/Features"));
const MenuHighlights = lazy(() => import("./components/MenuHighlights"));
const FullMenu = lazy(() => import("./components/FullMenu"));
const Reservation = lazy(() => import("./components/Reservation"));
const Gallery = lazy(() => import("./components/Gallery"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const TrustSection = lazy(() => import("./components/TrustSection"));
const FAQ = lazy(() => import("./components/FAQ"));
const About = lazy(() => import("./components/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

function LoadingSection() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-neon border-t-transparent rounded-full animate-spin"></div>

        <p className="text-white/70 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === "#admin");
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (loading) {
    return <LoadingSection />;
  }

  if (isAdminRoute) {
    if (!user) {
      return (
        <Suspense fallback={<LoadingSection />}>
          <AdminLogin />
        </Suspense>
      );
    }

    return (
      <Suspense fallback={<LoadingSection />}>
        <Dashboard onClose={() => (window.location.hash = "")} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark font-sans selection:bg-brand-neon selection:text-brand-dark">
      <Navbar />

      <main>
        <Hero />

        <Suspense fallback={<LoadingSection />}>
          <Features />

          <MenuHighlights />

          <FullMenu />

          <Reservation />

          <Gallery />

          <Testimonials />

          <TrustSection />

          <FAQ />

          <About />

          <ContactLocation />
        </Suspense>
      </main>

      <Footer />

      <WhatsAppWidget />
    </div>
  );
}
