/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";

const Features = lazy(() => import("./components/Features"));
const MenuHighlights = lazy(() => import("./components/MenuHighlights"));
const FullMenu = lazy(() => import("./components/FullMenu"));
const Reservation = lazy(() => import("./components/Reservation"));
const Gallery = lazy(() => import("./components/Gallery"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const TrustSection = lazy(() => import("./components/TrustSection"));
const FAQ = lazy(() => import("./components/FAQ"));
const About = lazy(() => import("./components/About"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function LoadingSection() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
    </div>
  );
}

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === "#admin");
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isAdminRoute) {
    return (
      <Suspense fallback={<LoadingSection />}>
        <AdminDashboard onClose={() => (window.location.hash = "")} />
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

        </Suspense>

      </main>

      <Footer />

      <WhatsAppWidget />

    </div>
  );
}